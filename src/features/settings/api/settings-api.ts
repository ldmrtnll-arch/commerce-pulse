import { waitForMockApi } from "@/lib/mock-api";
import { loadSettings, saveSettingsSection } from "../repository/settings-repository";
import type { CommerceSettings, SettingsSection } from "../types";

interface SettingsApiOptions { latencyMs?: number; simulateError?: boolean }

async function wait(options: SettingsApiOptions) {
  await waitForMockApi(options.latencyMs ?? 400);
  if (options.simulateError && process.env.NODE_ENV !== "production") throw new Error("The controlled settings request failed.");
}

export async function getSettings(options: SettingsApiOptions = {}): Promise<CommerceSettings> {
  await wait(options);
  return loadSettings();
}

export async function updateSettingsSection<K extends SettingsSection>(section: K, value: CommerceSettings[K], options: SettingsApiOptions = {}): Promise<CommerceSettings> {
  await wait(options);
  return saveSettingsSection(section, value);
}
