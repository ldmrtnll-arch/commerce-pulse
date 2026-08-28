import { describe, expect, it } from "vitest";
import { parseOrderSearchParams } from "./order-search-params";

describe("order search parameter parsing", () => {
  it("parses supported values", () => {
    const params = new URLSearchParams("page=3&search=martin&status=delivered&period=30d&sort=highest");
    expect(parseOrderSearchParams(params)).toMatchObject({
      page: 3,
      search: "martin",
      status: "delivered",
      period: "30d",
      sort: "highest",
    });
  });

  it("falls back safely for invalid values", () => {
    const params = new URLSearchParams("page=-4&status=unknown&period=year&sort=sideways");
    expect(parseOrderSearchParams(params)).toMatchObject({
      page: 1,
      status: "all",
      period: "all",
      sort: "newest",
    });
  });

  it("uses clean defaults for an empty query", () => {
    expect(parseOrderSearchParams(new URLSearchParams())).toEqual({
      page: 1,
      pageSize: 10,
      search: "",
      status: "all",
      period: "all",
      sort: "newest",
      simulateError: false,
    });
  });
});
