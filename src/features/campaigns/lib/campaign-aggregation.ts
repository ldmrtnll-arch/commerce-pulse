import { customerAggregates } from "@/features/customers/lib/customer-aggregation";
import { orderFixtures } from "@/features/orders/fixtures/orders";
import { isRevenueEligibleOrder } from "@/features/orders/lib/order-economics";
import type { Campaign, CampaignAttributedCustomer, CampaignDetail, CampaignPerformance, CampaignPerformanceState, CustomerCampaignAttribution } from "@/types/campaign";
import type { Customer } from "@/types/customer";
import type { Order } from "@/types/order";
import { campaignFixtures, customerCampaignAttributions } from "../fixtures/campaigns";

function round(value: number): number { return Math.round((value + Number.EPSILON) * 100) / 100; }

export function getCampaignPerformanceState(roas: number | null): CampaignPerformanceState {
  if (roas === null) return "no_data";
  if (roas >= 3) return "strong";
  if (roas >= 1.5) return "healthy";
  return "watch";
}

export function aggregateCampaigns(sources: { campaigns?: Campaign[]; attributions?: CustomerCampaignAttribution[]; customers?: Customer[]; orders?: Order[] } = {}): CampaignPerformance[] {
  const campaigns = sources.campaigns ?? campaignFixtures;
  const attributions = sources.attributions ?? customerCampaignAttributions;
  const customers = sources.customers ?? customerAggregates;
  const orders = sources.orders ?? orderFixtures;
  const customersById = new Map(customers.map((customer) => [customer.id, customer]));
  const attributionsByCampaign = Map.groupBy(attributions, (attribution) => attribution.campaignId);
  return campaigns.map((campaign) => {
    const campaignAttributions = attributionsByCampaign.get(campaign.id) ?? [];
    const customerIds = new Set(campaignAttributions.map((attribution) => attribution.customerId));
    for (const customerId of customerIds) {
      const customer = customersById.get(customerId);
      if (!customer) throw new Error(`Campaign attribution could not resolve customer ${customerId}.`);
      if (customer.acquisitionChannel !== campaign.channel) throw new Error(`Campaign ${campaign.id} channel does not match customer ${customerId}.`);
    }
    const eligibleOrders = orders.filter((order) => customerIds.has(order.customer.id) && isRevenueEligibleOrder(order));
    const attributedRevenue = round(eligibleOrders.reduce((total, order) => total + order.total, 0));
    const roas = campaign.spend === 0 ? null : round(attributedRevenue / campaign.spend);
    return {
      campaign,
      customersAcquired: customerIds.size,
      ordersAttributed: eligibleOrders.length,
      attributedRevenue,
      roas,
      budgetUtilization: round((campaign.spend / campaign.budget) * 100),
      remainingBudget: round(campaign.budget - campaign.spend),
      performanceState: getCampaignPerformanceState(roas),
    };
  });
}

export function getCampaignDetail(campaignId: string, sources: { campaigns?: Campaign[]; attributions?: CustomerCampaignAttribution[]; customers?: Customer[]; orders?: Order[] } = {}): CampaignDetail | undefined {
  const campaigns = sources.campaigns ?? campaignFixtures;
  const attributions = sources.attributions ?? customerCampaignAttributions;
  const customers = sources.customers ?? customerAggregates;
  const orders = sources.orders ?? orderFixtures;
  const performance = aggregateCampaigns({ campaigns, attributions, customers, orders }).find((item) => item.campaign.id === campaignId);
  if (!performance) return undefined;
  const attributedIds = new Set(attributions.filter((attribution) => attribution.campaignId === campaignId).map((attribution) => attribution.customerId));
  const attributedCustomers: CampaignAttributedCustomer[] = customers.filter((customer) => attributedIds.has(customer.id)).map((customer) => {
    const eligibleOrders = orders.filter((order) => order.customer.id === customer.id && isRevenueEligibleOrder(order));
    return { customer, eligibleOrders: eligibleOrders.length, attributedRevenue: round(eligibleOrders.reduce((total, order) => total + order.total, 0)) };
  });
  return { ...performance, attributedCustomers };
}
