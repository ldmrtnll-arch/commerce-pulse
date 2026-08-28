"use client";

import { RefreshCw } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useProductUrlState } from "../hooks/use-product-url-state";
import { useProducts } from "../hooks/use-products";
import { InventoryMetrics } from "./inventory-metrics";
import { ProductsCollection } from "./products-collection";
import { ProductsFilters } from "./products-filters";
import { InventoryMetricsSkeleton, ProductsEmptyState, ProductsErrorState, ProductsSkeleton } from "./products-states";

export function ProductsWorkspace() {
  const { params, updateParams, clearFilters, hasActiveFilters, returnUrl } = useProductUrlState();
  const productsQuery = useProducts(params);
  return <div className="space-y-4">
    {productsQuery.data ? <InventoryMetrics summary={productsQuery.data.summary} /> : <InventoryMetricsSkeleton />}
    <ProductsFilters params={params} hasActiveFilters={hasActiveFilters} onUpdate={updateParams} onClear={clearFilters} />
    {productsQuery.isPending ? <ProductsSkeleton /> : productsQuery.isError ? <ProductsErrorState onRetry={() => void productsQuery.refetch()} /> : productsQuery.data.data.length === 0 ? <ProductsEmptyState onClear={clearFilters} /> : <>
      <div className="flex h-5 items-center justify-between px-1"><p className="text-xs text-muted-foreground">{productsQuery.data.pagination.totalItems} matching products</p>{productsQuery.isFetching && <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><RefreshCw aria-hidden="true" className="size-3 animate-spin" /> Updating</span>}</div>
      <div className={productsQuery.isFetching ? "opacity-70 transition-opacity" : "transition-opacity"}><ProductsCollection products={productsQuery.data.data} returnUrl={returnUrl} /></div>
      <Pagination {...productsQuery.data.pagination} itemLabel="products" ariaLabel="Products pagination" onPageChange={(page) => updateParams({ page })} />
    </>}
  </div>;
}
