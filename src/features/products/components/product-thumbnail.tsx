import { Dumbbell, Headphones, Home, Package, Shirt, ShoppingBag } from "lucide-react";
import type { ProductCategory } from "@/types/product";

const categoryIcons = { apparel: Shirt, footwear: ShoppingBag, accessories: Package, home: Home, electronics: Headphones, fitness: Dumbbell } as const;
const categoryStyles: Record<ProductCategory, string> = {
  apparel: "bg-violet-50 text-violet-600",
  footwear: "bg-blue-50 text-blue-600",
  accessories: "bg-amber-50 text-amber-700",
  home: "bg-emerald-50 text-emerald-700",
  electronics: "bg-indigo-50 text-indigo-600",
  fitness: "bg-rose-50 text-rose-600",
};

export function ProductThumbnail({ category, large = false }: { category: ProductCategory; large?: boolean }) {
  const Icon = categoryIcons[category];
  return <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-lg ${large ? "size-16" : "size-10"} ${categoryStyles[category]}`}><Icon className={large ? "size-7" : "size-[18px]"} strokeWidth={1.7} /></span>;
}
