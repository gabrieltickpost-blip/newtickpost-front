import { recentUploads } from "@/mock-data/creator-dashboard";
import { RecentUploads as CampaignRecentUploads } from "@/modules/campaigns/components/recent-uploads";

export function RecentUploads() {
  return <CampaignRecentUploads uploads={recentUploads} />;
}
