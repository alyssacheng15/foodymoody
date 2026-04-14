import React from 'react';

const MOOD_DETAILS = {
  happy: {
    headline: 'Keep those good vibes going',
    body: 'Natural sugars from fresh food and smoothies boost your energy and sustain a positive mood. You deserve to celebrate.',
    recommend: ['Smoothie bars', 'Acai bowls', 'Fresh juice'],
    colorCard: '#fffbeb',
    colorBorder: '#fde68a',
    colorHeading: '#b45309',
    colorTag: { bg: '#fef3c7', text: '#92400e' },
  },
  sad: {
    headline: 'A little sweetness goes a long way',
    body: "Science shows sugar boosts serotonin. Give yourself permission to indulge — you've earned a little comfort.",
    recommend: ['Bakeries', 'Dessert cafés', 'Ice cream'],
    colorCard: '#eff6ff',
    colorBorder: '#bfdbfe',
    colorHeading: '#1d4ed8',
    colorTag: { bg: '#dbeafe', text: '#1e40af' },
  },
  stressed: {
    headline: 'Step away from the chaos',
    body: "Tea lowers cortisol — half a cup of green tea daily is clinically shown to reduce risk of depression and improve focus.",
    recommend: ['Tea houses', 'Calm cafés', 'Juice bars'],
    colorCard: '#f0fdf4',
    colorBorder: '#bbf7d0',
    colorHeading: '#15803d',
    colorTag: { bg: '#dcfce7', text: '#166534' },
  },
  angry: {
    headline: 'Reset with something fresh',
    body: 'Sugar actually amplifies anger. Clean veggies and leafy greens regulate cortisol and help you decompress naturally.',
    recommend: ['Salad bars', 'Healthy bowls', 'Farm-to-table'],
    colorCard: '#fff1f2',
    colorBorder: '#fecdd3',
    colorHeading: '#be123c',
    colorTag: { bg: '#ffe4e6', text: '#9f1239' },
  },
  cold: {
    headline: 'Warmth from the inside out',
    body: 'Soup nutrients speed recovery, the heat relieves congestion, and sodium soothes sore throats. Nature\'s medicine.',
    recommend: ['Soup spots', 'Ramen joints', 'Hot broth'],
    colorCard: '#f0f9ff',
    colorBorder: '#bae6fd',
    colorHeading: '#0369a1',
    colorTag: { bg: '#e0f2fe', text: '#075985' },
  },
  tired: {
    headline: 'A little fuel goes a long way',
    body: 'Caffeine temporarily blocks adenosine — the chemical that makes you feel sleepy. Grab a cup and get back to it.',
    recommend: ['Coffee shops', 'Espresso bars', 'Energy cafés'],
    colorCard: '#f5f3ff',
    colorBorder: '#ddd6fe',
    colorHeading: '#6d28d9',
    colorTag: { bg: '#ede9fe', text: '#5b21b6' },
  },
  hungover: {
    headline: 'The classic cure',
    body: 'A hearty breakfast replenishes lost nutrients, stabilises blood sugar, and gets your body back on track faster than anything.',
    recommend: ['Brunch spots', 'Breakfast diners', 'Egg sandwiches'],
    colorCard: '#fff7ed',
    colorBorder: '#fed7aa',
    colorHeading: '#c2410c',
    colorTag: { bg: '#ffedd5', text: '#9a3412' },
  },
  pregnant: {
    headline: 'Feed that craving',
    body: "Sometimes you just need to satisfy a craving — and that's perfectly okay. You're doing great. Eat what makes you happy.",
    recommend: ['Burger joints', 'Comfort food', 'Hearty meals'],
    colorCard: '#fdf2f8',
    colorBorder: '#f9a8d4',
    colorHeading: '#9d174d',
    colorTag: { bg: '#fce7f3', text: '#831843' },
  },
};

export default function MoodBlurb({ mood, count }) {
  const details = MOOD_DETAILS[mood.id];
  if (!details) return null;

  return (
    <div
      className="rounded-2xl border p-5 mb-8 animate-slide-up"
      style={{
        backgroundColor: details.colorCard,
        borderColor: details.colorBorder,
      }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0 leading-none mt-0.5">{mood.emoji}</span>

        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-lg leading-tight"
            style={{ color: details.colorHeading }}
          >
            {details.headline}
          </h3>

          <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
            {details.body}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {details.recommend.map((rec) => (
              <span
                key={rec}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: details.colorTag.bg,
                  color: details.colorTag.text,
                }}
              >
                {rec}
              </span>
            ))}
          </div>

          {count > 0 && (
            <p className="text-xs text-gray-400 mt-3 font-medium">
              {count} place{count !== 1 ? 's' : ''} found near you ↓
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
