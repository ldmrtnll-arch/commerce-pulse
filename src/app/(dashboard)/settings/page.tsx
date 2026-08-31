import { Suspense } from "react";
import type { Metadata } from "next";
import { SettingsLoading } from "@/features/settings/components/settings-states";
import { SettingsWorkspace } from "@/features/settings/components/settings-workspace";

export const metadata: Metadata = { title: "Settings", description: "Manage Northstar Store preferences, notifications and appearance." };

export default function SettingsPage() {
  return <Suspense fallback={<SettingsLoading />}><SettingsWorkspace /></Suspense>;
}
