import { waitForMockApi } from "@/lib/mock-api";
import { aggregateAnalytics } from "../lib/analytics-aggregation";
import type { AnalyticsResponse, GetAnalyticsParams } from "../types";

interface MockApiOptions { latencyMs?: number }

export async function getAnalytics(params: GetAnalyticsParams, options: MockApiOptions = {}): Promise<AnalyticsResponse> {
  await waitForMockApi(options.latencyMs);
  if (params.simulateError && process.env.NODE_ENV !== "production") throw new Error("The controlled analytics request failed.");
  return aggregateAnalytics(params.period);
}
