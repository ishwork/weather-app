import { HOURLY_FORECAST_HOURS } from "@/constants";

export const celsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

export const formatTemp = (celsius: number, unit: "c" | "f") =>
  Math.round(unit === "f" ? celsiusToFahrenheit(celsius) : celsius);

/** Open-Meteo `wind_speed_10m` is km/h by default; mph for imperial toggle. */
export const formatWindSpeed = (kmh: number, unit: "c" | "f") =>
  Math.round(unit === "f" ? kmh * 0.621371192237334 : kmh);

/** Open-Meteo precipitation (hourly `precipitation`, daily `precipitation_sum`) is mm by default; inches for imperial toggle. */
export const formatPrecipitation = (mm: number, unit: "c" | "f") =>
  unit === "f" ? `${(mm / 25.4).toFixed(2)} in` : `${mm.toFixed(1)} mm`;

/* 
Weather codes and conditions from Open Meteo
https://open-meteo.com/en/docs#weathervariables
*/

export const WEATHER_CONDITIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Icy fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Light freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  85: "Light snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

export const WEATHER_ICONS: Record<number, string> = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  56: "🌨️",
  57: "🌨️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  66: "🌨️",
  67: "🌨️",
  71: "🌨️",
  73: "❄️",
  75: "❄️",
  77: "🌨️",
  80: "🌦️",
  81: "🌧️",
  82: "⛈️",
  85: "🌨️",
  86: "🌨️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

export const getCondition = (code: number) =>
  WEATHER_CONDITIONS[code] ?? "Unknown";

const NIGHT_ICONS: Record<number, string> = {
  0: "🌙", // clear sky
  1: "🌙", // mainly clear
};

export const getIcon = (code: number, isDay: 0 | 1 = 1) => {
  if (isDay === 0 && code in NIGHT_ICONS) return NIGHT_ICONS[code];
  return WEATHER_ICONS[code] ?? "🌡️";
};

export const getDayLabel = (date: string, index: number) => {
  if (index === 0) return "Today";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

export const formatLocalTime = (utcOffsetSeconds: number) => {
  const localDate = new Date(Date.now() + utcOffsetSeconds * 1000);
  return localDate.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatHour = (isoTime: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(`${isoTime}:00`));

/**
 * Hourly `is_day` from Open-Meteo (`1` daylight / `0` night), aligned with `hourly.time`.
 * @param isDaySeries `hourly.is_day`
 * @param slotIndex index into that array (e.g. from `getNextLocalHourlySlots`)
 * @returns `0 | 1` for `getIcon` / night styling
 */
export const getHourlySlotIsDay = (
  isDaySeries: number[],
  slotIndex: number,
): 0 | 1 => (isDaySeries[slotIndex] ? 1 : 0);

/** `YYYY-MM-DDTHH` for the city's local date and time from API `utc_offset_seconds`. */
const localDateTime = (utcOffsetSeconds: number): string => {
  const approxLocalTime = Date.now() + utcOffsetSeconds * 1000; // approx local time in milliseconds
  const localDate = new Date(approxLocalTime); // UTC getters yield civil Y-M-D-H for the city
  const year = localDate.getUTCFullYear();
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const hour = String(localDate.getUTCHours()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}`;
};

/** Indices into Open-Meteo hourly arrays: `HOURLY_FORECAST_HOURS` rows starting the next local hour (excludes current hour). */
export const getNextLocalHourlySlots = (
  times: string[],
  utcOffsetSeconds: number,
): number[] => {
  const currentLocalDateTime = localDateTime(utcOffsetSeconds);

  const startIdx = times.findIndex(
    (t) => t.slice(0, 13) > currentLocalDateTime,
  );
  if (startIdx === -1) return [];

  const slots: number[] = [];
  for (let k = 0; k < HOURLY_FORECAST_HOURS; k++) {
    const i = startIdx + k;
    if (i < times.length) slots.push(i);
  }
  return slots;
};
