import { describe, expect, it } from "vitest";
import { hasActiveCampaignFilters, parseCampaignSearchParams } from "./campaign-search-params";

describe("campaign search params", () => {
  it("normalizes defaults and invalid values", () => {
    expect(parseCampaignSearchParams({})).toEqual({ page: 1, pageSize: 10, search: "", status: "all", channel: "all", sort: "recent", simulateError: false });
    expect(parseCampaignSearchParams({ page: "-2", status: "running", channel: "direct", sort: "popular" })).toMatchObject({ page: 1, status: "all", channel: "all", sort: "recent" });
  });

  it("accepts a complete valid combination", () => {
    const result = parseCampaignSearchParams(new URLSearchParams("search=summer&status=active&channel=social&sort=highest-roas&page=2&error=true"));
    expect(result).toMatchObject({ search: "summer", status: "active", channel: "social", sort: "highest-roas", page: 2, simulateError: true });
    expect(hasActiveCampaignFilters(result)).toBe(true);
  });
});
