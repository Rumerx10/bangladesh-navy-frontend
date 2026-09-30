"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const weeklyRevenue = [
  { day: "Mon", revenue: 98000 },
  { day: "Tue", revenue: 124000 },
  { day: "Wed", revenue: 110000 },
  { day: "Thu", revenue: 142000 },
  { day: "Fri", revenue: 156000 },
  { day: "Sat", revenue: 168000 },
  { day: "Sun", revenue: 132000 },
];

const WeeklyRevenueChart = () => {
  return (
    <Card className="border-border shadow-sm rounded-2xl py-4 sm:py-5">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#009dab] to-[#00c9db] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base lg:text-lg font-semibold text-foreground">
              Weekly Revenue
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Revenue performance over the last 7 days
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 px-2 sm:px-6">
        <div className="w-full h-55 sm:h-65">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyRevenue}
              margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="weeklyRevenueGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#009dab" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#009dab" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                  color: "var(--popover-foreground)",
                }}
                labelStyle={{ color: "var(--muted-foreground)" }}
                itemStyle={{ color: "var(--popover-foreground)" }}
                formatter={(value) => {
                  const amount = Number(value ?? 0);
                  return [`৳${amount.toLocaleString()}`, "Revenue"];
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#009dab"
                strokeWidth={2.5}
                fill="url(#weeklyRevenueGrad)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#009dab",
                  stroke: "var(--card)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyRevenueChart;
