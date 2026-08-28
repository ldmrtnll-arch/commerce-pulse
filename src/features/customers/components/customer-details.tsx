"use client";

import { AlertCircle, ArrowLeft, ArrowUpRight, CalendarDays, Mail, MapPin, Phone, RotateCw, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Customer, CustomerDetail } from "@/types/customer";
import type { Order } from "@/types/order";
import { CustomerNotFoundError } from "../api/customers-api";
import { useCustomer } from "../hooks/use-customers";
import { getCustomerSegmentInsight } from "../lib/customer-aggregation";
import { acquisitionChannelLabels, customerSegmentLabels } from "../lib/customer-labels";
import { CustomerAvatar } from "./customer-avatar";
import { CustomerSegmentBadge } from "./customer-segment-badge";

function CustomerDetailSkeleton() {
  return <div aria-hidden="true" className="space-y-6"><div className="h-32 animate-pulse rounded-card bg-slate-100" /><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-24 animate-pulse rounded-card bg-slate-100" />)}</div><div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"><div className="h-80 animate-pulse rounded-card bg-slate-100" /><div className="h-80 animate-pulse rounded-card bg-slate-100" /></div></div>;
}

function CustomerDetailError({ notFound, returnTo, onRetry }: { notFound: boolean; returnTo: string; onRetry: () => void }) {
  return <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-card px-6 text-center"><span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-destructive"><AlertCircle aria-hidden="true" className="size-5" /></span><h1 className="mt-4 text-xl font-semibold text-slate-950">{notFound ? "Customer not found" : "Unable to load customer"}</h1><p className="mt-2 max-w-sm text-sm text-muted-foreground">{notFound ? "This customer does not exist or may have been removed." : "We couldn't load this customer right now."}</p><div className="mt-5 flex gap-3"><Link href={returnTo} className="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Back to customers</Link>{!notFound && <Button type="button" onClick={onRetry}><RotateCw aria-hidden="true" className="size-4" /> Try again</Button>}</div></div>;
}

