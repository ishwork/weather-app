export const HOURLY_FORECAST_HOURS = 12;

export const CURRENT_FIELDS = [
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "wind_speed_10m",
  "weathercode",
  "is_day",
].join(",");

export const HOURLY_FIELDS = [
  "temperature_2m",
  "weathercode",
  "precipitation_probability",
  "precipitation",
  "wind_speed_10m",
  "is_day",
].join(",");

export const DAILY_FIELDS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_sum",
  "weathercode",
  "wind_speed_10m_max",
].join(",");
