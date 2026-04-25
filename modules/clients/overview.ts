import type { WorkspaceModuleOverview } from "@/modules/shared/contracts";

export const clientsModuleOverview: WorkspaceModuleOverview = {
  id: "clientes",
  title: "Clientes",
  description:
    "Modulo base para CRM, onboarding, health score e relacionamento com a carteira.",
  metrics: [
    {
      label: "Clientes ativos",
      value: "128",
      helper: "Visao consolidada de carteira com filtros por segmento e dono.",
    },
    {
      label: "Onboardings",
      value: "17",
      helper: "Fila pronta para conectar etapas, formularios e automacoes.",
    },
    {
      label: "Renovacoes",
      value: "24",
      helper: "Contratos proximos do vencimento com prioridade e risco.",
    },
    {
      label: "Health score",
      value: "84%",
      helper: "Componente pronto para receber indicadores vindos da operacao.",
    },
  ],
  highlights: [
    "Mesmo AppShell e mesmo tema usados nos outros modulos.",
    "Tipos centralizados para cadastro, contrato, contato e onboarding.",
    "Estrutura pronta para pagina, listagem, detalhe e formularios.",
  ],
  tasks: [
    {
      title: "Contratos e DTOs",
      description: "Definir objetos de cliente, contato, plano e historico.",
      status: "ready",
    },
    {
      title: "Permissoes por perfil",
      description: "Separar visao de CS, comercial e diretoria no mesmo modulo.",
      status: "ready",
    },
    {
      title: "Integracao CRM",
      description: "Trocar os dados de exemplo por chamadas HTTP ou BFF.",
      status: "planned",
    },
  ],
};
