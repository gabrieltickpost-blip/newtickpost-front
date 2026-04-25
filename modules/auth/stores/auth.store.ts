"use client";

import { create } from "zustand";

import type { MeResponse } from "@/modules/auth/types/auth.types";

type AuthState = {
  me: MeResponse | null;
  isLoading: boolean;
  setMe: (me: MeResponse | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  me: null,
  isLoading: false,
  setMe: (me) => set({ me }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ me: null, isLoading: false }),
}));
