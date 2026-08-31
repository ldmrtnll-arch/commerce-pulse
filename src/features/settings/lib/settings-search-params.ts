import type { SettingsSection } from "../types";

export function parseSettingsSection(params: Pick<URLSearchParams, "get">): SettingsSection {
  const section = params.get("section");
  return section === "notifications" || section === "appearance" ? section : "general";
}

export function settingsSectionUrl(section: SettingsSection): string {
  return section === "general" ? "/settings" : `/settings?section=${section}`;
}
