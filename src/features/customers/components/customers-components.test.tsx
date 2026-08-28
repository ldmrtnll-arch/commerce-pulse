import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CustomerSegmentBadge } from "./customer-segment-badge";
import { CustomersEmptyState, CustomersErrorState } from "./customers-states";

describe("customer presentation", () => {
  it("renders accessible labels for every customer segment", () => {
    const { rerender } = render(<CustomerSegmentBadge segment="new" />);
    expect(screen.getByText("New")).toBeInTheDocument();
    rerender(<CustomerSegmentBadge segment="returning" />);
    expect(screen.getByText("Returning")).toBeInTheDocument();
    rerender(<CustomerSegmentBadge segment="loyal" />);
    expect(screen.getByText("Loyal")).toBeInTheDocument();
    rerender(<CustomerSegmentBadge segment="at_risk" />);
    expect(screen.getByText("At risk")).toBeInTheDocument();
  });

  it("clears filters from the empty state", async () => {
    const onClear = vi.fn();
    render(<CustomersEmptyState onClear={onClear} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("retries a failed customer request", async () => {
    const onRetry = vi.fn();
    render(<CustomersErrorState onRetry={onRetry} />);
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
