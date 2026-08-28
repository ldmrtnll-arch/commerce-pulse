import type { ProductCategory, ProductStatus } from "@/types/product";

export const productCategories: ReadonlyArray<{ value: ProductCategory; label: string }> = [
  { value: "apparel", label: "Apparel" },
  { value: "footwear", label: "Footwear" },
  { value: "accessories", label: "Accessories" },
  { value: "home", label: "Home" },
  { value: "electronics", label: "Electronics" },
  { value: "fitness", label: "Fitness" },
];

export function getProductCategoryLabel(category: ProductCategory): string {
  return productCategories.find((item) => item.value === category)?.label ?? category;
}

export function getProductStatusLabel(status: ProductStatus): string {
  if (status === "out_of_stock") return "Out of stock";
  return `${status.charAt(0).toUpperCase()}${status.slice(1)}`;
}
