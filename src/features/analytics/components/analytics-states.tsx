import { AlertCircle, BarChart3, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AnalyticsSkeleton() {
  return <div aria-label="Loading analytics" className="space-y-6"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Card key={index} className="h-36 animate-pulse bg-slate-50" />)}</div><Card className="h-[420px] animate-pulse bg-slate-50" /><div className="grid gap-6 xl:grid-cols-2"><Card className="h-96 animate-pulse bg-slate-50" /><Card className="h-96 animate-pulse bg-slate-50" /></div></div>;
}

export function AnalyticsErrorState({ onRetry }: { onRetry: () => void }) {
  return <Card className="flex min-h-80 flex-col items-center justify-center border-dashed px-6 text-center"><span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-destructive"><AlertCircle aria-hidden="true" className="size-5" /></span><h2 className="mt-4 text-lg font-semibold text-slate-950">Unable to load analytics</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">We couldn&apos;t prepare the business insights right now.</p><Button className="mt-5" onClick={onRetry}><RotateCw aria-hidden="true" className="size-4" /> Try again</Button></Card>;
}

export function AnalyticsEmptyState() {
  return <Card className="flex min-h-80 flex-col items-center justify-center border-dashed px-6 text-center"><span className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-primary"><BarChart3 aria-hidden="true" className="size-5" /></span><h2 className="mt-4 text-lg font-semibold text-slate-950">No analytics data for this period</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">There were no orders during the selected period.</p></Card>;
}
