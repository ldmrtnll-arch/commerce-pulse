import { AlertTriangle, CircleOff, PackageCheck, Tags } from "lucide-react";
import type { ProductInventorySummary } from "../types";

const metrics = [
  { key: "totalProducts", label: "Total products", icon: Tags, style: "bg-indigo-50 text-primary" },
  { key: "activeProducts", label: "Active", icon: PackageCheck, style: "bg-emerald-50 text-success" },
  { key: "lowStock", label: "Low stock", icon: AlertTriangle, style: "bg-amber-50 text-warning" },
  { key: "outOfStock", label: "Out of stock", icon: CircleOff, style: "bg-red-50 text-destructive" },
] as const;

export function InventoryMetrics({ summary }: { summary: ProductInventorySummary }) {
  return <section aria-label="Inventory overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ key, label, icon: Icon, style }) => <div key={key} className="flex items-center gap-3 rounded-card border border-border bg-card p-4"><span className={`flex size-9 items-center justify-center rounded-lg ${style}`}><Icon aria-hidden="true" className="size-[18px]" /></span><div><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-0.5 text-xl font-semibold tabular-nums text-slate-950">{summary[key]}</p></div></div>)}</section>;
}
