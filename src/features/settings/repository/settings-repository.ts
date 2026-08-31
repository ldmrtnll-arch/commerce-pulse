import { commerceSettingsSchema } from "../schemas/settings-schemas";
import type { CommerceSettings, SettingsSection } from "../types";

export const SETTINGS_STORAGE_KEY = "commerce-pulse.settings.v1";

export const DEFAULT_SETTINGS: CommerceSettings = {
  general: { storeName: "Northstar Store", supportEmail: "support@northstar.example", timezone: "America/New_York", currency: "USD", locale: "en-US" },
  notifications: { newOrder: true, orderCancelled: true, lowStock: true, outOfStock: true, campaignCompleted: false, weeklySummary: true },
  appearance: { density: "comfortable", reduceMotion: false },
};

function copyDefaults(): CommerceSettings { return structuredClone(DEFAULT_SETTINGS); }

export function loadSettings(storage: Pick<Storage, "getItem"> = window.localStorage): CommerceSettings {
  try {
    const stored = storage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) return copyDefaults();
    const result = commerceSettingsSchema.safeParse(JSON.parse(stored));
    return result.success ? result.data : copyDefaults();
  } catch { return copyDefaults(); }
}

export function saveSettingsSection<K extends SettingsSection>(section: K, value: CommerceSettings[K], storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): CommerceSettings {
  const next = { ...loadSettings(storage), [section]: value };
  const validated = commerceSettingsSchema.parse(next);
  storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(validated));
  return validated;
}
