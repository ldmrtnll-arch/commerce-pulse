"use client";

import { RefreshCw } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useCampaignUrlState } from "../hooks/use-campaign-url-state";
import { useCampaigns } from "../hooks/use-campaigns";
import { CampaignFilters } from "./campaign-filters";
import { CampaignSummaryCards, CampaignSummarySkeleton } from "./campaign-summary";
import { CampaignsCollection } from "./campaigns-collection";
import { CampaignsEmptyState, CampaignsErrorState, CampaignsSkeleton } from "./campaign-states";

export function CampaignsWorkspace() {
  const { params, updateParams, clearFilters, hasActiveFilters, returnUrl } = useCampaignUrlState();
  const query = useCampaigns(params);
  return <div className="space-y-4">{query.data ? <CampaignSummaryCards summary={query.data.summary} /> : query.isError ? null : <CampaignSummarySkeleton />}<CampaignFilters params={params} hasActiveFilters={hasActiveFilters} onUpdate={updateParams} onClear={clearFilters} />{query.isPending ? <CampaignsSkeleton /> : query.isError ? <CampaignsErrorState onRetry={() => void query.refetch()} /> : query.data.data.length === 0 ? <CampaignsEmptyState onClear={clearFilters} /> : <><div className="flex h-5 items-center justify-between px-1"><p className="text-xs text-muted-foreground">{query.data.pagination.totalItems} matching campaigns</p>{query.isFetching && <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><RefreshCw aria-hidden="true" className="size-3 animate-spin" /> Updating</span>}</div><div className={query.isFetching ? "opacity-70 transition-opacity" : "transition-opacity"}><CampaignsCollection campaigns={query.data.data} returnUrl={returnUrl} /></div><Pagination {...query.data.pagination} itemLabel="campaigns" ariaLabel="Campaigns pagination" onPageChange={(page) => updateParams({ page })} /></>}</div>;
}
