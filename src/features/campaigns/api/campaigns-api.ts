import { waitForMockApi } from "@/lib/mock-api";
import { aggregateCampaigns, getCampaignDetail } from "../lib/campaign-aggregation";
import { ORDERS_DATASET_REFERENCE_DATE } from "@/features/orders/fixtures/orders";
import type { CampaignDetail, CampaignSummary, GetCampaignsParams, PaginatedCampaigns } from "../types";

interface MockApiOptions { latencyMs?: number }

export class CampaignNotFoundError extends Error {
  constructor(campaignId: string) { super(`Campaign ${campaignId} was not found.`); this.name = "CampaignNotFoundError"; }
}

export function getCampaignSummary(): CampaignSummary {
  const campaigns = aggregateCampaigns();
  const withSpend = campaigns.filter((item) => item.roas !== null);
  const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
  return {
    activeCampaigns: campaigns.filter((item) => item.campaign.status === "active").length,
    totalSpend: round(campaigns.reduce((total, item) => total + item.campaign.spend, 0)),
    attributedRevenue: round(campaigns.reduce((total, item) => total + item.attributedRevenue, 0)),
    averageRoas: withSpend.length ? round(withSpend.reduce((total, item) => total + (item.roas ?? 0), 0) / withSpend.length) : null,
  };
}

export async function getCampaigns(params: GetCampaignsParams, options: MockApiOptions = {}): Promise<PaginatedCampaigns> {
  await waitForMockApi(options.latencyMs);
  if (params.simulateError && process.env.NODE_ENV !== "production") throw new Error("The controlled campaign request failed.");
  const search = params.search.toLowerCase();
  const filtered = aggregateCampaigns().filter((item) => {
    const matchesSearch = !search || item.campaign.name.toLowerCase().includes(search) || item.campaign.description.toLowerCase().includes(search);
    const matchesStatus = params.status === "all" || item.campaign.status === params.status;
    const matchesChannel = params.channel === "all" || item.campaign.channel === params.channel;
    return matchesSearch && matchesStatus && matchesChannel;
  });
  const sorted = [...filtered].sort((left, right) => {
    if (params.sort === "oldest") return left.campaign.startDate.localeCompare(right.campaign.startDate);
    if (params.sort === "highest-revenue") return right.attributedRevenue - left.attributedRevenue || right.campaign.startDate.localeCompare(left.campaign.startDate);
    if (params.sort === "highest-roas") return (right.roas ?? -1) - (left.roas ?? -1) || right.attributedRevenue - left.attributedRevenue;
    if (params.sort === "highest-spend") return right.campaign.spend - left.campaign.spend || right.campaign.startDate.localeCompare(left.campaign.startDate);
    if (params.sort === "lowest-spend") return left.campaign.spend - right.campaign.spend || right.campaign.startDate.localeCompare(left.campaign.startDate);
    if (params.sort === "name-asc") return left.campaign.name.localeCompare(right.campaign.name);
    const referenceDate = ORDERS_DATASET_REFERENCE_DATE.slice(0, 10);
    const leftStarted = left.campaign.startDate <= referenceDate;
    const rightStarted = right.campaign.startDate <= referenceDate;
    if (leftStarted !== rightStarted) return leftStarted ? -1 : 1;
    return leftStarted ? right.campaign.startDate.localeCompare(left.campaign.startDate) : left.campaign.startDate.localeCompare(right.campaign.startDate);
  });
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / params.pageSize));
  const page = Math.min(params.page, totalPages);
  const start = (page - 1) * params.pageSize;
  return { data: sorted.slice(start, start + params.pageSize), summary: getCampaignSummary(), pagination: { page, pageSize: params.pageSize, totalItems, totalPages } };
}

export async function getCampaignById(campaignId: string, options: MockApiOptions = {}): Promise<CampaignDetail> {
  await waitForMockApi(options.latencyMs);
  const detail = getCampaignDetail(campaignId);
  if (!detail) throw new CampaignNotFoundError(campaignId);
  return detail;
}
