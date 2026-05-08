import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WeatherDetails from "@/components/WeatherView/WeatherDetails";
import { mockCurrent, mockDaily } from "@/test/mock-data/weather";

describe("WeatherDetails", () => {
  it("renders humidity, wind, high/low, and precipitation", () => {
    render(<WeatherDetails current={mockCurrent} daily={mockDaily} unit="c" />);
    expect(screen.getByTestId("weather-details")).toBeInTheDocument();
    expect(
      screen.getByTestId("weather-detail-humidity-value"),
    ).toHaveTextContent("55%");
    expect(screen.getByTestId("weather-detail-wind-value")).toHaveTextContent(
      "10 km/h",
    );
    expect(
      screen.getByTestId("weather-detail-precipitation-value"),
    ).toHaveTextContent("0.5 mm");
  });
});
