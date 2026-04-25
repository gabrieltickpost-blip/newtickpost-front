"use client";

import { ArrowRight, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authApi } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useWorkspaces } from "@/modules/workspace/hooks/useWorkspaces";
import { workspaceRoutes } from "@/shared/config/routes";

export function WorkspaceSelection() {
  const router = useRouter();
  const { workspaces } = useWorkspaces();
  const setMe = useAuthStore((state) => state.setMe);

  async function selectWorkspace(brandId: string) {
    const response = await authApi.selectBrand(brandId);
    setMe(response);
    router.push(workspaceRoutes.dashboard);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#3240AA]">
          Workspace
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">
          Escolha onde quer trabalhar
        </h1>
        <p className="text-sm text-muted-foreground">
          Nenhuma area privada deve abrir sem um workspace ativo.
        </p>
      </div>

      <div className="space-y-3">
        {workspaces.map((workspace) => (
          <button
            key={workspace.id}
            type="button"
            onClick={() => void selectWorkspace(workspace.id)}
            className="flex w-full items-center justify-between rounded-xl border bg-card p-4 text-left shadow-sm transition-colors hover:bg-secondary/60"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-5" />
              </span>
              <span>
                <span className="block font-semibold">{workspace.name}</span>
                <span className="text-sm text-muted-foreground">{workspace.role}</span>
              </span>
            </span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Criar novo workspace
      </Button>
    </div>
  );
}
