import { ModuleScaffold } from "@/components/shared/module-scaffold";
import { projectsModuleOverview } from "@/modules/projects/overview";

export default function ProjectsPage() {
  return <ModuleScaffold overview={projectsModuleOverview} />;
}
