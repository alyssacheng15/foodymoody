import React from 'react';

const RADIUS_OPTIONS = [
  { label: '1 mi', value: 1609 },
  { label: '5 mi', value: 8047 },
  { label: '10 mi', value: 16093 },
  { label: '25 mi', value: 40000 },
];

const SORT_OPTIONS = [
  { label: 'Best Match', value: 'best_match' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Most Reviewed', value: 'review_count' },
];

export default function FiltersPanel({
  location,
  setLocation,
  radius,
  setRadius,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-5 sm:items-end">

        {/* Location input */}
        <div className="flex-1 min-w-0">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Location
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or neighborhood..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>
        </div>

        {/* Distance radius pills */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Distance
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {RADIUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRadius(opt.value)}
                className={[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  radius === opt.value
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort by pills */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Sort by
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap',
                  sortBy === opt.value
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
