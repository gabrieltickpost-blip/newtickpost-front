import type { WorkspaceModuleOverview } from "@/modules/shared/contracts";

export const financeModuleOverview: WorkspaceModuleOverview = {
  id: "financeiro",
  title: "Financeiro",
  description:
    "Base para caixa, faturamento, repasses e margem operacional com governanca de acesso.",
  metrics: [
    {
      label: "Receita prevista",
      value: "R$ 1,8M",
      helper: "Bloco pronto para plugar previsao, realizado e comparativos.",
    },
    {
      label: "Faturas abertas",
      value: "42",
      helper: "Tabela de cobranca e aging preparada para contratos reais.",
    },
    {
      label: "Repasse do mes",
      value: "R$ 312k",
      helper: "Mesma arquitetura para conciliar parceiro, nota e conta.",
    },
    {
      label: "Margem bruta",
      value: "38%",
      helper: "Indicadores podem vir de data warehouse ou API operacional.",
    },
  ],
  highlights: [
    "Navegacao protegida por permissao desde a origem do AppShell.",
    "Cards, tabelas e estados de erro padronizados com o design system atual.",
    "Separacao pronta entre contratos, servicos e componentes de apresentacao.",
  ],
  tasks: [
    {
      title: "Gateway financeiro",
      description: "Conectar fluxo de contas a pagar, receber e conciliacao.",
      status: "planned",
    },
    {
      title: "Auditoria de acessos",
      description: "Garantir recortes por perfil sem duplicar interface.",
      status: "ready",
    },
    {
      title: "Exportacao fiscal",
      description: "Mapear necessidade de relatórios legais e fechamento.",
      status: "blocked",
    },
  ],
};
