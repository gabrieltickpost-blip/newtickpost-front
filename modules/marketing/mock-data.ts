import { ArrowRight, MessagesSquare, PenLine, RadioTower } from "lucide-react";

import type {
  ActionCardItem,
  AnalyticsPoint,
  Campaign,
  Channel,
  ContentBatch,
  ContentItem,
  GrowthStep,
} from "./types";

export const growthSteps: GrowthStep[] = [
  {
    title: "Campanha",
    description: "Defina objetivo, publico, CTA e destino.",
    status: "current",
  },
  {
    title: "Conteudos",
    description: "Transforme a estrategia em ativos reutilizaveis.",
    status: "next",
  },
  {
    title: "Canais",
    description: "Distribua onde a conversa realmente acontece.",
    status: "next",
  },
  {
    title: "Leads",
    description: "Meça sinais que caminham para venda.",
    status: "next",
  },
];

export const campaigns: Campaign[] = [
  {
    id: "cmp-001",
    name: "Creators para Black Friday B2B",
    objective: "Gerar conversas qualificadas para diagnostico gratuito",
    audience: "Donos de ecommerce com faturamento acima de R$ 80k",
    cta: "Agendar diagnostico",
    destination: "WhatsApp comercial",
    status: "production",
    owner: "Marina Costa",
    progress: 68,
    dueDate: "06 Mai",
    contentCount: 84,
    conversations: 326,
    leads: 74,
  },
  {
    id: "cmp-002",
    name: "Autoridade para social medias",
    objective: "Aumentar demanda por pacote mensal de conteudo",
    audience: "Social medias freelancers e pequenas agencias",
    cta: "Baixar guia de prompts",
    destination: "Landing page",
    status: "live",
    owner: "Rafael Nunes",
    progress: 92,
    dueDate: "Em andamento",
    contentCount: 48,
    conversations: 512,
    leads: 119,
  },
  {
    id: "cmp-003",
    name: "Reativacao de leads frios",
    objective: "Transformar base parada em reunioes comerciais",
    audience: "Leads com mais de 90 dias sem resposta",
    cta: "Responder palavra CRESCER",
    destination: "DM Instagram",
    status: "planning",
    owner: "Bianca Melo",
    progress: 34,
    dueDate: "14 Mai",
    contentCount: 36,
    conversations: 88,
    leads: 21,
  },
];

export const contentItems: ContentItem[] = [
  {
    id: "cnt-001",
    title: "Carrossel: 5 sinais de conteudo que nao vende",
    campaign: "Creators para Black Friday B2B",
    format: "Carrossel",
    channel: "Instagram",
    status: "review",
    objective: "Educar",
    cta: "Agendar diagnostico",
    dueDate: "29 Abr",
  },
  {
    id: "cnt-002",
    title: "Reels: conversa antes do lead",
    campaign: "Autoridade para social medias",
    format: "Reels",
    channel: "Instagram",
    status: "ready",
    objective: "Gerar conversa",
    cta: "Baixar guia",
    dueDate: "30 Abr",
  },
  {
    id: "cnt-003",
    title: "Post LinkedIn: conteudo como sistema comercial",
    campaign: "Reativacao de leads frios",
    format: "Post texto",
    channel: "LinkedIn",
    status: "writing",
    objective: "Reativar",
    cta: "Responder CRESCER",
    dueDate: "02 Mai",
  },
];

export const batches: ContentBatch[] = [
  {
    id: "lot-001",
    name: "Semana 1 - Aquecimento BF",
    campaign: "Creators para Black Friday B2B",
    quantity: 28,
    ready: 19,
    owner: "Marina Costa",
    status: "production",
  },
  {
    id: "lot-002",
    name: "Kit autoridade social media",
    campaign: "Autoridade para social medias",
    quantity: 18,
    ready: 18,
    owner: "Rafael Nunes",
    status: "scheduled",
  },
  {
    id: "lot-003",
    name: "Sequencia DM + posts de prova",
    campaign: "Reativacao de leads frios",
    quantity: 22,
    ready: 7,
    owner: "Bianca Melo",
    status: "review",
  },
];

export const channels: Channel[] = [
  {
    id: "chn-001",
    name: "Instagram TickPost",
    type: "Social",
    status: "healthy",
    audience: "42,8 mil",
    nextPost: "Hoje, 18:30",
    conversionRate: "7,4%",
  },
  {
    id: "chn-002",
    name: "LinkedIn Founders",
    type: "Autoridade",
    status: "attention",
    audience: "18,2 mil",
    nextPost: "Amanha, 09:00",
    conversionRate: "4,1%",
  },
  {
    id: "chn-003",
    name: "WhatsApp Comercial",
    type: "Conversao",
    status: "healthy",
    audience: "3 listas",
    nextPost: "Hoje, 16:00",
    conversionRate: "12,6%",
  },
];

export const analytics: AnalyticsPoint[] = [
  { label: "Sem 1", posts: 36, conversations: 148, leads: 28, sales: 7 },
  { label: "Sem 2", posts: 44, conversations: 214, leads: 39, sales: 10 },
  { label: "Sem 3", posts: 52, conversations: 286, leads: 58, sales: 13 },
  { label: "Sem 4", posts: 61, conversations: 392, leads: 82, sales: 19 },
];

export const actionCards: ActionCardItem[] = [
  {
    title: "Criar campanha guiada",
    description: "Comece pelo objetivo antes de pensar em calendario.",
    action: "Novo brief",
    icon: PenLine,
  },
  {
    title: "Gerar lote de conteudos",
    description: "Transforme uma campanha em uma fila clara de posts.",
    action: "Montar lote",
    icon: ArrowRight,
  },
  {
    title: "Revisar conversas",
    description: "Veja quais conteudos estao puxando leads reais.",
    action: "Ver sinais",
    icon: MessagesSquare,
  },
  {
    title: "Checar canais",
    description: "Confirme destino, frequencia e saude de publicacao.",
    action: "Abrir canais",
    icon: RadioTower,
  },
];