function OverviewMetrics({ customer }: { customer: Customer }) {
  const metrics = [
    ["Lifetime value", formatCurrency(customer.lifetimeValue)],
    ["Orders", String(customer.ordersCount)],
    ["Average order value", formatCurrency(customer.averageOrderValue)],
    ["Last order", formatDate(customer.lastOrderAt)],
  ];
  return <section aria-label="Customer value overview" className="grid grid-cols-2 gap-3 xl:grid-cols-4">{metrics.map(([label, value]) => <Card key={label} className="min-w-0 p-4"><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-2 truncate text-lg font-semibold tabular-nums text-slate-950 sm:text-xl">{value}</p></Card>)}</section>;
}

function CustomerInformation({ customer }: { customer: Customer }) {
  return <Card className="p-5 sm:p-6"><div className="flex items-center gap-2"><UserRound aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Customer information</h2></div><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</dt><dd className="mt-1.5 break-all"><a href={`mailto:${customer.email}`} className="inline-flex items-center gap-2 text-primary hover:text-indigo-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Mail aria-hidden="true" className="size-4 shrink-0" />{customer.email}</a></dd></div>{customer.phone && <div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phone</dt><dd className="mt-1.5 flex items-center gap-2 text-slate-800"><Phone aria-hidden="true" className="size-4 text-muted-foreground" />{customer.phone}</dd></div>}<div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Location</dt><dd className="mt-1.5 flex items-start gap-2 text-slate-800"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />{customer.location.city}, {customer.location.state}, {customer.location.country}</dd></div><div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Customer since</dt><dd className="mt-1.5 flex items-center gap-2 text-slate-800"><CalendarDays aria-hidden="true" className="size-4 text-muted-foreground" />{formatDate(customer.joinedAt)}</dd></div><div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Acquisition channel</dt><dd className="mt-1.5 text-slate-800">{acquisitionChannelLabels[customer.acquisitionChannel]}</dd></div></dl></Card>;
}

function SegmentInsight({ customer }: { customer: Customer }) {
  return <Card className="p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><Sparkles aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Customer segment</h2></div><CustomerSegmentBadge segment={customer.segment} /></div><p className="mt-4 text-lg font-semibold text-slate-950">{customerSegmentLabels[customer.segment]}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{getCustomerSegmentInsight(customer)}</p><dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4"><div><dt className="text-xs text-muted-foreground">First order</dt><dd className="mt-1 text-sm font-medium text-slate-800">{formatDate(customer.firstOrderAt)}</dd></div><div><dt className="text-xs text-muted-foreground">Last order</dt><dd className="mt-1 text-sm font-medium text-slate-800">{formatDate(customer.lastOrderAt)}</dd></div></dl></Card>;
}

function getItemCount(order: Order): number {
  return order.items.reduce((total, item) => total + item.quantity, 0);
}

function OrderHistory({ detail, customerReturnUrl }: { detail: CustomerDetail; customerReturnUrl: string }) {
  const orderHref = (orderId: string) => ({ pathname: `/orders/${orderId}`, query: { returnTo: customerReturnUrl } });
  return <Card className="overflow-hidden"><div className="border-b border-border px-5 py-4 sm:px-6"><h2 className="text-base font-semibold text-slate-950">Order history</h2><p className="mt-1 text-sm text-muted-foreground">{detail.orders.length} real orders linked to this customer.</p></div><div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[720px] text-left text-sm"><caption className="sr-only">Order history for {detail.customer.name}</caption><thead><tr className="border-b border-border bg-slate-50/70 text-xs font-medium uppercase tracking-wide text-muted-foreground"><th scope="col" className="px-5 py-3">Order</th><th scope="col" className="px-5 py-3">Date</th><th scope="col" className="px-5 py-3">Status</th><th scope="col" className="px-5 py-3 text-center">Items</th><th scope="col" className="px-5 py-3 text-right">Total</th><th scope="col" className="px-5 py-3"><span className="sr-only">Action</span></th></tr></thead><tbody className="divide-y divide-border">{detail.orders.map((order) => <tr key={order.id} className="hover:bg-slate-50/70"><th scope="row" className="px-5 py-4"><Link href={orderHref(order.id)} className="font-medium text-slate-900 hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">#{order.number}</Link></th><td className="px-5 py-4 text-muted-foreground">{formatDate(order.createdAt)}</td><td className="px-5 py-4"><StatusBadge status={order.status} /></td><td className="px-5 py-4 text-center tabular-nums text-slate-700">{getItemCount(order)}</td><td className="px-5 py-4 text-right font-semibold tabular-nums text-slate-900">{formatCurrency(order.total)}</td><td className="px-5 py-4"><Link href={orderHref(order.id)} aria-label={`View order ${order.number}`} className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowUpRight aria-hidden="true" className="size-4" /></Link></td></tr>)}</tbody></table></div><ul aria-label={`Order history for ${detail.customer.name}`} className="divide-y divide-border md:hidden">{detail.orders.map((order) => <li key={order.id} className="p-4"><div className="flex items-center justify-between gap-3"><Link href={orderHref(order.id)} className="text-sm font-semibold text-slate-900 hover:text-primary">#{order.number}</Link><StatusBadge status={order.status} /></div><div className="mt-3 flex items-end justify-between border-t border-border pt-3"><div className="text-xs text-muted-foreground"><p>{formatDate(order.createdAt)}</p><p className="mt-1">{getItemCount(order)} {getItemCount(order) === 1 ? "item" : "items"}</p></div><div className="text-right"><p className="text-base font-semibold tabular-nums text-slate-900">{formatCurrency(order.total)}</p><Link href={orderHref(order.id)} className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary">View order <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link></div></div></li>)}</ul></Card>;
}

function CustomerContent({ detail, returnTo }: { detail: CustomerDetail; returnTo: string }) {
  const customer = detail.customer;
  const detailUrl = `/customers/${customer.id}?returnTo=${encodeURIComponent(returnTo)}`;
  return <div className="space-y-6"><Link href={returnTo} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-slate-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft aria-hidden="true" className="size-4" /> Back to customers</Link><header className="flex flex-col gap-5 rounded-card border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex min-w-0 items-center gap-4"><CustomerAvatar name={customer.name} customerId={customer.id} large /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-semibold tracking-tight text-slate-950">{customer.name}</h1><CustomerSegmentBadge segment={customer.segment} /></div><p className="mt-1.5 break-all text-sm text-muted-foreground">{customer.email}</p></div></div><div className="sm:text-right"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Customer since</p><p className="mt-1 text-sm font-medium text-slate-800">{formatDate(customer.joinedAt)}</p></div></header><OverviewMetrics customer={customer} /><div className="grid gap-6 xl:grid-cols-[minmax(300px,0.75fr)_minmax(0,1.25fr)]"><CustomerInformation customer={customer} /><SegmentInsight customer={customer} /></div><OrderHistory detail={detail} customerReturnUrl={detailUrl} /></div>;
}

export function CustomerDetails({ customerId, returnTo }: { customerId: string; returnTo: string }) {
  const query = useCustomer(customerId);
  if (query.isPending) return <CustomerDetailSkeleton />;
  if (query.isError) return <CustomerDetailError notFound={query.error instanceof CustomerNotFoundError} returnTo={returnTo} onRetry={() => void query.refetch()} />;
  return <CustomerContent detail={query.data} returnTo={returnTo} />;
}
