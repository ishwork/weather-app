import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Status from "@/components/Status";

describe("Status", () => {
  it("renders status-card and status-message in the document", () => {
    const message = "Something went wrong.";
    render(<Status message={message} />);

    expect(screen.getByTestId("status-card")).toBeInTheDocument();
    expect(screen.getByTestId("status-message")).toHaveTextContent(message);
  });
});
