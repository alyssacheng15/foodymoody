/**
 * useQueryParser
 * Simulated NLP layer: converts free-text queries into structured search params.
 * No external AI needed — pure pattern matching with curated keyword maps.
 */
import { useCallback } from 'react';

// ── Pattern tables ────────────────────────────────────────────────────────────

const BUDGET_PATTERNS = [
  { re: /\$\$\$|fine dining|upscale|fancy|splurge|treat (myself|yourself)|special occasion/i, value: '$$$' },
  { re: /\$\$|mid.?range|moderate|reasonable/i,                                                value: '$$'  },
  { re: /cheap|budget|affordable|under \$\d+|inexpensive|low.?cost|bargain|value/i,            value: '$'   },
];

const GROUP_PATTERNS = [
  { re: /first date|date night|on a date|anniversary|romantic dinner/i, value: 'date'  },
  { re: /with friends|with (the )?(crew|gang|group|team|boys|girls|squad)|group|party of|large group/i, value: 'group' },
  { re: /\bsolo\b|alone|by myself|just me|eating alone|table for one/i, value: 'solo'  },
];

const VIBE_PATTERNS = [
  { re: /\bcozy\b|cosy|snug|warm atmosphere|nestled/i,          value: 'cozy'          },
  { re: /quiet|calm|peaceful|not too loud|not loud|low.?key/i,  value: 'quiet'         },
  { re: /\bromantic\b|candlelit|intimate/i,                     value: 'romantic'      },
  { re: /lively|energetic|buzzing|vibrant|fun crowd/i,          value: 'lively'        },
  { re: /quick|fast|on the go|grab.and.go|takeout|takeaway/i,   value: 'quick'         },
  { re: /outdoor|patio|outside|alfresco|terrace|garden/i,       value: 'outdoor'       },
  { re: /healthy|fresh|clean eating|light meal|nutritious/i,    value: 'healthy'       },
  { re: /comfort|comforting|hearty|soul food|home.?cooked/i,    value: 'comfort food'  },
  { re: /late.?night|open late|after midnight/i,                value: 'late-night'    },
  { re: /hidden gem|local|neighborhood|off the beaten/i,        value: 'local favorite'},
  { re: /casual|laid.?back|no dress code|chill/i,               value: 'casual'        },
  { re: /trendy|hip|instagrammable|aesthetic/i,                 value: 'trendy'        },
];

const MEAL_TIME_PATTERNS = [
  { re: /\bbreakfast\b/i,                     value: 'breakfast'  },
  { re: /\bbrunch\b/i,                         value: 'brunch'     },
  { re: /\blunch\b/i,                          value: 'lunch'      },
  { re: /\bdinner\b/i,                         value: 'dinner'     },
  { re: /late.?night|open late|after midnight/i, value: 'late-night'},
  { re: /\bmorning\b/i,                         value: 'breakfast'  },
];

// Ordered by specificity — longer phrases first to avoid partial matches
const CUISINE_LIST = [
  'comfort food', 'fried chicken', 'dim sum', 'hot pot', 'ice cream',
  'fish and chips', 'banh mi', 'pho', 'pad thai', 'bibimbap',
  'ramen', 'sushi', 'pizza', 'tacos', 'taco', 'burger', 'burgers',
  'sandwich', 'salad', 'pasta', 'steak', 'seafood', 'bbq', 'barbecue',
  'breakfast', 'brunch', 'coffee', 'smoothie', 'dessert', 'boba',
  'noodles', 'dumplings', 'poke', 'wings', 'curry', 'falafel',
  'kebab', 'shawarma', 'crepe', 'waffle', 'pancake', 'gyro', 'udon',
  'soup', 'bowl', 'wrap', 'mexican', 'japanese', 'italian', 'chinese',
  'korean', 'thai', 'indian', 'mediterranean', 'greek', 'french',
  'american', 'vegan', 'vegetarian',
];

// Vibe/group/time → sensible Yelp term when no cuisine is explicit
const INTENT_TO_TERM = {
  cozy:           'cafe',
  quiet:          'restaurant',
  romantic:       'fine dining',
  lively:         'bar food',
  quick:          'fast casual',
  outdoor:        'outdoor dining',
  healthy:        'healthy food',
  'comfort food': 'comfort food',
  'late-night':   'late night food',
  'local favorite': 'local restaurant',
  casual:         'casual dining',
  trendy:         'trendy restaurant',
  date:           'romantic restaurant',
  group:          'restaurant',
  solo:           'cafe',
  breakfast:      'breakfast',
  brunch:         'brunch',
  lunch:          'lunch',
  dinner:         'dinner',
};

// ── Parser ────────────────────────────────────────────────────────────────────

export function parseQuery(raw) {
  if (!raw?.trim()) return null;
  const text = raw.trim();

  // Budget
  let budget = null;
  for (const { re, value } of BUDGET_PATTERNS) {
    if (re.test(text)) { budget = value; break; }
  }

  // Group context
  let group = null;
  for (const { re, value } of GROUP_PATTERNS) {
    if (re.test(text)) { group = value; break; }
  }

  // Vibes (can be multiple)
  const vibes = [];
  for (const { re, value } of VIBE_PATTERNS) {
    if (re.test(text)) vibes.push(value);
  }

  // Cuisine
  const lower = text.toLowerCase();
  let cuisine = null;
  for (const kw of CUISINE_LIST) {
    if (lower.includes(kw)) { cuisine = kw; break; }
  }

  // Meal time
  let mealTime = null;
  for (const { re, value } of MEAL_TIME_PATTERNS) {
    if (re.test(text)) { mealTime = value; break; }
  }

  // Build the best Yelp search term
  const yelpTerm =
    cuisine ||
    (mealTime && INTENT_TO_TERM[mealTime]) ||
    (vibes[0] && INTENT_TO_TERM[vibes[0]]) ||
    (group && INTENT_TO_TERM[group]) ||
    'restaurant';

  return { rawQuery: text, budget, group, vibes, cuisine, mealTime, yelpTerm };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useQueryParser() {
  const parse = useCallback((query) => parseQuery(query), []);
  return { parse };
}
