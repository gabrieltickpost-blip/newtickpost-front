import { MarketingPageHeader } from "@/components/marketing/page-header";
import { WorkspaceSwitcher } from "@/modules/workspace/components/WorkspaceSwitcher";

export default function WorkspaceSettingsPage() {
  return (
    <div className="animate-soft-in space-y-6 p-4 sm:p-6">
      <MarketingPageHeader
        eyebrow="Workspace"
        title="Configuracoes do workspace"
        description="Preparado para GET/PUT /brands/:brandId/settings e PATCH /brands/:brandId."
        action={<WorkspaceSwitcher />}
      />
    </div>
  );
}
