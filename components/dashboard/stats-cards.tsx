import { dashboardStats } from "@/mock-data/creator-dashboard";
import { CampaignStatsCards } from "@/modules/campaigns/components/stats-cards";

export function StatsCards() {
  return <CampaignStatsCards stats={dashboardStats} />;
}
