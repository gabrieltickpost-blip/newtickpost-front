import { apiRequest } from "@/lib/api/fetch-json";
import type { DataSource } from "@/lib/api/types";
import type { CampaignsDashboard } from "@/modules/campaigns/contracts";
import { mockCampaignsDashboard } from "@/modules/campaigns/data/mock-campaigns-data";

interface CampaignsGatewayResponse {
  data: CampaignsDashboard;
  source: DataSource;
}

interface CampaignsGateway {
  getDashboard(): Promise<CampaignsGatewayResponse>;
}

class MockCampaignsGateway implements CampaignsGateway {
  async getDashboard() {
    return {
      data: mockCampaignsDashboard,
      source: "mock" as const,
    };
  }
}

class HttpCampaignsGateway implements CampaignsGateway {
  constructor(private readonly baseUrl: string) {}

  async getDashboard() {
    const data = await apiRequest<CampaignsDashboard>("/campaigns/dashboard", {
      baseUrl: this.baseUrl,
    });

    return {
      data,
      source: "api" as const,
    };
  }
}

function resolveCampaignsGateway(): CampaignsGateway {
  const backendUrl =
    process.env.MARKETING_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  return backendUrl
    ? new HttpCampaignsGateway(backendUrl)
    : new MockCampaignsGateway();
}

export async function getCampaignsDashboard() {
  return resolveCampaignsGateway().getDashboard();
}
