"use client";

import { CampaignsTable } from "@/components/dashboard/campaigns-table";
import { MonthlyViewsChart } from "@/components/dashboard/monthly-views-chart";
import { RecentUploads } from "@/components/dashboard/recent-uploads";
import { StatsCards } from "@/components/dashboard/stats-cards";

export function DashboardContent() {
  return (
    <main className="h-full w-full overflow-y-auto overflow-x-hidden p-4">
      <div className="mx-auto w-full space-y-4">
        <StatsCards />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MonthlyViewsChart />
          <RecentUploads />
        </div>
        <CampaignsTable />
      </div>
    </main>
  );
}
