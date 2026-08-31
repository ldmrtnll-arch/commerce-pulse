import { describe, expect, it } from "vitest";
import { customerAggregates } from "@/features/customers/lib/customer-aggregation";
import { campaignChannels, campaignObjectives, campaignStatuses } from "@/types/campaign";
import { campaignFixtures, customerCampaignAttributions } from "./campaigns";

describe("campaign fixtures", () => {
  it("provides 30 unique, plausible campaigns across the complete lifecycle", () => {
    expect(campaignFixtures).toHaveLength(30);
    expect(new Set(campaignFixtures.map((campaign) => campaign.id))).toHaveLength(30);
    expect(new Set(campaignFixtures.map((campaign) => campaign.status))).toEqual(new Set(campaignStatuses));
    expect(new Set(campaignFixtures.map((campaign) => campaign.channel))).toEqual(new Set(campaignChannels));
    expect(new Set(campaignFixtures.map((campaign) => campaign.objective))).toEqual(new Set(campaignObjectives));
    expect(campaignFixtures.some((campaign) => campaign.name.length > 50)).toBe(true);
  });

  it("keeps dates, budgets, and spend internally consistent", () => {
    for (const campaign of campaignFixtures) {
      expect(campaign.budget).toBeGreaterThan(0);
      expect(campaign.spend).toBeGreaterThanOrEqual(0);
      expect(campaign.spend).toBeLessThanOrEqual(campaign.budget);
      if (campaign.endDate) expect(campaign.startDate <= campaign.endDate).toBe(true);
      if (campaign.status === "completed") expect(campaign.endDate).toBeDefined();
      if (campaign.status === "draft" || campaign.status === "scheduled") expect(campaign.spend).toBe(0);
    }
  });

  it("uses unique, valid first-touch attributions with matching channels", () => {
    const campaignsById = new Map(campaignFixtures.map((campaign) => [campaign.id, campaign]));
    const customersById = new Map(customerAggregates.map((customer) => [customer.id, customer]));
    expect(customerCampaignAttributions).toHaveLength(20);
    expect(new Set(customerCampaignAttributions.map((item) => item.customerId))).toHaveLength(20);
    for (const attribution of customerCampaignAttributions) {
      const campaign = campaignsById.get(attribution.campaignId);
      const customer = customersById.get(attribution.customerId);
      expect(campaign).toBeDefined();
      expect(customer).toBeDefined();
      expect(campaign?.channel).toBe(customer?.acquisitionChannel);
      expect(["draft", "scheduled"]).not.toContain(campaign?.status);
    }
  });

  it("leaves direct and organic customers unattributed", () => {
    const attributedIds = new Set(customerCampaignAttributions.map((item) => item.customerId));
    const unattributed = customerAggregates.filter((customer) => !attributedIds.has(customer.id));
    expect(unattributed).toHaveLength(10);
    expect(new Set(unattributed.map((customer) => customer.acquisitionChannel))).toEqual(new Set(["direct", "organic_search"]));
  });
});
