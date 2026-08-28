export function StoreProfile() {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-slate-50 p-3">
      <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
        NS
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">Northstar Store</p>
        <p className="truncate text-xs text-muted-foreground">Store Admin</p>
      </div>
    </div>
  );
}
