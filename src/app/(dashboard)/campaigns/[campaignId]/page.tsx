import type { Metadata } from "next";
import { CampaignDetails } from "@/features/campaigns/components/campaign-details";
import { getSafeReturnUrl } from "@/lib/safe-return-url";

export const metadata: Metadata = { title: "Campaign details" };
export default async function CampaignDetailsPage({ params, searchParams }: { params: Promise<{ campaignId: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) { const [{ campaignId }, query] = await Promise.all([params, searchParams]); return <CampaignDetails campaignId={campaignId} returnTo={getSafeReturnUrl(query.returnTo, "/campaigns")} />; }
