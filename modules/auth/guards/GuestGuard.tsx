"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { resolveEntryRoute } from "@/modules/auth/utils/resolve-entry-route";
import { LoadingScreen } from "@/shared/components/loading-screen";
import { env } from "@/shared/config/env";

export function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { me, isLoading } = useMe({ enabled: env.enableRouteGuards });

  useEffect(() => {
    if (!env.enableRouteGuards || isLoading || !me) {
      return;
    }

    router.replace(resolveEntryRoute(me));
  }, [isLoading, me, router]);

  if (env.enableRouteGuards && isLoading) {
    return <LoadingScreen label="Carregando acesso..." />;
  }

  return children;
}
