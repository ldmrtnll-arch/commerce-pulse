import { describe, expect, it } from "vitest";
import { getCustomers } from "./customers-api";
import type { GetCustomersParams } from "../types";

const defaults: GetCustomersParams = { page: 1, pageSize: 10, search: "", segment: "all", acquisition: "all", sort: "recent", simulateError: false };

describe("customers mock API", () => {
  it("searches by name", async () => {
    const result = await getCustomers({ ...defaults, search: "Olivia Martin" }, { latencyMs: 0 });
    expect(result.data.map((customer) => customer.id)).toEqual(["customer_001"]);
  });

  it("searches by email", async () => {
    const result = await getCustomers({ ...defaults, search: "alexander.wright@" }, { latencyMs: 0 });
    expect(result.data[0].name).toBe("Alexander Wright");
  });

  it("filters by segment", async () => {
    const result = await getCustomers({ ...defaults, segment: "loyal", pageSize: 100 }, { latencyMs: 0 });
    expect(result.data).toHaveLength(9);
    expect(result.data.every((customer) => customer.segment === "loyal")).toBe(true);
  });

  it("filters by acquisition channel", async () => {
    const result = await getCustomers({ ...defaults, acquisition: "organic_search", pageSize: 100 }, { latencyMs: 0 });
    expect(result.data).toHaveLength(5);
    expect(result.data.every((customer) => customer.acquisitionChannel === "organic_search")).toBe(true);
  });

  it("combines segment and acquisition filters", async () => {
    const result = await getCustomers({ ...defaults, segment: "new", acquisition: "organic_search", pageSize: 100 }, { latencyMs: 0 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((customer) => customer.segment === "new" && customer.acquisitionChannel === "organic_search")).toBe(true);
  });

  it("sorts by highest lifetime value", async () => {
    const result = await getCustomers({ ...defaults, sort: "highest-value", pageSize: 100 }, { latencyMs: 0 });
    const values = result.data.map((customer) => customer.lifetimeValue);
    expect(values).toEqual([...values].sort((left, right) => right - left));
  });

  it("sorts by most recent activity", async () => {
    const result = await getCustomers({ ...defaults, pageSize: 100 }, { latencyMs: 0 });
    expect(result.data[0].id).toBe("customer_001");
    expect(result.data.at(-1)?.id).toBe("customer_024");
  });

  it("paginates after filtering and sorting", async () => {
    const result = await getCustomers({ ...defaults, page: 2 }, { latencyMs: 0 });
    expect(result.data).toHaveLength(10);
    expect(result.data[0].name).toBe("Amelia Harris");
    expect(result.pagination).toEqual({ page: 2, pageSize: 10, totalItems: 30, totalPages: 3 });
  });
});
