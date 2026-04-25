"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { LoadingScreen } from "@/shared/components/loading-screen";
import { env } from "@/shared/config/env";
import { publicRoutes } from "@/shared/config/routes";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { me, isLoading } = useMe({ enabled: env.enableRouteGuards });

  useEffect(() => {
    if (!env.enableRouteGuards || isLoading || me) {
      return;
    }

    router.replace(publicRoutes.login);
  }, [isLoading, me, router]);

  if (env.enableRouteGuards && isLoading) {
    return <LoadingScreen label="Validando sessao..." />;
  }

  return children;
}
