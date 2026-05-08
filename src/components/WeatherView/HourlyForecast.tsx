import type { HourlyWeather } from "@/types/weather";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import {
  formatHour,
  formatPrecipitation,
  formatTemp,
  getIcon,
  getNextLocalHourlySlots,
  getHourlySlotIsDay,
} from "@/lib/utils";
import styles from "@/components/WeatherView/WeatherView.module.scss";

type HourlyForecastProps = {
  hourly: HourlyWeather;
  unit: "c" | "f";
  utcOffsetSeconds: number;
};

const HourlyForecast = ({
  hourly,
  unit,
  utcOffsetSeconds,
}: HourlyForecastProps) => {
  const slots = getNextLocalHourlySlots(hourly.time, utcOffsetSeconds);
  const tableContainerRef = useHorizontalScroll();

  return (
    <div className={styles.section} data-testid="hourly-forecast">
      <p className={styles.sectionTitle}>Today</p>
      <div ref={tableContainerRef} className={styles.hourlyTableScroll}>
        <table
          className={styles.hourlyTable}
          data-testid="hourly-forecast-table"
        >
          <thead>
            <tr>
              {slots.map((slotIndex) => (
                <th
                  key={hourly.time[slotIndex]}
                  scope="col"
                  className={styles.hourlyTime}
                >
                  {formatHour(hourly.time[slotIndex])}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {slots.map((slotIndex) => {
                const isDay = getHourlySlotIsDay(hourly.is_day, slotIndex);
                return (
                  <td
                    key={hourly.time[slotIndex]}
                    className={`${styles.hourlyIcon}${isDay === 0 ? ` ${styles.nightIcon}` : ""}`}
                  >
                    {getIcon(hourly.weathercode[slotIndex], isDay)}
                  </td>
                );
              })}
            </tr>
            <tr>
              {slots.map((slotIndex) => (
                <td key={hourly.time[slotIndex]} className={styles.hourlyTemp}>
                  {formatTemp(hourly.temperature_2m[slotIndex], unit)}°
                </td>
              ))}
            </tr>
            <tr>
              {slots.map((slotIndex) => (
                <td
                  key={hourly.time[slotIndex]}
                  className={styles.hourlyPrecip}
                >
                  {formatPrecipitation(hourly.precipitation[slotIndex], unit)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HourlyForecast;
