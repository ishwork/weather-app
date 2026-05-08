import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HourlyForecast from "@/components/WeatherView/HourlyForecast";
import * as utils from "@/lib/utils";
import { mockHourly } from "@/test/mock-data/weather";

describe("HourlyForecast", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders hourly forecast chrome in the document", () => {
    vi.spyOn(utils, "getNextLocalHourlySlots").mockReturnValue([0, 1]);
    render(
      <HourlyForecast hourly={mockHourly} unit="c" utcOffsetSeconds={0} />,
    );

    const expectedInDocument = [
      screen.getByTestId("hourly-forecast"),
      screen.getByTestId("hourly-forecast-table"),
      screen.getByText("Today"),
    ];
    for (const element of expectedInDocument) {
      expect(element).toBeInTheDocument();
    }

    expect(utils.getNextLocalHourlySlots).toHaveBeenCalled();
  });
});
