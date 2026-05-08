import type { ComponentPropsWithoutRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Header from "@/components/Header";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/SearchBar", () => ({
  default: () => <div data-testid="search-bar-mock">SearchBar</div>,
}));

vi.mock("@/components/UnitToggle", () => ({
  default: () => <div data-testid="unit-toggle-mock">UnitToggle</div>,
}));

describe("Header", () => {
  it("renders title link and children", () => {
    render(<Header />);
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    const link = screen.getByTestId("site-title-link");
    expect(link).toHaveTextContent("CheckWeather");
    expect(link).toHaveAttribute("href", "/");
    expect(screen.getByTestId("search-bar-mock")).toBeInTheDocument();
    expect(screen.getByTestId("unit-toggle-mock")).toBeInTheDocument();
  });
});
