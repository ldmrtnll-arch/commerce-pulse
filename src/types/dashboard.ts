export type MetricTrend = "up" | "down";

export interface DashboardMetric {
  label: string;
  value: string;
  change: number;
  trend: MetricTrend;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
}

import type { OrderStatus } from "./order";

export interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  status: OrderStatus;
  total: number;
}

export interface TopProduct {
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
}
