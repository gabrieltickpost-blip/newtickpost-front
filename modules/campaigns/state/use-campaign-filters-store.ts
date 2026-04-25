import { create } from "zustand";
import type { CampaignStatus, Platform } from "@/modules/campaigns/contracts";

interface CampaignFiltersStore {
  searchQuery: string;
  statusFilter: CampaignStatus | "all";
  platformFilter: Platform | "all";
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: CampaignStatus | "all") => void;
  setPlatformFilter: (platform: Platform | "all") => void;
  clearFilters: () => void;
}

export const useCampaignFiltersStore = create<CampaignFiltersStore>((set) => ({
  searchQuery: "",
  statusFilter: "all",
  platformFilter: "all",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPlatformFilter: (platform) => set({ platformFilter: platform }),
  clearFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "all",
      platformFilter: "all",
    }),
}));
