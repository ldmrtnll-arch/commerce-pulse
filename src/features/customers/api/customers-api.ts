import { waitForMockApi } from "@/lib/mock-api";
import type { CustomerDetail } from "@/types/customer";
import { customerAggregates, getOrdersForCustomer } from "../lib/customer-aggregation";
import type { CustomerSummary, GetCustomersParams, PaginatedCustomers } from "../types";

interface MockApiOptions { latencyMs?: number }

export class CustomerNotFoundError extends Error {
  constructor(customerId: string) {
    super(`Customer ${customerId} was not found.`);
    this.name = "CustomerNotFoundError";
  }
}

export function getCustomerSummary(): CustomerSummary {
  const totalValue = customerAggregates.reduce((total, customer) => total + customer.lifetimeValue, 0);
  return {
    totalCustomers: customerAggregates.length,
    loyalCustomers: customerAggregates.filter((customer) => customer.segment === "loyal").length,
    atRiskCustomers: customerAggregates.filter((customer) => customer.segment === "at_risk").length,
    averageCustomerValue: Math.round((totalValue / customerAggregates.length + Number.EPSILON) * 100) / 100,
  };
}

export async function getCustomers(params: GetCustomersParams, options: MockApiOptions = {}): Promise<PaginatedCustomers> {
  await waitForMockApi(options.latencyMs);
  if (params.simulateError && process.env.NODE_ENV !== "production") throw new Error("The controlled customer request failed.");

  const search = params.search.toLowerCase();
  const filtered = customerAggregates.filter((customer) => {
    const matchesSearch = !search || customer.name.toLowerCase().includes(search) || customer.email.toLowerCase().includes(search);
    const matchesSegment = params.segment === "all" || customer.segment === params.segment;
    const matchesAcquisition = params.acquisition === "all" || customer.acquisitionChannel === params.acquisition;
    return matchesSearch && matchesSegment && matchesAcquisition;
  });

  const sorted = [...filtered].sort((left, right) => {
    if (params.sort === "oldest") return new Date(left.lastOrderAt).getTime() - new Date(right.lastOrderAt).getTime();
    if (params.sort === "highest-value") return right.lifetimeValue - left.lifetimeValue || new Date(right.lastOrderAt).getTime() - new Date(left.lastOrderAt).getTime();
    if (params.sort === "lowest-value") return left.lifetimeValue - right.lifetimeValue || new Date(right.lastOrderAt).getTime() - new Date(left.lastOrderAt).getTime();
    if (params.sort === "most-orders") return right.ordersCount - left.ordersCount || right.lifetimeValue - left.lifetimeValue;
    if (params.sort === "name-asc") return left.name.localeCompare(right.name);
    return new Date(right.lastOrderAt).getTime() - new Date(left.lastOrderAt).getTime();
  });

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / params.pageSize));
  const page = Math.min(params.page, totalPages);
  const start = (page - 1) * params.pageSize;
  return {
    data: sorted.slice(start, start + params.pageSize),
    summary: getCustomerSummary(),
    pagination: { page, pageSize: params.pageSize, totalItems, totalPages },
  };
}

export async function getCustomerById(customerId: string, options: MockApiOptions = {}): Promise<CustomerDetail> {
  await waitForMockApi(options.latencyMs);
  const customer = customerAggregates.find((candidate) => candidate.id === customerId);
  if (!customer) throw new CustomerNotFoundError(customerId);
  return { customer, orders: getOrdersForCustomer(customer.id) };
}
