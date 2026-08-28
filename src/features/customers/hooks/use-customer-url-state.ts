"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { hasActiveCustomerFilters, parseCustomerSearchParams } from "../lib/customer-search-params";
import type { GetCustomersParams } from "../types";

type CustomerUrlUpdate = Partial<Pick<GetCustomersParams, "page" | "search" | "segment" | "acquisition" | "sort">>;

export function useCustomerUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(() => parseCustomerSearchParams(searchParams), [searchParams]);
  const updateParams = useCallback((updates: CustomerUrlUpdate, replace = false) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (Object.keys(updates).some((key) => key !== "page") && updates.page === undefined) nextParams.delete("page");
    for (const [key, value] of Object.entries(updates)) {
      const isDefault = value === "" || value === "all" || (key === "sort" && value === "recent") || (key === "page" && value === 1);
      if (value === undefined || isDefault) nextParams.delete(key);
      else nextParams.set(key, String(value));
    }
    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentUrl = searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname;
    if (nextUrl === currentUrl) return;
    if (replace) router.replace(nextUrl, { scroll: false });
    else router.push(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);
  const clearFilters = useCallback(() => router.push(pathname, { scroll: false }), [pathname, router]);
  return {
    params,
    updateParams,
    clearFilters,
    hasActiveFilters: hasActiveCustomerFilters(params),
    returnUrl: searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname,
  };
}
