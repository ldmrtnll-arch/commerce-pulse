export const productStatuses = ["active", "draft", "out_of_stock", "archived"] as const;
export const productCategoryValues = ["apparel", "footwear", "accessories", "home", "electronics", "fitness"] as const;

export type ProductStatus = (typeof productStatuses)[number];
export type ProductCategory = (typeof productCategoryValues)[number];
export type StockHealth = "healthy" | "low" | "out";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: ProductCategory;
  status: ProductStatus;
  price: number;
  compareAtPrice?: number;
  inventory: {
    available: number;
    reserved: number;
    reorderPoint: number;
  };
  unitsSold: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}
