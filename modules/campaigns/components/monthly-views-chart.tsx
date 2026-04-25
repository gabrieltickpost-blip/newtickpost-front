"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { MoreVertical } from "lucide-react";
import type {
  CampaignChartPoint,
  CampaignPeriod,
} from "@/modules/campaigns/contracts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const chartConfig = {
  views: {
    label: "Views",
    color: "oklch(0.55 0.17 160)",
  },
};

const periodLabels: Record<CampaignPeriod, string> = {
  "1m": "Ultimo mes",
  "3m": "Ultimos 3 meses",
  "6m": "Ultimos 6 meses",
  "1y": "Ultimo ano",
};

function formatYAxis(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
}

export function CampaignViewsChart({
  chartSeries,
}: {
  chartSeries: Record<CampaignPeriod, CampaignChartPoint[]>;
}) {
  const [period, setPeriod] = useState<CampaignPeriod>("1m");
  const [showGrid, setShowGrid] = useState(true);
  const [smoothCurve, setSmoothCurve] = useState(true);

  const data = chartSeries[period];
  const label = periodLabels[period];

  const yMax = useMemo(() => {
    const max = Math.max(...data.map((item) => item.views));
    return Math.ceil(max / 50000) * 50000;
  }, [data]);

  const yMid = useMemo(() => Math.round(yMax / 2 / 1000) * 1000, [yMax]);

  const tickDates = useMemo(() => {
    const first = data[0]?.date ?? "";
    const mid = data[Math.floor(data.length / 2)]?.date ?? "";
    const last = data[data.length - 1]?.date ?? "";

    return new Set([first, mid, last]);
  }, [data]);

  const resetToDefault = () => {
    setPeriod("1m");
    setShowGrid(true);
    setSmoothCurve(true);
  };

  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Views por periodo</span>
          <span className="rounded border px-1.5 py-0.5 text-xs text-muted-foreground">
            {label}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Periodo</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {(Object.entries(periodLabels) as [CampaignPeriod, string][]).map(
                  ([key, value]) => (
                    <DropdownMenuItem key={key} onClick={() => setPeriod(key)}>
                      {value} {period === key && "✓"}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={(value) => setShowGrid(Boolean(value))}
            >
              Mostrar grade
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={smoothCurve}
              onCheckedChange={(value) => setSmoothCurve(Boolean(value))}
            >
              Curva suave
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetToDefault}>
              Restaurar padrao
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="min-h-[220px]">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0} />
              </linearGradient>
            </defs>
            {showGrid ? (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
            ) : null}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={(value: string) => (tickDates.has(value) ? value : "")}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickFormatter={formatYAxis}
              width={40}
              domain={[0, yMax]}
              ticks={[0, yMid, yMax]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${Number(value).toLocaleString()} views`, ""]}
                />
              }
            />
            <Area
              type={smoothCurve ? "monotone" : "linear"}
              dataKey="views"
              stroke="var(--color-views)"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--color-views)",
                stroke: "var(--card)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
