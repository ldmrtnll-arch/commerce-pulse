import { AlertCircle, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrdersSkeleton() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-card border border-border bg-card">
      <div className="hidden divide-y divide-border md:block">
        <div className="h-11 animate-pulse bg-slate-50" />
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="grid grid-cols-6 gap-5 px-5 py-4">
            {["w-14", "w-24", "w-16", "w-12", "w-8", "w-12"].map((widthClass, cellIndex) => (
              <span key={cellIndex} className={`h-4 animate-pulse rounded bg-slate-100 ${widthClass}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="divide-y divide-border md:hidden">
        {Array.from({ length: 5 }, (_, index) => <div key={index} className="h-36 animate-pulse bg-slate-50/60 p-4" />)}
      </div>
    </div>
  );
}

export function OrdersEmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-card px-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><SearchX aria-hidden="true" className="size-5" /></span>
      <h2 className="mt-4 text-base font-semibold text-slate-900">{hasFilters ? "No orders found" : "No orders yet"}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{hasFilters ? "Try adjusting your search or filters." : "New orders will appear here when they are placed."}</p>
      {hasFilters && <Button type="button" onClick={onClear} className="mt-5">Clear filters</Button>}
    </div>
  );
}

export function OrdersErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-card border border-dashed border-red-200 bg-card px-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-destructive"><AlertCircle aria-hidden="true" className="size-5" /></span>
      <h2 className="mt-4 text-base font-semibold text-slate-900">Unable to load orders</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">We couldn&apos;t load the orders right now.</p>
      <Button type="button" onClick={onRetry} className="mt-5">Try again</Button>
    </div>
  );
}
