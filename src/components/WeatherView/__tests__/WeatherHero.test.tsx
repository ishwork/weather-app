import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WeatherHero from "@/components/WeatherView/WeatherHero";
import { mockCurrent } from "@/test/mock-data/weather";

describe("WeatherHero", () => {
  it("renders temperature and condition for Celsius", () => {
    render(<WeatherHero current={mockCurrent} unit="c" />);
    expect(screen.getByTestId("weather-hero")).toBeInTheDocument();
    expect(screen.getByTestId("weather-current-temp")).toHaveTextContent(
      "22°C",
    );
    expect(screen.getByTestId("weather-condition-text")).toHaveTextContent(
      "Clear sky",
    );
    expect(screen.getByTestId("weather-feels-like")).toHaveTextContent(
      "Feels like 21°C",
    );
  });

  it("renders Fahrenheit when unit is f", () => {
    render(<WeatherHero current={mockCurrent} unit="f" />);
    expect(screen.getByTestId("weather-current-temp")).toHaveTextContent("°F");
    expect(screen.getByTestId("weather-feels-like")).toHaveTextContent("°F");
  });
});
