import { getCampaignsDashboard } from "@/modules/campaigns/data/campaigns-gateway";

export async function loadCampaignsDashboard() {
  return getCampaignsDashboard();
}
