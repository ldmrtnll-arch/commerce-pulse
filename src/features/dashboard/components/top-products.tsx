import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatters";
import { topProducts } from "@/mocks/dashboard";

export function TopProducts() {
  return (
    <ol className="divide-y divide-border">
      {topProducts.map((product, index) => (
        <li key={product.name} className="flex items-center gap-3 py-4 first:pt-1 last:pb-0">
          <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">{product.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.unitsSold} units · {product.category}</p>
          </div>
          <p className="text-sm font-semibold tabular-nums text-slate-900">{formatCurrency(product.revenue)}</p>
        </li>
      ))}
      <li className="pt-4">
        <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-indigo-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          View products <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </li>
    </ol>
  );
}
