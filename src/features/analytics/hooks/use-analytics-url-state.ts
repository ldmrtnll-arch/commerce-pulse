"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AnalyticsPeriod } from "@/types/analytics";
import { parseAnalyticsSearchParams } from "../lib/analytics-search-params";

export function useAnalyticsUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(() => parseAnalyticsSearchParams(searchParams), [searchParams]);
  const setPeriod = useCallback((period: AnalyticsPeriod) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (period === "30d") nextParams.delete("period");
    else nextParams.set("period", period);
    const query = nextParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  return { params, setPeriod, returnUrl: searchParams.size ? `${pathname}?${searchParams.toString()}` : pathname };
}
