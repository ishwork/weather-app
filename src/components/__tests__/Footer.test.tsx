import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders footer note", () => {
    render(<Footer />);
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    expect(screen.getByTestId("footer-note")).toHaveTextContent(
      "Built with Next.js",
    );
  });
});
