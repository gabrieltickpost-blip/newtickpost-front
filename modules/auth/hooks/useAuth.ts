"use client";

import { useRouter } from "next/navigation";

import { authApi } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import type { LoginPayload, RegisterPayload } from "@/modules/auth/types/auth.types";
import { resolveEntryRoute } from "@/modules/auth/utils/resolve-entry-route";
import { publicRoutes } from "@/shared/config/routes";

export function useAuth() {
  const router = useRouter();
  const { me, setMe, reset } = useAuthStore();

  async function login(payload: LoginPayload) {
    const response = await authApi.login(payload);
    setMe(response);
    router.push(resolveEntryRoute(response));
    return response;
  }

  async function register(payload: RegisterPayload) {
    const response = await authApi.register(payload);
    setMe(response);
    router.push(resolveEntryRoute(response));
    return response;
  }

  async function logout() {
    await authApi.logout();
    reset();
    router.push(publicRoutes.login);
  }

  return {
    me,
    login,
    register,
    logout,
  };
}
