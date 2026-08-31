import { Suspense } from "react";
import type { Metadata } from "next";
import { AnalyticsSkeleton } from "@/features/analytics/components/analytics-states";
import { AnalyticsWorkspace } from "@/features/analytics/components/analytics-workspace";

export const metadata: Metadata = { title: "Analytics | CommercePulse", description: "Revenue, product and customer insights for CommercePulse." };

export default function AnalyticsPage() {
  return <Suspense fallback={<AnalyticsSkeleton />}><AnalyticsWorkspace /></Suspense>;
}
