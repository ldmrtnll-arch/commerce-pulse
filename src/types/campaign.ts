import type { AcquisitionChannel, Customer } from "./customer";

export const campaignStatuses = ["draft", "scheduled", "active", "paused", "completed"] as const;
export type CampaignStatus = (typeof campaignStatuses)[number];

export const campaignObjectives = ["revenue", "acquisition", "retention", "product_launch"] as const;
export type CampaignObjective = (typeof campaignObjectives)[number];

export const campaignChannels = ["paid_search", "social", "email", "referral"] as const satisfies readonly AcquisitionChannel[];
export type CampaignChannel = (typeof campaignChannels)[number];

export interface Campaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  objective: CampaignObjective;
  startDate: string;
  endDate?: string;
  budget: number;
  spend: number;
  description: string;
}

export interface CustomerCampaignAttribution {
  customerId: string;
  campaignId: string;
}

export type CampaignPerformanceState = "strong" | "healthy" | "watch" | "no_data";

export interface CampaignPerformance {
  campaign: Campaign;
  customersAcquired: number;
  ordersAttributed: number;
  attributedRevenue: number;
  roas: number | null;
  budgetUtilization: number;
  remainingBudget: number;
  performanceState: CampaignPerformanceState;
}

export interface CampaignAttributedCustomer {
  customer: Customer;
  eligibleOrders: number;
  attributedRevenue: number;
}

export interface CampaignDetail extends CampaignPerformance {
  attributedCustomers: CampaignAttributedCustomer[];
}
