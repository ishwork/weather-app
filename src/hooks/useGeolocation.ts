import { useEffect, useRef, useState } from "react";

export type GeolocationCoords = { lat: number; lon: number };

const useGeolocation = (city?: string) => {
  const [coords, setCoords] = useState<GeolocationCoords | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const geoRequestedRef = useRef(false);

  useEffect(() => {
    if (city) return;
    if (geoRequestedRef.current) return;
    geoRequestedRef.current = true;

    if (!navigator.geolocation) {
      const id = setTimeout(
        () => setGeoError("Geolocation is not supported by your browser."),
        0,
      );
      return () => clearTimeout(id);
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => setGeoError("Location access denied. Search for a city above."),
    );
  }, [city]);

  return { coords, geoError };
};

export default useGeolocation;
