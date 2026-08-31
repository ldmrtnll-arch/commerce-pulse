"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { notificationSettingsSchema } from "../schemas/settings-schemas";
import type { NotificationSettings } from "../types";
import { CheckboxRow, FormActions } from "./settings-fields";

const options: { name: keyof NotificationSettings; title: string; description: string }[] = [
  { name: "newOrder", title: "New order", description: "Receive an alert when a new order is placed." },
  { name: "orderCancelled", title: "Order cancelled", description: "Receive an alert when a customer cancels an order." },
  { name: "lowStock", title: "Low stock", description: "Receive an alert when inventory falls below its threshold." },
  { name: "outOfStock", title: "Out of stock", description: "Receive an alert when a product runs out of inventory." },
  { name: "campaignCompleted", title: "Campaign completed", description: "Receive a performance alert when a campaign ends." },
  { name: "weeklySummary", title: "Weekly summary", description: "Receive a weekly digest of store performance." },
];

export function NotificationSettingsForm({ value, onSave, onDirtyChange = () => {} }: { value: NotificationSettings; onSave: (value: NotificationSettings) => Promise<NotificationSettings>; onDirtyChange?: (dirty: boolean) => void }) {
  const { register, handleSubmit, reset, formState: { isDirty, isSubmitting } } = useForm<NotificationSettings>({ defaultValues: value, resolver: zodResolver(notificationSettingsSchema), mode: "onBlur", reValidateMode: "onChange" });
  useEffect(() => onDirtyChange(isDirty), [isDirty, onDirtyChange]);
  return <form aria-label="Notification settings" className="space-y-5" onSubmit={handleSubmit(async (data) => { try { reset(await onSave(data)); } catch { /* keep user input for retry */ } })}>
    <div className="grid gap-3 sm:grid-cols-2">{options.map((option) => <CheckboxRow key={option.name} title={option.title} description={option.description} disabled={isSubmitting} {...register(option.name)} />)}</div>
    <FormActions dirty={isDirty} saving={isSubmitting} onReset={() => reset(value)} />
  </form>;
}
