import { ModuleScaffold } from "@/components/shared/module-scaffold";
import { clientsModuleOverview } from "@/modules/clients/overview";

export default function ClientsPage() {
  return <ModuleScaffold overview={clientsModuleOverview} />;
}
