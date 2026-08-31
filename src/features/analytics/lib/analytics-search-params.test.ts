import { describe, expect, it } from "vitest";
import { parseAnalyticsSearchParams } from "./analytics-search-params";

describe("analytics search params", () => {
  it("defaults invalid or missing periods to 30 days", () => {
    expect(parseAnalyticsSearchParams({})).toEqual({ period: "30d", simulateError: false });
    expect(parseAnalyticsSearchParams({ period: "year" })).toEqual({ period: "30d", simulateError: false });
  });

  it("accepts supported periods and only the explicit error flag", () => {
    expect(parseAnalyticsSearchParams(new URLSearchParams("period=7d&error=true"))).toEqual({ period: "7d", simulateError: true });
    expect(parseAnalyticsSearchParams({ period: ["90d", "7d"], error: "false" })).toEqual({ period: "90d", simulateError: false });
  });
});
