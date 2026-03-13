"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart with a label list";

const defaultChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const defaultChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

interface AppPieChartProps {
  chartConfig?: ChartConfig;
  chartData?: any[];
  chartNameKey?: string;
  chartDataKey?: string;
  labelDataKey?: string;
}

export function AppPieChart({
  chartConfig = defaultChartConfig,
  chartData = defaultChartData,
  chartNameKey = "visitors",
  chartDataKey = "visitors",
  labelDataKey = "browser",
}: AppPieChartProps) {
  return (
    <div className="flex flex-col">
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-background scale-110"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey={chartNameKey} hideLabel />}
            />
            <Pie data={chartData} dataKey={chartDataKey}>
              <LabelList
                dataKey={labelDataKey}
                className="!fill-primary"
                stroke="none"
                fill="var(--color-labelColor)"
                formatter={(value: string) => chartConfig[value]?.label}
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
