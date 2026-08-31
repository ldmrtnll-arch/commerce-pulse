import { formatCurrency } from "@/lib/formatters";

export function BudgetProgress({ spend, budget, compact = false }: { spend: number; budget: number; compact?: boolean }) {
  const percentage = budget ? Math.min(100, Math.max(0, (spend / budget) * 100)) : 0;
  return <div className={compact ? "w-40" : "w-full"}><div className="flex items-center justify-between gap-3 text-xs"><span className="font-medium tabular-nums text-slate-800">{formatCurrency(spend)}</span><span className="text-muted-foreground">of {formatCurrency(budget)}</span></div><div role="progressbar" aria-label={`Campaign budget: ${formatCurrency(spend)} spent of ${formatCurrency(budget)}`} aria-valuemin={0} aria-valuemax={budget} aria-valuenow={spend} className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${percentage}%` }} /></div></div>;
}
