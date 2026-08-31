import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, loadSettings, saveSettingsSection, SETTINGS_STORAGE_KEY } from "./settings-repository";

class MemoryStorage {
  value: string | null = null;
  getItem() { return this.value; }
  setItem(_key: string, value: string) { this.value = value; }
}

describe("settings repository", () => {
  let storage: MemoryStorage;
  beforeEach(() => { storage = new MemoryStorage(); });

  it("returns independent defaults when storage is empty", () => {
    const settings = loadSettings(storage);
    expect(settings).toEqual(DEFAULT_SETTINGS);
    settings.general.storeName = "Changed";
    expect(loadSettings(storage).general.storeName).toBe("Northstar Store");
  });

  it("saves one section and reloads it without changing the others", () => {
    const saved = saveSettingsSection("general", { ...DEFAULT_SETTINGS.general, storeName: "Aurora Market" }, storage);
    expect(saved.general.storeName).toBe("Aurora Market");
    expect(loadSettings(storage)).toEqual(saved);
    expect(storage.value).toContain("Aurora Market");
  });

  it.each(["not json", JSON.stringify({ general: DEFAULT_SETTINGS.general }), JSON.stringify({ ...DEFAULT_SETTINGS, appearance: { density: "dense", reduceMotion: false } })])("falls back for corrupt, partial, or invalid data", (value) => {
    storage.value = value;
    expect(loadSettings(storage)).toEqual(DEFAULT_SETTINGS);
  });

  it("uses the documented storage key", () => { expect(SETTINGS_STORAGE_KEY).toBe("commerce-pulse.settings.v1"); });
});
