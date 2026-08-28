import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DashboardMetric } from "@/types/dashboard";

export function MetricCard({ label, value, change, trend }: DashboardMetric) {
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-5">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 tabular-nums">{value}</p>
      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <span className={`inline-flex items-center font-semibold ${isPositive ? "text-success" : "text-destructive"}`}>
          <TrendIcon aria-hidden="true" className="mr-0.5 size-3.5" />
          {isPositive ? "+" : "-"}{change}%
        </span>
        <span className="text-muted-foreground">vs. previous period</span>
      </div>
    </Card>
  );
}
