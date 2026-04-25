import type { WorkspaceModuleOverview } from "@/modules/shared/contracts";

export const commercialModuleOverview: WorkspaceModuleOverview = {
  id: "comercial",
  title: "Comercial",
  description:
    "Pipeline, previsao e handoff comercial com formulários padronizados e prontos para API.",
  metrics: [
    {
      label: "Pipeline aberto",
      value: "R$ 3,4M",
      helper: "Cards prontos para receber fonte de CRM ou backend proprio.",
    },
    {
      label: "Deals em negociacao",
      value: "29",
      helper: "Mesmo componente pode alimentar board, lista e forecast.",
    },
    {
      label: "Taxa de conversao",
      value: "21%",
      helper: "Acompanhamento por periodo, origem e executivo de conta.",
    },
    {
      label: "MQLs da semana",
      value: "74",
      helper: "Padrao preparado para formulario, automacao e enrichment.",
    },
  ],
  highlights: [
    "O modulo ja demonstra o padrao de formularios compartilhados.",
    "Permissoes e layout seguem a mesma estrutura do restante da aplicacao.",
    "Gateway pode apontar para backend real via variavel de ambiente.",
  ],
  tasks: [
    {
      title: "Contratos de oportunidade",
      description: "Definir lead, conta, oportunidade, etapa e forecast.",
      status: "ready",
    },
    {
      title: "Handoff para projetos",
      description: "Conectar o fechamento da venda ao modulo de entrega.",
      status: "planned",
    },
    {
      title: "Automacao de cadencia",
      description: "Depende da escolha do CRM e das regras operacionais.",
      status: "planned",
    },
  ],
};
