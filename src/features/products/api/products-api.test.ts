import { describe, expect, it } from "vitest";
import { getProducts } from "./products-api";
import type { GetProductsParams } from "../types";

const defaults: GetProductsParams = { page: 1, pageSize: 12, search: "", status: "all", category: "all", stock: "all", sort: "recent", simulateError: false };

describe("products mock API", () => {
  it("searches by product name", async () => {
    const result = await getProducts({ ...defaults, search: "Everyday Carry" }, { latencyMs: 0 });
    expect(result.data.map((product) => product.id)).toContain("prod_backpack");
  });

  it("searches by SKU", async () => {
    const result = await getProducts({ ...defaults, search: "ELC-SW-220" }, { latencyMs: 0 });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].id).toBe("prod_headphones");
  });

  it("filters categories", async () => {
    const result = await getProducts({ ...defaults, category: "fitness", pageSize: 100 }, { latencyMs: 0 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((product) => product.category === "fitness")).toBe(true);
  });

  it("filters stock health", async () => {
    const result = await getProducts({ ...defaults, stock: "low", pageSize: 100 }, { latencyMs: 0 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((product) => product.inventory.available > 0 && product.inventory.available <= product.inventory.reorderPoint)).toBe(true);
  });

  it("combines lifecycle and inventory filters", async () => {
    const result = await getProducts({ ...defaults, status: "active", stock: "healthy", pageSize: 100 }, { latencyMs: 0 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((product) => product.status === "active" && product.inventory.available > product.inventory.reorderPoint)).toBe(true);
  });

  it("sorts by lowest stock", async () => {
    const result = await getProducts({ ...defaults, sort: "lowest-stock", pageSize: 100 }, { latencyMs: 0 });
    const inventory = result.data.map((product) => product.inventory.available);
    expect(inventory).toEqual([...inventory].sort((left, right) => left - right));
  });

  it("paginates after filtering and sorting", async () => {
    const result = await getProducts({ ...defaults, page: 2 }, { latencyMs: 0 });
    expect(result.data).toHaveLength(12);
    expect(result.pagination).toEqual({ page: 2, pageSize: 12, totalItems: 72, totalPages: 6 });
  });
});
