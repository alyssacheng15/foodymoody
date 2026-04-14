import { useState, useCallback } from 'react';
import Yelp from '../util/api';

export function useYelpSearch() {
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(
    async (term, location = 'Santa Clarita, CA', sortBy = 'best_match', radius = 8047) => {
      if (!term) return;
      setIsLoading(true);
      setHasSearched(false);
      setError(null);
      try {
        const results = await Yelp.searchYelp(term, location, sortBy, radius);
        setBusinesses(results || []);
      } catch (err) {
        console.error('Yelp search error:', err);
        setError(err.message);
        setBusinesses([]);
      } finally {
        setIsLoading(false);
        setHasSearched(true);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setBusinesses([]);
    setHasSearched(false);
    setError(null);
  }, []);

  return { businesses, isLoading, hasSearched, error, search, reset };
}
