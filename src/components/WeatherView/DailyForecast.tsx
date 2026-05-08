import type { DailyWeather } from "@/types/weather";
import { formatTemp, getDayLabel, getIcon } from "@/lib/utils";
import styles from "@/components/WeatherView/WeatherView.module.scss";

type DailyForecastProps = {
  daily: DailyWeather;
  unit: "c" | "f";
};

const DailyForecast = ({ daily, unit }: DailyForecastProps) => (
  <div className={styles.section} data-testid="daily-forecast">
    <p className={styles.sectionTitle}>7-Day Forecast</p>
    <table className={styles.forecastTable} data-testid="daily-forecast-table">
      <thead className={styles.forecastHead}>
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Conditions</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
        </tr>
      </thead>
      <tbody>
        {daily.time.map((date, i) => (
          <tr
            key={date}
            className={i === 0 ? styles.forecastToday : undefined}
            data-testid={`daily-forecast-row-${i}`}
          >
            <td className={styles.forecastLabel}>{getDayLabel(date, i)}</td>
            <td className={styles.forecastIcon}>
              {getIcon(daily.weathercode[i])}
            </td>
            <td className={styles.forecastHigh}>
              {formatTemp(daily.temperature_2m_max[i], unit)}°
            </td>
            <td className={styles.forecastLow}>
              {formatTemp(daily.temperature_2m_min[i], unit)}°
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DailyForecast;
