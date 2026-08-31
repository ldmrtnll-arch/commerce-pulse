import type {
  DashboardMetric,
  RecentOrder,
  RevenuePoint,
  TopProduct,
} from "@/types/dashboard";
import { orderFixtures } from "@/features/orders/fixtures/orders";
import { aggregateAnalytics } from "@/features/analytics/lib/analytics-aggregation";
import { getProductCategoryLabel } from "@/features/products/lib/product-labels";
import { formatCurrency } from "@/lib/formatters";

const analytics = aggregateAnalytics("30d");
const metric = (value: number | null) => ({ change: Math.abs(value ?? 0), trend: value === null || value === 0 ? "neutral" as const : value > 0 ? "up" as const : "down" as const });

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Net sales", value: formatCurrency(analytics.summary.revenue.current), ...metric(analytics.summary.revenue.percentageChange) },
  { label: "Orders", value: analytics.summary.orders.current.toLocaleString("en-US"), ...metric(analytics.summary.orders.percentageChange) },
  { label: "Average order value", value: formatCurrency(analytics.summary.averageOrderValue.current), ...metric(analytics.summary.averageOrderValue.percentageChange) },
  { label: "Conversion rate", value: "3.24%", change: 0.4, trend: "down" },
];

export const revenueData: RevenuePoint[] = analytics.revenueSeries.map((point) => ({ date: point.label, revenue: point.revenue }));

export const recentOrders: RecentOrder[] = orderFixtures.slice(0, 5).map((order) => ({
  id: order.number,
  customer: order.customer.name,
  date: order.createdAt,
  status: order.status,
  total: order.total,
}));

export const topProducts: TopProduct[] = analytics.productPerformance.slice(0, 4)
  .map((product) => ({
    name: product.name,
    category: getProductCategoryLabel(product.category),
    unitsSold: product.unitsSold,
    revenue: product.revenue,
  }));
