import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Order } from "@/types/order";

function getItemCount(order: Order): number {
  return order.items.reduce((total, item) => total + item.quantity, 0);
}

function getDetailsHref(orderId: string, returnUrl: string) {
  return { pathname: `/orders/${orderId}`, query: { returnTo: returnUrl } };
}

export function OrdersCollection({ orders, returnUrl }: { orders: Order[]; returnUrl: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-card">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] text-left text-sm">
          <caption className="sr-only">Customer orders</caption>
          <thead>
            <tr className="border-b border-border bg-slate-50/70 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="px-5 py-3">Order</th>
              <th scope="col" className="px-5 py-3">Customer</th>
              <th scope="col" className="px-5 py-3">Date</th>
              <th scope="col" className="px-5 py-3">Status</th>
              <th scope="col" className="px-5 py-3 text-center">Items</th>
              <th scope="col" className="px-5 py-3 text-right">Total</th>
              <th scope="col" className="px-5 py-3 text-right"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-slate-50/70">
                <th scope="row" className="px-5 py-4 font-medium">
                  <Link href={getDetailsHref(order.id, returnUrl)} className="text-slate-900 hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">#{order.number}</Link>
                </th>
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-800">{order.customer.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{order.customer.email}</p>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{formatDate(order.createdAt)}</td>
                <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                <td className="px-5 py-4 text-center tabular-nums text-slate-700">{getItemCount(order)}</td>
                <td className="px-5 py-4 text-right font-semibold tabular-nums text-slate-900">{formatCurrency(order.total)}</td>
                <td className="px-5 py-4 text-right">
                  <Link href={getDetailsHref(order.id, returnUrl)} aria-label={`View order ${order.number}`} className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul aria-label="Customer orders" className="divide-y divide-border md:hidden">
        {orders.map((order) => (
          <li key={order.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link href={getDetailsHref(order.id, returnUrl)} className="text-sm font-semibold text-slate-900 hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">#{order.number}</Link>
                <p className="mt-1 text-sm text-slate-700">{order.customer.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{order.customer.email}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
              <div className="text-xs text-muted-foreground">
                <p>{formatDate(order.createdAt)}</p>
                <p className="mt-1">{getItemCount(order)} {getItemCount(order) === 1 ? "item" : "items"}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold tabular-nums text-slate-900">{formatCurrency(order.total)}</p>
                <Link href={getDetailsHref(order.id, returnUrl)} className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">View order <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
