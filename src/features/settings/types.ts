export const TIMEZONES = ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London", "America/Sao_Paulo"] as const;
export const CURRENCIES = ["USD", "CAD", "EUR", "GBP", "BRL"] as const;
export const LOCALES = ["en-US", "en-CA", "en-GB", "pt-BR"] as const;

export type SettingsSection = "general" | "notifications" | "appearance";

export interface GeneralSettings {
  storeName: string;
  supportEmail: string;
  timezone: (typeof TIMEZONES)[number];
  currency: (typeof CURRENCIES)[number];
  locale: (typeof LOCALES)[number];
}

export interface NotificationSettings {
  newOrder: boolean;
  orderCancelled: boolean;
  lowStock: boolean;
  outOfStock: boolean;
  campaignCompleted: boolean;
  weeklySummary: boolean;
}

export interface AppearanceSettings {
  density: "comfortable" | "compact";
  reduceMotion: boolean;
}

export interface CommerceSettings {
  general: GeneralSettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
}
