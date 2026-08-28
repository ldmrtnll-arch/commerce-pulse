import { productCategoryValues, productStatuses, type ProductCategory, type ProductStatus, type StockHealth } from "@/types/product";
import { productSorts, type GetProductsParams, type ProductSort } from "../types";

export const PRODUCTS_PAGE_SIZE = 12;
const stockValues: StockHealth[] = ["healthy", "low", "out"];

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

export function parseProductSearchParams(source: SearchParamSource | ServerSearchParams): GetProductsParams {
  const rawPage = Number.parseInt(readValue(source, "page") ?? "1", 10);
  const status = readValue(source, "status");
  const category = readValue(source, "category");
  const stock = readValue(source, "stock");
  const sort = readValue(source, "sort");
  return {
    page: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: PRODUCTS_PAGE_SIZE,
    search: (readValue(source, "search") ?? "").trim(),
    status: productStatuses.includes(status as ProductStatus) ? (status as ProductStatus) : "all",
    category: productCategoryValues.includes(category as ProductCategory) ? (category as ProductCategory) : "all",
    stock: stockValues.includes(stock as StockHealth) ? (stock as StockHealth) : "all",
    sort: productSorts.includes(sort as ProductSort) ? (sort as ProductSort) : "recent",
    simulateError: readValue(source, "error") === "true",
  };
}

export function hasActiveProductFilters(params: GetProductsParams): boolean {
  return Boolean(params.search || params.status !== "all" || params.category !== "all" || params.stock !== "all" || params.sort !== "recent");
}
