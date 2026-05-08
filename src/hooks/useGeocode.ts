import { useEffect, useState } from "react";

import type { GeoSuggestion } from "@/types/weather";

import useDebounce from "@/hooks/useDebounce";

const useGeocode = (query: string) => {
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query.trim(), 500);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      const id = setTimeout(() => {
        setSuggestions([]);
        setLoading(false);
      }, 0);
      return () => clearTimeout(id);
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/geocode?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setSuggestions(json.results ?? []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
    return () => controller.abort();
  }, [debouncedQuery]);

  return { suggestions, loading };
};

export default useGeocode;
