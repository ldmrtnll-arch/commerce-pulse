import { Suspense } from "react";
import type { Metadata } from "next";
import { CampaignsWorkspace } from "@/features/campaigns/components/campaigns-workspace";
import { CampaignSummarySkeleton } from "@/features/campaigns/components/campaign-summary";
import { CampaignsSkeleton } from "@/features/campaigns/components/campaign-states";

export const metadata: Metadata = { title: "Campaigns | CommercePulse", description: "Marketing spend, attributed revenue and campaign performance." };
export default function CampaignsPage() { return <div className="space-y-6"><header><p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Marketing performance</p><h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Campaigns</h1><p className="mt-1.5 text-sm text-muted-foreground">Track marketing spend, attributed revenue and campaign performance.</p></header><Suspense fallback={<div className="space-y-4"><CampaignSummarySkeleton /><CampaignsSkeleton /></div>}><CampaignsWorkspace /></Suspense></div>; }
