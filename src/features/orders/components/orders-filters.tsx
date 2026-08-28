"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { getOrderStatusLabel } from "@/components/ui/status-badge";
import { orderStatuses } from "@/types/order";
import type { GetOrdersParams, OrderPeriod, OrderSort } from "../types";

interface OrdersFiltersProps {
  params: GetOrdersParams;
  hasActiveFilters: boolean;
  onUpdate: (
    updates: Partial<Pick<GetOrdersParams, "search" | "status" | "period" | "sort">>,
    replace?: boolean,
  ) => void;
  onClear: () => void;
}

const selectClassName =
  "h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-slate-700 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function OrdersFilters({ params, hasActiveFilters, onUpdate, onClear }: OrdersFiltersProps) {
  const [searchState, setSearchState] = useState({ source: params.search, draft: params.search });
  if (searchState.source !== params.search) {
    setSearchState({ source: params.search, draft: params.search });
  }
  const searchValue = searchState.source === params.search ? searchState.draft : params.search;
  const debouncedSearch = useDebouncedValue(searchValue, 350);

  useEffect(() => {
    if (debouncedSearch !== params.search) onUpdate({ search: debouncedSearch }, true);
  }, [debouncedSearch, onUpdate, params.search]);

  return (
    <section aria-label="Order filters" className="rounded-card border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <label className="block min-w-0 flex-1">
          <span className="mb-1.5 block text-xs font-medium text-slate-700">Search orders</span>
          <span className="relative block">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => {
                const nextValue = event.target.value;
                setSearchState({ source: params.search, draft: nextValue });
                if (!nextValue) onUpdate({ search: "" }, true);
              }}
              placeholder="Search by order or customer..."
              className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </span>
        </label>

        <div className="grid gap-3 sm:grid-cols-3 xl:w-[570px]">
          <label>
            <span className="mb-1.5 block text-xs font-medium text-slate-700">Status</span>
            <select value={params.status} onChange={(event) => onUpdate({ status: event.target.value as GetOrdersParams["status"] })} className={selectClassName}>
              <option value="all">All statuses</option>
              {orderStatuses.map((status) => <option key={status} value={status}>{getOrderStatusLabel(status)}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium text-slate-700">Period</span>
            <select value={params.period} onChange={(event) => onUpdate({ period: event.target.value as OrderPeriod })} className={selectClassName}>
              <option value="all">All time</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium text-slate-700">Sort by</span>
            <select value={params.sort} onChange={(event) => onUpdate({ sort: event.target.value as OrderSort })} className={selectClassName}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest total</option>
              <option value="lowest">Lowest total</option>
            </select>
          </label>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <SlidersHorizontal aria-hidden="true" className="size-3.5" /> Filters applied
          </span>
          <Button type="button" variant="ghost" onClick={onClear} className="h-8 px-2">
            <X aria-hidden="true" className="size-4" /> Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}
