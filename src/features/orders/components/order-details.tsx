"use client";

import { AlertCircle, ArrowLeft, CreditCard, MapPin, RotateCw, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { OrderNotFoundError } from "../api/orders-api";
import { useOrder } from "../hooks/use-orders";
import type { Order } from "@/types/order";

function DetailSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-6">
      <div className="h-28 animate-pulse rounded-card bg-slate-100" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]">
        <div className="h-96 animate-pulse rounded-card bg-slate-100" />
        <div className="h-96 animate-pulse rounded-card bg-slate-100" />
      </div>
    </div>
  );
}

function DetailError({ notFound, onRetry, returnTo }: { notFound: boolean; onRetry: () => void; returnTo: string }) {
  const backLabel = returnTo.startsWith("/customers/") ? "Back to customer" : "Back to orders";
  return (
    <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-card px-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-destructive"><AlertCircle aria-hidden="true" className="size-5" /></span>
      <h1 className="mt-4 text-xl font-semibold text-slate-950">{notFound ? "Order not found" : "Unable to load order"}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{notFound ? "This order does not exist or may have been removed." : "We couldn't load this order right now."}</p>
      <div className="mt-5 flex gap-3">
        <Link href={returnTo} className="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{backLabel}</Link>
        {!notFound && <Button type="button" onClick={onRetry}><RotateCw aria-hidden="true" className="size-4" /> Try again</Button>}
      </div>
    </div>
  );
}

function PaymentSummary({ order }: { order: Order }) {
  const rows = [
    ["Subtotal", order.subtotal], ["Shipping", order.shipping], ["Tax", order.tax], ["Discount", -order.discount],
  ] as const;
  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-base font-semibold text-slate-950">Payment summary</h2>
      <dl className="mt-5 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className={`font-medium tabular-nums ${value < 0 ? "text-success" : "text-slate-800"}`}>{value < 0 ? `−${formatCurrency(Math.abs(value))}` : formatCurrency(value)}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <dt className="font-semibold text-slate-950">Total</dt>
          <dd className="text-lg font-semibold tabular-nums text-slate-950">{formatCurrency(order.total)}</dd>
        </div>
      </dl>
    </Card>
  );
}

function ContactDetails({ order }: { order: Order }) {
  const address = order.shippingAddress;
  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-2"><UserRound aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Customer</h2></div>
        <p className="mt-4 text-sm font-medium text-slate-900">{order.customer.name}</p>
        <a href={`mailto:${order.customer.email}`} className="mt-1 inline-block text-sm text-primary hover:text-indigo-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{order.customer.email}</a>
      </Card>
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-2"><MapPin aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Shipping address</h2></div>
        <address className="mt-4 text-sm not-italic leading-6 text-slate-700">
          <span className="font-medium text-slate-900">{address.recipient}</span><br />
          {address.line1}<br />
          {address.line2 && <>{address.line2}<br /></>}
          {address.city}, {address.state} {address.postalCode}<br />
          {address.country}
        </address>
      </Card>
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-2"><CreditCard aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Payment</h2></div>
        <p className="mt-4 text-sm text-slate-700">{order.paymentMethod}</p>
      </Card>
    </div>
  );
}

function OrderContent({ order, returnTo }: { order: Order; returnTo: string }) {
  const backLabel = returnTo.startsWith("/customers/") ? "Back to customer" : "Back to orders";
  return (
    <div className="space-y-6">
      <Link href={returnTo} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-slate-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ArrowLeft aria-hidden="true" className="size-4" /> {backLabel}
      </Link>
      <header className="flex flex-col gap-4 rounded-card border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl font-semibold tracking-tight text-slate-950">Order #{order.number}</h1><StatusBadge status={order.status} /></div>
          <p className="mt-2 text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="sm:text-right"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Order total</p><p className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">{formatCurrency(order.total)}</p></div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="p-5 sm:p-6"><h2 className="text-base font-semibold text-slate-950">Order summary</h2><p className="mt-1 text-sm text-muted-foreground">{order.items.length} product {order.items.length === 1 ? "line" : "lines"} in this order.</p></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <caption className="sr-only">Products in order {order.number}</caption>
                <thead><tr className="border-y border-border bg-slate-50/70 text-xs uppercase tracking-wide text-muted-foreground"><th scope="col" className="px-5 py-3">Product</th><th scope="col" className="px-5 py-3 text-center">Quantity</th><th scope="col" className="px-5 py-3 text-right">Unit price</th><th scope="col" className="px-5 py-3 text-right">Total</th></tr></thead>
                <tbody className="divide-y divide-border">{order.items.map((item) => <tr key={item.id}><th scope="row" className="px-5 py-4"><p className="font-medium text-slate-900">{item.productName}</p><p className="mt-0.5 text-xs font-normal text-muted-foreground">SKU {item.sku}</p></th><td className="px-5 py-4 text-center tabular-nums text-slate-700">{item.quantity}</td><td className="px-5 py-4 text-right tabular-nums text-slate-700">{formatCurrency(item.unitPrice)}</td><td className="px-5 py-4 text-right font-medium tabular-nums text-slate-900">{formatCurrency(item.total)}</td></tr>)}</tbody>
              </table>
            </div>
          </Card>
          <PaymentSummary order={order} />
        </div>
        <ContactDetails order={order} />
      </div>
    </div>
  );
}

export function OrderDetails({ orderId, returnTo }: { orderId: string; returnTo: string }) {
  const orderQuery = useOrder(orderId);
  if (orderQuery.isPending) return <DetailSkeleton />;
  if (orderQuery.isError) return <DetailError notFound={orderQuery.error instanceof OrderNotFoundError} onRetry={() => void orderQuery.refetch()} returnTo={returnTo} />;
  return <OrderContent order={orderQuery.data} returnTo={returnTo} />;
}
