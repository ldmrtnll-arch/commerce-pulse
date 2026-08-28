import { acquisitionChannels, customerSegments, type AcquisitionChannel, type CustomerSegment } from "@/types/customer";
import { customerSorts, type CustomerSort, type GetCustomersParams } from "../types";

export const CUSTOMERS_PAGE_SIZE = 10;
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

export function parseCustomerSearchParams(source: SearchParamSource | ServerSearchParams): GetCustomersParams {
  const rawPage = Number.parseInt(readValue(source, "page") ?? "1", 10);
  const segment = readValue(source, "segment");
  const acquisition = readValue(source, "acquisition");
  const sort = readValue(source, "sort");
  return {
    page: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: CUSTOMERS_PAGE_SIZE,
    search: (readValue(source, "search") ?? "").trim(),
    segment: customerSegments.includes(segment as CustomerSegment) ? segment as CustomerSegment : "all",
    acquisition: acquisitionChannels.includes(acquisition as AcquisitionChannel) ? acquisition as AcquisitionChannel : "all",
    sort: customerSorts.includes(sort as CustomerSort) ? sort as CustomerSort : "recent",
    simulateError: readValue(source, "error") === "true",
  };
}

export function hasActiveCustomerFilters(params: GetCustomersParams): boolean {
  return Boolean(params.search || params.segment !== "all" || params.acquisition !== "all" || params.sort !== "recent");
}
