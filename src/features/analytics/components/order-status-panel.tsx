import { StatusBadge } from "@/components/ui/status-badge";
import type { OrderStatusDistribution } from "@/types/analytics";

export function OrderStatusPanel({ data }: { data: OrderStatusDistribution[] }) {
  const maximum = Math.max(...data.map((item) => item.orders), 1);
  return <div className="space-y-3">{data.map((item) => <div key={item.status} className="grid grid-cols-[7rem_minmax(0,1fr)_2.25rem] items-center gap-3"><StatusBadge status={item.status} /><div className="h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true"><div className="h-full rounded-full bg-slate-400" style={{ width: `${(item.orders / maximum) * 100}%` }} /></div><span className="text-right text-sm font-semibold tabular-nums text-slate-800" aria-label={`${item.orders} orders`}>{item.orders}</span></div>)}</div>;
}
