import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import SearchIcon from "@/components/SearchIcon";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    ...rest
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => (
    // Plain <img> is intentional: jsdom has no Next image optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} width={width} height={height} {...rest} />
  ),
}));

describe("SearchIcon", () => {
  it("renders search icon image", () => {
    const { container } = render(<SearchIcon />);
    const img = container.querySelector("img");
    expect(img).toBeTruthy();
    expect(img).toHaveAttribute("src", "/icons/search-icon.svg");
  });
});
