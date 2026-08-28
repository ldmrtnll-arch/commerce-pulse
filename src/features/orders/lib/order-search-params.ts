import { orderPeriods, orderSorts, type GetOrdersParams } from "../types";
import { orderStatuses } from "@/types/order";

export const ORDERS_PAGE_SIZE = 10;

function firstValue(value: string | string[] | null | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value ?? undefined;
}

interface SearchParamSource {
  get(name: string): string | null;
}

export type ServerSearchParams = Record<string, string | string[] | undefined>;

function isSearchParamSource(source: SearchParamSource | ServerSearchParams): source is SearchParamSource {
  return typeof Reflect.get(source, "get") === "function";
}

function readValue(source: SearchParamSource | ServerSearchParams, key: string): string | undefined {
  if (isSearchParamSource(source)) return source.get(key) ?? undefined;
  return firstValue(source[key]);
}

export function parseOrderSearchParams(
  source: SearchParamSource | ServerSearchParams,
): GetOrdersParams {
  const pageValue = Number.parseInt(readValue(source, "page") ?? "1", 10);
  const statusValue = readValue(source, "status");
  const periodValue = readValue(source, "period");
  const sortValue = readValue(source, "sort");

  return {
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
    pageSize: ORDERS_PAGE_SIZE,
    search: (readValue(source, "search") ?? "").trim(),
    status: orderStatuses.includes(statusValue as (typeof orderStatuses)[number])
      ? (statusValue as (typeof orderStatuses)[number])
      : "all",
    period: orderPeriods.includes(periodValue as (typeof orderPeriods)[number])
      ? (periodValue as (typeof orderPeriods)[number])
      : "all",
    sort: orderSorts.includes(sortValue as (typeof orderSorts)[number])
      ? (sortValue as (typeof orderSorts)[number])
      : "newest",
    simulateError: readValue(source, "error") === "true",
  };
}

export function hasActiveOrderFilters(params: GetOrdersParams): boolean {
  return Boolean(
    params.search ||
      params.status !== "all" ||
      params.period !== "all" ||
      params.sort !== "newest",
  );
}
