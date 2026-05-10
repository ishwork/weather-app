"use client";

import type { WeatherParams } from "@/types/weather";
import { useUnit } from "@/contexts/UnitContext";
import useGeolocation from "@/hooks/useGeolocation";
import useWeather from "@/hooks/useWeather";
import styles from "@/components/WeatherView/WeatherView.module.scss";

import DailyForecast from "@/components/WeatherView/DailyForecast";
import HourlyForecast from "@/components/WeatherView/HourlyForecast";
import Loading from "@/components/Loading";
import LocationHeader from "@/components/WeatherView/LocationHeader";
import Status from "@/components/Status";
import WeatherDetails from "@/components/WeatherView/WeatherDetails";
import WeatherHero from "@/components/WeatherView/WeatherHero";

const WeatherView = ({ city }: { city?: string }) => {
  const { unit } = useUnit();
  const { coords, geoError } = useGeolocation(city);

  const params: WeatherParams | null = city ? { city } : coords;
  const { weatherData, loading, error } = useWeather(params);

  if (!city && !coords && !geoError)
    return <Loading message="Requesting your location ..." />;
  if (!city && geoError) return <Status message={geoError} />;
  if (loading)
    return <Loading message="Loading weather data for your location ..." />;
  if (error) return <Status message={error} />;

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
