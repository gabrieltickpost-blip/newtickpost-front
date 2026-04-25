import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Layers3,
  Megaphone,
  RadioTower,
  Sparkles,
} from "lucide-react";
import type { AppPermission } from "@/lib/auth/permissions";

export type AppModuleId =
  | "campanhas"
  | "conteudos"
  | "lotes"
  | "canais"
  | "analytics"
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
  permission: AppPermission;
}

export const appModules: AppModuleDefinition[] = [
  {
    id: "campanhas",
    title: "Campanhas",
    description: "Planeje objetivos, publico, CTA e destino antes do conteudo.",
    href: "/campanhas",
    icon: Megaphone,
    permission: "campanhas:read",
  },
  {
    id: "conteudos",
    title: "Conteudos",
    description: "Transforme campanhas em posts prontos para conversa.",
    href: "/conteudos",
    icon: Sparkles,
    permission: "conteudos:read",
  },
  {
    id: "lotes",
    title: "Lotes",
    description: "Organize producao em massa sem virar planilha.",
    href: "/lotes",
    icon: Layers3,
    permission: "lotes:read",
  },
  {
    id: "canais",
    title: "Canais",
    description: "Conecte destinos e acompanhe saude de publicacao.",
    href: "/canais",
    icon: RadioTower,
    permission: "canais:read",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Veja como conteudo vira conversa, lead e venda.",
    href: "/analytics",
    icon: BarChart3,
    permission: "analytics:read",
  },
];

export function getModuleByPathname(pathname: string | null | undefined) {
  return (
    appModules.find(
      (module) =>
        pathname === module.href || pathname?.startsWith(`${module.href}/`)
    ) ?? appModules[0]
  );
}
