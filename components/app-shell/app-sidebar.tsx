"use client";

import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { currentWorkspaceUser } from "@/lib/auth/permissions";
import { appNavSections, type AppModuleDefinition } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string | null, item: AppModuleDefinition) {
  if (!pathname) {
    return false;
  }

  if (item.href === "/app/marketing") {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar"
      {...props}
    >
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-3 py-3">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex min-w-0 flex-1 items-center gap-2 rounded-lg outline-none transition hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <Avatar className="size-9 rounded-lg">
                <AvatarFallback className="rounded-lg bg-[#FF6842] text-sm font-semibold text-white">
                  TP
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-left group-data-[collapsible=icon]:hidden">
                <div className="truncate text-sm font-semibold leading-5">
                  {currentWorkspaceUser.workspaceName} Marketing
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {currentWorkspaceUser.name}
                </div>
              </div>
              <ChevronDown className="ml-auto size-3.5 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                Workspace
              </DropdownMenuLabel>
              <DropdownMenuItem>{currentWorkspaceUser.workspaceName} Marketing</DropdownMenuItem>
              <DropdownMenuItem>{currentWorkspaceUser.name}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Preferências do workspace</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-lg border border-sidebar-border bg-sidebar-accent/35 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:hidden"
            aria-label="Buscar"
          >
            <Search className="size-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-4 px-2 py-3">
        {appNavSections.map((section) => (
          <SidebarGroup key={section.title} className="p-0">
            <SidebarGroupLabel className="h-7 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const active = isActivePath(pathname, item);
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={`${section.title}-${item.id}`}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={active}
                        className={cn(
                          "h-9 rounded-lg px-2 text-sidebar-foreground/78",
                          "hover:bg-sidebar-accent hover:text-sidebar-foreground",
                          active &&
                            "bg-sidebar-accent text-sidebar-foreground shadow-[inset_3px_0_0_#FF6842]",
                        )}
                      >
                        <Link href={item.href}>
                          <Icon
                            className={cn(
                              "size-4 shrink-0 text-muted-foreground",
                              active && "text-[#FF6842]",
                            )}
                          />
                          <span className="truncate text-sm">{item.title}</span>
                          {item.badge ? (
                            <Badge
                              variant="outline"
                              className="ml-auto rounded-md border-white/10 px-1.5 py-0 text-[10px] text-muted-foreground group-data-[collapsible=icon]:hidden"
                            >
                              {item.badge}
                            </Badge>
                          ) : null}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/35 p-3">
          <p className="text-sm font-semibold leading-5">Conteúdo gera conversa.</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Conversa gera lead. Lead gera venda.
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
