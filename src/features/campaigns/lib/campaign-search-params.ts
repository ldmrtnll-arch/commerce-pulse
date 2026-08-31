import { campaignChannels, campaignStatuses, type CampaignChannel, type CampaignStatus } from "@/types/campaign";
import { campaignSorts, type CampaignSort, type GetCampaignsParams } from "../types";

export const CAMPAIGNS_PAGE_SIZE = 10;
interface SearchParamSource { get(name: string): string | null }
export type ServerSearchParams = Record<string, string | string[] | undefined>;

function isSearchParamSource(source: SearchParamSource | ServerSearchParams): source is SearchParamSource { return typeof Reflect.get(source, "get") === "function"; }
function readValue(source: SearchParamSource | ServerSearchParams, key: string): string | undefined {
  if (isSearchParamSource(source)) return source.get(key) ?? undefined;
  const value = source[key];
  return Array.isArray(value) ? value[0] : value;
}

export function parseCampaignSearchParams(source: SearchParamSource | ServerSearchParams): GetCampaignsParams {
  const rawPage = Number.parseInt(readValue(source, "page") ?? "1", 10);
  const status = readValue(source, "status");
  const channel = readValue(source, "channel");
  const sort = readValue(source, "sort");
  return {
    page: Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1,
    pageSize: CAMPAIGNS_PAGE_SIZE,
    search: (readValue(source, "search") ?? "").trim(),
    status: campaignStatuses.includes(status as CampaignStatus) ? status as CampaignStatus : "all",
    channel: campaignChannels.includes(channel as CampaignChannel) ? channel as CampaignChannel : "all",
    sort: campaignSorts.includes(sort as CampaignSort) ? sort as CampaignSort : "recent",
    simulateError: readValue(source, "error") === "true",
  };
}

export function hasActiveCampaignFilters(params: GetCampaignsParams): boolean {
  return Boolean(params.search || params.status !== "all" || params.channel !== "all" || params.sort !== "recent");
}
