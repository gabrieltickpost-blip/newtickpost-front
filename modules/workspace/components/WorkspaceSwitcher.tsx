"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authApi } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useWorkspaces } from "@/modules/workspace/hooks/useWorkspaces";
import { useCurrentWorkspace } from "@/modules/workspace/hooks/useCurrentWorkspace";

export function WorkspaceSwitcher() {
  const { workspaces } = useWorkspaces();
  const { workspace, setCurrentWorkspace } = useCurrentWorkspace();
  const setMe = useAuthStore((state) => state.setMe);

  async function handleSelect(brandId: string) {
    const selected = workspaces.find((item) => item.id === brandId) ?? null;
    setCurrentWorkspace(selected);
    const response = await authApi.selectBrand(brandId);
    setMe(response);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          {workspace?.name ?? "Selecionar workspace"}
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {workspaces.map((item) => (
          <DropdownMenuItem key={item.id} onClick={() => void handleSelect(item.id)}>
            <Check
              className={
                item.id === workspace?.id
                  ? "size-4 text-primary"
                  : "size-4 text-transparent"
              }
            />
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
