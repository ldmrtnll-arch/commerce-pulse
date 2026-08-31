import { describe, expect, it } from "vitest";
import { aggregateCampaigns, getCampaignDetail, getCampaignPerformanceState } from "./campaign-aggregation";

describe("campaign aggregation", () => {
  it("calculates a known campaign independently from customer_002 orders", () => {
    const detail = getCampaignDetail("campaign_001");
    expect(detail).toMatchObject({
      customersAcquired: 1,
      ordersAttributed: 3,
      attributedRevenue: 2093.9,
      roas: 1.94,
      budgetUtilization: 90,
      remainingBudget: 120,
      performanceState: "healthy",
    });
    expect(detail?.attributedCustomers[0]).toMatchObject({ eligibleOrders: 3, attributedRevenue: 2093.9 });
  });

  it("excludes cancelled and refunded orders from attribution", () => {
    const detail = getCampaignDetail("campaign_002");
    expect(detail).toMatchObject({ customersAcquired: 1, ordersAttributed: 2, attributedRevenue: 1249.38 });
  });

  it("returns null ROAS and no-data state when spend is zero", () => {
    const draft = getCampaignDetail("campaign_023");
    expect(draft).toMatchObject({ roas: null, budgetUtilization: 0, performanceState: "no_data" });
  });

  it("applies explicit ROAS performance boundaries", () => {
    expect(getCampaignPerformanceState(null)).toBe("no_data");
    expect(getCampaignPerformanceState(1.49)).toBe("watch");
    expect(getCampaignPerformanceState(1.5)).toBe("healthy");
    expect(getCampaignPerformanceState(3)).toBe("strong");
  });

  it("reconciles the unique attributed portfolio", () => {
    const campaigns = aggregateCampaigns();
    expect(campaigns.reduce((total, item) => total + item.customersAcquired, 0)).toBe(20);
    expect(campaigns.reduce((total, item) => total + item.ordersAttributed, 0)).toBe(50);
    expect(campaigns.reduce((total, item) => total + item.attributedRevenue, 0)).toBeCloseTo(30381.29, 2);
  });
});
