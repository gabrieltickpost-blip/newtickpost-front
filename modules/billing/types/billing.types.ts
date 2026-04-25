export type BillingPlan = {
  id: string;
  name: string;
  status: "active" | "trialing" | "past_due" | "canceled";
  seats: number;
  renewsAt?: string;
};

export type BillingOverview = {
  plan: BillingPlan;
  usage: {
    workspaces: number;
    members: number;
    campaigns: number;
  };
};
