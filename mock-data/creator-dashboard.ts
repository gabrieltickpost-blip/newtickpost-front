import { mockCampaignsDashboard } from "@/modules/campaigns/data/mock-campaigns-data";

export const dashboardStats = mockCampaignsDashboard.stats;
export const lastMonthData = mockCampaignsDashboard.chartSeries["1m"];
export const last3MonthsData = mockCampaignsDashboard.chartSeries["3m"];
export const last6MonthsData = mockCampaignsDashboard.chartSeries["6m"];
export const lastYearData = mockCampaignsDashboard.chartSeries["1y"];
export const recentUploads = mockCampaignsDashboard.recentUploads;
export const campaigns = mockCampaignsDashboard.campaigns;

export type CampaignStatus =
  (typeof mockCampaignsDashboard.campaigns)[number]["status"];
export type Platform =
  (typeof mockCampaignsDashboard.campaigns)[number]["platforms"][number];
export type Campaign = (typeof mockCampaignsDashboard.campaigns)[number];

export const folders = [
  { id: "1", name: "Product launch" },
  { id: "2", name: "Personal brand" },
  { id: "3", name: "Build in public" },
  { id: "4", name: "Lunor design" },
  { id: "5", name: "Day life vlogs" },
];
