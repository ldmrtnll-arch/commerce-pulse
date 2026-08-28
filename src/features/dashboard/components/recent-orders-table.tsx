import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { recentOrders } from "@/mocks/dashboard";

export function RecentOrdersTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-y border-border bg-slate-50/70 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th scope="col" className="px-5 py-3">Order</th>
            <th scope="col" className="px-5 py-3">Customer</th>
            <th scope="col" className="px-5 py-3">Date</th>
            <th scope="col" className="px-5 py-3">Status</th>
            <th scope="col" className="px-5 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {recentOrders.map((order) => (
            <tr key={order.id} className="transition-colors hover:bg-slate-50/70">
              <th scope="row" className="px-5 py-4 font-medium text-slate-900">#{order.id}</th>
              <td className="px-5 py-4 text-slate-700">{order.customer}</td>
              <td className="px-5 py-4 text-muted-foreground">{formatDate(order.date)}</td>
              <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
              <td className="px-5 py-4 text-right font-medium tabular-nums text-slate-900">{formatCurrency(order.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-border px-5 py-3">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-indigo-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          View all orders <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
