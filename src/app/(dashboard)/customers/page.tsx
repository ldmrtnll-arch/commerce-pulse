import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomersWorkspace } from "@/features/customers/components/customers-workspace";
import { CustomerMetricsSkeleton, CustomersSkeleton } from "@/features/customers/components/customers-states";

export const metadata: Metadata = { title: "Customers", description: "Explore customer value, behavior and derived segments." };

export default function CustomersPage() {
  return <div className="space-y-6">
    <div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Relationships</p><h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Customers</h1><p className="mt-1.5 text-sm text-muted-foreground">Understand customer value, engagement and purchase behavior.</p></div>
    <Suspense fallback={<div className="space-y-4"><CustomerMetricsSkeleton /><CustomersSkeleton /></div>}><CustomersWorkspace /></Suspense>
  </div>;
}
