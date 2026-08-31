import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import type { ProductPerformance } from "@/types/analytics";

export function TopProductsPanel({ products, returnUrl }: { products: ProductPerformance[]; returnUrl: string }) {
  return <ol className="divide-y divide-border">{products.map((product, index) => <li key={product.productId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"><span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-700">{index + 1}</span><div className="min-w-0 flex-1"><Link href={`/products/${product.productId}?returnTo=${encodeURIComponent(returnUrl)}`} className="group inline-flex max-w-full items-center gap-1 rounded text-sm font-medium text-slate-900 outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"><span className="truncate">{product.name}</span><ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" /></Link><p className="mt-0.5 text-xs text-muted-foreground">{product.unitsSold} units · {product.orderCount} orders</p></div><p className="shrink-0 text-sm font-semibold tabular-nums text-slate-950">{formatCurrency(product.revenue)}</p></li>)}</ol>;
}
