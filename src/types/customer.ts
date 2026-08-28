import type { Order } from "./order";

export const customerSegments = ["new", "returning", "loyal", "at_risk"] as const;
export type CustomerSegment = (typeof customerSegments)[number];

export const acquisitionChannels = [
  "organic_search",
  "paid_search",
  "social",
  "direct",
  "referral",
  "email",
] as const;
export type AcquisitionChannel = (typeof acquisitionChannels)[number];

export interface CustomerProfile {
  id: string;
  phone?: string;
  joinedAt: string;
  acquisitionChannel: AcquisitionChannel;
}

export interface CustomerLocation {
  city: string;
  state: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: CustomerLocation;
  joinedAt: string;
  acquisitionChannel: AcquisitionChannel;
  ordersCount: number;
  lifetimeValue: number;
  averageOrderValue: number;
  firstOrderAt: string;
  lastOrderAt: string;
  daysSinceFirstOrder: number;
  daysSinceLastOrder: number;
  segment: CustomerSegment;
}

export interface CustomerDetail {
  customer: Customer;
  orders: Order[];
}
