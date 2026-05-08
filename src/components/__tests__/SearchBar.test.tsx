import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SearchBar from "@/components/SearchBar";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("@/hooks/useGeocode", () => ({
  default: () => ({ suggestions: [], loading: false }),
}));

vi.mock("@/components/SearchIcon", () => ({
  default: () => <span data-testid="search-icon-mock" />,
}));

describe("SearchBar", () => {
  it("renders search chrome with submit disabled when empty", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("city-search-input")).toBeInTheDocument();
    expect(screen.getByTestId("city-search-submit")).toBeDisabled();
  });

  it("enables submit after typing a city name", async () => {
    render(<SearchBar />);
    await userEvent.type(screen.getByTestId("city-search-input"), "Helsinki");
    expect(screen.getByTestId("city-search-submit")).not.toBeDisabled();
  });
});
