import type { AnalyticsPeriod } from "@/types/analytics";

export const analyticsPeriodLabels: Record<AnalyticsPeriod, string> = { "7d": "Last 7 days", "30d": "Last 30 days", "90d": "Last 90 days" };

export function AnalyticsPeriodSelect({ period, onChange }: { period: AnalyticsPeriod; onChange: (period: AnalyticsPeriod) => void }) {
  return <label className="block w-full sm:w-48"><span className="mb-1.5 block text-xs font-medium text-slate-700">Analysis period</span><select value={period} onChange={(event) => onChange(event.target.value as AnalyticsPeriod)} className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option><option value="90d">Last 90 days</option></select></label>;
}
