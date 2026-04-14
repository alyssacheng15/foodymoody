import React from 'react';

// ── Copy generators ───────────────────────────────────────────────────────────

const VIBE_SUMMARIES = {
  cozy:
    "Warm corners, soft lighting, and a menu you'll want to linger over. The kind of spot you stay at longer than planned.",
  quiet:
    'Easy conversation without shouting. Low-key, comfortable, and entirely unhurried.',
  romantic:
    "Dimly lit, attentive, and worth dressing up for. Sets the mood without trying too hard.",
  lively:
    "Buzzy energy and the kind of crowd that makes the food taste better. Always a good night here.",
  quick:
    'No-fuss, no wait, no regrets. Great food that actually fits into a real schedule.',
  outdoor:
    'Fresh air and good food — the patio is genuinely the draw, not an afterthought.',
  healthy:
    "Clean ingredients, real flavors. You'll actually feel good about what you ate.",
  'comfort food':
    "Generous portions of the kind of food that reminds you why eating is one of life's great pleasures.",
  'late-night':
    'Still open and still good when the rest of the city has called it a night.',
  'local favorite':
    "Not on every tourist list, but exactly the kind of gem the neighborhood knows about.",
  casual:
    "No reservations, no dress code, no stress. Just good food and zero pretension.",
  trendy:
    "That spot everyone on your feed has been to. Turns out, the hype is warranted.",
};

function generateVibeSummary(business, parsedQuery) {
  if (parsedQuery?.vibes?.length) {
    const summary = parsedQuery.vibes.map((v) => VIBE_SUMMARIES[v]).find(Boolean);
    if (summary) return summary;
  }
  if (parsedQuery?.group === 'date')
    return "Thoughtful without being pretentious. The kind of place that makes the other person feel like you put in effort.";
  if (parsedQuery?.group === 'group')
    return "Big enough tables, a menu with something for everyone, and energy that turns dinner into a whole night.";
  if (parsedQuery?.group === 'solo')
    return "Comfortable solo dining — good service, no pressure, and food worth the trip regardless.";
  if (parsedQuery?.mealTime === 'brunch')
    return "Unhurried mornings, good coffee, and a brunch menu worth the weekend ritual.";
  if (parsedQuery?.mealTime === 'late-night')
    return "Late-night hunger, solved. Quality doesn't drop at midnight here.";
  if (business.rating >= 4.5)
    return `One of the most consistently praised ${business.category.toLowerCase()} spots in the area. ${business.reviewCount}+ reviews say it all.`;
  return `A solid ${business.category.toLowerCase()} spot that earns its ${business.rating} stars meal after meal.`;
}

function generateWhyMatch(business, parsedQuery) {
  const reasons = [];

  if (business.rating >= 4.5) reasons.push(`${business.rating}★ from ${business.reviewCount}+ reviews`);
  else if (business.rating >= 4.0) reasons.push('consistently well-rated');

  if (parsedQuery?.budget === '$' && ['$', '$$'].includes(business.price))
    reasons.push('hits your budget without feeling cheap');
  if (parsedQuery?.budget === '$$$' && ['$$$', '$$$$'].includes(business.price))
    reasons.push('the elevated experience you were after');

  if (parsedQuery?.group === 'date')   reasons.push('intimate setting, right energy');
  if (parsedQuery?.group === 'group')  reasons.push('handles groups without the usual chaos');
  if (parsedQuery?.group === 'solo')   reasons.push('welcoming for solo diners');

  if (parsedQuery?.vibes?.includes('cozy'))       reasons.push('known for its warm, unhurried atmosphere');
  if (parsedQuery?.vibes?.includes('quiet'))      reasons.push('a quieter experience than most');
  if (parsedQuery?.vibes?.includes('quick'))      reasons.push('fast without sacrificing quality');
  if (parsedQuery?.vibes?.includes('healthy'))    reasons.push('lighter, health-conscious options on the menu');
  if (parsedQuery?.vibes?.includes('late-night')) reasons.push('open when you need it most');
  if (parsedQuery?.vibes?.includes('outdoor'))    reasons.push('patio seating available');

  if (!reasons.length)
    return `${business.reviewCount} locals have vouched for it. That's usually all the reason you need.`;

  const [a, b] = reasons;
  return b
    ? `${a.charAt(0).toUpperCase() + a.slice(1)}, and ${b}.`
    : `${a.charAt(0).toUpperCase() + a.slice(1)}.`;
}

function getVibeTags(business, parsedQuery) {
  const tags = [];

  if (business.rating >= 4.5)      tags.push('top rated');
  else if (business.rating >= 4.0) tags.push('highly rated');

  if (business.price === '$')        tags.push('budget-friendly');
  else if (business.price === '$$')  tags.push('mid-range');
  else if (business.price === '$$$') tags.push('upscale');

  if (parsedQuery?.vibes?.[0])                   tags.push(parsedQuery.vibes[0]);
  else if (parsedQuery?.group === 'date')         tags.push('date night');
  else if (parsedQuery?.group === 'group')        tags.push('good for groups');
  else if (parsedQuery?.mealTime)                 tags.push(parsedQuery.mealTime);

  return tags.slice(0, 3);
}

// ── Star rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <svg
            key={n}
            className={['w-3.5 h-3.5', n <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'].join(' ')}
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

// ── Card ──────────────────────────────────────────────────────────────────────

export default function RestaurantCard({ business, parsedQuery }) {
  const vibeTags    = getVibeTags(business, parsedQuery);
  const vibeSummary = generateVibeSummary(business, parsedQuery);
  const whyMatch    = generateWhyMatch(business, parsedQuery);

  return (
    <a
      href={business.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300"
    >
      {/* ── Image ─────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
        {business.imageSrc ? (
          <img
            src={business.imageSrc}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
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
        {/* Category pill */}
        <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {business.category}
        </span>
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Name + rating row */}
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-rose-600 transition-colors line-clamp-1">
            {business.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <StarRating rating={business.rating} />
            <span className="text-xs text-gray-400">{business.reviewCount} reviews</span>
          </div>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-500 flex items-start gap-1.5 -mt-1">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{business.address}, {business.city}</span>
        </p>

        {/* Vibe summary */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {vibeSummary}
        </p>

        {/* Tags */}
        {vibeTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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

        {/* Why this matches you */}
        <div className="mt-auto pt-1">
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
            <p className="text-[11px] font-semibold text-rose-500 uppercase tracking-wide">
              Why this matches you
            </p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{whyMatch}</p>
          </div>
        </div>

        {/* Yelp CTA */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
            View on Yelp
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          {business.distance && (
            <span className="text-[11px] text-gray-400">
              {(business.distance / 1609).toFixed(1)} mi away
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
