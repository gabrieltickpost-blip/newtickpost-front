"use client";

import { AppSidebar } from "@/components/app-shell/app-sidebar";

export function DashboardSidebar(
  props: React.ComponentProps<typeof AppSidebar>
) {
  return <AppSidebar {...props} />;
}
