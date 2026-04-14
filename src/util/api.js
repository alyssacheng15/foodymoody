/**
 * Yelp search client.
 *
 * All requests go through /api/yelp/search — the Express proxy in server/index.js.
 * The proxy attaches the API key server-side, so the key never appears in the browser.
 *
 * During local development CRA's built-in proxy (see "proxy" in package.json)
 * forwards /api/* to http://localhost:3001 automatically.
 *
 * Usage:
 *   fetch("/api/yelp/search?term=ramen&location=sf")
 */

const Yelp = {
  async searchYelp(term, location = 'Santa Clarita, CA', sortBy = 'best_match', radius = 8047) {
    const params = new URLSearchParams({
      term,
      location,
      sort_by: sortBy,
      radius: String(Math.min(Math.round(radius), 40_000)),
      limit: '20',
    });

    const response = await fetch(`/api/yelp/search?${params}`);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Search failed (HTTP ${response.status})`);
    }

    const data = await response.json();

    return (data.businesses ?? []).map((b) => ({
      id:          b.id,
      imageSrc:    b.image_url,
      name:        b.name,
      address:     b.location.address1,
      city:        b.location.city,
      state:       b.location.state,
      zipCode:     b.location.zip_code,
      category:    b.categories[0]?.title || 'Restaurant',
      rating:      b.rating,
      reviewCount: b.review_count,
      price:       b.price,
      url:         b.url,
      distance:    b.distance,
    }));
  },
};

export default Yelp;
