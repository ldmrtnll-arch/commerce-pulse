"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { hasActiveProductFilters, parseProductSearchParams } from "../lib/product-search-params";
import type { GetProductsParams } from "../types";

type ProductUrlUpdate = Partial<Pick<GetProductsParams, "page" | "search" | "status" | "category" | "stock" | "sort">>;

export function useProductUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(() => parseProductSearchParams(searchParams), [searchParams]);
  const updateParams = useCallback((updates: ProductUrlUpdate, replace = false) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (Object.keys(updates).some((key) => key !== "page") && updates.page === undefined) nextParams.delete("page");
    for (const [key, value] of Object.entries(updates)) {
      const isDefault = value === "" || value === "all" || (key === "sort" && value === "recent") || (key === "page" && value === 1);
      if (value === undefined || isDefault) nextParams.delete(key);
      else nextParams.set(key, String(value));
    }
    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const current = searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname;
    if (nextUrl === current) return;
    if (replace) router.replace(nextUrl, { scroll: false });
    else router.push(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    params,
    updateParams,
    clearFilters: useCallback(() => router.push(pathname, { scroll: false }), [pathname, router]),
    hasActiveFilters: hasActiveProductFilters(params),
    returnUrl: searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname,
  };
}
