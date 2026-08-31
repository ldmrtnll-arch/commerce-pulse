"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from "react";

export interface ToastMessage { id: number; tone: "success" | "error"; text: string }

export function SettingsToast({ toast, onDismiss }: { toast: ToastMessage | null; onDismiss: () => void }) {
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(onDismiss, 4000); return () => window.clearTimeout(timer); }, [toast, onDismiss]);
  if (!toast) return null;
  const Icon = toast.tone === "success" ? CheckCircle2 : XCircle;
  return <div className="fixed bottom-5 right-5 z-[70] flex max-w-[calc(100%-2.5rem)] items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-lg" role={toast.tone === "error" ? "alert" : "status"}><Icon aria-hidden="true" className={`mt-0.5 size-5 ${toast.tone === "success" ? "text-success" : "text-destructive"}`} /><span className="text-sm font-medium">{toast.text}</span><button type="button" onClick={onDismiss} className="ml-2 text-sm text-muted-foreground hover:text-foreground" aria-label="Dismiss notification">×</button></div>;
}
