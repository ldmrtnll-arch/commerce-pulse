import type { AcquisitionChannel, CustomerSegment } from "./customer";
import type { OrderStatus } from "./order";
import type { ProductCategory } from "./product";

export const analyticsPeriods = ["7d", "30d", "90d"] as const;
export type AnalyticsPeriod = (typeof analyticsPeriods)[number];

export interface AnalyticsDateRange {
  start: string;
  end: string;
  label: string;
}

export interface MetricComparison {
  current: number;
  previous: number;
  percentageChange: number | null;
}

export interface AnalyticsSummary {
  revenue: MetricComparison;
  orders: MetricComparison;
  averageOrderValue: MetricComparison;
  activeCustomers: MetricComparison;
}

export interface RevenuePoint {
  date: string;
  label: string;
  revenue: number;
  orders: number;
}

export interface CategoryPerformance {
  category: ProductCategory;
  label: string;
  revenue: number;
  unitsSold: number;
}

export interface ProductPerformance {
  productId: string;
  name: string;
  category: ProductCategory;
  unitsSold: number;
  revenue: number;
  orderCount: number;
}

export interface SegmentDistribution {
  segment: CustomerSegment;
  customers: number;
  percentage: number;
}

export interface AcquisitionPerformance {
  channel: AcquisitionChannel;
  customers: number;
  orders: number;
  revenue: number;
  averageOrderValue: number;
}

export interface OrderStatusDistribution {
  status: OrderStatus;
  orders: number;
  percentage: number;
}

export interface AnalyticsResponse {
  period: AnalyticsPeriod;
  currentRange: AnalyticsDateRange;
  previousRange: AnalyticsDateRange;
  summary: AnalyticsSummary;
  revenueSeries: RevenuePoint[];
  categoryPerformance: CategoryPerformance[];
  productPerformance: ProductPerformance[];
  segmentDistribution: SegmentDistribution[];
  acquisitionPerformance: AcquisitionPerformance[];
  orderStatusDistribution: OrderStatusDistribution[];
  hasData: boolean;
}
