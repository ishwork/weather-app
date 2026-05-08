"use client";

import type { WeatherParams } from "@/types/weather";
import { useUnit } from "@/contexts/UnitContext";
import useGeolocation from "@/hooks/useGeolocation";
import useWeather from "@/hooks/useWeather";
import styles from "@/components/WeatherView/WeatherView.module.scss";

import DailyForecast from "@/components/WeatherView/DailyForecast";
import HourlyForecast from "@/components/WeatherView/HourlyForecast";
import LocationHeader from "@/components/WeatherView/LocationHeader";
import WeatherDetails from "@/components/WeatherView/WeatherDetails";
import WeatherHero from "@/components/WeatherView/WeatherHero";

const WeatherView = ({ city }: { city?: string }) => {
  const { unit } = useUnit();
  const { coords, geoError } = useGeolocation(city);

  const params: WeatherParams | null = city ? { city } : coords;
  const { weatherData, loading, error } = useWeather(params);

  if (!city && !coords && !geoError) {
    return (
      <div className={styles.statusPanel}>
        <p>Requesting your location…</p>
      </div>
    );
  }

  if (!city && geoError) {
    return (
      <div className={styles.statusPanel}>
        <p>{geoError}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.statusPanel}>
        <p>Loading weather…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.statusPanel}>
        <p>{error}</p>
      </div>
    );
  }

  if (!weatherData) return null;

  const { current, hourly, daily, location, utcOffsetSeconds } = weatherData;

  return (
    <div className={styles.card}>
      <LocationHeader location={location} utcOffsetSeconds={utcOffsetSeconds} />
      <WeatherHero current={current} unit={unit} />
      <WeatherDetails current={current} daily={daily} unit={unit} />
      <HourlyForecast
        hourly={hourly}
        unit={unit}
        utcOffsetSeconds={utcOffsetSeconds}
      />
      <DailyForecast daily={daily} unit={unit} />
    </div>
  );
};

export default WeatherView;
