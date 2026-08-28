import { describe, expect, it } from "vitest";
import { orderFixtures } from "@/features/orders/fixtures/orders";
import { productStatuses } from "@/types/product";
import { productFixtures } from "./products";

describe("product fixtures", () => {
  it("uses unique IDs and SKUs with valid commercial data", () => {
    expect(productFixtures).toHaveLength(72);
    expect(new Set(productFixtures.map((product) => product.id)).size).toBe(productFixtures.length);
    expect(new Set(productFixtures.map((product) => product.sku)).size).toBe(productFixtures.length);
    for (const product of productFixtures) {
      expect(productStatuses).toContain(product.status);
      if (product.status === "out_of_stock") expect(product.inventory.available).toBe(0);
      if (product.compareAtPrice !== undefined) expect(product.compareAtPrice).toBeGreaterThan(product.price);
      expect(product.revenue).toBeCloseTo(product.price * product.unitsSold, 2);
    }
  });

  it("matches every order item to the authoritative product ID and SKU", () => {
    const productsById = new Map(productFixtures.map((product) => [product.id, product]));
    for (const order of orderFixtures) {
      for (const item of order.items) {
        const product = productsById.get(item.productId);
        expect(product, `Missing product ${item.productId}`).toBeDefined();
        expect(item.sku).toBe(product?.sku);
      }
    }
  });
});
