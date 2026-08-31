import { Activity, BadgeDollarSign, Megaphone, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { CampaignSummary } from "../types";
import { formatRoas } from "../lib/campaign-labels";

export function CampaignSummaryCards({ summary }: { summary: CampaignSummary }) {
  const metrics = [
    { label: "Active campaigns", value: String(summary.activeCampaigns), icon: Activity },
    { label: "Total spend", value: formatCurrency(summary.totalSpend), icon: BadgeDollarSign },
    { label: "Attributed revenue", value: formatCurrency(summary.attributedRevenue), icon: TrendingUp },
    { label: "Average ROAS", value: formatRoas(summary.averageRoas), icon: Megaphone },
  ];
  return <section aria-label="Campaign portfolio summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ label, value, icon: Icon }) => <Card key={label} className="flex min-w-0 items-center gap-3 p-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-primary"><Icon aria-hidden="true" className="size-4" /></span><div className="min-w-0"><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-1 truncate text-xl font-semibold tabular-nums text-slate-950">{value}</p></div></Card>)}</section>;
}

export function CampaignSummarySkeleton() { return <div aria-hidden="true" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Card key={index} className="h-[78px] animate-pulse bg-slate-100" />)}</div>; }
