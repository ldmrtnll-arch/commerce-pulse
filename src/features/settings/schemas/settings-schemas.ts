import { z } from "zod";
import { CURRENCIES, LOCALES, TIMEZONES } from "../types";

export const generalSettingsSchema = z.object({
  storeName: z.string().trim().min(2, "Store name must be at least 2 characters.").max(60, "Store name must be 60 characters or fewer."),
  supportEmail: z.email("Enter a valid email address."),
  timezone: z.enum(TIMEZONES),
  currency: z.enum(CURRENCIES),
  locale: z.enum(LOCALES),
});

export const notificationSettingsSchema = z.object({
  newOrder: z.boolean(), orderCancelled: z.boolean(), lowStock: z.boolean(),
  outOfStock: z.boolean(), campaignCompleted: z.boolean(), weeklySummary: z.boolean(),
});

export const appearanceSettingsSchema = z.object({
  density: z.enum(["comfortable", "compact"]),
  reduceMotion: z.boolean(),
});

export const commerceSettingsSchema = z.object({
  general: generalSettingsSchema,
  notifications: notificationSettingsSchema,
  appearance: appearanceSettingsSchema,
});
