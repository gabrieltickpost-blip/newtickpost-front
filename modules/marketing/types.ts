import type { LucideIcon } from "lucide-react";

export type CampaignStatus = "draft" | "planning" | "production" | "live";
export type ContentStatus = "brief" | "writing" | "review" | "ready" | "scheduled";
export type ChannelStatus = "healthy" | "attention" | "paused";

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  audience: string;
  cta: string;
  destination: string;
  status: CampaignStatus;
  owner: string;
  progress: number;
  dueDate: string;
  contentCount: number;
  conversations: number;
  leads: number;
}

export interface ContentItem {
  id: string;
  title: string;
  campaign: string;
  format: string;
  channel: string;
  status: ContentStatus;
  objective: string;
  cta: string;
  dueDate: string;
}

export interface ContentBatch {
  id: string;
  name: string;
  campaign: string;
  quantity: number;
  ready: number;
  owner: string;
  status: "planning" | "production" | "review" | "scheduled";
}

export interface Channel {
  id: string;
  name: string;
  type: string;
  status: ChannelStatus;
  audience: string;
  nextPost: string;
  conversionRate: string;
}

export interface AnalyticsPoint {
  label: string;
  posts: number;
  conversations: number;
  leads: number;
  sales: number;
}

export interface GrowthStep {
  title: string;
  description: string;
  status: "done" | "current" | "next";
}

export interface ActionCardItem {
  title: string;
  description: string;
  action: string;
  icon: LucideIcon;
}
