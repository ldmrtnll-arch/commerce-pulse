import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BudgetProgress } from "./budget-progress";
import { CampaignStatusBadge } from "./campaign-badges";
import { CampaignsEmptyState, CampaignsErrorState } from "./campaign-states";
import { formatRoas } from "../lib/campaign-labels";

describe("campaign components", () => {
  it("renders all status labels textually", () => {
    const { rerender } = render(<CampaignStatusBadge status="active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
    rerender(<CampaignStatusBadge status="paused" />);
    expect(screen.getByText("Paused")).toBeInTheDocument();
  });

  it("exposes budget progress with monetary bounds", () => {
    render(<BudgetProgress spend={600} budget={1000} />);
    const progress = screen.getByRole("progressbar", { name: /\$600\.00 spent of \$1,000\.00/ });
    expect(progress).toHaveAttribute("aria-valuenow", "600");
    expect(progress).toHaveAttribute("aria-valuemax", "1000");
  });

  it("formats ROAS as a multiple and handles zero-spend campaigns", () => {
    expect(formatRoas(3.2)).toBe("3.20×");
    expect(formatRoas(null)).toBe("—");
  });

  it("retries errors and clears empty filters", async () => {
    const retry = vi.fn();
    const clear = vi.fn();
    const { rerender } = render(<CampaignsErrorState onRetry={retry} />);
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
    rerender(<CampaignsEmptyState onClear={clear} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(clear).toHaveBeenCalledOnce();
  });
});
