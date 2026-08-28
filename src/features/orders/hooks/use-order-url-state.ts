"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { hasActiveOrderFilters, parseOrderSearchParams } from "../lib/order-search-params";
import type { GetOrdersParams } from "../types";

type OrderUrlUpdate = Partial<Pick<GetOrdersParams, "page" | "search" | "status" | "period" | "sort">>;

export function useOrderUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(() => parseOrderSearchParams(searchParams), [searchParams]);

  const updateParams = useCallback(
    (updates: OrderUrlUpdate, replace = false) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      const changesFilters = Object.keys(updates).some((key) => key !== "page");
      if (changesFilters && updates.page === undefined) nextParams.delete("page");

      for (const [key, value] of Object.entries(updates)) {
        const isDefault =
          value === "" ||
          value === "all" ||
          (key === "sort" && value === "newest") ||
          (key === "page" && value === 1);
        if (isDefault || value === undefined) nextParams.delete(key);
        else nextParams.set(key, String(value));
      }

      const nextQuery = nextParams.toString();
      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
      const currentQuery = searchParams.toString();
      const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;
      if (nextUrl === currentUrl) return;

      if (replace) router.replace(nextUrl, { scroll: false });
      else router.push(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => router.push(pathname, { scroll: false }), [pathname, router]);

  return {
    params,
    updateParams,
    clearFilters,
    hasActiveFilters: hasActiveOrderFilters(params),
    returnUrl: searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname,
  };
}
