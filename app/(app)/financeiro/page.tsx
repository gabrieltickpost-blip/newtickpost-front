import { ModuleScaffold } from "@/components/shared/module-scaffold";
import { financeModuleOverview } from "@/modules/finance/overview";

export default function FinancePage() {
  return <ModuleScaffold overview={financeModuleOverview} />;
}
