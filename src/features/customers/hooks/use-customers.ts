"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCustomerById, getCustomers } from "../api/customers-api";
import type { GetCustomersParams } from "../types";

export const customerQueryKeys = {
  all: ["customers"] as const,
  list: (params: GetCustomersParams) => [...customerQueryKeys.all, "list", params] as const,
  detail: (customerId: string) => [...customerQueryKeys.all, "detail", customerId] as const,
};

export function useCustomers(params: GetCustomersParams) {
  return useQuery({ queryKey: customerQueryKeys.list(params), queryFn: () => getCustomers(params), placeholderData: keepPreviousData });
}

export function useCustomer(customerId: string) {
  return useQuery({ queryKey: customerQueryKeys.detail(customerId), queryFn: () => getCustomerById(customerId) });
}
