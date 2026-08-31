"use client";

import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section aria-live="assertive" className="flex min-h-[28rem] flex-col items-center justify-center rounded-card border border-dashed border-red-200 bg-card px-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-destructive"><AlertCircle aria-hidden="true" className="size-5" /></span>
      <h1 className="mt-4 text-xl font-semibold text-slate-950">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">CommercePulse could not render this page. Try loading it again.</p>
      <Button type="button" className="mt-5" onClick={retry}><RotateCw aria-hidden="true" className="size-4" /> Try again</Button>
    </section>
  );
}
