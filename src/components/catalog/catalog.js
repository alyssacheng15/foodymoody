import React from 'react';
import RestaurantCard from '../restaurants/restaurants';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="h-48 bg-gray-100 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-100 rounded-full animate-pulse w-3/4" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-1/3" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-1/2" />
        <div className="flex gap-2 mt-4">
          <div className="h-5 bg-gray-100 rounded-full animate-pulse w-16" />
          <div className="h-5 bg-gray-100 rounded-full animate-pulse w-20" />
          <div className="h-5 bg-gray-100 rounded-full animate-pulse w-14" />
        </div>
        <div className="h-14 bg-rose-50 rounded-xl animate-pulse mt-3" />
      </div>
    </div>
  );
}

export default function BusinessList({ businesses, isLoading, hasSearched, mood }) {
  if (isLoading) {
    return (
      <div>
        <div className="flex items-baseline gap-2 mb-6">
          <div className="h-6 bg-gray-100 rounded-full animate-pulse w-44" />
          <div className="h-4 bg-gray-100 rounded-full animate-pulse w-16" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!hasSearched) return null;

  if (businesses.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl block mb-4">🔍</span>
        <h3 className="font-semibold text-gray-900 text-lg">No results found</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
          Try a different mood, adjust your location, or widen the distance.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-baseline gap-2 mb-6">
        <h2 className="text-xl font-bold text-gray-900">We think you'd love these</h2>
        <span className="text-sm text-gray-400">{businesses.length} places</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {businesses.map((business) => (
          <RestaurantCard key={business.id} business={business} mood={mood} />
        ))}
      </div>
    </div>
  );
}
