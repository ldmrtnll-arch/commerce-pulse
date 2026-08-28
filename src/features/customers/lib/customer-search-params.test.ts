import { describe, expect, it } from "vitest";
import { parseCustomerSearchParams } from "./customer-search-params";

describe("customer search params", () => {
  it("returns clean defaults", () => {
    expect(parseCustomerSearchParams({})).toEqual({ page: 1, pageSize: 10, search: "", segment: "all", acquisition: "all", sort: "recent", simulateError: false });
  });

  it("accepts a complete valid combination", () => {
    expect(parseCustomerSearchParams({ page: "2", search: " Olivia ", segment: "loyal", acquisition: "organic_search", sort: "highest-value" })).toEqual({ page: 2, pageSize: 10, search: "Olivia", segment: "loyal", acquisition: "organic_search", sort: "highest-value", simulateError: false });
  });

  it("falls back safely for invalid segment, acquisition, sort and page", () => {
    expect(parseCustomerSearchParams({ page: "-4", segment: "vip", acquisition: "telepathy", sort: "random" })).toMatchObject({ page: 1, segment: "all", acquisition: "all", sort: "recent" });
  });

  it("recognizes the deterministic error control", () => {
    expect(parseCustomerSearchParams({ error: "true" }).simulateError).toBe(true);
  });
});
