"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseSettingsSection, settingsSectionUrl } from "../lib/settings-search-params";

export function useSettingsUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return {
    section: parseSettingsSection(searchParams),
    simulateLoadError: searchParams.get("error") === "true",
    simulateSaveError: searchParams.get("saveError") === "true",
    navigate: (section: Parameters<typeof settingsSectionUrl>[0]) => router.push(`${pathname}${settingsSectionUrl(section).replace("/settings", "")}`, { scroll: false }),
  };
}
