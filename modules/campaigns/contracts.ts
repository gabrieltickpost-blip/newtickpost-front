export type CampaignTrend = "up" | "down";
export type CampaignPeriod = "1m" | "3m" | "6m" | "1y";
export type CampaignStatus = "Draft" | "Live" | "Paused" | "Ended";
export type Platform = "Instagram" | "TikTok" | "Facebook" | "Shorts";

export interface CampaignStat {
  value: number;
  change: number;
  trend: CampaignTrend;
}

export interface CampaignDashboardStats {
  viewsDelivered: CampaignStat;
  budgetSpent: CampaignStat;
  remainingBudget: CampaignStat;
  activeCreators: CampaignStat;
}

export interface CampaignChartPoint {
  date: string;
  views: number;
}

export interface CampaignUpload {
  id: string;
  imageUrl: string;
  views: number;
  timeAgo: string;
}

export interface Campaign {
  id: string;
  name: string;
  avatarSeed: string;
  status: CampaignStatus;
  platforms: Platform[];
  payRate: string;
  creators: number;
  submissions: number;
  paid: number;
  percentage: number;
  budget: number;
}

export interface CampaignsDashboard {
  stats: CampaignDashboardStats;
  chartSeries: Record<CampaignPeriod, CampaignChartPoint[]>;
  recentUploads: CampaignUpload[];
  campaigns: Campaign[];
}
