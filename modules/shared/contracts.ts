import type { AppModuleId } from "@/lib/navigation";

export interface ModuleMetric {
  label: string;
  value: string;
  helper: string;
}

export interface ModuleTask {
  title: string;
  description: string;
  status: "ready" | "planned" | "blocked";
}

export interface WorkspaceModuleOverview {
  id: AppModuleId;
  title: string;
  description: string;
  metrics: ModuleMetric[];
  highlights: string[];
  tasks: ModuleTask[];
}
