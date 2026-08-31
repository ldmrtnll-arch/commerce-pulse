"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettingsSection } from "../api/settings-api";
import type { CommerceSettings, SettingsSection } from "../types";

export const settingsQueryKey = ["settings"] as const;

export function useSettings(simulateError = false) {
  return useQuery({ queryKey: settingsQueryKey, queryFn: () => getSettings({ simulateError }), retry: false });
}

export function useUpdateSettings<K extends SettingsSection>(section: K, simulateError = false) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: CommerceSettings[K]) => updateSettingsSection(section, value, { simulateError }),
    onSuccess: (settings) => queryClient.setQueryData(settingsQueryKey, settings),
  });
}
