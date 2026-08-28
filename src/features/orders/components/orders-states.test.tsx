import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OrdersEmptyState, OrdersErrorState } from "./orders-states";

describe("orders states", () => {
  it("offers to clear active filters from the empty state", async () => {
    const onClear = vi.fn();
    render(<OrdersEmptyState hasFilters onClear={onClear} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("retries a failed request", async () => {
    const onRetry = vi.fn();
    render(<OrdersErrorState onRetry={onRetry} />);
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
