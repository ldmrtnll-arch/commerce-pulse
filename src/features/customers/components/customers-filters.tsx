"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { acquisitionChannels, customerSegments, type AcquisitionChannel, type CustomerSegment } from "@/types/customer";
import { acquisitionChannelLabels, customerSegmentLabels } from "../lib/customer-labels";
import type { CustomerSort, GetCustomersParams } from "../types";

interface CustomersFiltersProps {
  params: GetCustomersParams;
  hasActiveFilters: boolean;
  onUpdate: (updates: Partial<Pick<GetCustomersParams, "search" | "segment" | "acquisition" | "sort">>, replace?: boolean) => void;
  onClear: () => void;
}

const selectClassName = "h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-slate-700 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function CustomersFilters({ params, hasActiveFilters, onUpdate, onClear }: CustomersFiltersProps) {
  const [searchState, setSearchState] = useState({ source: params.search, draft: params.search });
  if (searchState.source !== params.search) setSearchState({ source: params.search, draft: params.search });
  const searchValue = searchState.source === params.search ? searchState.draft : params.search;
  const debouncedSearch = useDebouncedValue(searchValue, 350);
  useEffect(() => { if (debouncedSearch !== params.search) onUpdate({ search: debouncedSearch }, true); }, [debouncedSearch, onUpdate, params.search]);

  return <section aria-label="Customer filters" className="rounded-card border border-border bg-card p-4 sm:p-5">
    <div className="grid gap-4 xl:grid-cols-[minmax(260px,1fr)_repeat(3,minmax(170px,0.55fr))] xl:items-end">
      <label className="block min-w-0"><span className="mb-1.5 block text-xs font-medium text-slate-700">Search customers</span><span className="relative block"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input type="search" value={searchValue} onChange={(event) => { const value = event.target.value; setSearchState({ source: params.search, draft: value }); if (!value) onUpdate({ search: "" }, true); }} placeholder="Search by name or email..." className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" /></span></label>
      <label><span className="mb-1.5 block text-xs font-medium text-slate-700">Segment</span><select value={params.segment} onChange={(event) => onUpdate({ segment: event.target.value as CustomerSegment | "all" })} className={selectClassName}><option value="all">All segments</option>{customerSegments.map((segment) => <option key={segment} value={segment}>{customerSegmentLabels[segment]}</option>)}</select></label>
      <label><span className="mb-1.5 block text-xs font-medium text-slate-700">Acquisition</span><select value={params.acquisition} onChange={(event) => onUpdate({ acquisition: event.target.value as AcquisitionChannel | "all" })} className={selectClassName}><option value="all">All channels</option>{acquisitionChannels.map((channel) => <option key={channel} value={channel}>{acquisitionChannelLabels[channel]}</option>)}</select></label>
      <label><span className="mb-1.5 block text-xs font-medium text-slate-700">Sort by</span><select value={params.sort} onChange={(event) => onUpdate({ sort: event.target.value as CustomerSort })} className={selectClassName}><option value="recent">Most recent</option><option value="oldest">Oldest activity</option><option value="highest-value">Highest lifetime value</option><option value="lowest-value">Lowest lifetime value</option><option value="most-orders">Most orders</option><option value="name-asc">Name A–Z</option></select></label>
    </div>
    {hasActiveFilters && <div className="mt-4 flex items-center justify-between border-t border-border pt-4"><span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"><SlidersHorizontal aria-hidden="true" className="size-3.5" /> Filters applied</span><Button type="button" variant="ghost" onClick={onClear} className="h-8 px-2"><X aria-hidden="true" className="size-4" /> Clear filters</Button></div>}
  </section>;
}
