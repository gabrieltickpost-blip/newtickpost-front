"use client";

import Image from "next/image";
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
    <Sidebar collapsible="offcanvas" className="!border-r-0" {...props}>
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-2 outline-none">
              <span className="flex size-9 shrink-0 items-center justify-start overflow-hidden rounded-md bg-white px-1.5">
                <Image
                  src="/logo.svg"
                  alt="Tickpost"
                  width={132}
                  height={24}
                  className="h-6 w-[132px] max-w-none"
                />
              </span>
              <div className="min-w-0 text-left">
                <div className="truncate text-sm font-medium">
                  Tickpost
                </div>
                <div className="truncate text-xs text-muted-foreground">
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
        <Button className="mt-4 w-full justify-start">
          <Plus className="size-4" />
          Criar campanha
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
                    className="h-10"
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

        <div className="rounded-lg border bg-background/70 p-4 text-sm group-data-[collapsible=icon]:hidden">
          <div className="text-lg font-semibold leading-tight">
            Conteudo gera conversa.
          </div>
          <p className="mt-2 text-muted-foreground">
            Conversa gera lead. Lead gera venda. Comece sempre por uma campanha.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
