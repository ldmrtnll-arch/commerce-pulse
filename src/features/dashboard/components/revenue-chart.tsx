"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompactCurrency, formatCurrency } from "@/lib/formatters";
import { revenueData } from "@/mocks/dashboard";

export function RevenueChart() {
  return (
    <div className="h-[280px] w-full sm:h-[320px]" role="img" aria-label="Daily net sales over the last 30 days">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 12, right: 4, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#eef0f3" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#667085", fontSize: 11 }}
            interval={4}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#667085", fontSize: 11 }}
            tickFormatter={formatCompactCurrency}
            width={58}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
            contentStyle={{
              border: "1px solid #e4e7ec",
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
              fontSize: "12px",
            }}
            cursor={{ stroke: "#a5b4fc", strokeDasharray: "4 4" }}
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            strokeWidth={2}
            fill="url(#revenueFill)"
            activeDot={{ r: 4, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
