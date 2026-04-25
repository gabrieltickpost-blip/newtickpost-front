"use client";

import { campaigns } from "@/mock-data/creator-dashboard";
import { CampaignsTable as CampaignsTableModule } from "@/modules/campaigns/components/campaigns-table";

export function CampaignsTable() {
  return <CampaignsTableModule campaigns={campaigns} />;
}
