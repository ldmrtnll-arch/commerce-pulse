import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavLinks } from "./nav-links";

const usePathname = vi.fn();

vi.mock("next/navigation", () => ({ usePathname: () => usePathname() }));

describe("NavLinks", () => {
  beforeEach(() => usePathname.mockReturnValue("/orders"));

  it("renders the main destinations and identifies the active page", () => {
    render(<NavLinks />);

    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Orders" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Products" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Settings" })).toBeVisible();
  });
});
