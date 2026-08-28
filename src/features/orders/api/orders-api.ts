import { orderFixtures, ORDERS_DATASET_REFERENCE_DATE } from "../fixtures/orders";
import type { GetOrdersParams, PaginatedOrders } from "../types";
import type { Order } from "@/types/order";

interface MockApiOptions {
  latencyMs?: number;
}

const DEFAULT_LATENCY_MS = 400;

export class OrderNotFoundError extends Error {
  constructor(orderId: string) {
    super(`Order ${orderId} was not found.`);
    this.name = "OrderNotFoundError";
  }
}

function wait(latencyMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, latencyMs));
}

function getPeriodStart(period: GetOrdersParams["period"]): number | null {
  if (period === "all") return null;
  const days = Number.parseInt(period, 10);
  const referenceTime = new Date(ORDERS_DATASET_REFERENCE_DATE).getTime();
  return referenceTime - days * 24 * 60 * 60 * 1000;
}

export async function getOrders(
  params: GetOrdersParams,
  options: MockApiOptions = {},
): Promise<PaginatedOrders> {
  await wait(options.latencyMs ?? DEFAULT_LATENCY_MS);

  if (params.simulateError && process.env.NODE_ENV !== "production") {
    throw new Error("The controlled mock request failed.");
  }

  const normalizedSearch = params.search.toLowerCase();
  const periodStart = getPeriodStart(params.period);

  const filteredOrders = orderFixtures.filter((order) => {
    const matchesSearch =
      !normalizedSearch ||
      order.number.toLowerCase().includes(normalizedSearch) ||
      order.customer.name.toLowerCase().includes(normalizedSearch) ||
      order.customer.email.toLowerCase().includes(normalizedSearch);
    const matchesStatus = params.status === "all" || order.status === params.status;
    const matchesPeriod = periodStart === null || new Date(order.createdAt).getTime() >= periodStart;
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const sortedOrders = [...filteredOrders].sort((left, right) => {
    if (params.sort === "highest") return right.total - left.total;
    if (params.sort === "lowest") return left.total - right.total;
    const dateDifference = new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    return params.sort === "oldest" ? -dateDifference : dateDifference;
  });

  const totalItems = sortedOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / params.pageSize));
  const page = Math.min(params.page, totalPages);
  const startIndex = (page - 1) * params.pageSize;

  return {
    data: sortedOrders.slice(startIndex, startIndex + params.pageSize),
    pagination: { page, pageSize: params.pageSize, totalItems, totalPages },
  };
}

export async function getOrderById(
  orderId: string,
  options: MockApiOptions = {},
): Promise<Order> {
  await wait(options.latencyMs ?? DEFAULT_LATENCY_MS);
  const order = orderFixtures.find(
    (candidate) => candidate.id === orderId || candidate.number.toLowerCase() === orderId.toLowerCase(),
  );
  if (!order) throw new OrderNotFoundError(orderId);
  return order;
}
