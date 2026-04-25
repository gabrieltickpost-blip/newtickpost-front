import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-shell/app-header";
import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="bg-background">
      <AppSidebar />
      <SidebarInset className="h-svh overflow-hidden lg:p-3">
        <div className="flex h-full w-full flex-col overflow-hidden border-border/70 bg-background/72 backdrop-blur-xl lg:rounded-xl lg:border">
          <AppHeader />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
