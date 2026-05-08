import { useEffect, useState } from "react";

import type { WeatherData, WeatherParams } from "@/types/weather";

type UseWeatherResult = {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
};

const useWeather = (params: WeatherParams | null): UseWeatherResult => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const city = params && "city" in params ? params.city : undefined;
  const lat = params && "lat" in params ? params.lat : undefined;
  const lon = params && "lon" in params ? params.lon : undefined;

  useEffect(() => {
    if (!city && lat === undefined) return;

    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchParams = new URLSearchParams();
        if (city) {
          searchParams.set("city", city);
        } else if (lat !== undefined && lon !== undefined) {
          searchParams.set("lat", String(lat));
          searchParams.set("lon", String(lon));
        }

        const res = await fetch(`/api/weather?${searchParams.toString()}`, {
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Failed to fetch weather.");
        } else {
          setWeatherData(data as WeatherData);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Failed to fetch weather.");
        }
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [city, lat, lon]);

  return { weatherData, loading, error };
};

export default useWeather;
