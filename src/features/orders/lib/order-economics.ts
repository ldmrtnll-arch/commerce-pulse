import type { Order } from "@/types/order";

export function isRevenueEligibleOrder(order: Order): boolean {
  return order.status !== "cancelled" && order.status !== "refunded";
}
