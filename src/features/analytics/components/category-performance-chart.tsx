"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompactCurrency, formatCurrency } from "@/lib/formatters";
import type { CategoryPerformance } from "@/types/analytics";

export function CategoryPerformanceChart({ data }: { data: CategoryPerformance[] }) {
  return <figure><figcaption className="sr-only">Gross merchandise sales grouped by product category, ordered from highest to lowest.</figcaption><div role="img" aria-label="Gross merchandise sales by category" className="h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ top: 4, right: 8, left: 8, bottom: 0 }}><CartesianGrid horizontal={false} stroke="#eef0f3" strokeDasharray="3 3" /><XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 10 }} tickFormatter={formatCompactCurrency} /><YAxis type="category" dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#475467", fontSize: 11 }} width={82} /><Tooltip formatter={(value) => [formatCurrency(Number(value)), "Product sales"]} contentStyle={{ border: "1px solid #e4e7ec", borderRadius: "10px", fontSize: "12px" }} cursor={{ fill: "#f1f3f5" }} /><Bar isAnimationActive={false} dataKey="revenue" fill="#6366f1" radius={[0, 5, 5, 0]} maxBarSize={24} /></BarChart></ResponsiveContainer></div></figure>;
}
