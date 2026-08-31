import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard } from "./metric-card";

describe("MetricCard", () => {
  it("renders the metric value and its comparison context", () => {
    render(<MetricCard label="Net sales" value="$10,912.52" change={1.05} trend="down" />);

    expect(screen.getByText("Net sales")).toBeInTheDocument();
    expect(screen.getByText("$10,912.52")).toBeInTheDocument();
    expect(screen.getByText("-1.05%")).toBeInTheDocument();
    expect(screen.getByText("vs. previous period")).toBeInTheDocument();
  });

  it("renders a declining trend with a negative sign", () => {
    render(<MetricCard label="Conversion rate" value="3.24%" change={0.4} trend="down" />);

    expect(screen.getByText("-0.4%")).toBeInTheDocument();
  });

  it("renders an explicit neutral comparison", () => {
    render(<MetricCard label="Orders" value="30" change={0} trend="neutral" />);
    expect(screen.getByText("No change")).toBeInTheDocument();
  });
});
