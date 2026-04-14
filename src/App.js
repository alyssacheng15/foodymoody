import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import { useQueryParser } from './hooks/useQueryParser';
import { useYelpSearch } from './hooks/useYelpSearch';
import SmartSearchBar from './components/SmartSearchBar/SmartSearchBar';
import FilterChips from './components/FilterChips/FilterChips';
import BusinessList from './components/catalog/catalog';

const RADIUS_OPTIONS = [
  { label: '1 mi',  value: 1609  },
  { label: '5 mi',  value: 8047  },
  { label: '10 mi', value: 16093 },
  { label: '25 mi', value: 40000 },
];

export default function App() {
  const [location, setLocation] = useState('Santa Clarita, CA');
  const [radius, setRadius] = useState(8047);
  const [parsedQuery, setParsedQuery] = useState(null);

  const { parse } = useQueryParser();
  const { businesses, isLoading, hasSearched, search, reset } = useYelpSearch();
  const resultsRef = useRef(null);

  const handleSearch = useCallback(
    (rawQuery) => {
      const parsed = parse(rawQuery);
      setParsedQuery(parsed);

      // Cheap searches benefit from "most reviewed" to surface popular spots
      const sortBy = parsed?.budget === '$' ? 'review_count' : 'best_match';

      search(parsed?.yelpTerm || rawQuery, location, sortBy, radius).then(() => {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      });
    },
    [parse, search, location, radius]
  );

  const handleClear = () => {
    setParsedQuery(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Minimal fixed nav ─────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-13 flex items-center justify-between" style={{ height: '52px' }}>
          <span className="font-bold text-gray-900 tracking-tight">FoodyMoody</span>
          <span className="hidden sm:block text-xs text-gray-400 font-medium tracking-wide uppercase">
            Smart dining discovery
          </span>
        </div>
      </nav>

      {/* ── Hero — search is the entire experience ─────── */}
      <section className="pt-24 pb-10 px-5 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: '#fff1f2', color: '#f43f5e' }}
          >
            AI-powered restaurant discovery
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-gray-900 leading-[1.08] tracking-tight">
            Describe what you want.
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We'll find the place.
            </span>
          </h1>

          <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            Type anything — a mood, a craving, a vibe, a situation. Natural language understood.
          </p>

          {/* ── The search bar ──────────────────────────── */}
          <div className="mt-8">
            <SmartSearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* ── Location + distance row ─────────────────── */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
            {/* Location */}
            <label className="flex items-center gap-1.5 cursor-text">
              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-0 border-b border-dashed border-gray-300 focus:outline-none focus:border-gray-600 text-sm text-gray-600 w-44 pb-px transition-colors"
                placeholder="City or neighborhood"
              />
            </label>

            <span className="text-gray-200 hidden sm:block">|</span>

            {/* Distance pills */}
            <div className="flex items-center gap-1 flex-wrap justify-center">
              <span className="text-xs text-gray-400 mr-1">within</span>
              {RADIUS_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setRadius(value)}
                  className={[
                    'px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150',
                    radius === value
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Detected-query chips (shown after search) ── */}
          {parsedQuery && (
            <div className="mt-5">
              <FilterChips parsedQuery={parsedQuery} onClear={handleClear} />
            </div>
          )}
        </div>
      </section>

      {/* ── Results ───────────────────────────────────── */}
      <main
        ref={resultsRef}
        className="max-w-5xl mx-auto px-5 pb-24 scroll-mt-6"
      >
        <BusinessList
          businesses={businesses}
          isLoading={isLoading}
          hasSearched={hasSearched}
          parsedQuery={parsedQuery}
        />
      </main>

      {/* ── Footer ────────────────────────────────────── */}
      {hasSearched && !isLoading && (
        <footer className="border-t border-gray-100 py-8 text-center">
          <p className="text-xs text-gray-400">
            Restaurant data powered by{' '}
            <span className="font-semibold text-gray-500">Yelp</span>
            {' · '}Results shown for{' '}
            <span className="font-medium text-gray-600">{location}</span>
          </p>
        </footer>
      )}
    </div>
  );
}
