import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsWorkspace } from "@/features/products/components/products-workspace";
import { InventoryMetricsSkeleton, ProductsSkeleton } from "@/features/products/components/products-states";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return <div className="space-y-6">
    <div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Catalog</p><h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Products</h1><p className="mt-1.5 text-sm text-muted-foreground">Manage your catalog and monitor inventory levels.</p></div>
    <Suspense fallback={<div className="space-y-4"><InventoryMetricsSkeleton /><ProductsSkeleton /></div>}><ProductsWorkspace /></Suspense>
  </div>;
}
