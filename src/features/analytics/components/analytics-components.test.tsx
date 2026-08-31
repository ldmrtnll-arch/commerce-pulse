import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AnalyticsMetricCard } from "./analytics-metric-card";
import { AnalyticsPeriodSelect } from "./analytics-period-select";
import { AnalyticsErrorState } from "./analytics-states";
import { AcquisitionPerformancePanel } from "./acquisition-performance-panel";
import { RevenueOverTimeChart } from "./revenue-over-time-chart";

describe("analytics presentation", () => {
  it("renders negative and unavailable KPI comparisons accessibly", () => {
    const { rerender } = render(<AnalyticsMetricCard label="Net sales" value="$10,912.52" rangeLabel="Jul 30 – Aug 28, 2026" comparison={{ current: 10912.52, previous: 11028.34, percentageChange: -1.05 }} />);
    expect(screen.getByText("−1.1%")).toBeInTheDocument();
    rerender(<AnalyticsMetricCard label="Net sales" value="$32,309.66" rangeLabel="May 31 – Aug 28, 2026" comparison={{ current: 32309.66, previous: 0, percentageChange: null }} />);
    expect(screen.getByText("No previous data")).toBeInTheDocument();
  });

  it("changes the selected analysis period", async () => {
    const onChange = vi.fn();
    render(<AnalyticsPeriodSelect period="30d" onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText("Analysis period"), "7d");
    expect(onChange).toHaveBeenCalledWith("7d");
  });

  it("offers a retry action after an analytics error", async () => {
    const onRetry = vi.fn();
    render(<AnalyticsErrorState onRetry={onRetry} />);
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("uses a semantic acquisition table on larger layouts", () => {
    render(<AcquisitionPerformancePanel data={[{ channel: "direct", customers: 3, orders: 4, revenue: 500, averageOrderValue: 125 }]} />);
    expect(screen.getByRole("table", { name: "Performance by customer acquisition channel" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Direct" })).toBeInTheDocument();
    expect(screen.getAllByText("$500.00")).toHaveLength(2);
  });

  it("renders a textual empty state instead of chart internals", () => {
    render(<RevenueOverTimeChart data={[]} totalRevenue={0} orders={0} />);
    expect(screen.getByText("No revenue points available.")).toBeInTheDocument();
  });
});
