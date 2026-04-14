import React, { useState, useEffect, useRef } from 'react';

const PLACEHOLDERS = [
  'Tell me what you\'re craving…',
  'cheap late-night comfort food with friends',
  'first date spot, not too loud',
  'cozy ramen under $20',
  'healthy lunch near campus',
  'outdoor brunch, Sunday vibes',
  'quick solo lunch downtown',
];

const EXAMPLE_CHIPS = [
  { label: 'cozy ramen',        icon: '🍜' },
  { label: 'date night',        icon: '🕯️' },
  { label: 'cheap late-night',  icon: '🌙' },
  { label: 'healthy lunch',     icon: '🥗' },
  { label: 'brunch with friends', icon: '🥂' },
  { label: 'quick bite',        icon: '⚡' },
];

export default function SmartSearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Rotate placeholder while input is empty and unfocused
  useEffect(() => {
    if (query || isFocused) return;
    const id = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length),
      3200
    );
    return () => clearInterval(id);
  }, [query, isFocused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed && !isLoading) onSearch(trimmed);
  };

  const handleChipClick = (label) => {
    setQuery(label);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ── Search input ─────────────────────────────── */}
      <form onSubmit={handleSubmit} className="relative">
        {/* Search icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={PLACEHOLDERS[placeholderIdx]}
          disabled={isLoading}
          className={[
            'w-full pl-14 pr-20 py-5 text-base sm:text-lg text-gray-900',
            'placeholder-gray-400 bg-white rounded-2xl',
            'border-2 transition-all duration-200',
            'focus:outline-none',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            isFocused
              ? 'border-gray-900 shadow-[0_4px_28px_rgba(0,0,0,0.13)]'
              : 'border-gray-200 shadow-md hover:border-gray-300',
          ].join(' ')}
        />

        {/* Submit button — embedded inside input on right */}
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={[
            'absolute right-3 top-1/2 -translate-y-1/2',
            'flex items-center justify-center w-11 h-11 rounded-xl',
            'font-semibold text-white text-sm',
            'transition-all duration-200',
            query.trim() && !isLoading
              ? 'bg-gray-900 hover:bg-gray-700 hover:scale-105 active:scale-95 shadow-sm'
              : 'bg-gray-200 cursor-not-allowed',
          ].join(' ')}
          aria-label="Search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      {/* ── Loading message ───────────────────────────── */}
      {isLoading && (
        <p className="mt-3 text-center text-sm text-gray-400 animate-pulse">
          Finding places that match your vibe…
        </p>
      )}

      {/* ── Example chips ─────────────────────────────── */}
      {!isLoading && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {EXAMPLE_CHIPS.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleChipClick(label)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-150 shadow-sm"
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
