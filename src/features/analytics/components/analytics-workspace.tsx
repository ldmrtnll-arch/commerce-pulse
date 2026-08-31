"use client";

import { RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { useAnalytics } from "../hooks/use-analytics";
import { useAnalyticsUrlState } from "../hooks/use-analytics-url-state";
import { AcquisitionPerformancePanel } from "./acquisition-performance-panel";
import { AnalyticsMetricCard } from "./analytics-metric-card";
import { AnalyticsPeriodSelect } from "./analytics-period-select";
import { AnalyticsEmptyState, AnalyticsErrorState, AnalyticsSkeleton } from "./analytics-states";
import { CategoryPerformanceChart } from "./category-performance-chart";
import { CustomerSegmentsPanel } from "./customer-segments-panel";
import { OrderStatusPanel } from "./order-status-panel";
import { RevenueOverTimeChart } from "./revenue-over-time-chart";
import { TopProductsPanel } from "./top-products-panel";

function PanelHeader({ title, description }: { title: string; description: string }) {
  return <div className="mb-5"><h2 className="text-base font-semibold text-slate-950">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>;
}

export function AnalyticsWorkspace() {
  const { params, setPeriod, returnUrl } = useAnalyticsUrlState();
  const query = useAnalytics(params);
  return <div className="space-y-6 sm:space-y-8"><header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Business insights</p><h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Analytics</h1><p className="mt-1.5 text-sm text-muted-foreground">Explore revenue, customer and product performance through Aug 28, 2026.</p></div><AnalyticsPeriodSelect period={params.period} onChange={setPeriod} /></header>{query.isPending ? <AnalyticsSkeleton /> : query.isError ? <AnalyticsErrorState onRetry={() => void query.refetch()} /> : !query.data.hasData ? <AnalyticsEmptyState /> : <div className={`space-y-6 ${query.isFetching ? "opacity-70 transition-opacity" : "transition-opacity"}`}><div className="flex h-4 justify-end">{query.isFetching && <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><RefreshCw aria-hidden="true" className="size-3 animate-spin" /> Updating</span>}</div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><AnalyticsMetricCard label="Net sales" value={formatCurrency(query.data.summary.revenue.current)} comparison={query.data.summary.revenue} rangeLabel={query.data.currentRange.label} /><AnalyticsMetricCard label="Orders created" value={query.data.summary.orders.current.toLocaleString("en-US")} comparison={query.data.summary.orders} rangeLabel={query.data.currentRange.label} /><AnalyticsMetricCard label="Average order value" value={formatCurrency(query.data.summary.averageOrderValue.current)} comparison={query.data.summary.averageOrderValue} rangeLabel={query.data.currentRange.label} /><AnalyticsMetricCard label="Active customers" value={query.data.summary.activeCustomers.current.toLocaleString("en-US")} comparison={query.data.summary.activeCustomers} rangeLabel={query.data.currentRange.label} /></div><Card className="min-w-0 overflow-hidden p-5 sm:p-6"><PanelHeader title="Revenue over time" description="Daily net sales; cancelled and refunded orders are excluded." /><RevenueOverTimeChart data={query.data.revenueSeries} totalRevenue={query.data.summary.revenue.current} orders={query.data.summary.orders.current} /></Card><div className="grid gap-6 xl:grid-cols-2"><Card className="min-w-0 overflow-hidden p-5 sm:p-6"><PanelHeader title="Category performance" description="Product sales before order-level adjustments." /><CategoryPerformanceChart data={query.data.categoryPerformance} /></Card><Card className="p-5 sm:p-6"><PanelHeader title="Order status" description="All orders created in the selected period." /><OrderStatusPanel data={query.data.orderStatusDistribution} /></Card></div><div className="grid gap-6 xl:grid-cols-2"><Card className="p-5 sm:p-6"><PanelHeader title="Top products" description="Ranked by product sales in the selected period." /><TopProductsPanel products={query.data.productPerformance} returnUrl={returnUrl} /></Card><Card className="p-5 sm:p-6"><PanelHeader title="Active customer segments" description="Current segment of customers who ordered in this period." /><CustomerSegmentsPanel data={query.data.segmentDistribution} /></Card></div><Card className="overflow-hidden p-5 sm:p-6"><PanelHeader title="Acquisition performance" description="Net sales and orders grouped by each customer&apos;s acquisition channel." /><AcquisitionPerformancePanel data={query.data.acquisitionPerformance} /></Card></div>}</div>;
}
