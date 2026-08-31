import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsLoading() {
  return <div role="status" aria-label="Loading settings" className="animate-pulse space-y-6"><div className="h-8 w-48 rounded bg-slate-200" /><div className="h-11 rounded-lg bg-slate-200" /><div className="rounded-card border border-border bg-card p-6"><div className="h-6 w-40 rounded bg-slate-200" /><div className="mt-6 grid gap-5 sm:grid-cols-2">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-16 rounded bg-slate-100" />)}</div></div></div>;
}

export function SettingsError({ onRetry }: { onRetry: () => void }) {
  return <div className="rounded-card border border-border bg-card px-6 py-16 text-center"><AlertCircle aria-hidden="true" className="mx-auto size-8 text-destructive" /><h1 className="mt-4 text-xl font-semibold">Unable to load settings</h1><p className="mt-2 text-sm text-muted-foreground">Your saved preferences could not be retrieved.</p><Button className="mt-5" onClick={onRetry}>Try again</Button></div>;
}
