"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCampaignById, getCampaigns } from "../api/campaigns-api";
import type { GetCampaignsParams } from "../types";

export const campaignQueryKeys = {
  all: ["campaigns"] as const,
  list: (params: GetCampaignsParams) => [...campaignQueryKeys.all, "list", params] as const,
  detail: (campaignId: string) => [...campaignQueryKeys.all, "detail", campaignId] as const,
};

export function useCampaigns(params: GetCampaignsParams) { return useQuery({ queryKey: campaignQueryKeys.list(params), queryFn: () => getCampaigns(params), placeholderData: keepPreviousData }); }
export function useCampaign(campaignId: string) { return useQuery({ queryKey: campaignQueryKeys.detail(campaignId), queryFn: () => getCampaignById(campaignId) }); }
