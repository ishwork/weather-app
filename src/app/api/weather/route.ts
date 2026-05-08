import { NextRequest, NextResponse } from "next/server";

import {
  CURRENT_FIELDS,
  DAILY_FIELDS,
  HOURLY_FIELDS,
  HOURLY_FORECAST_HOURS,
} from "@/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  let latitude: number;
  let longitude: number;
  let locationName: string;

  try {
    if (lat && lon) {
      latitude = Number(lat);
      longitude = Number(lon);

      const reverseRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        { headers: { "User-Agent": "weather-app/1.0" } },
      );
      const reverseData = await reverseRes.json();
      const addr = reverseData.address ?? {};
      const cityPart =
        addr.city ?? addr.town ?? addr.village ?? addr.county ?? "Unknown";
      const countryPart = addr.country ?? "";
      locationName = countryPart ? `${cityPart}, ${countryPart}` : cityPart;
    } else if (city) {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.trim())}`,
      );
      const geoData = await geoRes.json();

      if (!geoData.results?.length) {
        return NextResponse.json({ error: "City not found" }, { status: 404 });
      }

      const place = geoData.results[0];
      latitude = place.latitude;
      longitude = place.longitude;
      locationName = `${place.name}, ${place.country}`;
    } else {
      return NextResponse.json(
        { error: "Provide either lat/lon or city" },
        { status: 400 },
      );
    }

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("current", CURRENT_FIELDS);
    url.searchParams.set("hourly", HOURLY_FIELDS);
    url.searchParams.set("daily", DAILY_FIELDS);
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "7");
    url.searchParams.set("forecast_hours", String(HOURLY_FORECAST_HOURS));

    const weatherRes = await fetch(url.toString());
    const weatherData = await weatherRes.json();

    return NextResponse.json({
      location: locationName,
      utcOffsetSeconds: weatherData.utc_offset_seconds as number,
      current: weatherData.current,
      hourly: weatherData.hourly,
      daily: weatherData.daily,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
