"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

export function DateRangeSelect() {
  const [period, setPeriod] = useState("30");

  return (
    <label className="relative inline-flex h-9 items-center rounded-lg border border-border bg-card pl-9 pr-8 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-muted focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <span className="sr-only">Dashboard period</span>
      <CalendarDays aria-hidden="true" className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
      <select
        value={period}
        onChange={(event) => setPeriod(event.target.value)}
        className="h-full cursor-pointer appearance-none bg-transparent outline-none"
      >
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="90">Last 90 days</option>
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2.5 size-4 text-muted-foreground" />
    </label>
  );
}
