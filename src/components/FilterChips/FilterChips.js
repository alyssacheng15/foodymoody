import React from 'react';

// Maps parsed fields → display chip metadata
const VIBE_ICONS = {
  cozy:           '🪵',
  quiet:          '🤫',
  romantic:       '🕯️',
  lively:         '🎉',
  quick:          '⚡',
  outdoor:        '🌿',
  healthy:        '🥗',
  'comfort food': '🍲',
  'late-night':   '🌙',
  'local favorite': '📍',
  casual:         '👕',
  trendy:         '✨',
};

const GROUP_CHIPS = {
  date:  { label: 'date night',     icon: '❤️'  },
  group: { label: 'with friends',   icon: '👥'  },
  solo:  { label: 'solo dining',    icon: '🧍'  },
};

const BUDGET_CHIPS = {
  '$':   { label: 'budget-friendly', icon: '💸' },
  '$$':  { label: 'mid-range',       icon: '💳' },
  '$$$': { label: 'upscale',         icon: '✨' },
};

const MEAL_ICONS = {
  breakfast: '🍳', brunch: '🥂', lunch: '🥙',
  dinner: '🍷', 'late-night': '🌙',
};

export default function FilterChips({ parsedQuery, onClear }) {
  if (!parsedQuery) return null;

  const { cuisine, group, budget, mealTime, vibes } = parsedQuery;

  const chips = [];

  if (cuisine)  chips.push({ key: 'cuisine', icon: '🍽️', label: cuisine });
  if (group)    chips.push({ key: 'group',   ...GROUP_CHIPS[group] });
  if (budget)   chips.push({ key: 'budget',  ...BUDGET_CHIPS[budget] });
  if (mealTime) chips.push({ key: 'time',    icon: MEAL_ICONS[mealTime] || '🕐', label: mealTime });

  for (const vibe of vibes.slice(0, 2)) {
    chips.push({ key: `vibe-${vibe}`, icon: VIBE_ICONS[vibe] || '•', label: vibe });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in">
      <span className="text-xs text-gray-400 font-medium mr-1">Picked up:</span>

      {chips.map(({ key, icon, label }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium rounded-full"
        >
          <span className="text-sm leading-none">{icon}</span>
          {label}
        </span>
      ))}

      <button
        onClick={onClear}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors ml-1 font-medium underline underline-offset-2"
      >
        Clear
      </button>
    </div>
  );
}
