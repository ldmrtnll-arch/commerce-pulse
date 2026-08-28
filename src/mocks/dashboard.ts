import type {
  DashboardMetric,
  RecentOrder,
  RevenuePoint,
  TopProduct,
} from "@/types/dashboard";

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Total revenue", value: "$128,430.52", change: 12.5, trend: "up" },
  { label: "Orders", value: "1,482", change: 8.2, trend: "up" },
  { label: "Average order value", value: "$86.66", change: 2.1, trend: "up" },
  { label: "Conversion rate", value: "3.24%", change: 0.4, trend: "down" },
];

export const revenueData: RevenuePoint[] = [
  { date: "Aug 1", revenue: 3200 }, { date: "Aug 2", revenue: 3900 },
  { date: "Aug 3", revenue: 3500 }, { date: "Aug 4", revenue: 4400 },
  { date: "Aug 5", revenue: 4100 }, { date: "Aug 6", revenue: 4900 },
  { date: "Aug 7", revenue: 4600 }, { date: "Aug 8", revenue: 5200 },
  { date: "Aug 9", revenue: 4800 }, { date: "Aug 10", revenue: 5700 },
  { date: "Aug 11", revenue: 5300 }, { date: "Aug 12", revenue: 6100 },
  { date: "Aug 13", revenue: 5800 }, { date: "Aug 14", revenue: 6400 },
  { date: "Aug 15", revenue: 5900 }, { date: "Aug 16", revenue: 6800 },
  { date: "Aug 17", revenue: 6300 }, { date: "Aug 18", revenue: 7100 },
  { date: "Aug 19", revenue: 6900 }, { date: "Aug 20", revenue: 7500 },
  { date: "Aug 21", revenue: 7200 }, { date: "Aug 22", revenue: 7900 },
  { date: "Aug 23", revenue: 7600 }, { date: "Aug 24", revenue: 8300 },
  { date: "Aug 25", revenue: 8100 }, { date: "Aug 26", revenue: 8700 },
  { date: "Aug 27", revenue: 8400 }, { date: "Aug 28", revenue: 9200 },
  { date: "Aug 29", revenue: 8900 }, { date: "Aug 30", revenue: 9600 },
];

export const recentOrders: RecentOrder[] = [
  { id: "ORD-1048", customer: "Olivia Martin", date: "2026-08-27", status: "Delivered", total: 184.5 },
  { id: "ORD-1047", customer: "Ethan Williams", date: "2026-08-27", status: "Processing", total: 96.2 },
  { id: "ORD-1046", customer: "Sophia Brown", date: "2026-08-26", status: "Shipped", total: 248.75 },
  { id: "ORD-1045", customer: "Noah Davis", date: "2026-08-26", status: "Pending", total: 72.4 },
  { id: "ORD-1044", customer: "Mia Anderson", date: "2026-08-25", status: "Refunded", total: 129.9 },
];

export const topProducts: TopProduct[] = [
  { name: "Everyday Carry Backpack", category: "Accessories", unitsSold: 284, revenue: 21300 },
  { name: "Merino Crew Sweater", category: "Apparel", unitsSold: 219, revenue: 17520 },
  { name: "Studio Wireless Headphones", category: "Electronics", unitsSold: 142, revenue: 16918 },
  { name: "Insulated Travel Bottle", category: "Home & Living", unitsSold: 306, revenue: 10710 },
];
