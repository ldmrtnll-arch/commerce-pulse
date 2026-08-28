import type { AcquisitionChannel, Customer, CustomerDetail, CustomerSegment } from "@/types/customer";

export const customerSorts = ["recent", "oldest", "highest-value", "lowest-value", "most-orders", "name-asc"] as const;
export type CustomerSort = (typeof customerSorts)[number];

export interface GetCustomersParams {
  page: number;
  pageSize: number;
  search: string;
  segment: CustomerSegment | "all";
  acquisition: AcquisitionChannel | "all";
  sort: CustomerSort;
  simulateError: boolean;
}

export interface CustomerSummary {
  totalCustomers: number;
  loyalCustomers: number;
  atRiskCustomers: number;
  averageCustomerValue: number;
}

export interface PaginatedCustomers {
  data: Customer[];
  summary: CustomerSummary;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export type { CustomerDetail };
