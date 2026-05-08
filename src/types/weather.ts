export type CurrentWeather = {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weathercode: number;
  is_day: number;
};

export type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weathercode: number[];
  wind_speed_10m_max: number[];
};

export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
  precipitation_probability: number[];
  precipitation: number[];
  wind_speed_10m: number[];
  is_day: number[];
};

export type WeatherData = {
  location: string;
  utcOffsetSeconds: number;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
};

export type WeatherParams = { city: string } | { lat: number; lon: number };

export type GeoSuggestion = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  lat: number;
  lon: number;
};
