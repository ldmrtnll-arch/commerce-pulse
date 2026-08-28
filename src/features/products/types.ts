import type { Product, ProductCategory, ProductStatus, StockHealth } from "@/types/product";

export const productSorts = ["recent", "name-asc", "name-desc", "price-high", "price-low", "best-selling", "lowest-stock"] as const;
export type ProductSort = (typeof productSorts)[number];

export interface GetProductsParams {
  page: number;
  pageSize: number;
  search: string;
  status: ProductStatus | "all";
  category: ProductCategory | "all";
  stock: StockHealth | "all";
  sort: ProductSort;
  simulateError: boolean;
}

export interface ProductInventorySummary {
  totalProducts: number;
  activeProducts: number;
  lowStock: number;
  outOfStock: number;
}

export interface PaginatedProducts {
  data: Product[];
  summary: ProductInventorySummary;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
