import type { CurrentWeather } from "@/types/weather";
import { formatTemp, getCondition, getIcon } from "@/lib/utils";

import styles from "@/components/WeatherView/WeatherView.module.scss";

type WeatherHeroProps = {
  current: CurrentWeather;
  unit: "c" | "f";
};

const WeatherHero = ({ current, unit }: WeatherHeroProps) => {
  const unitLabel = unit === "c" ? "°C" : "°F";
  const isNight = current.is_day === 0;

  return (
    <div className={styles.hero} data-testid="weather-hero">
      <span className={styles.temp} data-testid="weather-current-temp">
        {formatTemp(current.temperature_2m, unit)}
        {unitLabel}
      </span>
      <div className={styles.heroMeta} data-testid="weather-hero-meta">
        <span
          className={`${styles.icon}${isNight ? ` ${styles.nightIcon}` : ""}`}
          data-testid="weather-condition-icon"
        >
          {getIcon(current.weathercode, current.is_day as 0 | 1)}
        </span>
        <span className={styles.condition} data-testid="weather-condition-text">
          {getCondition(current.weathercode)}
        </span>
        <span className={styles.feelsLike} data-testid="weather-feels-like">
          Feels like {formatTemp(current.apparent_temperature, unit)}
          {unitLabel}
        </span>
      </div>
    </div>
  );
};

export default WeatherHero;
