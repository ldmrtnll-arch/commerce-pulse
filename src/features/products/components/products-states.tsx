import { AlertCircle, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InventoryMetricsSkeleton() {
  return <div aria-hidden="true" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-[74px] animate-pulse rounded-card border border-border bg-slate-100" />)}</div>;
}

export function ProductsSkeleton() {
  return <div aria-hidden="true" className="overflow-hidden rounded-card border border-border bg-card"><div className="hidden divide-y divide-border md:block"><div className="h-11 animate-pulse bg-slate-50" />{Array.from({ length: 7 }, (_, index) => <div key={index} className="grid h-[76px] grid-cols-7 items-center gap-4 px-5">{["w-40", "w-16", "w-20", "w-16", "w-28", "w-12", "w-16"].map((width, cell) => <span key={cell} className={`h-4 animate-pulse rounded bg-slate-100 ${width}`} />)}</div>)}</div><div className="divide-y divide-border md:hidden">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-44 animate-pulse bg-slate-50/60" />)}</div></div>;
}

export function ProductsEmptyState({ onClear }: { onClear: () => void }) {
  return <div className="flex min-h-80 flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-card px-6 text-center"><span className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><SearchX aria-hidden="true" className="size-5" /></span><h2 className="mt-4 text-base font-semibold text-slate-900">No products found</h2><p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p><Button type="button" onClick={onClear} className="mt-5">Clear filters</Button></div>;
}

export function ProductsErrorState({ onRetry }: { onRetry: () => void }) {
  return <div className="flex min-h-80 flex-col items-center justify-center rounded-card border border-dashed border-red-200 bg-card px-6 text-center"><span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-destructive"><AlertCircle aria-hidden="true" className="size-5" /></span><h2 className="mt-4 text-base font-semibold text-slate-900">Unable to load products</h2><p className="mt-2 text-sm text-muted-foreground">We couldn&apos;t load the products right now.</p><Button type="button" onClick={onRetry} className="mt-5">Try again</Button></div>;
}
