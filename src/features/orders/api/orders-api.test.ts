import { describe, expect, it } from "vitest";
import { getOrders } from "./orders-api";
import type { GetOrdersParams } from "../types";
import { orderFixtures } from "../fixtures/orders";

const defaultParams: GetOrdersParams = {
  page: 1,
  pageSize: 10,
  search: "",
  status: "all",
  period: "all",
  sort: "newest",
  simulateError: false,
};

describe("orders mock API", () => {
  it("keeps item subtotals and order totals mathematically consistent", () => {
    expect(orderFixtures).toHaveLength(90);
    for (const order of orderFixtures) {
      const itemSubtotal = order.items.reduce((sum, item) => sum + item.total, 0);
      expect(order.subtotal).toBeCloseTo(itemSubtotal, 2);
      expect(order.total).toBeCloseTo(order.subtotal + order.shipping + order.tax - order.discount, 2);
    }
  });

  it("searches by customer name", async () => {
    const result = await getOrders({ ...defaultParams, search: "Olivia" }, { latencyMs: 0 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((order) => order.customer.name === "Olivia Martin")).toBe(true);
  });

  it("filters by status", async () => {
    const result = await getOrders({ ...defaultParams, status: "delivered", pageSize: 100 }, { latencyMs: 0 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((order) => order.status === "delivered")).toBe(true);
  });

  it("sorts highest totals first", async () => {
    const result = await getOrders({ ...defaultParams, sort: "highest", pageSize: 100 }, { latencyMs: 0 });
    const totals = result.data.map((order) => order.total);
    expect(totals).toEqual([...totals].sort((left, right) => right - left));
  });

  it("paginates after filtering and sorting", async () => {
    const firstPage = await getOrders(defaultParams, { latencyMs: 0 });
    const secondPage = await getOrders({ ...defaultParams, page: 2 }, { latencyMs: 0 });
    expect(secondPage.data).toHaveLength(10);
    expect(secondPage.data[0].id).not.toBe(firstPage.data[0].id);
    expect(secondPage.pagination).toMatchObject({ page: 2, pageSize: 10, totalItems: 90, totalPages: 9 });
  });
});
