import { describe, expect, it } from "vitest";
import { getAnalyticsRanges, getPeriodDays, isDateInRange } from "./analytics-period";

describe("analytics periods", () => {
  it.each([
    ["7d", 7, "2026-08-22T00:00:00.000Z", "2026-08-15T00:00:00.000Z", "2026-08-21T23:59:59.999Z"],
    ["30d", 30, "2026-07-30T00:00:00.000Z", "2026-06-30T00:00:00.000Z", "2026-07-29T23:59:59.999Z"],
    ["90d", 90, "2026-05-31T00:00:00.000Z", "2026-03-02T00:00:00.000Z", "2026-05-30T23:59:59.999Z"],
  ] as const)("builds inclusive %s ranges from the fixed reference date", (period, days, currentStart, previousStart, previousEnd) => {
    const ranges = getAnalyticsRanges(period);
    expect(getPeriodDays(period)).toBe(days);
    expect(ranges.current).toMatchObject({ start: currentStart, end: "2026-08-28T23:59:59.999Z" });
    expect(ranges.previous).toMatchObject({ start: previousStart, end: previousEnd });
  });

  it("includes both boundaries and excludes adjacent instants", () => {
    const range = getAnalyticsRanges("7d").current;
    expect(isDateInRange(range.start, range)).toBe(true);
    expect(isDateInRange(range.end, range)).toBe(true);
    expect(isDateInRange("2026-08-21T23:59:59.999Z", range)).toBe(false);
    expect(isDateInRange("2026-08-29T00:00:00.000Z", range)).toBe(false);
  });
});
