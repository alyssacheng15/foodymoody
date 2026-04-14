import React, { useState, useRef } from 'react';
import './App.css';
import Yelp from './util/api';
import MoodSelector from './components/MoodSelector/MoodSelector';
import SearchBar from './components/SearchBar/SearchBar';
import FiltersPanel from './components/FiltersPanel/FiltersPanel';
import MoodBlurb from './components/MoodBlurb/MoodBlurb';
import BusinessList from './components/catalog/catalog';

export default function App() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [location, setLocation] = useState('Santa Clarita, CA');
  const [radius, setRadius] = useState(8047); // ~5 miles in metres
  const [sortBy, setSortBy] = useState('best_match');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const discoverRef = useRef(null);
  const resultsRef = useRef(null);

  const runSearch = async (term, loc, sb, rad) => {
    setIsLoading(true);
    setHasSearched(false);
    try {
      const results = await Yelp.searchYelp(
        term,
        loc ?? location,
        sb ?? sortBy,
        rad ?? radius
      );
      setBusinesses(results || []);
    } catch (err) {
      console.error('Search error:', err);
      setBusinesses([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    runSearch(mood.term);
  };

  const handleManualSearch = (term) => {
    setSelectedMood(null);
    runSearch(term);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ── Fixed nav ─────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            FoodyMoody
          </span>
          <span className="hidden sm:block text-sm text-gray-400 font-medium">
            Eat by how you feel
          </span>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-5 text-center bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-xs font-semibold tracking-widest uppercase mb-6">
            Mood-based dining
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Find the perfect spot
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              for how you feel
            </span>
          </h1>

          <p className="mt-5 text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
            Pick your mood — we'll surface restaurants that match your vibe,
            pulled straight from Yelp.
          </p>

          <button
            onClick={() =>
              discoverRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-8 inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20"
          >
            Find my food
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* ── Discovery section ─────────────────────────── */}
      <main ref={discoverRef} className="max-w-5xl mx-auto px-5 pb-24">
        {/* Mood heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            How are you feeling right now?
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Pick a mood — we'll find places that fit.
          </p>
        </div>

        <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />

        {/* Divider + manual search */}
        <div className="mt-10 border-t border-gray-100 pt-10">
          <SearchBar onSearch={handleManualSearch} />
        </div>

        {/* Filters row */}
        <div className="mt-6">
          <FiltersPanel
            location={location}
            setLocation={setLocation}
            radius={radius}
            setRadius={setRadius}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Results */}
        <div ref={resultsRef} className="mt-12 scroll-mt-20">
          {selectedMood && !isLoading && hasSearched && (
            <MoodBlurb mood={selectedMood} count={businesses.length} />
          )}
          <BusinessList
            businesses={businesses}
            isLoading={isLoading}
            hasSearched={hasSearched}
            mood={selectedMood}
          />
        </div>
      </main>
    </div>
  );
}
