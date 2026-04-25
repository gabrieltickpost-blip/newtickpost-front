import {
  Coins,
  Eye,
  TrendingDown,
  TrendingUp,
  Users,
  WalletMinimal,
} from "lucide-react";
import type { CampaignDashboardStats } from "@/modules/campaigns/contracts";
import { cn } from "@/lib/utils";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const statsConfig = [
  {
    key: "viewsDelivered" as const,
    label: "Views entregues",
    icon: Eye,
    format: formatNumber,
  },
  {
    key: "budgetSpent" as const,
    label: "Budget gasto",
    icon: WalletMinimal,
    format: formatCurrency,
  },
  {
    key: "remainingBudget" as const,
    label: "Budget restante",
    icon: Coins,
    format: formatCurrency,
  },
  {
    key: "activeCreators" as const,
    label: "Criadores ativos",
    icon: Users,
    format: (value: number) => value.toString(),
  },
];

export function CampaignStatsCards({
  stats,
}: {
  stats: CampaignDashboardStats;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map(({ key, label, icon: Icon, format }) => {
        const stat = stats[key];
        const isUp = stat.trend === "up";

        return (
          <div
            key={key}
            className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              <Icon className="size-3.5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between rounded-md border bg-card p-3">
              <span className="text-2xl font-semibold tracking-tight">
                {format(stat.value)}
              </span>
              <div className="flex items-center gap-1">
                {isUp ? (
                  <TrendingUp className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown className="size-3.5 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    isUp
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  )}
                >
                  {stat.change}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
