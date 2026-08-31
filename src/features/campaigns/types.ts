import type { CampaignChannel, CampaignDetail, CampaignPerformance, CampaignStatus } from "@/types/campaign";

export const campaignSorts = ["recent", "oldest", "highest-revenue", "highest-roas", "highest-spend", "lowest-spend", "name-asc"] as const;
export type CampaignSort = (typeof campaignSorts)[number];

export interface GetCampaignsParams {
  page: number;
  pageSize: number;
  search: string;
  status: CampaignStatus | "all";
  channel: CampaignChannel | "all";
  sort: CampaignSort;
  simulateError: boolean;
}

export interface CampaignSummary {
  activeCampaigns: number;
  totalSpend: number;
  attributedRevenue: number;
  averageRoas: number | null;
}

export interface PaginatedCampaigns {
  data: CampaignPerformance[];
  summary: CampaignSummary;
  pagination: { page: number; pageSize: number; totalItems: number; totalPages: number };
}

export type { CampaignDetail };
