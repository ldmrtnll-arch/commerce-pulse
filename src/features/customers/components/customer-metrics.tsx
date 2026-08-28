import { CircleDollarSign, ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import type { CustomerSummary } from "../types";

export function CustomerMetrics({ summary }: { summary: CustomerSummary }) {
  const metrics = [
    { label: "Total customers", value: String(summary.totalCustomers), icon: UsersRound, style: "bg-indigo-50 text-primary" },
    { label: "Loyal customers", value: String(summary.loyalCustomers), icon: ShieldCheck, style: "bg-emerald-50 text-success" },
    { label: "At-risk customers", value: String(summary.atRiskCustomers), icon: UserRoundCheck, style: "bg-amber-50 text-warning" },
    { label: "Average customer value", value: formatCurrency(summary.averageCustomerValue), icon: CircleDollarSign, style: "bg-sky-50 text-sky-700" },
  ];
  return <section aria-label="Customer overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ label, value, icon: Icon, style }) => <div key={label} className="flex items-center gap-3 rounded-card border border-border bg-card p-4"><span className={`flex size-9 items-center justify-center rounded-lg ${style}`}><Icon aria-hidden="true" className="size-[18px]" /></span><div className="min-w-0"><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-0.5 truncate text-xl font-semibold tabular-nums text-slate-950">{value}</p></div></div>)}</section>;
}
