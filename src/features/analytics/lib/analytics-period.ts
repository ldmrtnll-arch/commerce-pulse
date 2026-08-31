import { ORDERS_DATASET_REFERENCE_DATE } from "@/features/orders/fixtures/orders";
import type { AnalyticsDateRange, AnalyticsPeriod } from "@/types/analytics";

const periodDays: Record<AnalyticsPeriod, number> = { "7d": 7, "30d": 30, "90d": 90 };
const rangeFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const endFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function formatRange(start: Date, end: Date): string {
  return `${rangeFormatter.format(start)} – ${endFormatter.format(end)}`;
}

export function getPeriodDays(period: AnalyticsPeriod): number {
  return periodDays[period];
}

export function getAnalyticsRanges(period: AnalyticsPeriod, referenceDate = ORDERS_DATASET_REFERENCE_DATE): { current: AnalyticsDateRange; previous: AnalyticsDateRange } {
  const days = periodDays[period];
  const reference = new Date(referenceDate);
  const currentEnd = new Date(Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), reference.getUTCDate(), 23, 59, 59, 999));
  const currentStart = startOfUtcDay(new Date(Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), reference.getUTCDate() - days + 1)));
  const previousEnd = new Date(currentStart.getTime() - 1);
  const previousStart = startOfUtcDay(new Date(Date.UTC(previousEnd.getUTCFullYear(), previousEnd.getUTCMonth(), previousEnd.getUTCDate() - days + 1)));
  return {
    current: { start: currentStart.toISOString(), end: currentEnd.toISOString(), label: formatRange(currentStart, currentEnd) },
    previous: { start: previousStart.toISOString(), end: previousEnd.toISOString(), label: formatRange(previousStart, previousEnd) },
  };
}

export function isDateInRange(value: string, range: AnalyticsDateRange): boolean {
  const time = new Date(value).getTime();
  return time >= new Date(range.start).getTime() && time <= new Date(range.end).getTime();
}
