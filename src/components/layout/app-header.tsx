import { Bell } from "lucide-react";
import { MobileNavigation } from "./mobile-navigation";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <MobileNavigation />
      <p className="hidden text-sm text-muted-foreground lg:block">Northstar Store</p>
      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-muted hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Bell aria-hidden="true" className="size-[19px]" strokeWidth={1.8} />
          <span aria-hidden="true" className="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-white" />
        </button>
        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white lg:hidden">NS</span>
      </div>
    </header>
  );
}
