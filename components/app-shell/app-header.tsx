"use client";

import { ChevronRight, Megaphone, PenTool } from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { currentWorkspaceUser } from "@/lib/auth/permissions";
import { getBreadcrumbByPathname, getModuleByPathname } from "@/lib/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const currentModule = getModuleByPathname(pathname);
  const CurrentIcon = currentModule.icon;
  const breadcrumb = getBreadcrumbByPathname(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-[64px] shrink-0 items-center justify-between gap-4 border-b border-border bg-background/92 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground" />
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-1.5 text-sm">
            <CurrentIcon className="size-4 shrink-0 text-[#FF6842]" />
            {breadcrumb.map((item, index) => (
              <span key={`${item}-${index}`} className="contents">
                {index > 0 ? (
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/70" />
                ) : null}
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "truncate font-semibold text-foreground"
                      : "hidden truncate text-muted-foreground sm:inline"
                  }
                >
                  {item}
                </span>
              </span>
            ))}
          </div>
          <p className="hidden max-w-[520px] truncate text-xs text-muted-foreground md:block">
            {currentModule.description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button size="sm" className="hidden h-9 rounded-lg bg-[#FF6842] text-white hover:bg-[#ff7857] lg:inline-flex">
          <Megaphone className="size-4" />
          Criar campanha
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hidden h-9 rounded-lg border-border bg-secondary/40 lg:inline-flex"
        >
          <PenTool className="size-4" />
          Nova publicação
        </Button>
        <ThemeToggle />
        <Avatar className="size-9 border border-border">
          <AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
            {currentWorkspaceUser.avatarFallback}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
