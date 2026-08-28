"use client";

import { AlertCircle, ArrowLeft, BarChart3, Boxes, CalendarDays, RotateCw, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Product } from "@/types/product";
import { ProductNotFoundError } from "../api/products-api";
import { useProduct } from "../hooks/use-products";
import { getInventoryMessage, getStockHealth } from "../lib/inventory";
import { getProductCategoryLabel } from "../lib/product-labels";
import { InventoryIndicator } from "./inventory-indicator";
import { ProductStatusBadge, StockHealthBadge } from "./product-badges";
import { ProductThumbnail } from "./product-thumbnail";

function ProductDetailSkeleton() {
  return <div aria-hidden="true" className="space-y-6"><div className="h-32 animate-pulse rounded-card bg-slate-100" /><div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]"><div className="h-96 animate-pulse rounded-card bg-slate-100" /><div className="h-96 animate-pulse rounded-card bg-slate-100" /></div></div>;
}

function ProductDetailError({ notFound, returnTo, onRetry }: { notFound: boolean; returnTo: string; onRetry: () => void }) {
  return <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-card border border-dashed border-slate-300 bg-card px-6 text-center"><span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-destructive"><AlertCircle aria-hidden="true" className="size-5" /></span><h1 className="mt-4 text-xl font-semibold text-slate-950">{notFound ? "Product not found" : "Unable to load product"}</h1><p className="mt-2 max-w-sm text-sm text-muted-foreground">{notFound ? "This product does not exist or may have been removed." : "We couldn't load this product right now."}</p><div className="mt-5 flex gap-3"><Link href={returnTo} className="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Back to products</Link>{!notFound && <Button type="button" onClick={onRetry}><RotateCw aria-hidden="true" className="size-4" /> Try again</Button>}</div></div>;
}

function ProductOverview({ product }: { product: Product }) {
  const details = [
    ["Category", getProductCategoryLabel(product.category)],
    ["Status", product.status === "out_of_stock" ? "Out of stock" : `${product.status.charAt(0).toUpperCase()}${product.status.slice(1)}`],
    ["Created", formatDate(product.createdAt)],
    ["Last updated", formatDate(product.updatedAt)],
  ];
  return <Card className="p-5 sm:p-6"><div className="flex items-center gap-2"><Tag aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Product overview</h2></div><dl className="mt-5 grid gap-5 sm:grid-cols-2">{details.map(([label, value]) => <div key={label}><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1.5 text-sm font-medium text-slate-900">{value}</dd></div>)}</dl></Card>;
}

function InventoryDetails({ product }: { product: Product }) {
  const health = getStockHealth(product);
  return <Card className="p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><Boxes aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Inventory</h2></div><StockHealthBadge health={health} /></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{getInventoryMessage(product)}</p><div className="mt-5"><InventoryIndicator product={product} /></div><dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">{[["Available", product.inventory.available], ["Reserved", product.inventory.reserved], ["Reorder point", product.inventory.reorderPoint]].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 text-xl font-semibold tabular-nums text-slate-950">{value}</dd></div>)}</dl></Card>;
}

function ProductContent({ product, returnTo }: { product: Product; returnTo: string }) {
  const health = getStockHealth(product);
  return <div className="space-y-6">
    <Link href={returnTo} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-slate-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft aria-hidden="true" className="size-4" /> Back to products</Link>
    <header className="flex flex-col gap-5 rounded-card border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex items-center gap-4"><ProductThumbnail category={product.category} large /><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-semibold tracking-tight text-slate-950">{product.name}</h1><ProductStatusBadge status={product.status} /></div><p className="mt-1.5 text-sm text-muted-foreground">SKU {product.sku}</p></div></div><div className="sm:text-right"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Price</p><div className="mt-1 flex items-baseline gap-2 sm:justify-end"><p className="text-2xl font-semibold tabular-nums text-slate-950">{formatCurrency(product.price)}</p>{product.compareAtPrice && <p className="text-sm tabular-nums text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</p>}</div><div className="mt-2"><StockHealthBadge health={health} /></div></div></header>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]"><div className="space-y-6"><ProductOverview product={product} /><Card className="p-5 sm:p-6"><h2 className="text-base font-semibold text-slate-950">Product information</h2><p className="mt-4 text-sm leading-7 text-slate-700">{product.description}</p><div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground"><CalendarDays aria-hidden="true" className="size-4" /> Updated {formatDate(product.updatedAt)}</div></Card></div><div className="space-y-6"><InventoryDetails product={product} /><Card className="p-5 sm:p-6"><div className="flex items-center gap-2"><BarChart3 aria-hidden="true" className="size-4 text-muted-foreground" /><h2 className="text-base font-semibold text-slate-950">Performance</h2></div><dl className="mt-5 grid grid-cols-2 gap-4"><div><dt className="text-xs text-muted-foreground">Units sold</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">{product.unitsSold}</dd></div><div><dt className="text-xs text-muted-foreground">Revenue</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">{formatCurrency(product.revenue)}</dd></div></dl></Card></div></div>
  </div>;
}

export function ProductDetails({ productId, returnTo }: { productId: string; returnTo: string }) {
  const query = useProduct(productId);
  if (query.isPending) return <ProductDetailSkeleton />;
  if (query.isError) return <ProductDetailError notFound={query.error instanceof ProductNotFoundError} returnTo={returnTo} onRetry={() => void query.refetch()} />;
  return <ProductContent product={query.data} returnTo={returnTo} />;
}
