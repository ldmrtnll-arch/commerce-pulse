"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { appearanceSettingsSchema } from "../schemas/settings-schemas";
import type { AppearanceSettings } from "../types";
import { CheckboxRow, FormActions } from "./settings-fields";

export function AppearanceSettingsForm({ value, onSave, onDirtyChange = () => {} }: { value: AppearanceSettings; onSave: (value: AppearanceSettings) => Promise<AppearanceSettings>; onDirtyChange?: (dirty: boolean) => void }) {
  const { register, handleSubmit, reset, control, formState: { isDirty, isSubmitting } } = useForm<AppearanceSettings>({ defaultValues: value, resolver: zodResolver(appearanceSettingsSchema), mode: "onBlur", reValidateMode: "onChange" });
  const density = useWatch({ control, name: "density" });
  const reduceMotion = useWatch({ control, name: "reduceMotion" });
  useEffect(() => onDirtyChange(isDirty), [isDirty, onDirtyChange]);
  return <form aria-label="Appearance settings" className="space-y-6" onSubmit={handleSubmit(async (data) => { try { reset(await onSave(data)); } catch { /* keep user input for retry */ } })}>
    <fieldset disabled={isSubmitting}><legend className="text-sm font-medium">Interface density</legend><p className="mt-1 text-sm text-muted-foreground">Choose how much information fits in each view.</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{(["comfortable", "compact"] as const).map((item) => <label key={item} className="flex cursor-pointer gap-3 rounded-lg border border-border p-4 capitalize has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary"><input type="radio" value={item} className="mt-0.5 size-4 accent-indigo-600" {...register("density")} /><span><span className="block text-sm font-medium">{item}</span><span className="mt-1 block text-sm normal-case text-muted-foreground">{item === "comfortable" ? "More breathing room between items." : "More information in less space."}</span></span></label>)}</div></fieldset>
    <CheckboxRow title="Reduce motion" description="Minimize animation in this preview and future interface preferences." disabled={isSubmitting} {...register("reduceMotion")} />
    <div aria-label="Appearance preview" className={`rounded-xl border border-border bg-muted/50 ${density === "compact" ? "p-3" : "p-5"}`} data-density={density} data-reduce-motion={reduceMotion}><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live preview</p><div className={`mt-3 rounded-lg border border-border bg-card ${density === "compact" ? "p-3" : "p-5"} ${reduceMotion ? "transition-none" : "transition-all"}`}><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">Order #NS-1048</p><p className={`${density === "compact" ? "mt-0.5" : "mt-2"} text-sm text-muted-foreground`}>Marina Santos · 3 items</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-success">Paid</span></div></div></div>
    <FormActions dirty={isDirty} saving={isSubmitting} onReset={() => reset(value)} />
  </form>;
}
