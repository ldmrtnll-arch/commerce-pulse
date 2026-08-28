"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../api/products-api";
import type { GetProductsParams } from "../types";

export const productQueryKeys = {
  all: ["products"] as const,
  list: (params: GetProductsParams) => [...productQueryKeys.all, "list", params] as const,
  detail: (productId: string) => [...productQueryKeys.all, "detail", productId] as const,
};

export function useProducts(params: GetProductsParams) {
  return useQuery({ queryKey: productQueryKeys.list(params), queryFn: () => getProducts(params), placeholderData: keepPreviousData });
}

export function useProduct(productId: string) {
  return useQuery({ queryKey: productQueryKeys.detail(productId), queryFn: () => getProductById(productId) });
}
