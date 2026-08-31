import { Suspense } from "react";
import { SettingsLoading } from "@/features/settings/components/settings-states";
import { SettingsWorkspace } from "@/features/settings/components/settings-workspace";

export default function SettingsPage() {
  return <Suspense fallback={<SettingsLoading />}><SettingsWorkspace /></Suspense>;
}
