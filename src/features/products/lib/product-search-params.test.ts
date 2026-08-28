import { describe, expect, it } from "vitest";
import { parseProductSearchParams } from "./product-search-params";

describe("product search parameter parsing", () => {
  it("uses clean defaults", () => {
    expect(parseProductSearchParams(new URLSearchParams())).toEqual({ page: 1, pageSize: 12, search: "", status: "all", category: "all", stock: "all", sort: "recent", simulateError: false });
  });

  it("parses a valid combination", () => {
    expect(parseProductSearchParams(new URLSearchParams("search=hoodie&status=active&category=apparel&stock=low&sort=lowest-stock&page=2"))).toMatchObject({ search: "hoodie", status: "active", category: "apparel", stock: "low", sort: "lowest-stock", page: 2 });
  });

  it("falls back for invalid category, stock, sort, and page", () => {
    expect(parseProductSearchParams(new URLSearchParams("category=unknown&stock=empty&sort=random&page=-3"))).toMatchObject({ category: "all", stock: "all", sort: "recent", page: 1 });
  });

  it("accepts every valid lifecycle status", () => {
    expect(parseProductSearchParams(new URLSearchParams("status=out_of_stock")).status).toBe("out_of_stock");
  });
});
