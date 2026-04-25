"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { analytics } from "@/modules/marketing/mock-data";

export function GrowthChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={analytics} margin={{ left: 0, right: 0, top: 12 }}>
          <defs>
            <linearGradient id="conversations" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#ff5a52" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#ff5a52" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(0,0,0,0.08)" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6f7278", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6f7278", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e8e8eb",
              borderRadius: 8,
              color: "#242428",
            }}
          />
          <Area
            type="monotone"
            dataKey="conversations"
            stroke="#ff6842"
            fill="url(#conversations)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="leads"
            stroke="#3879ff"
            fill="transparent"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
