import { Badge } from "@/components/ui/badge";
import type { CampaignChannel, CampaignPerformanceState, CampaignStatus } from "@/types/campaign";
import { campaignChannelLabels, campaignPerformanceLabels, campaignStatusLabels } from "../lib/campaign-labels";

const statusStyles: Record<CampaignStatus, string> = {
  draft: "bg-slate-100 text-slate-700 ring-slate-600/20",
  scheduled: "bg-blue-50 text-blue-700 ring-blue-600/20",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  paused: "bg-amber-50 text-amber-800 ring-amber-600/20",
  completed: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
};
const channelStyles: Record<CampaignChannel, string> = {
  paid_search: "bg-violet-50 text-violet-700 ring-violet-600/20",
  social: "bg-sky-50 text-sky-700 ring-sky-600/20",
  email: "bg-rose-50 text-rose-700 ring-rose-600/20",
  referral: "bg-teal-50 text-teal-700 ring-teal-600/20",
};
const performanceStyles: Record<CampaignPerformanceState, string> = {
  strong: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  healthy: "bg-blue-50 text-blue-700 ring-blue-600/20",
  watch: "bg-amber-50 text-amber-800 ring-amber-600/20",
  no_data: "bg-slate-100 text-slate-700 ring-slate-600/20",
};

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) { return <Badge className={`whitespace-nowrap ${statusStyles[status]}`}>{campaignStatusLabels[status]}</Badge>; }
export function CampaignChannelBadge({ channel }: { channel: CampaignChannel }) { return <Badge className={`whitespace-nowrap ${channelStyles[channel]}`}>{campaignChannelLabels[channel]}</Badge>; }
export function CampaignPerformanceBadge({ state }: { state: CampaignPerformanceState }) { return <Badge className={performanceStyles[state]}>{campaignPerformanceLabels[state]}</Badge>; }
