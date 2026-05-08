import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DailyForecast from "@/components/WeatherView/DailyForecast";
import { mockDaily } from "@/test/mock-data/weather";

describe("DailyForecast", () => {
  it("renders 7-day title and one row per day", () => {
    render(<DailyForecast daily={mockDaily} unit="c" />);
    expect(screen.getByTestId("daily-forecast")).toBeInTheDocument();
    expect(screen.getByText("7-Day Forecast")).toBeInTheDocument();
    expect(screen.getByTestId("daily-forecast-table")).toBeInTheDocument();
    expect(screen.getByTestId("daily-forecast-row-0")).toBeInTheDocument();
    expect(screen.getByTestId("daily-forecast-row-1")).toBeInTheDocument();
  });
});
