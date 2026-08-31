"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { generalSettingsSchema } from "../schemas/settings-schemas";
import { CURRENCIES, LOCALES, TIMEZONES, type GeneralSettings } from "../types";
import { Field, FormActions, fieldClass } from "./settings-fields";

const timezoneLabels: Record<string, string> = { "America/New_York": "Eastern Time (New York)", "America/Chicago": "Central Time (Chicago)", "America/Denver": "Mountain Time (Denver)", "America/Los_Angeles": "Pacific Time (Los Angeles)", "Europe/London": "London", "America/Sao_Paulo": "São Paulo" };

export function GeneralSettingsForm({ value, onSave, onDirtyChange = () => {} }: { value: GeneralSettings; onSave: (value: GeneralSettings) => Promise<GeneralSettings>; onDirtyChange?: (dirty: boolean) => void }) {
  const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm<GeneralSettings>({ defaultValues: value, resolver: zodResolver(generalSettingsSchema), mode: "onBlur", reValidateMode: "onChange" });
  useEffect(() => onDirtyChange(isDirty), [isDirty, onDirtyChange]);
  const submit = handleSubmit(async (data) => { try { reset(await onSave(data)); } catch { /* feedback is owned by the workspace */ } });
  return <form aria-label="General settings" className="space-y-5" onSubmit={submit} noValidate>
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field label="Store name" error={errors.storeName?.message}><input {...register("storeName")} aria-invalid={!!errors.storeName} disabled={isSubmitting} className={fieldClass} /></Field></div>
      <div className="sm:col-span-2"><Field label="Support email" error={errors.supportEmail?.message}><input {...register("supportEmail")} type="email" aria-invalid={!!errors.supportEmail} disabled={isSubmitting} className={fieldClass} /></Field></div>
      <Field label="Timezone"><select {...register("timezone")} disabled={isSubmitting} className={fieldClass}>{TIMEZONES.map((item) => <option key={item} value={item}>{timezoneLabels[item]}</option>)}</select></Field>
      <Field label="Currency"><select {...register("currency")} disabled={isSubmitting} className={fieldClass}>{CURRENCIES.map((item) => <option key={item}>{item}</option>)}</select></Field>
      <Field label="Locale"><select {...register("locale")} disabled={isSubmitting} className={fieldClass}>{LOCALES.map((item) => <option key={item}>{item}</option>)}</select></Field>
    </div>
    <FormActions dirty={isDirty} saving={isSubmitting} onReset={() => reset(value)} />
  </form>;
}
