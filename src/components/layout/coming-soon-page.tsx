import type { LucideIcon } from "lucide-react";

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ComingSoonPage({ title, description, icon: Icon }: ComingSoonPageProps) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Workspace</p>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      <section className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-card px-6 text-center">
        <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-primary">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <h2 className="text-base font-semibold text-slate-900">Coming in the next phase</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          This workspace is prepared for the next development phase and will build on the shared application foundation.
        </p>
      </section>
    </div>
  );
}
