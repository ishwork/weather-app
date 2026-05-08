import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { UnitProvider } from "@/contexts/UnitContext";
import UnitToggle from "@/components/UnitToggle";

describe("UnitToggle", () => {
  const renderWithProvider = (ui: ReactElement) =>
    render(<UnitProvider>{ui}</UnitProvider>);

  it("starts with Celsius active", () => {
    renderWithProvider(<UnitToggle />);
    expect(screen.getByTestId("unit-toggle-celsius")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByTestId("unit-toggle-fahrenheit")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("toggles to Fahrenheit when °F is chosen", async () => {
    const user = userEvent.setup();
    renderWithProvider(<UnitToggle />);
    await user.click(screen.getByTestId("unit-toggle-fahrenheit"));
    expect(screen.getByTestId("unit-toggle-fahrenheit")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByTestId("unit-toggle-celsius")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
