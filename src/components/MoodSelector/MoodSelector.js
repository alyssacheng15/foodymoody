import React from 'react';

export const MOODS = [
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    term: 'smoothie',
    bg: 'bg-amber-50',
    activeBg: 'bg-amber-100',
    border: 'border-amber-200',
    activeBorder: 'border-amber-400',
    description: 'Riding high on good vibes',
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '🥺',
    term: 'dessert',
    bg: 'bg-blue-50',
    activeBg: 'bg-blue-100',
    border: 'border-blue-200',
    activeBorder: 'border-blue-400',
    description: 'Need a little comfort',
  },
  {
    id: 'stressed',
    label: 'Stressed',
    emoji: '😮‍💨',
    term: 'tea',
    bg: 'bg-emerald-50',
    activeBg: 'bg-emerald-100',
    border: 'border-emerald-200',
    activeBorder: 'border-emerald-400',
    description: 'Need to decompress',
  },
  {
    id: 'angry',
    label: 'Angry',
    emoji: '😤',
    term: 'salad',
    bg: 'bg-red-50',
    activeBg: 'bg-red-100',
    border: 'border-red-200',
    activeBorder: 'border-red-400',
    description: 'Need to reset and refocus',
  },
  {
    id: 'cold',
    label: 'Under the weather',
    emoji: '🤧',
    term: 'soup',
    bg: 'bg-sky-50',
    activeBg: 'bg-sky-100',
    border: 'border-sky-200',
    activeBorder: 'border-sky-400',
    description: 'Warm me up inside',
  },
  {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    term: 'coffee',
    bg: 'bg-violet-50',
    activeBg: 'bg-violet-100',
    border: 'border-violet-200',
    activeBorder: 'border-violet-400',
    description: 'Send help and caffeine',
  },
  {
    id: 'hungover',
    label: 'Hungover',
    emoji: '🥴',
    term: 'breakfast',
    bg: 'bg-orange-50',
    activeBg: 'bg-orange-100',
    border: 'border-orange-200',
    activeBorder: 'border-orange-400',
    description: 'Need the classic cure',
  },
  {
    id: 'pregnant',
    label: 'Craving',
    emoji: '🤰',
    term: 'burger',
    bg: 'bg-pink-50',
    activeBg: 'bg-pink-100',
    border: 'border-pink-200',
    activeBorder: 'border-pink-400',
    description: 'Feeding a serious craving',
  },
];

export default function MoodSelector({ selectedMood, onMoodSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {MOODS.map((mood) => {
        const isSelected = selectedMood?.id === mood.id;
        return (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            className={[
              'relative text-left p-4 rounded-2xl border-2 transition-all duration-200',
              'hover:scale-[1.02] hover:shadow-md active:scale-[0.98]',
              isSelected
                ? `${mood.activeBg} ${mood.activeBorder} shadow-md`
                : `${mood.bg} ${mood.border}`,
            ].join(' ')}
          >
            {/* Checkmark badge when selected */}
            {isSelected && (
              <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            )}

            <span className="text-3xl block mb-2 leading-none">{mood.emoji}</span>
            <span className="font-semibold text-gray-900 text-sm block leading-tight">
              {mood.label}
            </span>
            <span className="text-xs text-gray-500 mt-0.5 block leading-snug">
              {mood.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
