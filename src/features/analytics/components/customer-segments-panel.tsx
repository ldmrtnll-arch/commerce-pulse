import { customerSegmentLabels } from "@/features/customers/lib/customer-labels";
import type { SegmentDistribution } from "@/types/analytics";

const segmentStyles = { new: "bg-blue-500", returning: "bg-indigo-500", loyal: "bg-emerald-500", at_risk: "bg-amber-500" } as const;

export function CustomerSegmentsPanel({ data }: { data: SegmentDistribution[] }) {
  return <div className="space-y-4">{data.map((item) => <div key={item.segment}><div className="mb-1.5 flex items-center justify-between gap-3 text-sm"><span className="font-medium text-slate-800">{customerSegmentLabels[item.segment]}</span><span className="tabular-nums text-muted-foreground">{item.customers} · {item.percentage.toFixed(1)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={`${customerSegmentLabels[item.segment]} customers`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.percentage}><div className={`h-full rounded-full ${segmentStyles[item.segment]}`} style={{ width: `${item.percentage}%` }} /></div></div>)}</div>;
}
