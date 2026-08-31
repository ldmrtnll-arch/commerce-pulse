import { describe, expect, it } from "vitest";
import { getCampaignById, getCampaigns, getCampaignSummary, CampaignNotFoundError } from "./campaigns-api";
import type { GetCampaignsParams } from "../types";

const defaults: GetCampaignsParams = { page: 1, pageSize: 10, search: "", status: "all", channel: "all", sort: "recent", simulateError: false };

describe("campaign mock API", () => {
  it("returns global summary values independent of pagination", () => {
    expect(getCampaignSummary()).toMatchObject({ activeCampaigns: 7, totalSpend: 21072, attributedRevenue: 30381.29 });
  });

  it("searches campaign names and descriptions", async () => {
    const result = await getCampaigns({ ...defaults, search: "brand defense" }, { latencyMs: 0 });
    expect(result.data.map((item) => item.campaign.name)).toEqual(["Search Brand Defense", "Search Brand Defense September"]);
  });

  it("combines status and channel filters", async () => {
    const result = await getCampaigns({ ...defaults, status: "active", channel: "social" }, { latencyMs: 0 });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].campaign).toMatchObject({ status: "active", channel: "social" });
  });

  it("sorts revenue and ROAS descending with unavailable ROAS last", async () => {
    const revenue = await getCampaigns({ ...defaults, pageSize: 30, sort: "highest-revenue" }, { latencyMs: 0 });
    expect(revenue.data.map((item) => item.attributedRevenue)).toEqual([...revenue.data.map((item) => item.attributedRevenue)].sort((a, b) => b - a));
    const roas = await getCampaigns({ ...defaults, pageSize: 30, sort: "highest-roas" }, { latencyMs: 0 });
    const comparable = roas.data.filter((item) => item.roas !== null).map((item) => item.roas as number);
    expect(comparable).toEqual([...comparable].sort((a, b) => b - a));
    expect(roas.data.at(-1)?.roas).toBeNull();
  });

  it("paginates a real second page", async () => {
    const result = await getCampaigns({ ...defaults, page: 2 }, { latencyMs: 0 });
    expect(result.data).toHaveLength(10);
    expect(result.pagination).toEqual({ page: 2, pageSize: 10, totalItems: 30, totalPages: 3 });
  });

  it("returns detail and distinguishes a missing campaign", async () => {
    await expect(getCampaignById("campaign_001", { latencyMs: 0 })).resolves.toMatchObject({ campaign: { name: "Search Brand Defense" } });
    await expect(getCampaignById("missing", { latencyMs: 0 })).rejects.toBeInstanceOf(CampaignNotFoundError);
  });
});
