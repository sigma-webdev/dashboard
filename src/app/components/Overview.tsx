"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    leads: 12,
    conversions: 4,
    revenue: 8400,
  },
  {
    name: "Feb",
    leads: 18,
    conversions: 6,
    revenue: 12600,
  },
  {
    name: "Mar",
    leads: 15,
    conversions: 5,
    revenue: 10500,
  },
  {
    name: "Apr",
    leads: 21,
    conversions: 8,
    revenue: 16800,
  },
  {
    name: "May",
    leads: 24,
    conversions: 9,
    revenue: 18900,
  },
  {
    name: "Jun",
    leads: 28,
    conversions: 12,
    revenue: 25200,
  },
];

export function Overview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
          <span>New Leads</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          <span>Conversions</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-purple-500"></span>
          <span>Revenue ($)</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="leads"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="conversions"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
