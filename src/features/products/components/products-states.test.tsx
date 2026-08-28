import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductsEmptyState, ProductsErrorState } from "./products-states";

describe("product async states", () => {
  it("clears filters from the empty state", async () => {
    const onClear = vi.fn();
    render(<ProductsEmptyState onClear={onClear} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("retries a failed request", async () => {
    const onRetry = vi.fn();
    render(<ProductsErrorState onRetry={onRetry} />);
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
