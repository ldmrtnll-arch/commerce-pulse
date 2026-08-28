import type { Metadata } from "next";
import { Suspense } from "react";
import { OrdersWorkspace } from "@/features/orders/components/orders-workspace";
import { OrdersSkeleton } from "@/features/orders/components/orders-states";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Operations</p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Orders</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Manage and track customer orders.</p>
      </div>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersWorkspace />
      </Suspense>
    </div>
  );
}
