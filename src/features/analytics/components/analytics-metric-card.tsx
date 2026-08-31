import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { MetricComparison } from "@/types/analytics";
import { Card } from "@/components/ui/card";
import { formatMetricChange } from "../lib/analytics-formatters";

export function AnalyticsMetricCard({ label, value, comparison, rangeLabel }: { label: string; value: string; comparison: MetricComparison; rangeLabel: string }) {
  const change = comparison.percentageChange;
  const TrendIcon = change === null || change === 0 ? Minus : change > 0 ? ArrowUpRight : ArrowDownRight;
  const tone = change === null || change === 0 ? "text-muted-foreground" : change > 0 ? "text-success" : "text-destructive";
  return <Card className="min-w-0 p-5"><p className="text-sm font-medium text-muted-foreground">{label}</p><p className="mt-1 truncate text-[11px] text-muted-foreground">{rangeLabel}</p><p className="mt-2 truncate text-2xl font-semibold tracking-tight tabular-nums text-slate-950">{value}</p><div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs"><span className={`inline-flex items-center font-semibold ${tone}`}><TrendIcon aria-hidden="true" className="mr-0.5 size-3.5" />{formatMetricChange(change)}</span><span className="text-muted-foreground">vs previous period</span></div></Card>;
}
