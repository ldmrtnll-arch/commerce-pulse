import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from "../repository/settings-repository";
import { getSettings, updateSettingsSection } from "./settings-api";

describe("settings mock API", () => {
  beforeEach(() => localStorage.removeItem(SETTINGS_STORAGE_KEY));

  it("loads defaults and persists section updates", async () => {
    expect(await getSettings({ latencyMs: 0 })).toEqual(DEFAULT_SETTINGS);
    const saved = await updateSettingsSection("appearance", { density: "compact", reduceMotion: true }, { latencyMs: 0 });
    expect(saved.appearance).toEqual({ density: "compact", reduceMotion: true });
    expect((await getSettings({ latencyMs: 0 })).general).toEqual(DEFAULT_SETTINGS.general);
  });

  it("exposes deterministic load and mutation failures", async () => {
    await expect(getSettings({ latencyMs: 0, simulateError: true })).rejects.toThrow("controlled settings request failed");
    await expect(updateSettingsSection("notifications", DEFAULT_SETTINGS.notifications, { latencyMs: 0, simulateError: true })).rejects.toThrow("controlled settings request failed");
  });
});
