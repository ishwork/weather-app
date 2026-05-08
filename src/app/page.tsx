import type { Metadata } from "next";

import WeatherView from "@/components/WeatherView";

type SearchParams = Promise<{ city?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { city } = await searchParams;
  const label = city?.trim();

  if (label) {
    return {
      title: `${label} — Weather`,
      description: `Current conditions and forecast for ${label}.`,
    };
  }

  return {
    title: "Weather",
    description:
      "Current conditions and forecasts for your location or any city.",
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
  };
}

/**
 * @param searchParams - The search parameters passed to the page.
 * @returns The WeatherView component, which displays the weather for the current location or a given city.
 */

const Home = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { city } = await searchParams;

  return <WeatherView city={city} />;
};

export default Home;
