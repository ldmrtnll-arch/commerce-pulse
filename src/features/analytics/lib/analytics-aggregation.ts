import { customerAggregates } from "@/features/customers/lib/customer-aggregation";
import { orderFixtures } from "@/features/orders/fixtures/orders";
import { getProductCategoryLabel } from "@/features/products/lib/product-labels";
import { productFixtures } from "@/features/products/fixtures/products";
import { acquisitionChannels, customerSegments, type Customer } from "@/types/customer";
import { orderStatuses, type Order } from "@/types/order";
import { productCategoryValues, type Product } from "@/types/product";
import type { AcquisitionPerformance, AnalyticsDateRange, AnalyticsPeriod, AnalyticsResponse, AnalyticsSummary, CategoryPerformance, MetricComparison, OrderStatusDistribution, ProductPerformance, RevenuePoint, SegmentDistribution } from "@/types/analytics";
import { getAnalyticsRanges, isDateInRange } from "./analytics-period";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function isRevenueOrder(order: Order): boolean {
  return order.status !== "cancelled" && order.status !== "refunded";
}

function round(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getPercentageChange(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return round(((current - previous) / previous) * 100);
}

function comparison(current: number, previous: number): MetricComparison {
  return { current: round(current), previous: round(previous), percentageChange: getPercentageChange(current, previous) };
}

function filterOrders(orders: Order[], range: AnalyticsDateRange): Order[] {
  return orders.filter((order) => isDateInRange(order.createdAt, range));
}

function calculatePeriodMetrics(orders: Order[]) {
  const revenueOrders = orders.filter(isRevenueOrder);
  const revenue = round(revenueOrders.reduce((total, order) => total + order.total, 0));
  return {
    revenue,
    orders: orders.length,
    averageOrderValue: revenueOrders.length ? round(revenue / revenueOrders.length) : 0,
    activeCustomers: new Set(orders.map((order) => order.customer.id)).size,
  };
}

function buildSummary(currentOrders: Order[], previousOrders: Order[]): AnalyticsSummary {
  const current = calculatePeriodMetrics(currentOrders);
  const previous = calculatePeriodMetrics(previousOrders);
  return {
    revenue: comparison(current.revenue, previous.revenue),
    orders: comparison(current.orders, previous.orders),
    averageOrderValue: comparison(current.averageOrderValue, previous.averageOrderValue),
    activeCustomers: comparison(current.activeCustomers, previous.activeCustomers),
  };
}

function buildRevenueSeries(orders: Order[], range: AnalyticsDateRange): RevenuePoint[] {
  const ordersByDate = new Map<string, Order[]>();
  for (const order of orders) {
    const key = order.createdAt.slice(0, 10);
    ordersByDate.set(key, [...(ordersByDate.get(key) ?? []), order]);
  }
  const points: RevenuePoint[] = [];
  const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  for (let time = new Date(range.start).getTime(); time <= new Date(range.end).getTime(); time += DAY_IN_MS) {
    const date = new Date(time);
    const key = date.toISOString().slice(0, 10);
    const dayOrders = ordersByDate.get(key) ?? [];
    points.push({
      date: key,
      label: dateFormatter.format(date),
      revenue: round(dayOrders.filter(isRevenueOrder).reduce((total, order) => total + order.total, 0)),
      orders: dayOrders.length,
    });
  }
  return points;
}

function buildProductInsights(orders: Order[], products: Product[]): { categories: CategoryPerformance[]; products: ProductPerformance[] } {
  const productById = new Map(products.map((product) => [product.id, product]));
  const categoryMap = new Map(productCategoryValues.map((category) => [category, { revenue: 0, unitsSold: 0 }]));
  const productMap = new Map<string, { product: Product; revenue: number; unitsSold: number; orderIds: Set<string> }>();
  for (const order of orders.filter(isRevenueOrder)) {
    for (const item of order.items) {
      const product = productById.get(item.productId);
      if (!product) throw new Error(`Analytics could not resolve product ${item.productId}.`);
      const category = categoryMap.get(product.category)!;
      category.revenue += item.total;
      category.unitsSold += item.quantity;
      const performance = productMap.get(product.id) ?? { product, revenue: 0, unitsSold: 0, orderIds: new Set<string>() };
      performance.revenue += item.total;
      performance.unitsSold += item.quantity;
      performance.orderIds.add(order.id);
      productMap.set(product.id, performance);
    }
  }
  const categories = [...categoryMap.entries()].map(([category, values]) => ({ category, label: getProductCategoryLabel(category), revenue: round(values.revenue), unitsSold: values.unitsSold })).sort((left, right) => right.revenue - left.revenue);
  const productPerformance = [...productMap.values()].map(({ product, revenue, unitsSold, orderIds }) => ({ productId: product.id, name: product.name, category: product.category, revenue: round(revenue), unitsSold, orderCount: orderIds.size })).sort((left, right) => right.revenue - left.revenue || right.unitsSold - left.unitsSold).slice(0, 5);
  return { categories, products: productPerformance };
}

function buildSegmentDistribution(orders: Order[], customers: Customer[]): SegmentDistribution[] {
  const activeIds = new Set(orders.map((order) => order.customer.id));
  const activeCustomers = customers.filter((customer) => activeIds.has(customer.id));
  return customerSegments.map((segment) => {
    const count = activeCustomers.filter((customer) => customer.segment === segment).length;
    return { segment, customers: count, percentage: activeCustomers.length ? round((count / activeCustomers.length) * 100) : 0 };
  });
}

function buildAcquisitionPerformance(orders: Order[], customers: Customer[]): AcquisitionPerformance[] {
  const customerById = new Map(customers.map((customer) => [customer.id, customer]));
  const groups = new Map(acquisitionChannels.map((channel) => [channel, { customerIds: new Set<string>(), orders: 0, revenueOrders: 0, revenue: 0 }]));
  for (const order of orders) {
    const customer = customerById.get(order.customer.id);
    if (!customer) throw new Error(`Analytics could not resolve customer ${order.customer.id}.`);
    const group = groups.get(customer.acquisitionChannel)!;
    group.customerIds.add(customer.id);
    group.orders += 1;
    if (isRevenueOrder(order)) { group.revenueOrders += 1; group.revenue += order.total; }
  }
  return [...groups.entries()].map(([channel, values]) => ({ channel, customers: values.customerIds.size, orders: values.orders, revenue: round(values.revenue), averageOrderValue: values.revenueOrders ? round(values.revenue / values.revenueOrders) : 0 })).sort((left, right) => right.revenue - left.revenue);
}

function buildOrderStatusDistribution(orders: Order[]): OrderStatusDistribution[] {
  return orderStatuses.map((status) => {
    const count = orders.filter((order) => order.status === status).length;
    return { status, orders: count, percentage: orders.length ? round((count / orders.length) * 100) : 0 };
  });
}

export function aggregateAnalytics(period: AnalyticsPeriod, sources: { orders?: Order[]; products?: Product[]; customers?: Customer[] } = {}): AnalyticsResponse {
  const orders = sources.orders ?? orderFixtures;
  const products = sources.products ?? productFixtures;
  const customers = sources.customers ?? customerAggregates;
  const ranges = getAnalyticsRanges(period);
  const currentOrders = filterOrders(orders, ranges.current);
  const previousOrders = filterOrders(orders, ranges.previous);
  const productInsights = buildProductInsights(currentOrders, products);
  return {
    period,
    currentRange: ranges.current,
    previousRange: ranges.previous,
    summary: buildSummary(currentOrders, previousOrders),
    revenueSeries: buildRevenueSeries(currentOrders, ranges.current),
    categoryPerformance: productInsights.categories,
    productPerformance: productInsights.products,
    segmentDistribution: buildSegmentDistribution(currentOrders, customers),
    acquisitionPerformance: buildAcquisitionPerformance(currentOrders, customers),
    orderStatusDistribution: buildOrderStatusDistribution(currentOrders),
    hasData: currentOrders.length > 0,
  };
}
