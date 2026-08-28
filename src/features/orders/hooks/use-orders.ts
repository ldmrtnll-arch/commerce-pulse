"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrderById, getOrders } from "../api/orders-api";
import type { GetOrdersParams } from "../types";

export const orderQueryKeys = {
  all: ["orders"] as const,
  list: (params: GetOrdersParams) => [...orderQueryKeys.all, "list", params] as const,
  detail: (orderId: string) => [...orderQueryKeys.all, "detail", orderId] as const,
};

export function useOrders(params: GetOrdersParams) {
  return useQuery({
    queryKey: orderQueryKeys.list(params),
    queryFn: () => getOrders(params),
    placeholderData: keepPreviousData,
  });
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderQueryKeys.detail(orderId),
    queryFn: () => getOrderById(orderId),
  });
}
