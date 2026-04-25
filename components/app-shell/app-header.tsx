"use client";

import { Plus, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { currentWorkspaceUser } from "@/lib/auth/permissions";
import { getModuleByPathname } from "@/lib/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  const pathname = usePathname();
  const currentModule = getModuleByPathname(pathname);
  const CurrentIcon = currentModule.icon;

  return (
    <header className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-4 border-b bg-card/75 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-2" />
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <CurrentIcon className="size-4 text-muted-foreground" />
            <span className="text-sm font-semibold">{currentModule.title}</span>
          </div>
          <p className="hidden text-xs text-muted-foreground md:block">
            {currentModule.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="hidden sm:inline-flex">
          <Plus className="size-4" />
          Nova campanha
        </Button>
        <Badge variant="outline" className="hidden gap-1 sm:flex">
          <ShieldCheck className="size-3.5" />
          {currentWorkspaceUser.role}
        </Badge>
        <ThemeToggle />
      </div>
    </header>
  );
}
