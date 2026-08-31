"use client";

import { Bell, Palette, Settings2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { useSettings, useUpdateSettings } from "../hooks/use-settings";
import { useSettingsUrlState } from "../hooks/use-settings-url-state";
import type { CommerceSettings, SettingsSection } from "../types";
import { AppearanceSettingsForm } from "./appearance-settings-form";
import { GeneralSettingsForm } from "./general-settings-form";
import { NotificationSettingsForm } from "./notification-settings-form";
import { SettingsError, SettingsLoading } from "./settings-states";
import { SettingsToast, type ToastMessage } from "./settings-toast";
import { UnsavedChangesDialog } from "./unsaved-changes-dialog";

const sectionDetails = {
  general: { label: "General", title: "General settings", description: "Manage your store identity and regional preferences.", icon: Settings2 },
  notifications: { label: "Notifications", title: "Notifications", description: "Choose the store events you want to hear about.", icon: Bell },
  appearance: { label: "Appearance", title: "Appearance", description: "Personalize density and motion in your workspace.", icon: Palette },
} as const;

export function SettingsWorkspace() {
  const { section, navigate, simulateLoadError, simulateSaveError } = useSettingsUrlState();
  const query = useSettings(simulateLoadError);
  const generalMutation = useUpdateSettings("general", simulateSaveError);
  const notificationMutation = useUpdateSettings("notifications", simulateSaveError);
  const appearanceMutation = useUpdateSettings("appearance", simulateSaveError);
  const [dirty, setDirty] = useState(false);
  const [pendingSection, setPendingSection] = useState<SettingsSection | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const onDirtyChange = useCallback((next: boolean) => setDirty(next), []);
  const dismissToast = useCallback(() => setToast(null), []);

  if (query.isPending) return <SettingsLoading />;
  if (query.isError || !query.data) return <SettingsError onRetry={() => void query.refetch()} />;

  const requestSection = (next: SettingsSection) => {
    if (next === section) return;
    if (dirty) setPendingSection(next); else navigate(next);
  };
  const completeSave = <K extends SettingsSection>(saved: CommerceSettings, key: K) => {
    setToast({ id: Date.now(), tone: "success", text: `${sectionDetails[key].label} settings saved.` });
    return saved[key];
  };
  const failedSave = () => { setToast({ id: Date.now(), tone: "error", text: "Unable to save settings. Try again." }); };
  const details = sectionDetails[section];
  const Icon = details.icon;

  return <>
    <div className="mb-7"><p className="text-sm font-medium text-primary">Workspace preferences</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Configure how Northstar Store operates and how your workspace feels.</p></div>
    <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,760px)]">
      <nav aria-label="Settings sections" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">{(Object.keys(sectionDetails) as SettingsSection[]).map((item) => { const ItemIcon = sectionDetails[item].icon; return <button key={item} type="button" onClick={() => requestSection(item)} aria-current={section === item ? "page" : undefined} className={`flex min-w-max items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${section === item ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><ItemIcon aria-hidden="true" className="size-4" />{sectionDetails[item].label}</button>; })}</nav>
      <Card className="overflow-hidden"><div className="border-b border-border px-5 py-5 sm:px-6"><div className="flex items-center gap-3"><span className="rounded-lg bg-indigo-50 p-2 text-indigo-700"><Icon aria-hidden="true" className="size-5" /></span><div><h2 className="font-semibold">{details.title}</h2><p className="mt-0.5 text-sm text-muted-foreground">{details.description}</p></div></div></div><div className="p-5 sm:p-6">
        {section === "general" ? <GeneralSettingsForm value={query.data.general} onDirtyChange={onDirtyChange} onSave={async (value) => { try { return completeSave(await generalMutation.mutateAsync(value), "general"); } catch (error) { failedSave(); throw error; } }} /> : null}
        {section === "notifications" ? <NotificationSettingsForm value={query.data.notifications} onDirtyChange={onDirtyChange} onSave={async (value) => { try { return completeSave(await notificationMutation.mutateAsync(value), "notifications"); } catch (error) { failedSave(); throw error; } }} /> : null}
        {section === "appearance" ? <AppearanceSettingsForm value={query.data.appearance} onDirtyChange={onDirtyChange} onSave={async (value) => { try { return completeSave(await appearanceMutation.mutateAsync(value), "appearance"); } catch (error) { failedSave(); throw error; } }} /> : null}
      </div></Card>
    </div>
    <UnsavedChangesDialog open={pendingSection !== null} onOpenChange={(open) => { if (!open) setPendingSection(null); }} onDiscard={() => { const next = pendingSection; setPendingSection(null); setDirty(false); if (next) navigate(next); }} />
    <SettingsToast toast={toast} onDismiss={dismissToast} />
  </>;
}
