import type { CampaignChannel, CampaignObjective, CampaignPerformanceState, CampaignStatus } from "@/types/campaign";

export const campaignStatusLabels: Record<CampaignStatus, string> = { draft: "Draft", scheduled: "Scheduled", active: "Active", paused: "Paused", completed: "Completed" };
export const campaignChannelLabels: Record<CampaignChannel, string> = { paid_search: "Paid Search", social: "Social", email: "Email", referral: "Referral" };
export const campaignObjectiveLabels: Record<CampaignObjective, string> = { revenue: "Revenue", acquisition: "Customer acquisition", retention: "Retention", product_launch: "Product launch" };
export const campaignPerformanceLabels: Record<CampaignPerformanceState, string> = { strong: "Strong", healthy: "Healthy", watch: "Watch", no_data: "No data" };

export function formatRoas(roas: number | null): string { return roas === null ? "—" : `${roas.toFixed(2)}×`; }
