"use client";

import { RefreshCw } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useCustomerUrlState } from "../hooks/use-customer-url-state";
import { useCustomers } from "../hooks/use-customers";
import { CustomerMetrics } from "./customer-metrics";
import { CustomersCollection } from "./customers-collection";
import { CustomersFilters } from "./customers-filters";
import { CustomerMetricsSkeleton, CustomersEmptyState, CustomersErrorState, CustomersSkeleton } from "./customers-states";

export function CustomersWorkspace() {
  const { params, updateParams, clearFilters, hasActiveFilters, returnUrl } = useCustomerUrlState();
  const customersQuery = useCustomers(params);
  return <div className="space-y-4">
    {customersQuery.data ? <CustomerMetrics summary={customersQuery.data.summary} /> : <CustomerMetricsSkeleton />}
    <CustomersFilters params={params} hasActiveFilters={hasActiveFilters} onUpdate={updateParams} onClear={clearFilters} />
    {customersQuery.isPending ? <CustomersSkeleton /> : customersQuery.isError ? <CustomersErrorState onRetry={() => void customersQuery.refetch()} /> : customersQuery.data.data.length === 0 ? <CustomersEmptyState onClear={clearFilters} /> : <>
      <div className="flex h-5 items-center justify-between px-1"><p className="text-xs text-muted-foreground">{customersQuery.data.pagination.totalItems} matching customers</p>{customersQuery.isFetching && <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><RefreshCw aria-hidden="true" className="size-3 animate-spin" /> Updating</span>}</div>
      <div className={customersQuery.isFetching ? "opacity-70 transition-opacity" : "transition-opacity"}><CustomersCollection customers={customersQuery.data.data} returnUrl={returnUrl} /></div>
      <Pagination {...customersQuery.data.pagination} itemLabel="customers" ariaLabel="Customers pagination" onPageChange={(page) => updateParams({ page })} />
    </>}
  </div>;
}
