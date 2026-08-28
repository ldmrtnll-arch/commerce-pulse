import type { Product, StockHealth } from "@/types/product";

export function getStockHealth(product: Pick<Product, "inventory">): StockHealth {
  const { available, reorderPoint } = product.inventory;
  if (available === 0) return "out";
  if (available <= reorderPoint) return "low";
  return "healthy";
}

export function getInventoryFillRatio(product: Pick<Product, "inventory">): number {
  const { available, reorderPoint } = product.inventory;
  if (available === 0) return 0;
  return Math.min(1, available / Math.max(reorderPoint * 2, 1));
}

export function getStockHealthLabel(health: StockHealth): string {
  if (health === "out") return "Out of stock";
  if (health === "low") return "Low stock";
  return "Healthy";
}

export function getInventoryMessage(product: Pick<Product, "inventory">): string {
  const { available, reorderPoint } = product.inventory;
  const health = getStockHealth(product);
  if (health === "out") return `No units available. Reorder point is ${reorderPoint}.`;
  if (health === "low") return `Only ${available} units available. Reorder point is ${reorderPoint}.`;
  return `${available} units available, above the reorder point of ${reorderPoint}.`;
}
