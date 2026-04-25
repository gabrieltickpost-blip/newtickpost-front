"use client";

import { useCallback, useEffect, useState } from "react";

import { workspaceApi } from "@/modules/workspace/api/workspace.api";
import { useWorkspaceStore } from "@/modules/workspace/stores/workspace.store";
import { normalizeApiError } from "@/shared/api/api-error";

export function useWorkspaces() {
  const { workspaces, setWorkspaces } = useWorkspaceStore();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await workspaceApi.list();
      setWorkspaces(response);
      return response;
    } catch (err) {
      const apiError = normalizeApiError(err);
      setError(apiError);
      return [];
    } finally {
      setLoading(false);
    }
  }, [setWorkspaces]);

  useEffect(() => {
    if (workspaces.length === 0) {
      void refetch();
    }
  }, [refetch, workspaces.length]);

  return { workspaces, isLoading, error, refetch };
}
