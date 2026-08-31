import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { DateRangeSelect } from "@/features/dashboard/components/date-range-select";
import { MetricCard } from "@/features/dashboard/components/metric-card";
import { RecentOrdersTable } from "@/features/dashboard/components/recent-orders-table";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { TopProducts } from "@/features/dashboard/components/top-products";
import { dashboardMetrics } from "@/mocks/dashboard";

export const metadata: Metadata = { title: "Overview", description: "A 30-day snapshot of Northstar Store sales, orders and product performance." };

export default function OverviewPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Dashboard</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Overview</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Track your store performance and recent activity.</p>
        </div>
        <DateRangeSelect />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,1fr)]">
        <Card className="min-w-0 overflow-hidden p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950">Revenue overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">Daily net sales for the latest fixture-backed 30-day period.</p>
            </div>
            <span className="hidden rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 sm:inline">Last 30 days</span>
          </div>
          <RevenueChart />
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-950">Top products</h2>
            <p className="mt-1 text-sm text-muted-foreground">Ranked by revenue this period.</p>
          </div>
          <TopProducts />
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-950">Recent orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">Latest transactions from your storefront.</p>
        </div>
        <RecentOrdersTable />
      </Card>
    </div>
  );
}
