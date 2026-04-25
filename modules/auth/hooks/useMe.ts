"use client";

import { useCallback, useEffect, useState } from "react";

import { authApi } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { normalizeApiError } from "@/shared/api/api-error";

export function useMe({ enabled = true }: { enabled?: boolean } = {}) {
  const { me, isLoading, setLoading, setMe } = useAuthStore();
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.me();
      setMe(response);
      return response;
    } catch (err) {
      const apiError = normalizeApiError(err);
      setError(apiError);
      setMe(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setMe]);

  useEffect(() => {
    if (!enabled || me) {
      return;
    }

    void refetch();
  }, [enabled, me, refetch]);

  return {
    me,
    user: me?.user ?? null,
    currentBrand: me?.currentBrand ?? null,
    brands: me?.brands ?? [],
    flags: me?.flags ?? null,
    isLoading,
    error,
    refetch,
  };
}
