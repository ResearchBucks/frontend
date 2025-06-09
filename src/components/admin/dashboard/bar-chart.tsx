"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Type definitions
interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  [key: string]: any; // Allow additional properties
}

interface DashboardBarChartProps {
  data: ChartDataPoint[];
  title: string;
  description: string;
  isLoading?: boolean;
  height?: number;
  colors?: string[];
  showGrid?: boolean;
  dataKey?: string;
  nameKey?: string;
  className?: string;
}

// Default chart configuration
const defaultChartConfig = {
  value: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Dashboard Bar Chart Component
const DashboardBarChart: React.FC<DashboardBarChartProps> = ({
  data,
  title,
  description,
  isLoading = false,
  height = 300,
  colors = ["var(--color-value)"],
  showGrid = true,
  dataKey = "value",
  nameKey = "name",
  className = "",
}) => {
  // Loading state
  if (isLoading) {
    return (
      <Card className={`col-span-full ${className}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="animate-pulse bg-slate-200 rounded"
            style={{ height: `${height}px` }}
          ></div>
        </CardContent>
      </Card>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <Card className={`col-span-full ${className}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg"
            style={{ height: `${height}px` }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-sm font-medium">No data available</p>
              <p className="text-xs">Data will appear here once available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`col-span-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={defaultChartConfig}
          className="w-full"
          style={{ height: `${height}px` }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60, // Increased bottom margin for rotated labels
              }}
            >
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              )}

              <XAxis
                dataKey={nameKey}
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0} // Show all labels
              />

              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  // Format large numbers
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}K`;
                  }
                  return value.toString();
                }}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-auto min-w-[120px]"
                    formatter={(value: any, name: any) => [
                      typeof value === "number"
                        ? value.toLocaleString()
                        : value,
                      name || "Value",
                    ]}
                    labelFormatter={(label: any) => `${nameKey}: ${label}`}
                  />
                }
              />

              <Bar
                dataKey={dataKey}
                fill={colors[0]}
                radius={[4, 4, 0, 0]}
                className="transition-all duration-200 hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardBarChart;
