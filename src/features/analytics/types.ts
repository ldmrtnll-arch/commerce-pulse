import type { AnalyticsPeriod, AnalyticsResponse } from "@/types/analytics";

export interface GetAnalyticsParams {
  period: AnalyticsPeriod;
  simulateError: boolean;
}

export type { AnalyticsResponse };
