import type { OrderStatus } from "@/types/order";
import { Badge } from "./badge";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  processing: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  shipped: "bg-blue-50 text-blue-700 ring-blue-600/20",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  refunded: "bg-slate-100 text-slate-700 ring-slate-600/20",
};

export function getOrderStatusLabel(status: OrderStatus): string {
  return `${status.charAt(0).toUpperCase()}${status.slice(1)}`;
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge className={statusStyles[status]}>
      {getOrderStatusLabel(status)}
    </Badge>
  );
}
