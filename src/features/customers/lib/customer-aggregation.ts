import { orderFixtures, ORDERS_DATASET_REFERENCE_DATE } from "@/features/orders/fixtures/orders";
import type { Customer, CustomerProfile, CustomerSegment } from "@/types/customer";
import type { Order } from "@/types/order";
import { customerProfiles } from "../fixtures/customer-profiles";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
export const CUSTOMER_SEGMENT_THRESHOLDS = {
  atRiskDays: 24,
  loyalOrders: 5,
  loyalLifetimeValue: 1800,
  newCustomerDays: 69,
  newCustomerMaxOrders: 3,
} as const;

export interface CustomerSegmentInput {
  ordersCount: number;
  lifetimeValue: number;
  daysSinceFirstOrder: number;
  daysSinceLastOrder: number;
}

function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getDaysSince(date: string, referenceDate = ORDERS_DATASET_REFERENCE_DATE): number {
  return Math.max(0, Math.floor((new Date(referenceDate).getTime() - new Date(date).getTime()) / DAY_IN_MS));
}

// Priority is intentional: inactivity overrides value, then loyalty overrides recent tenure.
export function getCustomerSegment(input: CustomerSegmentInput): CustomerSegment {
  if (input.ordersCount >= 2 && input.daysSinceLastOrder >= CUSTOMER_SEGMENT_THRESHOLDS.atRiskDays) return "at_risk";
  if (input.ordersCount >= CUSTOMER_SEGMENT_THRESHOLDS.loyalOrders || input.lifetimeValue >= CUSTOMER_SEGMENT_THRESHOLDS.loyalLifetimeValue) return "loyal";
  if (input.ordersCount <= CUSTOMER_SEGMENT_THRESHOLDS.newCustomerMaxOrders && input.daysSinceFirstOrder <= CUSTOMER_SEGMENT_THRESHOLDS.newCustomerDays) return "new";
  return "returning";
}

export function getCustomerSegmentInsight(customer: Customer): string {
  if (customer.segment === "at_risk") return `This customer has not placed an order in ${customer.daysSinceLastOrder} days.`;
  if (customer.segment === "loyal") return `This customer has placed ${customer.ordersCount} orders with a lifetime value of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(customer.lifetimeValue)}.`;
  if (customer.segment === "new") return `This customer placed their first order ${customer.daysSinceFirstOrder} days ago and is beginning a relationship with the store.`;
  return `This customer has returned for ${customer.ordersCount} purchases, most recently ${customer.daysSinceLastOrder} days ago.`;
}

function buildCustomer(orders: Order[], profile: CustomerProfile): Customer {
  const sortedOrders = [...orders].sort((left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime());
  const firstOrder = sortedOrders[0];
  const lastOrder = sortedOrders.at(-1) ?? firstOrder;
  const identity = firstOrder.customer;
  if (sortedOrders.some((order) => order.customer.name !== identity.name || order.customer.email !== identity.email)) {
    throw new Error(`Customer identity mismatch for ${identity.id}.`);
  }
  const lifetimeValue = roundCurrency(sortedOrders.reduce((total, order) => total + order.total, 0));
  const metrics: CustomerSegmentInput = {
    ordersCount: sortedOrders.length,
    lifetimeValue,
    daysSinceFirstOrder: getDaysSince(firstOrder.createdAt),
    daysSinceLastOrder: getDaysSince(lastOrder.createdAt),
  };
  return {
    id: identity.id,
    name: identity.name,
    email: identity.email,
    phone: profile.phone,
    location: {
      city: lastOrder.shippingAddress.city,
      state: lastOrder.shippingAddress.state,
      country: lastOrder.shippingAddress.country,
    },
    joinedAt: profile.joinedAt,
    acquisitionChannel: profile.acquisitionChannel,
    ordersCount: metrics.ordersCount,
    lifetimeValue,
    averageOrderValue: roundCurrency(lifetimeValue / metrics.ordersCount),
    firstOrderAt: firstOrder.createdAt,
    lastOrderAt: lastOrder.createdAt,
    daysSinceFirstOrder: metrics.daysSinceFirstOrder,
    daysSinceLastOrder: metrics.daysSinceLastOrder,
    segment: getCustomerSegment(metrics),
  };
}

export function aggregateCustomers(orders = orderFixtures, profiles = customerProfiles): Customer[] {
  const ordersByCustomer = new Map<string, Order[]>();
  for (const order of orders) {
    const customerOrders = ordersByCustomer.get(order.customer.id) ?? [];
    customerOrders.push(order);
    ordersByCustomer.set(order.customer.id, customerOrders);
  }
  const profilesById = new Map(profiles.map((profile) => [profile.id, profile]));
  if (profilesById.size !== profiles.length) throw new Error("Customer profiles contain duplicate IDs.");
  for (const profile of profiles) if (!ordersByCustomer.has(profile.id)) throw new Error(`Orphan customer profile ${profile.id}.`);
  return [...ordersByCustomer.entries()].map(([customerId, customerOrders]) => {
    const profile = profilesById.get(customerId);
    if (!profile) throw new Error(`Missing customer profile ${customerId}.`);
    return buildCustomer(customerOrders, profile);
  });
}

export const customerAggregates = aggregateCustomers();

export function getOrdersForCustomer(customerId: string): Order[] {
  return orderFixtures
    .filter((order) => order.customer.id === customerId)
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
}
