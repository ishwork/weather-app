import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as utils from "@/lib/utils";
import LocationHeader from "@/components/WeatherView/LocationHeader";

describe("LocationHeader", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows location name and formatted local time", () => {
    vi.spyOn(utils, "formatLocalTime").mockReturnValue("15.00");
    render(
      <LocationHeader location="Helsinki, Finland" utcOffsetSeconds={3600} />,
    );
    expect(screen.getByTestId("weather-location-header")).toBeInTheDocument();
    expect(screen.getByTestId("weather-location-name")).toHaveTextContent(
      "Helsinki, Finland",
    );
    expect(screen.getByTestId("weather-local-time")).toHaveTextContent("15.00");
    expect(utils.formatLocalTime).toHaveBeenCalledWith(3600);
  });
});
