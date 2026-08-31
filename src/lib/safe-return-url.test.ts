import { describe, expect, it } from "vitest";
import { getSafeReturnUrl } from "./safe-return-url";

describe("getSafeReturnUrl", () => {
  it("accepts the base path, nested routes, and query state", () => {
    expect(getSafeReturnUrl("/orders", "/orders")).toBe("/orders");
    expect(getSafeReturnUrl("/orders/order-1", "/orders")).toBe("/orders/order-1");
    expect(getSafeReturnUrl("/orders?status=delivered", "/orders")).toBe("/orders?status=delivered");
  });

  it("supports explicit cross-feature return destinations", () => {
    expect(getSafeReturnUrl("/analytics?period=7d", "/products", ["/products", "/analytics"])).toBe("/analytics?period=7d");
  });

  it.each([undefined, "https://example.com", "//example.com", "/customers", "javascript:alert(1)"])("rejects unsafe or unrelated destination %s", (value) => {
    expect(getSafeReturnUrl(value, "/orders")).toBe("/orders");
  });

  it("uses only the first value from repeated query parameters", () => {
    expect(getSafeReturnUrl(["/orders?page=2", "https://example.com"], "/orders")).toBe("/orders?page=2");
  });
});
