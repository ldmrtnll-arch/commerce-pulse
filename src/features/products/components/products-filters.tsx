"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { productStatuses, type ProductCategory, type ProductStatus, type StockHealth } from "@/types/product";
import { getProductStatusLabel, productCategories } from "../lib/product-labels";
import type { GetProductsParams, ProductSort } from "../types";

interface ProductsFiltersProps {
  params: GetProductsParams;
  hasActiveFilters: boolean;
  onUpdate: (updates: Partial<Pick<GetProductsParams, "search" | "status" | "category" | "stock" | "sort">>, replace?: boolean) => void;
  onClear: () => void;
}

const selectClassName = "h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-slate-700 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function ProductsFilters({ params, hasActiveFilters, onUpdate, onClear }: ProductsFiltersProps) {
  const [searchState, setSearchState] = useState({ source: params.search, draft: params.search });
  if (searchState.source !== params.search) setSearchState({ source: params.search, draft: params.search });
  const searchValue = searchState.source === params.search ? searchState.draft : params.search;
  const debouncedSearch = useDebouncedValue(searchValue, 350);

  useEffect(() => {
    if (debouncedSearch !== params.search) onUpdate({ search: debouncedSearch }, true);
  }, [debouncedSearch, onUpdate, params.search]);

  return (
    <section aria-label="Product filters" className="rounded-card border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <label className="block min-w-0 flex-1">
          <span className="mb-1.5 block text-xs font-medium text-slate-700">Search products</span>
          <span className="relative block"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input type="search" value={searchValue} onChange={(event) => { const value = event.target.value; setSearchState({ source: params.search, draft: value }); if (!value) onUpdate({ search: "" }, true); }} placeholder="Search by product name or SKU..." className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" /></span>
        </label>
        <div className="grid gap-3 sm:grid-cols-2 xl:w-[720px] xl:grid-cols-4">
          <label><span className="mb-1.5 block text-xs font-medium text-slate-700">Status</span><select value={params.status} onChange={(event) => onUpdate({ status: event.target.value as ProductStatus | "all" })} className={selectClassName}><option value="all">All statuses</option>{productStatuses.map((status) => <option key={status} value={status}>{getProductStatusLabel(status)}</option>)}</select></label>
          <label><span className="mb-1.5 block text-xs font-medium text-slate-700">Category</span><select value={params.category} onChange={(event) => onUpdate({ category: event.target.value as ProductCategory | "all" })} className={selectClassName}><option value="all">All categories</option>{productCategories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></label>
          <label><span className="mb-1.5 block text-xs font-medium text-slate-700">Stock level</span><select value={params.stock} onChange={(event) => onUpdate({ stock: event.target.value as StockHealth | "all" })} className={selectClassName}><option value="all">All inventory</option><option value="healthy">Healthy</option><option value="low">Low stock</option><option value="out">Out of stock</option></select></label>
          <label><span className="mb-1.5 block text-xs font-medium text-slate-700">Sort by</span><select value={params.sort} onChange={(event) => onUpdate({ sort: event.target.value as ProductSort })} className={selectClassName}><option value="recent">Recently updated</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option><option value="price-high">Highest price</option><option value="price-low">Lowest price</option><option value="best-selling">Best selling</option><option value="lowest-stock">Lowest stock</option></select></label>
        </div>
      </div>
      {hasActiveFilters && <div className="mt-4 flex items-center justify-between border-t border-border pt-4"><span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"><SlidersHorizontal aria-hidden="true" className="size-3.5" /> Filters applied</span><Button type="button" variant="ghost" onClick={onClear} className="h-8 px-2"><X aria-hidden="true" className="size-4" /> Clear filters</Button></div>}
    </section>
  );
}
