"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { env } from "@/shared/config/env";
import { publicRoutes } from "@/shared/config/routes";

export function EmailVerifiedGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { flags, isLoading } = useMe({ enabled: env.enableRouteGuards });

  useEffect(() => {
    if (!env.enableRouteGuards || isLoading || !flags?.needsEmailVerification) {
      return;
    }

    router.replace(publicRoutes.verifyEmail);
  }, [flags?.needsEmailVerification, isLoading, router]);

  return children;
}
