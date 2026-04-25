"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { env } from "@/shared/config/env";
import { workspaceRoutes } from "@/shared/config/routes";

export function OnboardingGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { flags, isLoading } = useMe({ enabled: env.enableRouteGuards });

  useEffect(() => {
    if (!env.enableRouteGuards || isLoading || !flags?.needsOnboarding) {
      return;
    }

    router.replace(workspaceRoutes.onboarding);
  }, [flags?.needsOnboarding, isLoading, router]);

  return children;
}
