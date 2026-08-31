import { analyticsPeriods, type AnalyticsPeriod } from "@/types/analytics";
import type { GetAnalyticsParams } from "../types";

interface SearchParamSource { get(name: string): string | null }
export type ServerSearchParams = Record<string, string | string[] | undefined>;

function isSearchParamSource(source: SearchParamSource | ServerSearchParams): source is SearchParamSource {
  return typeof Reflect.get(source, "get") === "function";
}

function readValue(source: SearchParamSource | ServerSearchParams, key: string): string | undefined {
  if (isSearchParamSource(source)) return source.get(key) ?? undefined;
  const value = source[key];
  return Array.isArray(value) ? value[0] : value;
}

export function parseAnalyticsSearchParams(source: SearchParamSource | ServerSearchParams): GetAnalyticsParams {
  const period = readValue(source, "period");
  return {
    period: analyticsPeriods.includes(period as AnalyticsPeriod) ? period as AnalyticsPeriod : "30d",
    simulateError: readValue(source, "error") === "true",
  };
}
