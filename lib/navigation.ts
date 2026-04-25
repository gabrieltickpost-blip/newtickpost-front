import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarDays,
  CheckSquare2,
  CircleDollarSign,
  Clock3,
  Inbox,
  Layers3,
  Library,
  Megaphone,
  MessageCircle,
  PenTool,
  RadioTower,
  Settings2,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import type { AppPermission } from "@/lib/auth/permissions";

export type AppModuleId =
  | "hoje"
  | "marketing"
  | "visao-geral"
  | "campanhas"
  | "conteudos"
  | "lotes"
  | "calendario"
  | "publicacoes"
  | "aprovacoes"
  | "biblioteca"
  | "analytics"
  | "conversas"
  | "leads"
  | "canais"
  | "workspace"
  | "equipe"
  | "preferencias"
  | "clientes"
  | "financeiro"
  | "projetos"
  | "comercial";

export interface AppModuleDefinition {
  id: AppModuleId;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  permission?: AppPermission;
  badge?: string;
}

export interface AppNavSection {
  title: string;
  items: AppModuleDefinition[];
}

export const primaryNavItems: AppModuleDefinition[] = [
  {
    id: "hoje",
    title: "Hoje",
    description: "Prioridades, publicações e aprovações do dia.",
    href: "/hoje",
    icon: Clock3,
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Central de crescimento por conteúdo.",
    href: "/app/marketing",
    icon: Megaphone,
  },
];

export const marketingNavItems: AppModuleDefinition[] = [
  {
    id: "visao-geral",
    title: "Visão geral",
    description: "Conteúdo, conversa, lead e venda em uma leitura.",
    href: "/app/marketing",
    icon: Workflow,
  },
  {
    id: "campanhas",
    title: "Campanhas",
    description: "Objetivo, público, CTA e destino antes do conteúdo.",
    href: "/campanhas",
    icon: Megaphone,
    permission: "campanhas:read",
  },
  {
    id: "conteudos",
    title: "Criar conteúdo",
    description: "Transforme campanhas em posts prontos.",
    href: "/conteudos",
    icon: Sparkles,
    permission: "conteudos:read",
  },
  {
    id: "lotes",
    title: "Lotes de conteúdo",
    description: "Produção em massa com controle por campanha.",
    href: "/lotes",
    icon: Layers3,
    permission: "lotes:read",
  },
  {
    id: "calendario",
    title: "Calendário",
    description: "Ritmo editorial por canal, campanha e status.",
    href: "/calendario",
    icon: CalendarDays,
  },
  {
    id: "publicacoes",
    title: "Publicações",
    description: "Fila de posts prontos, agendados e publicados.",
    href: "/publicacoes",
    icon: PenTool,
  },
  {
    id: "aprovacoes",
    title: "Aprovações",
    description: "Feedback, revisão e liberação de conteúdo.",
    href: "/aprovacoes",
    icon: CheckSquare2,
  },
  {
    id: "biblioteca",
    title: "Biblioteca",
    description: "Ativos, ideias, referências e materiais reutilizáveis.",
    href: "/biblioteca",
    icon: Library,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Como conteúdo vira conversa, lead e venda.",
    href: "/analytics",
    icon: BarChart3,
    permission: "analytics:read",
  },
];

export const futureNavItems: AppModuleDefinition[] = [
  {
    id: "conversas",
    title: "Conversas geradas",
    description: "Conversas originadas por campanha e canal.",
    href: "/conversas-geradas",
    icon: MessageCircle,
    badge: "mock",
  },
  {
    id: "leads",
    title: "Leads de conteúdo",
    description: "Leads atribuídos aos conteúdos e CTAs.",
    href: "/leads-de-conteudo",
    icon: CircleDollarSign,
    badge: "mock",
  },
];

export const settingsNavItems: AppModuleDefinition[] = [
  {
    id: "canais",
    title: "Canais",
    description: "Conexões e destinos de publicação.",
    href: "/configuracoes/canais",
    icon: RadioTower,
    permission: "canais:read",
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Identidade, operação e preferências do workspace.",
    href: "/configuracoes/workspace",
    icon: Settings2,
  },
  {
    id: "equipe",
    title: "Equipe",
    description: "Membros, papéis e convites.",
    href: "/configuracoes/equipe",
    icon: UsersRound,
  },
  {
    id: "preferencias",
    title: "Preferências",
    description: "Tema, idioma, notificações e padrões do produto.",
    href: "/configuracoes/preferencias",
    icon: Inbox,
  },
];

export const appNavSections: AppNavSection[] = [
  { title: "Principal", items: primaryNavItems },
  { title: "Marketing", items: marketingNavItems },
  { title: "Preparado para futuro", items: futureNavItems },
  { title: "Configurações", items: settingsNavItems },
];

export const appModules: AppModuleDefinition[] = marketingNavItems.filter(
  (item) => item.permission,
);

export const allAppNavItems = appNavSections.flatMap((section) => section.items);

export function getModuleByPathname(pathname: string | null | undefined) {
  return (
    allAppNavItems
      .slice()
      .sort((a, b) => b.href.length - a.href.length)
      .find(
        (module) =>
          pathname === module.href || pathname?.startsWith(`${module.href}/`),
      ) ?? primaryNavItems[1]
  );
}

export function getBreadcrumbByPathname(pathname: string | null | undefined) {
  const current = getModuleByPathname(pathname);
  const section = appNavSections.find((group) =>
    group.items.some((item) => item.id === current.id),
  );

  if (!section) {
    return ["TickPost", current.title];
  }

  return section.title === "Principal"
    ? ["TickPost", current.title]
    : ["TickPost", section.title, current.title];
}
