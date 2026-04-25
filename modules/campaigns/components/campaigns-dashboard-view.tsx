import type { DataSource } from "@/lib/api/types";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import type { CampaignsDashboard } from "@/modules/campaigns/contracts";
import { CampaignStatsCards } from "@/modules/campaigns/components/stats-cards";
import { CampaignViewsChart } from "@/modules/campaigns/components/monthly-views-chart";
import { CampaignsTable } from "@/modules/campaigns/components/campaigns-table";
import { RecentUploads } from "@/modules/campaigns/components/recent-uploads";

export function CampaignsDashboardView({
  dashboard,
  source,
}: {
  dashboard: CampaignsDashboard;
  source: DataSource;
}) {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden p-4">
      <div className="mx-auto w-full space-y-4">
        <PageHeader
          title="Campanhas"
          description="Modulo de marketing pronto para ser conectado a um backend real sem acoplar os componentes ao mock."
          actions={
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Fonte de dados: {source === "api" ? "backend real" : "mock adapter"}
            </Badge>
          }
        />
        <CampaignStatsCards stats={dashboard.stats} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CampaignViewsChart chartSeries={dashboard.chartSeries} />
          <RecentUploads uploads={dashboard.recentUploads} />
        </div>
        <CampaignsTable campaigns={dashboard.campaigns} />
      </div>
    </div>
  );
}
