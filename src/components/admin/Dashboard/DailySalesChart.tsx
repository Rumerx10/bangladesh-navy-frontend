"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dailySales = [
  { hour: "08:00", sales: 14 },
  { hour: "10:00", sales: 22 },
  { hour: "12:00", sales: 31 },
  { hour: "14:00", sales: 26 },
  { hour: "16:00", sales: 35 },
  { hour: "18:00", sales: 29 },
  { hour: "20:00", sales: 18 },
];

const DailySalesChart = () => {
  return (
    <Card className="border-border shadow-sm rounded-2xl py-4 sm:py-5">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#4f46e5] to-[#818cf8] flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base lg:text-lg font-semibold text-foreground">
              Daily Sales Trend
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Order volume trend throughout today
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 px-2 sm:px-6">
        <div className="w-full h-55 sm:h-65">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailySales}
              margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
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
                  const orders = Number(value ?? 0);
                  return [orders, "Orders"];
                }}
              />
              <Bar
                dataKey="sales"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySalesChart;
