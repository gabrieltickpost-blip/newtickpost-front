import { ModuleScaffold } from "@/components/shared/module-scaffold";
import { OpportunityIntakeForm } from "@/modules/commercial/opportunity-intake-form";
import { commercialModuleOverview } from "@/modules/commercial/overview";

export default function CommercialPage() {
  return (
    <ModuleScaffold overview={commercialModuleOverview}>
      <OpportunityIntakeForm />
    </ModuleScaffold>
  );
}
