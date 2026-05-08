import type { CurrentWeather, DailyWeather } from "@/types/weather";
import { formatPrecipitation, formatTemp, formatWindSpeed } from "@/lib/utils";

import styles from "@/components/WeatherView/WeatherView.module.scss";

type WeatherDetailsProps = {
  current: CurrentWeather;
  daily: DailyWeather;
  unit: "c" | "f";
};

const WeatherDetails = ({ current, daily, unit }: WeatherDetailsProps) => {
  const unitLabel = unit === "c" ? "°C" : "°F";

  return (
    <div className={styles.details} data-testid="weather-details">
      <div className={styles.detail} data-testid="weather-detail-humidity">
        <span className={styles.detailLabel}>Humidity</span>
        <span data-testid="weather-detail-humidity-value">
          {current.relative_humidity_2m}%
        </span>
      </div>
      <div className={styles.detail} data-testid="weather-detail-wind">
        <span className={styles.detailLabel}>Wind</span>
        <span data-testid="weather-detail-wind-value">
          {formatWindSpeed(current.wind_speed_10m, unit)}{" "}
          {unit === "c" ? "km/h" : "mph"}
        </span>
      </div>
      <div className={styles.detail} data-testid="weather-detail-high-low">
        <span className={styles.detailLabel}>High / Low</span>
        <span data-testid="weather-detail-high-low-value">
          {formatTemp(daily.temperature_2m_max[0], unit)}
          {unitLabel} / {formatTemp(daily.temperature_2m_min[0], unit)}
          {unitLabel}
        </span>
      </div>
      <div className={styles.detail} data-testid="weather-detail-precipitation">
        <span className={styles.detailLabel}>Precipitation</span>
        <span data-testid="weather-detail-precipitation-value">
          {formatPrecipitation(daily.precipitation_sum[0], unit)}
        </span>
      </div>
    </div>
  );
};

export default WeatherDetails;
