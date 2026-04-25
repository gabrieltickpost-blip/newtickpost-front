"use client";

import Link from "next/link";
import { ChevronDown, HelpCircle, Plus, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { currentWorkspaceUser, hasPermission } from "@/lib/auth/permissions";
import { appModules } from "@/lib/navigation";
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
} from "@/components/ui/sidebar";

const secondaryNavItems = [
  { title: "Guia de crescimento", href: "#", icon: HelpCircle },
  { title: "Configuracoes", href: "#", icon: Settings },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const visibleModules = appModules.filter((module) =>
    hasPermission(currentWorkspaceUser.role, module.permission)
  );

  return (
    <Sidebar collapsible="offcanvas" className="!border-r" {...props}>
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-2 outline-none">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-base font-semibold text-primary-foreground">
                T
              </span>
              <div className="min-w-0 text-left">
                <div className="truncate text-sm font-semibold tracking-[-0.01em]">
                  Tickpost
                </div>
                <div className="truncate text-xs font-medium text-muted-foreground">
                  Marketing
                </div>
              </div>
              <ChevronDown className="ml-auto size-3 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                Workspace
              </DropdownMenuLabel>
              <DropdownMenuItem>{currentWorkspaceUser.workspaceName}</DropdownMenuItem>
              <DropdownMenuItem>Operacao interna</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil e acessos</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="size-7 shrink-0">
            <Search className="size-3.5" />
          </Button>
        </div>
        <Button className="mt-3 w-full justify-start rounded-lg bg-primary shadow-none hover:bg-primary/90">
          <Plus className="size-4" />
          Criar campanha
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 text-xs font-semibold tracking-[-0.01em] text-muted-foreground">
            Marketing OS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleModules.map((module) => (
                <SidebarMenuItem key={module.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === module.href ||
                      pathname?.startsWith(`${module.href}/`)
                    }
                    className="h-10 rounded-lg"
                  >
                    <Link href={module.href}>
                      <module.icon className="size-4 shrink-0" />
                      <div className="min-w-0">
                        <div className="truncate text-sm">{module.title}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {module.description}
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-3">
        <SidebarMenu>
          {secondaryNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-9">
                <Link href={item.href}>
                  <item.icon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="rounded-xl border bg-background p-4 text-sm shadow-sm group-data-[collapsible=icon]:hidden">
          <div className="text-base font-semibold leading-tight tracking-[-0.01em]">
            Conteudo gera conversa.
          </div>
          <p className="mt-2 text-sm leading-5 text-muted-foreground">
            Conversa gera lead. Lead gera venda. Comece sempre por uma campanha.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
