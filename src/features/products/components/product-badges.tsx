import { Badge } from "@/components/ui/badge";
import type { ProductStatus, StockHealth } from "@/types/product";
import { getProductStatusLabel } from "../lib/product-labels";
import { getStockHealthLabel } from "../lib/inventory";

const productStatusStyles: Record<ProductStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  draft: "bg-slate-100 text-slate-700 ring-slate-600/20",
  out_of_stock: "bg-red-50 text-red-700 ring-red-600/20",
  archived: "bg-stone-100 text-stone-600 ring-stone-500/20",
};

const stockStyles: Record<StockHealth, string> = {
  healthy: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  low: "bg-amber-50 text-amber-700 ring-amber-600/20",
  out: "bg-red-50 text-red-700 ring-red-600/20",
};

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return <Badge className={productStatusStyles[status]}>{getProductStatusLabel(status)}</Badge>;
}

export function StockHealthBadge({ health }: { health: StockHealth }) {
  return <Badge className={stockStyles[health]}>{getStockHealthLabel(health)}</Badge>;
}
