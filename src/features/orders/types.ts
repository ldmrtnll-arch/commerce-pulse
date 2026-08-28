import type { Order, OrderStatus } from "@/types/order";

export const orderSorts = ["newest", "oldest", "highest", "lowest"] as const;
export const orderPeriods = ["all", "7d", "30d", "90d"] as const;

export type OrderSort = (typeof orderSorts)[number];
export type OrderPeriod = (typeof orderPeriods)[number];

export interface GetOrdersParams {
  page: number;
  pageSize: number;
  search: string;
  status: OrderStatus | "all";
  sort: OrderSort;
  period: OrderPeriod;
  simulateError: boolean;
}

export interface PaginatedOrders {
  data: Order[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
