import { describe, expect, it } from "vitest";
import { orderFixtures } from "@/features/orders/fixtures/orders";
import { customerProfiles } from "../fixtures/customer-profiles";
import { aggregateCustomers, customerAggregates, getCustomerSegment } from "./customer-aggregation";

describe("customer aggregation", () => {
  it("derives exactly one coherent customer for every Order customer identity", () => {
    const orderCustomerIds = new Set(orderFixtures.map((order) => order.customer.id));
    expect(customerAggregates).toHaveLength(30);
    expect(new Set(customerAggregates.map((customer) => customer.id))).toEqual(orderCustomerIds);
    for (const customer of customerAggregates) {
      const orders = orderFixtures.filter((order) => order.customer.id === customer.id);
      expect(orders.every((order) => order.customer.name === customer.name && order.customer.email === customer.email)).toBe(true);
    }
  });

  it("calculates Olivia Martin's metrics from her real orders", () => {
    const customer = customerAggregates.find((candidate) => candidate.id === "customer_001");
    expect(customer).toMatchObject({
      name: "Olivia Martin",
      email: "olivia.martin@example.com",
      ordersCount: 3,
      lifetimeValue: 232.18,
      averageOrderValue: 77.39,
      firstOrderAt: "2026-06-29T14:30:00.000Z",
      lastOrderAt: "2026-08-28T14:30:00.000Z",
    });
  });

  it("matches every aggregate metric to the underlying orders", () => {
    for (const customer of customerAggregates) {
      const orders = orderFixtures.filter((order) => order.customer.id === customer.id);
      const sortedDates = orders.map((order) => order.createdAt).sort();
      const lifetimeValue = Math.round((orders.reduce((total, order) => total + order.total, 0) + Number.EPSILON) * 100) / 100;
      expect(customer.ordersCount).toBe(orders.length);
      expect(customer.lifetimeValue).toBe(lifetimeValue);
      expect(customer.averageOrderValue).toBe(Math.round((lifetimeValue / orders.length + Number.EPSILON) * 100) / 100);
      expect(customer.firstOrderAt).toBe(sortedDates[0]);
      expect(customer.lastOrderAt).toBe(sortedDates.at(-1));
    }
  });

  it("has one valid, non-orphan profile per customer", () => {
    expect(customerProfiles).toHaveLength(30);
    expect(new Set(customerProfiles.map((profile) => profile.id))).toHaveLength(30);
    expect(() => aggregateCustomers(orderFixtures, customerProfiles)).not.toThrow();
  });
});

describe("customer segmentation", () => {
  it("applies mutually exclusive rules in at-risk, loyal, new, returning priority", () => {
    expect(getCustomerSegment({ ordersCount: 2, lifetimeValue: 5000, daysSinceFirstOrder: 100, daysSinceLastOrder: 24 })).toBe("at_risk");
    expect(getCustomerSegment({ ordersCount: 5, lifetimeValue: 500, daysSinceFirstOrder: 100, daysSinceLastOrder: 23 })).toBe("loyal");
    expect(getCustomerSegment({ ordersCount: 2, lifetimeValue: 1800, daysSinceFirstOrder: 69, daysSinceLastOrder: 3 })).toBe("loyal");
    expect(getCustomerSegment({ ordersCount: 3, lifetimeValue: 300, daysSinceFirstOrder: 69, daysSinceLastOrder: 2 })).toBe("new");
    expect(getCustomerSegment({ ordersCount: 4, lifetimeValue: 900, daysSinceFirstOrder: 70, daysSinceLastOrder: 10 })).toBe("returning");
  });

  it("keeps a useful dataset distribution across all four segments", () => {
    const distribution = Object.groupBy(customerAggregates, (customer) => customer.segment);
    expect(distribution.new).toHaveLength(6);
    expect(distribution.returning).toHaveLength(9);
    expect(distribution.loyal).toHaveLength(9);
    expect(distribution.at_risk).toHaveLength(6);
  });
});
