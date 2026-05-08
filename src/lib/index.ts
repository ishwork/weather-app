import type { GeoSuggestion } from "@/types/weather";

type Place = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export const fetchGeoSuggestions = async (
  query: string,
  count = 5,
): Promise<GeoSuggestion[]> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=${count}&language=en`;
  const res = await fetch(url);
  const data = await res.json();

  return (data.results ?? []).map((place: Place) => ({
    id: place.id,
    name: place.name,
    country: place.country,
    admin1: place.admin1,
    lat: place.latitude,
    lon: place.longitude,
  }));
};
