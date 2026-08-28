"use client";

import { RefreshCw } from "lucide-react";
import { OrdersCollection } from "./orders-collection";
import { OrdersFilters } from "./orders-filters";
import { Pagination } from "@/components/ui/pagination";
import { OrdersEmptyState, OrdersErrorState, OrdersSkeleton } from "./orders-states";
import { useOrders } from "../hooks/use-orders";
import { useOrderUrlState } from "../hooks/use-order-url-state";

export function OrdersWorkspace() {
  const { params, updateParams, clearFilters, hasActiveFilters, returnUrl } = useOrderUrlState();
  const ordersQuery = useOrders(params);

  return (
    <div className="space-y-4">
      <OrdersFilters params={params} hasActiveFilters={hasActiveFilters} onUpdate={updateParams} onClear={clearFilters} />

      {ordersQuery.isPending ? (
        <OrdersSkeleton />
      ) : ordersQuery.isError ? (
        <OrdersErrorState onRetry={() => void ordersQuery.refetch()} />
      ) : ordersQuery.data.data.length === 0 ? (
        <OrdersEmptyState hasFilters={hasActiveFilters} onClear={clearFilters} />
      ) : (
        <>
          <div className="flex h-5 items-center justify-between px-1">
            <p className="text-xs text-muted-foreground">{ordersQuery.data.pagination.totalItems} matching orders</p>
            {ordersQuery.isFetching && <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><RefreshCw aria-hidden="true" className="size-3 animate-spin" /> Updating</span>}
          </div>
          <div className={ordersQuery.isFetching ? "opacity-70 transition-opacity" : "transition-opacity"}>
            <OrdersCollection orders={ordersQuery.data.data} returnUrl={returnUrl} />
          </div>
          <Pagination
            {...ordersQuery.data.pagination}
            itemLabel="orders"
            ariaLabel="Orders pagination"
            onPageChange={(page) => updateParams({ page })}
          />
        </>
      )}
    </div>
  );
}
