import React from 'react';

// Mock "why this place" copy keyed by mood
const WHY_TEXT = {
  happy: (cat) =>
    `A vibrant ${cat.toLowerCase()} spot that matches your energy. Perfect for celebrating the good times.`,
  sad: (cat) =>
    `Sometimes comfort is the best medicine. This ${cat.toLowerCase()} spot knows exactly how to lift your spirits.`,
  stressed: (cat) =>
    `Step away from the noise here. This ${cat.toLowerCase()} spot has the calm atmosphere you need right now.`,
  angry: (cat) =>
    `Fresh and grounding — this ${cat.toLowerCase()} spot will help you reset and refocus.`,
  cold: (cat) =>
    `Warm up from the inside out. This ${cat.toLowerCase()} spot serves exactly the hearty comfort you're after.`,
  tired: (cat) =>
    `Get your energy back. This ${cat.toLowerCase()} spot will fuel you up and get you going again.`,
  hungover: (cat) =>
    `The classic cure lives here. This ${cat.toLowerCase()} spot has exactly what your body is asking for.`,
  pregnant: (cat) =>
    `Satisfying cravings, one bite at a time. This ${cat.toLowerCase()} spot absolutely delivers.`,
};

const MOOD_VIBE_TAGS = {
  happy: ['feel-good', 'vibrant'],
  sad: ['cozy', 'comfort food'],
  stressed: ['calm', 'quiet'],
  angry: ['fresh', 'healthy'],
  cold: ['warm', 'hearty'],
  tired: ['energizing', 'quick'],
  hungover: ['restorative', 'brunch'],
  pregnant: ['satisfying', 'filling'],
};

function getVibeTags(business, mood) {
  const tags = [];

  if (business.rating >= 4.5) tags.push('top rated');
  else if (business.rating >= 4.0) tags.push('highly rated');

  if (business.price === '$') tags.push('budget-friendly');
  else if (business.price === '$$') tags.push('mid-range');
  else if (business.price === '$$$') tags.push('upscale');

  const moodTags = mood?.id ? MOOD_VIBE_TAGS[mood.id] : [];
  if (moodTags?.length) tags.push(moodTags[0]);

  return tags.slice(0, 3);
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <svg
            key={n}
            className={[
              'w-3.5 h-3.5',
              n <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200',
            ].join(' ')}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-700">{rating}</span>
    </div>
  );
}

export default function RestaurantCard({ business, mood }) {
  const vibeTags = getVibeTags(business, mood);
  const whyText =
    mood?.id && WHY_TEXT[mood.id]
      ? WHY_TEXT[mood.id](business.category)
      : `A great ${business.category.toLowerCase()} spot with ${business.reviewCount} reviews.`;

  return (
    <a
      href={business.url}
      target="_blank"
      rel="noreferrer"
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* ── Image ─────────────────── */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {business.imageSrc ? (
          <img
            src={business.imageSrc}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-5xl">🍽️</span>
          </div>
        )}

        {/* Price badge */}
        {business.price && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold text-xs px-2 py-1 rounded-lg shadow-sm">
            {business.price}
          </span>
        )}
      </div>

      {/* ── Card body ─────────────── */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-rose-600 transition-colors line-clamp-1">
          {business.name}
        </h3>

        {/* Category */}
        <p className="text-xs text-gray-400 font-medium mt-0.5">{business.category}</p>

        {/* Rating + review count */}
        <div className="mt-2">
          <StarRating rating={business.rating} />
          <p className="text-xs text-gray-400 mt-0.5">{business.reviewCount} reviews</p>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-500 mt-2 flex items-start gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-px"
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
          <span className="line-clamp-1">
            {business.address}, {business.city}
          </span>
        </p>

        {/* Vibe tags */}
        {vibeTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {vibeTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100 capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Why this place */}
        <div className="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
          <p className="text-[11px] font-semibold text-rose-500 uppercase tracking-wide">
            Why this place?
          </p>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{whyText}</p>
        </div>

        {/* CTA row */}
        <div className="mt-3 flex items-center text-xs font-semibold text-rose-500 gap-1">
          View on Yelp
          <svg
            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
