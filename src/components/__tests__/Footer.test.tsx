import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders Open-Meteo attribution", () => {
    render(<Footer />);
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(screen.getByTestId("footer-note")).toHaveTextContent(
      "(open-meteo.com)",
    );
    expect(screen.getByTestId("footer-link")).toHaveAttribute(
      "href",
      "https://open-meteo.com/",
    );
  });
});
