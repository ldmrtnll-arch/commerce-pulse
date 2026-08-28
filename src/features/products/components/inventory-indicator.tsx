import type { Product } from "@/types/product";
import { getInventoryFillRatio, getStockHealth, getStockHealthLabel } from "../lib/inventory";

const barStyles = { healthy: "bg-emerald-500", low: "bg-amber-500", out: "bg-red-500" } as const;

export function InventoryIndicator({ product, compact = false }: { product: Product; compact?: boolean }) {
  const health = getStockHealth(product);
  const fill = getInventoryFillRatio(product);
  return (
    <div className={compact ? "w-28" : "w-full"}>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-slate-700">{product.inventory.available} available</span>
        {!compact && <span className="text-muted-foreground">{getStockHealthLabel(health)}</span>}
      </div>
      <div aria-hidden="true" className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${barStyles[health]}`} style={{ width: `${fill * 100}%` }} />
      </div>
      {compact && <span className={`mt-1 block text-[11px] ${health === "healthy" ? "text-success" : health === "low" ? "text-warning" : "text-destructive"}`}>{getStockHealthLabel(health)}</span>}
    </div>
  );
}
