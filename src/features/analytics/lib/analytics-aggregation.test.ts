import { describe, expect, it } from "vitest";
import { customerAggregates } from "@/features/customers/lib/customer-aggregation";
import { orderFixtures } from "@/features/orders/fixtures/orders";
import { productFixtures } from "@/features/products/fixtures/products";
import { acquisitionChannels, customerSegments } from "@/types/customer";
import { orderStatuses, type Order } from "@/types/order";
import { productCategoryValues } from "@/types/product";
import { aggregateAnalytics, getPercentageChange, isRevenueOrder } from "./analytics-aggregation";

describe("analytics aggregation", () => {
  it("uses the explicit net-sales status rule", () => {
    const orders = orderFixtures.slice(0, 4).map((order, index) => ({ ...order, status: (["delivered", "pending", "cancelled", "refunded"] as const)[index] }));
    expect(orders.map(isRevenueOrder)).toEqual([true, true, false, false]);
    const result = aggregateAnalytics("7d", { orders });
    expect(result.summary.orders.current).toBe(4);
    expect(result.summary.revenue.current).toBe(orders[0].total + orders[1].total);
    expect(result.summary.averageOrderValue.current).toBe(385.35);
    expect((["pending", "processing", "shipped", "delivered", "cancelled", "refunded"] as const).map((status) => isRevenueOrder({ ...orders[0], status }))).toEqual([true, true, true, true, false, false]);
  });

  it("produces the independently verified default KPI comparison", () => {
    const result = aggregateAnalytics("30d");
    expect(result.summary).toEqual({
      revenue: { current: 10912.52, previous: 11028.34, percentageChange: -1.05 },
      orders: { current: 30, previous: 30, percentageChange: 0 },
      averageOrderValue: { current: 419.71, previous: 441.13, percentageChange: -4.86 },
      activeCustomers: { current: 30, previous: 30, percentageChange: 0 },
    });
  });

  it.each([["7d", 7, 2619.29], ["30d", 30, 10912.52], ["90d", 90, 32309.66]] as const)("zero-fills and reconciles the %s daily series", (period, days, revenue) => {
    const result = aggregateAnalytics(period);
    expect(result.revenueSeries).toHaveLength(days);
    expect(result.revenueSeries.reduce((total, point) => total + point.revenue, 0)).toBeCloseTo(revenue, 2);
    expect(result.revenueSeries.map((point) => point.date)).toEqual([...result.revenueSeries.map((point) => point.date)].sort());
  });

  it("ranks the top five real products by item-level merchandise sales", () => {
    const result = aggregateAnalytics("30d");
    expect(result.productPerformance).toHaveLength(5);
    expect(result.productPerformance[0]).toMatchObject({ productId: "prod_jacket", revenue: 2670, unitsSold: 18, orderCount: 9 });
    expect(result.productPerformance.map((product) => product.productId).every((id) => productFixtures.some((product) => product.id === id))).toBe(true);
    expect(result.productPerformance.map((product) => product.revenue)).toEqual([...result.productPerformance.map((product) => product.revenue)].sort((a, b) => b - a));
  });

  it("calculates sorted category merchandise totals directly from eligible order items", () => {
    const result = aggregateAnalytics("30d");
    const expectedMerchandise = orderFixtures
      .filter((order) => order.createdAt >= result.currentRange.start && order.createdAt <= result.currentRange.end && isRevenueOrder(order))
      .flatMap((order) => order.items)
      .reduce((total, item) => total + item.total, 0);
    expect(result.categoryPerformance.reduce((total, category) => total + category.revenue, 0)).toBeCloseTo(expectedMerchandise, 2);
    expect(result.categoryPerformance.map((category) => category.revenue)).toEqual([...result.categoryPerformance.map((category) => category.revenue)].sort((a, b) => b - a));
  });

  it("covers every category, order status, customer segment, and acquisition channel", () => {
    const result = aggregateAnalytics("30d");
    expect(new Set(result.categoryPerformance.map((item) => item.category))).toEqual(new Set(productCategoryValues));
    expect(new Set(result.orderStatusDistribution.map((item) => item.status))).toEqual(new Set(orderStatuses));
    expect(new Set(result.segmentDistribution.map((item) => item.segment))).toEqual(new Set(customerSegments));
    expect(new Set(result.acquisitionPerformance.map((item) => item.channel))).toEqual(new Set(acquisitionChannels));
    expect(result.orderStatusDistribution.reduce((total, item) => total + item.orders, 0)).toBe(30);
    expect(result.segmentDistribution.reduce((total, item) => total + item.customers, 0)).toBe(30);
    expect(result.acquisitionPerformance.reduce((total, item) => total + item.orders, 0)).toBe(30);
    expect(result.acquisitionPerformance.reduce((total, item) => total + item.revenue, 0)).toBeCloseTo(result.summary.revenue.current, 2);
  });

  it("attributes active customers to their official segment and acquisition channel", () => {
    const result = aggregateAnalytics("30d");
    const currentOrders = orderFixtures.filter((order) => order.createdAt >= result.currentRange.start && order.createdAt <= result.currentRange.end);
    const activeIds = new Set(currentOrders.map((order) => order.customer.id));
    for (const segment of result.segmentDistribution) {
      expect(segment.customers).toBe(customerAggregates.filter((customer) => activeIds.has(customer.id) && customer.segment === segment.segment).length);
    }
    for (const channel of result.acquisitionPerformance) {
      const channelIds = new Set(customerAggregates.filter((customer) => customer.acquisitionChannel === channel.channel).map((customer) => customer.id));
      expect(channel.customers).toBe(new Set(currentOrders.filter((order) => channelIds.has(order.customer.id)).map((order) => order.customer.id)).size);
      expect(channel.orders).toBe(currentOrders.filter((order) => channelIds.has(order.customer.id)).length);
    }
  });

  it("maintains order, product, and customer referential integrity", () => {
    const productIds = new Set(productFixtures.map((product) => product.id));
    const customerIds = new Set(customerAggregates.map((customer) => customer.id));
    expect(orderFixtures.every((order) => customerIds.has(order.customer.id) && order.items.every((item) => productIds.has(item.productId)))).toBe(true);
  });

  it("returns no percentage when the prior period has no denominator", () => {
    expect(getPercentageChange(10, 0)).toBeNull();
    expect(aggregateAnalytics("90d").summary.revenue.percentageChange).toBeNull();
  });

  it("fails loudly for an orphan product instead of silently corrupting insight", () => {
    const orphanOrder: Order = { ...orderFixtures[0], items: [{ ...orderFixtures[0].items[0], productId: "missing_product" }] };
    expect(() => aggregateAnalytics("7d", { orders: [orphanOrder] })).toThrow(/missing_product/);
  });
});
