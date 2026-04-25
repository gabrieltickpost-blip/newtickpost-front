"use client";

import { useMemo } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { useWorkspaceStore } from "@/modules/workspace/stores/workspace.store";

export function useCurrentWorkspace() {
  const { me } = useMe();
  const { currentWorkspace, setCurrentWorkspace } = useWorkspaceStore();

  const workspace = useMemo(() => {
    if (currentWorkspace) {
      return currentWorkspace;
    }

    return me?.brands.find((brand) => brand.isActive) ?? me?.brands[0] ?? null;
  }, [currentWorkspace, me?.brands]);

  return {
    workspace,
    setCurrentWorkspace,
  };
}
