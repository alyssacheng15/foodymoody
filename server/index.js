// Load .env from server/ regardless of which directory the process is started from
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── CORS ───────────────────────────────────────────────────────────────────────
// Dev: allow any localhost origin (CRA dev server, Storybook, etc.)
// Prod: set CORS_ORIGIN env var to your deployed frontend URL, e.g.
//       CORS_ORIGIN=https://foodymoody.netlify.app
const allowedOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN
  : /^http:\/\/localhost:\d+$/;

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Yelp search proxy ─────────────────────────────────────────────────────────
//
// GET /api/yelp/search
//
// Required query params:
//   term      — food keyword or cuisine (e.g. "ramen", "coffee")
//   location  — city, address, or neighbourhood (e.g. "Santa Clarita, CA")
//
// Optional query params (forwarded to Yelp):
//   sort_by   — best_match | rating | review_count | distance  (default: best_match)
//   radius    — metres, max 40000  (default: none / Yelp default)
//   limit     — max results, 1-50  (default: 20)
//   price     — 1,2,3,4 comma-separated (1=$, 4=$$$$)
//   open_now  — true/false
//   categories — Yelp category alias, comma-separated
//
app.get('/api/yelp/search', async (req, res) => {
  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    console.error('[proxy] YELP_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration: YELP_API_KEY is missing' });
  }

  const {
    term,
    location,
    sort_by    = 'best_match',
    radius,
    limit      = '20',
    // extra params we'll forward if present
    price,
    open_now,
    categories,
    offset,
  } = req.query;

  // ── Validation ───────────────────────────────────────────────────────────────
  if (!term?.trim()) {
    return res.status(400).json({ error: 'Missing required query param: term' });
  }
  if (!location?.trim()) {
    return res.status(400).json({ error: 'Missing required query param: location' });
  }

  // ── Build Yelp request ────────────────────────────────────────────────────────
  const yelpParams = new URLSearchParams({
    term:     term.trim(),
    location: location.trim(),
    sort_by,
    limit:    String(Math.min(Math.max(Number(limit) || 20, 1), 50)),
  });

  if (radius) {
    // Yelp max is 40 000 m (~25 miles)
    yelpParams.set('radius', String(Math.min(Math.round(Number(radius)), 40_000)));
  }

  // Optional Yelp filters — only append if the client sent them
  if (price)      yelpParams.set('price',      price);
  if (open_now)   yelpParams.set('open_now',   open_now);
  if (categories) yelpParams.set('categories', categories);
  if (offset)     yelpParams.set('offset',     offset);

  try {
    const yelpRes = await fetch(
      `https://api.yelp.com/v3/businesses/search?${yelpParams}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept:        'application/json',
        },
      }
    );

    const yelpData = await yelpRes.json();

    if (!yelpRes.ok) {
      console.error('[proxy] Yelp error:', yelpData);
      return res.status(yelpRes.status).json({
        error: yelpData?.error?.description || 'Yelp API returned an error',
        code:  yelpData?.error?.code,
      });
    }

    // ── Shape response — expose only what the frontend needs ──────────────────
    // Keeps the payload lean and avoids leaking raw Yelp schema to the browser.
    const businesses = (yelpData.businesses ?? []).map((b) => ({
      id:           b.id,
      name:         b.name,
      image_url:    b.image_url  ?? null,
      url:          b.url,
      rating:       b.rating,
      review_count: b.review_count,
      price:        b.price      ?? null,
      categories:   b.categories ?? [],
      distance:     b.distance   ?? null,
      location: {
        address1: b.location?.address1 ?? '',
        city:     b.location?.city     ?? '',
        state:    b.location?.state    ?? '',
        zip_code: b.location?.zip_code ?? '',
      },
    }));

    return res.json({
      businesses,
      total: yelpData.total ?? 0,
      count: businesses.length,
    });

  } catch (err) {
    console.error('[proxy] fetch error:', err);
    return res.status(500).json({ error: 'Failed to reach Yelp API', detail: err.message });
  }
});

// ── 404 catch-all for /api/* ──────────────────────────────────────────────────
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  const keyStatus = process.env.YELP_API_KEY ? '✓ loaded' : '✗ MISSING — set YELP_API_KEY in server/.env';
  console.log(`Yelp proxy  →  http://localhost:${PORT}`);
  console.log(`YELP_API_KEY:  ${keyStatus}`);
  console.log(`CORS origin:   ${allowedOrigin}`);
});
