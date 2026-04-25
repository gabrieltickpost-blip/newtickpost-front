import type { WorkspaceModuleOverview } from "@/modules/shared/contracts";

export const projectsModuleOverview: WorkspaceModuleOverview = {
  id: "projetos",
  title: "Projetos",
  description:
    "Workspace para squads, backlog, cronograma e status executivo com o mesmo shell.",
  metrics: [
    {
      label: "Projetos em execucao",
      value: "21",
      helper: "Quadros e cronogramas podem ser ligados em APIs diferentes.",
    },
    {
      label: "SLAs criticos",
      value: "5",
      helper: "Prioridades e alertas podem alimentar cards, listas e dashboards.",
    },
    {
      label: "Squads alocadas",
      value: "8",
      helper: "Componente pronto para leitura de times, pessoas e capacidade.",
    },
    {
      label: "Backlog validado",
      value: "73%",
      helper: "Indicador de governanca usando o mesmo design dos outros modulos.",
    },
  ],
  highlights: [
    "Estrutura ideal para telas de lista, detalhe, kanban e relatorio.",
    "Reaproveitamento de cards, badges, tabelas e estados de loading.",
    "Separacao clara entre shell, modulo e camada de integracao.",
  ],
  tasks: [
    {
      title: "Mapa de entidades",
      description: "Tipos de projeto, squad, etapa, risco e entregavel.",
      status: "ready",
    },
    {
      title: "Timeline e marcos",
      description: "Definir fonte dos eventos e estrategia de agregacao.",
      status: "planned",
    },
    {
      title: "Dependencias externas",
      description: "Conectar ERP, PM tool ou backend proprio quando existir.",
      status: "planned",
    },
  ],
};
