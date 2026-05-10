import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Loading from "@/components/Loading";

describe("Loading", () => {
  it("renders loading-card, loading-spinner, and loading-message in the document", () => {
    const message = "Loading ...";
    render(<Loading message={message} />);

    expect(screen.getByTestId("loading-card")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByTestId("loading-message")).toBeInTheDocument();
    expect(screen.getByTestId("loading-message")).toHaveTextContent(message);
  });
});
