import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "../repository/settings-repository";
import { appearanceSettingsSchema, commerceSettingsSchema, generalSettingsSchema, notificationSettingsSchema } from "./settings-schemas";

describe("settings schemas", () => {
  it("accepts the complete defaults", () => expect(commerceSettingsSchema.safeParse(DEFAULT_SETTINGS).success).toBe(true));
  it("trims and validates the store identity", () => {
    expect(generalSettingsSchema.parse({ ...DEFAULT_SETTINGS.general, storeName: "  Aurora  " }).storeName).toBe("Aurora");
    expect(generalSettingsSchema.safeParse({ ...DEFAULT_SETTINGS.general, storeName: " " }).success).toBe(false);
    const email = generalSettingsSchema.safeParse({ ...DEFAULT_SETTINGS.general, supportEmail: "invalid" });
    expect(email.success).toBe(false);
    if (!email.success) expect(email.error.issues[0]?.message).toBe("Enter a valid email address.");
  });
  it("rejects invalid enumerations and non-booleans", () => {
    expect(generalSettingsSchema.safeParse({ ...DEFAULT_SETTINGS.general, currency: "BTC" }).success).toBe(false);
    expect(notificationSettingsSchema.safeParse({ ...DEFAULT_SETTINGS.notifications, newOrder: "yes" }).success).toBe(false);
    expect(appearanceSettingsSchema.safeParse({ density: "dense", reduceMotion: false }).success).toBe(false);
  });
});
