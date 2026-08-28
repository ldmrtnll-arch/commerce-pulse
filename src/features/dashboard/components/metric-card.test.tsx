import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard } from "./metric-card";

describe("MetricCard", () => {
  it("renders the metric value and its comparison context", () => {
    render(<MetricCard label="Total revenue" value="$128,430.52" change={12.5} trend="up" />);

    expect(screen.getByText("Total revenue")).toBeInTheDocument();
    expect(screen.getByText("$128,430.52")).toBeInTheDocument();
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
    expect(screen.getByText("vs. previous period")).toBeInTheDocument();
  });

  it("renders a declining trend with a negative sign", () => {
    render(<MetricCard label="Conversion rate" value="3.24%" change={0.4} trend="down" />);

    expect(screen.getByText("-0.4%")).toBeInTheDocument();
  });
});
