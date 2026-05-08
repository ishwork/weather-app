import type {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  WeatherData,
} from "@/types/weather";

export const mockCurrent: CurrentWeather = {
  time: "2025-06-15T12:00",
  interval: 900,
  temperature_2m: 22,
  apparent_temperature: 21,
  relative_humidity_2m: 55,
  wind_speed_10m: 10,
  weathercode: 0,
  is_day: 1,
};

export const mockHourly: HourlyWeather = {
  time: ["2025-06-15T12:00", "2025-06-15T15:00", "2025-06-15T18:00"],
  temperature_2m: [22, 23, 24],
  weathercode: [0, 1, 2],
  precipitation_probability: [0, 10, 20],
  precipitation: [0, 0.1, 0.2],
  wind_speed_10m: [10, 11, 12],
  is_day: [1, 1, 1],
};

export const mockDaily: DailyWeather = {
  time: ["2025-06-15", "2025-06-16"],
  temperature_2m_max: [25, 26],
  temperature_2m_min: [15, 16],
  precipitation_sum: [0.5, 1.2],
  weathercode: [0, 3],
  wind_speed_10m_max: [20, 22],
};

export const mockWeatherData: WeatherData = {
  location: "Test City, TS",
  utcOffsetSeconds: 0,
  current: mockCurrent,
  hourly: mockHourly,
  daily: mockDaily,
};
