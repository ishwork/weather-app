import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockWeatherData } from "@/test/mock-data/weather";
import { UnitProvider } from "@/contexts/UnitContext";
import useGeolocation from "@/hooks/useGeolocation";
import useWeather from "@/hooks/useWeather";

import WeatherView from "@/components/WeatherView";

vi.mock("@/hooks/useGeolocation", () => ({
  default: vi.fn(),
}));

vi.mock("@/hooks/useWeather", () => ({
  default: vi.fn(),
}));

describe("WeatherView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderView = (city?: string) =>
    render(
      <UnitProvider>
        <WeatherView city={city} />
      </UnitProvider>,
    );

  it("shows requesting location when no city and no coords yet", () => {
    vi.mocked(useGeolocation).mockReturnValue({
      coords: null,
      geoError: null,
    });
    vi.mocked(useWeather).mockReturnValue({
      weatherData: null,
      loading: false,
      error: null,
    });
    renderView();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Requesting your location",
    );
  });

  it("shows loading state for a city search", () => {
    vi.mocked(useGeolocation).mockReturnValue({
      coords: null,
      geoError: null,
    });
    vi.mocked(useWeather).mockReturnValue({
      weatherData: null,
      loading: true,
      error: null,
    });
    renderView("Helsinki");
    expect(
      screen.getByText("Loading weather data for your location ..."),
    ).toBeInTheDocument();
  });

  it("shows fetch error", () => {
    vi.mocked(useGeolocation).mockReturnValue({
      coords: null,
      geoError: null,
    });
    vi.mocked(useWeather).mockReturnValue({
      weatherData: null,
      loading: false,
      error: "City not found",
    });
    renderView("Espoo");
    expect(screen.getByText("City not found")).toBeInTheDocument();
  });

  it("renders weather sections when data loads", () => {
    vi.mocked(useGeolocation).mockReturnValue({
      coords: null,
      geoError: null,
    });
    vi.mocked(useWeather).mockReturnValue({
      weatherData: mockWeatherData,
      loading: false,
      error: null,
    });
    renderView("Helsinki");
    expect(screen.getByTestId("weather-location-name")).toHaveTextContent(
      mockWeatherData.location,
    );
    expect(screen.getByTestId("weather-hero")).toBeInTheDocument();
    expect(screen.getByTestId("weather-details")).toBeInTheDocument();
    expect(screen.getByTestId("hourly-forecast")).toBeInTheDocument();
    expect(screen.getByTestId("daily-forecast")).toBeInTheDocument();
  });
});
