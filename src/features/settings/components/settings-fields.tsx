import type { ComponentProps, ReactNode } from "react";

export const fieldClass = "h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <div><label className="block"><span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>{children}</label>{error ? <p className="mt-1.5 text-sm text-destructive" role="alert">{error}</p> : null}</div>;
}

export function CheckboxRow({ title, description, ...props }: { title: string; description: string } & ComponentProps<"input">) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60">
      <span><span className="block text-sm font-medium text-foreground">{title}</span><span className="mt-1 block text-sm leading-5 text-muted-foreground">{description}</span></span>
      <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-indigo-600" {...props} />
    </label>
  );
}

export function FormActions({ dirty, saving, onReset }: { dirty: boolean; saving: boolean; onReset: () => void }) {
  return <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-5"><button type="button" onClick={onReset} disabled={!dirty || saving} className="h-10 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-50">Reset</button><button type="submit" disabled={!dirty || saving} className="h-10 min-w-28 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-50">{saving ? "Saving…" : "Save changes"}</button></div>;
}
