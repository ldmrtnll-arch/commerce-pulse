"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../api/analytics-api";
import type { GetAnalyticsParams } from "../types";

export const analyticsQueryKeys = {
  all: ["analytics"] as const,
  overview: (params: GetAnalyticsParams) => [...analyticsQueryKeys.all, "overview", params] as const,
};

export function useAnalytics(params: GetAnalyticsParams) {
  return useQuery({ queryKey: analyticsQueryKeys.overview(params), queryFn: () => getAnalytics(params), placeholderData: keepPreviousData });
}
