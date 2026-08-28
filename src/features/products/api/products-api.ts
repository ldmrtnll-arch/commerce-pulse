import { waitForMockApi } from "@/lib/mock-api";
import type { Product } from "@/types/product";
import { productFixtures } from "../fixtures/products";
import { getStockHealth } from "../lib/inventory";
import type { GetProductsParams, PaginatedProducts, ProductInventorySummary } from "../types";

interface MockApiOptions { latencyMs?: number }

export class ProductNotFoundError extends Error {
  constructor(productId: string) {
    super(`Product ${productId} was not found.`);
    this.name = "ProductNotFoundError";
  }
}

export function getProductInventorySummary(): ProductInventorySummary {
  return {
    totalProducts: productFixtures.length,
    activeProducts: productFixtures.filter((product) => product.status === "active").length,
    lowStock: productFixtures.filter((product) => getStockHealth(product) === "low").length,
    outOfStock: productFixtures.filter((product) => getStockHealth(product) === "out").length,
  };
}

export async function getProducts(params: GetProductsParams, options: MockApiOptions = {}): Promise<PaginatedProducts> {
  await waitForMockApi(options.latencyMs);
  if (params.simulateError && process.env.NODE_ENV !== "production") throw new Error("The controlled product request failed.");

  const search = params.search.toLowerCase();
  const filtered = productFixtures.filter((product) => {
    const matchesSearch = !search || product.name.toLowerCase().includes(search) || product.sku.toLowerCase().includes(search);
    const matchesStatus = params.status === "all" || product.status === params.status;
    const matchesCategory = params.category === "all" || product.category === params.category;
    const matchesStock = params.stock === "all" || getStockHealth(product) === params.stock;
    return matchesSearch && matchesStatus && matchesCategory && matchesStock;
  });

  const sorted = [...filtered].sort((left, right) => {
    if (params.sort === "name-asc") return left.name.localeCompare(right.name);
    if (params.sort === "name-desc") return right.name.localeCompare(left.name);
    if (params.sort === "price-high") return right.price - left.price;
    if (params.sort === "price-low") return left.price - right.price;
    if (params.sort === "best-selling") return right.unitsSold - left.unitsSold;
    if (params.sort === "lowest-stock") return left.inventory.available - right.inventory.available;
    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
  });

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / params.pageSize));
  const page = Math.min(params.page, totalPages);
  const startIndex = (page - 1) * params.pageSize;
  return {
    data: sorted.slice(startIndex, startIndex + params.pageSize),
    summary: getProductInventorySummary(),
    pagination: { page, pageSize: params.pageSize, totalItems, totalPages },
  };
}

export async function getProductById(productId: string, options: MockApiOptions = {}): Promise<Product> {
  await waitForMockApi(options.latencyMs);
  const product = productFixtures.find((candidate) => candidate.id === productId || candidate.slug === productId);
  if (!product) throw new ProductNotFoundError(productId);
  return product;
}
