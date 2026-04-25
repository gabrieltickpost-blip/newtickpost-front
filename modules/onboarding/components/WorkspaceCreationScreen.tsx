"use client";

import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  FileText,
  Layers3,
  Megaphone,
  Mic2,
  MousePointerClick,
  PackageCheck,
  RadioTower,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

import { TickpostLogo } from "@/components/brand/tickpost-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type StepId =
  | "brand"
  | "audience"
  | "offer"
  | "voice"
  | "channels"
  | "goal"
  | "operation"
  | "summary";

type ProfileKey =
  | "Marca"
  | "Público"
  | "Oferta"
  | "Tom de voz"
  | "Canais"
  | "Objetivo"
  | "Operação";

type StepConfig = {
  id: StepId;
  label: string;
  title: string;
  description: string;
  profileKeys: ProfileKey[];
};

type ChoiceOption = {
  title: string;
  description?: string;
};

type Answers = {
  brandName: string;
  brandHandle: string;
  segment: string;
  brandDescription: string;
  audience: string;
  audiencePain: string;
  audienceDesire: string;
  awarenessLevel: string;
  offerName: string;
  offerType: string;
  offerPromise: string;
  priceRange: string;
  objection: string;
  voice: string;
  wordsUse: string;
  wordsAvoid: string;
  references: string;
  channels: string[];
  goal: string;
  operations: string[];
};

const steps: StepConfig[] = [
  {
    id: "brand",
    label: "Marca",
    title: "Sobre qual marca você vai criar conteúdo?",
    description:
      "Defina a base da marca para que a TickPost entenda contexto, segmento e posicionamento.",
    profileKeys: ["Marca"],
  },
  {
    id: "audience",
    label: "Público",
    title: "Para quem você cria conteúdo?",
    description:
      "Mapeie quem precisa receber a mensagem, qual dor pesa mais e em que momento de compra essa pessoa está.",
    profileKeys: ["Público"],
  },
  {
    id: "offer",
    label: "Oferta",
    title: "O que você quer vender ou gerar com conteúdo?",
    description:
      "Conecte conteúdo com oferta, promessa, objeção e tipo de conversão que precisa acontecer.",
    profileKeys: ["Oferta"],
  },
  {
    id: "voice",
    label: "Voz",
    title: "Como sua marca deve se comunicar?",
    description:
      "Defina o estilo de comunicação, as palavras que a marca usa, evita e as referências que inspiram.",
    profileKeys: ["Tom de voz"],
  },
  {
    id: "channels",
    label: "Canais",
    title: "Onde você quer distribuir conteúdo?",
    description:
      "Escolha os canais prioritários para adaptar formato, ritmo e intenção de cada conteúdo.",
    profileKeys: ["Canais"],
  },
  {
    id: "goal",
    label: "Objetivo",
    title: "Qual resultado você quer buscar primeiro?",
    description:
      "Escolha o primeiro resultado que a operação de conteúdo precisa perseguir com clareza.",
    profileKeys: ["Objetivo"],
  },
  {
    id: "operation",
    label: "Operação",
    title: "Como você trabalha hoje?",
    description:
      "Mostre como a rotina funciona hoje para a TickPost organizar campanhas, calendário e aprovação sem atrito.",
    profileKeys: ["Operação"],
  },
  {
    id: "summary",
    label: "Resumo",
    title: "Perfil estratégico pronto para nascer",
    description:
      "Revise o que já foi definido. Depois disso, você entra na central de crescimento por conteúdo.",
    profileKeys: ["Marca", "Público", "Oferta", "Tom de voz", "Canais", "Objetivo", "Operação"],
  },
];

const initialAnswers: Answers = {
  brandName: "",
  brandHandle: "",
  segment: "",
  brandDescription: "",
  audience: "",
  audiencePain: "",
  audienceDesire: "",
  awarenessLevel: "",
  offerName: "",
  offerType: "",
  offerPromise: "",
  priceRange: "",
  objection: "",
  voice: "",
  wordsUse: "",
  wordsAvoid: "",
  references: "",
  channels: [],
  goal: "",
  operations: [],
};

const segmentOptions: ChoiceOption[] = [
  { title: "Educação" },
  { title: "Serviços" },
  { title: "Saúde/Estética" },
  { title: "Imobiliário" },
  { title: "Infoproduto" },
  { title: "SaaS" },
  { title: "Agência" },
  { title: "Varejo" },
  { title: "Outro" },
];

const awarenessOptions: ChoiceOption[] = [
  { title: "não sabe que tem problema" },
  { title: "sabe do problema" },
  { title: "procura solução" },
  { title: "compara opções" },
  { title: "pronto para comprar" },
];

const offerOptions: ChoiceOption[] = [
  { title: "serviço" },
  { title: "mentoria" },
  { title: "consultoria" },
  { title: "produto digital" },
  { title: "produto físico" },
  { title: "atendimento local" },
  { title: "software" },
  { title: "evento" },
  { title: "conteúdo gratuito para captura" },
];

const voiceOptions: ChoiceOption[] = [
  { title: "direta" },
  { title: "educativa" },
  { title: "provocativa" },
  { title: "técnica" },
  { title: "leve" },
  { title: "inspiradora" },
  { title: "premium" },
  { title: "divertida" },
  { title: "autoridade" },
];

const channelOptions: ChoiceOption[] = [
  { title: "Instagram" },
  { title: "TikTok" },
  { title: "LinkedIn" },
  { title: "X" },
  { title: "YouTube Shorts" },
  { title: "Blog" },
  { title: "Email" },
];

const goalOptions: ChoiceOption[] = [
  { title: "gerar leads" },
  { title: "vender produto" },
  { title: "marcar reuniões" },
  { title: "crescer audiência" },
  { title: "aumentar autoridade" },
  { title: "aquecer audiência" },
  { title: "responder objeções" },
  { title: "organizar calendário" },
];

const operationOptions: ChoiceOption[] = [
  { title: "crio sozinho" },
  { title: "tenho equipe" },
  { title: "tenho clientes" },
  { title: "aprovo com cliente" },
  { title: "gravo em lote" },
  { title: "posto todos os dias" },
  { title: "trabalho com calendário mensal" },
];

export function WorkspaceCreationScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const currentStep = steps[step];
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const canContinue = useMemo(() => {
    switch (currentStep.id) {
      case "brand":
        return (
          answers.brandName.trim().length > 2 &&
          answers.brandHandle.trim().length > 1 &&
          Boolean(answers.segment) &&
          answers.brandDescription.trim().length > 8
        );
      case "audience":
        return (
          answers.audience.trim().length > 2 &&
          answers.audiencePain.trim().length > 2 &&
          answers.audienceDesire.trim().length > 2 &&
          Boolean(answers.awarenessLevel)
        );
      case "offer":
        return (
          answers.offerName.trim().length > 2 &&
          answers.offerPromise.trim().length > 2 &&
          answers.objection.trim().length > 2 &&
          Boolean(answers.offerType)
        );
      case "voice":
        return (
          Boolean(answers.voice) &&
          answers.wordsUse.trim().length > 1 &&
          answers.wordsAvoid.trim().length > 1 &&
          answers.references.trim().length > 1
        );
      case "channels":
        return answers.channels.length > 0;
      case "goal":
        return Boolean(answers.goal);
      case "operation":
        return answers.operations.length > 0;
      case "summary":
        return true;
    }
  }, [answers, currentStep.id]);

  function updateAnswer<Key extends keyof Answers>(key: Key, value: Answers[Key]) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function toggleChannel(channel: string) {
    setAnswers((current) => ({
      ...current,
      channels: current.channels.includes(channel)
        ? current.channels.filter((item) => item !== channel)
        : [...current.channels, channel],
    }));
  }

  function toggleOperation(operation: string) {
    setAnswers((current) => ({
      ...current,
      operations: current.operations.includes(operation)
        ? current.operations.filter((item) => item !== operation)
        : [...current.operations, operation],
    }));
  }

  function persistDraft() {
    window.localStorage.setItem("tickpost.brandStrategyProfile", JSON.stringify(answers));
  }

  function goToNext() {
    persistDraft();

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    router.push("/app/marketing");
  }

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    goToNext();
  }

  return (
    <main className="min-h-svh bg-[#060607] px-3 py-3 text-white sm:px-5 sm:py-5">
      <section className="mx-auto flex min-h-[calc(100svh-1.5rem)] w-full max-w-7xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0B0B0D] shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:min-h-[calc(100svh-2.5rem)]">
        <header className="border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TickpostLogo className="h-9" imageClassName="[filter:invert(1)_hue-rotate(180deg)]" />
            <div className="flex min-w-[220px] items-center gap-3">
              <span className="text-sm font-medium text-white/58">{progress}%</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-[#FF6842]"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <nav className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="Etapas do onboarding">
            {steps.map((item, index) => {
              const isActive = index === step;
              const isComplete = index < step;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(index)}
                  className={cn(
                    "flex min-w-[118px] items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition",
                    isActive
                      ? "border-[#FF6842]/70 bg-[#FF6842]/12 text-white shadow-[0_0_0_1px_rgba(255,104,66,0.1)]"
                      : isComplete
                        ? "border-[#3879FF]/35 bg-[#3879FF]/10 text-white/82"
                        : "border-white/8 bg-white/[0.03] text-white/42 hover:border-white/16 hover:text-white/70",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-md text-[11px]",
                      isActive
                        ? "bg-[#FF6842] text-white"
                        : isComplete
                          ? "bg-[#3879FF] text-white"
                          : "bg-white/8 text-white/48",
                    )}
                  >
                    {isComplete ? <Check className="size-3" /> : index + 1}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </header>

        <div className="grid flex-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.75fr)]">
          <section className="flex min-h-[640px] flex-col border-white/10 px-4 py-6 sm:px-8 sm:py-8 lg:border-r lg:px-10 lg:py-10">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-1 flex-col"
            >
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/62">
                  <Sparkles className="size-3.5 text-[#38C3DB]" />
                  Etapa {step + 1} de {steps.length}
                </div>
                <h1 className="max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  {currentStep.title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58 sm:text-base">
                  {currentStep.description}
                </p>
              </div>

              <div className="mt-8 flex-1">{renderStepContent()}</div>
            </motion.div>

            <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === 0}
                  onClick={() => setStep((current) => Math.max(current - 1, 0))}
                  className="h-11 rounded-lg border-white/10 bg-white/[0.04] px-4 text-white hover:bg-white/[0.08] hover:text-white disabled:pointer-events-none disabled:opacity-35"
                >
                  <ChevronLeft className="size-4" />
                  Voltar
                </Button>

              </div>

              <Button
                type="button"
                disabled={!canContinue}
                onClick={handleContinue}
                className="h-11 rounded-lg bg-[#FF6842] px-5 text-white hover:bg-[#ff7857] disabled:bg-white/8 disabled:text-white/30 disabled:opacity-100"
              >
                {step === steps.length - 1 ? "Entrar na TickPost" : "Continuar"}
                <ArrowRight className="size-4" />
              </Button>
            </footer>
          </section>

          <StrategicProfilePanel answers={answers} activeKeys={currentStep.profileKeys} />
        </div>
      </section>
    </main>
  );

  function renderStepContent() {
    switch (currentStep.id) {
      case "brand":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome da marca" icon={Building2}>
                <Input
                  value={answers.brandName}
                  onChange={(event) => updateAnswer("brandName", event.target.value)}
                  placeholder="ex.: TickPost Marketing"
                  autoComplete="organization"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Site ou Instagram" icon={MousePointerClick}>
                <Input
                  value={answers.brandHandle}
                  onChange={(event) => updateAnswer("brandHandle", event.target.value)}
                  placeholder="ex.: @tickpost ou tickpost.com"
                  autoComplete="url"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>
            </div>

            <ChoiceGrid
              title="Segmento"
              options={segmentOptions}
              value={answers.segment}
              onSelect={(value) => updateAnswer("segment", value)}
              compact
            />

            <Field label="Descrição curta" icon={FileText}>
              <Textarea
                value={answers.brandDescription}
                onChange={(event) => updateAnswer("brandDescription", event.target.value)}
                placeholder="Descreva em uma frase o que a marca faz e para quem."
                className="min-h-24 resize-none rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
              />
            </Field>
          </div>
        );

      case "audience":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Público principal" icon={UsersRound}>
                <Input
                  value={answers.audience}
                  onChange={(event) => updateAnswer("audience", event.target.value)}
                  placeholder="ex.: social medias freelancers"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Maior dor" icon={Target}>
                <Input
                  value={answers.audiencePain}
                  onChange={(event) => updateAnswer("audiencePain", event.target.value)}
                  placeholder="ex.: falta de previsibilidade"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Maior desejo" icon={Sparkles}>
                <Input
                  value={answers.audienceDesire}
                  onChange={(event) => updateAnswer("audienceDesire", event.target.value)}
                  placeholder="ex.: vender mais com conteúdo"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>
            </div>

            <ChoiceGrid
              title="Nível de consciência"
              options={awarenessOptions}
              value={answers.awarenessLevel}
              onSelect={(value) => updateAnswer("awarenessLevel", value)}
              compact
            />
          </div>
        );

      case "offer":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Produto/oferta principal" icon={PackageCheck}>
                <Input
                  value={answers.offerName}
                  onChange={(event) => updateAnswer("offerName", event.target.value)}
                  placeholder="ex.: gestão de conteúdo mensal"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Promessa da oferta" icon={Megaphone}>
                <Input
                  value={answers.offerPromise}
                  onChange={(event) => updateAnswer("offerPromise", event.target.value)}
                  placeholder="ex.: campanhas prontas em menos tempo"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Preço ou faixa" hint="Opcional" icon={Layers3}>
                <Input
                  value={answers.priceRange}
                  onChange={(event) => updateAnswer("priceRange", event.target.value)}
                  placeholder="ex.: R$ 997 a R$ 3.000"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Principal objeção" icon={Target}>
                <Input
                  value={answers.objection}
                  onChange={(event) => updateAnswer("objection", event.target.value)}
                  placeholder="ex.: não tenho tempo para produzir"
                  className="h-12 rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>
            </div>

            <ChoiceGrid
              title="Tipos de oferta"
              options={offerOptions}
              value={answers.offerType}
              onSelect={(value) => updateAnswer("offerType", value)}
              compact
            />
          </div>
        );

      case "voice":
        return (
          <div className="space-y-6">
            <ChoiceGrid
              title="Escolha o tom principal"
              options={voiceOptions}
              value={answers.voice}
              onSelect={(value) => updateAnswer("voice", value)}
              compact
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Palavras que usa" icon={Mic2}>
                <Textarea
                  value={answers.wordsUse}
                  onChange={(event) => updateAnswer("wordsUse", event.target.value)}
                  placeholder="ex.: estratégia, clareza, crescimento"
                  className="min-h-24 resize-none rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Palavras que evita" icon={Mic2}>
                <Textarea
                  value={answers.wordsAvoid}
                  onChange={(event) => updateAnswer("wordsAvoid", event.target.value)}
                  placeholder="ex.: fórmula mágica, viral garantido"
                  className="min-h-24 resize-none rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>

              <Field label="Referências" icon={Sparkles}>
                <Textarea
                  value={answers.references}
                  onChange={(event) => updateAnswer("references", event.target.value)}
                  placeholder="Marcas, creators ou estilos de comunicação."
                  className="min-h-24 resize-none rounded-lg border-white/10 bg-white/[0.06] text-base text-white shadow-none placeholder:text-white/30 focus-visible:border-[#3879FF]"
                />
              </Field>
            </div>
          </div>
        );

      case "channels":
        return (
          <MultiChoiceGrid
            title="Canais prioritários"
            options={channelOptions}
            values={answers.channels}
            onToggle={toggleChannel}
          />
        );

      case "goal":
        return (
          <ChoiceGrid
            title="Resultado inicial"
            options={goalOptions}
            value={answers.goal}
            onSelect={(value) => updateAnswer("goal", value)}
            compact
          />
        );

      case "operation":
        return (
          <MultiChoiceGrid
            title="Rotina atual"
            options={operationOptions}
            values={answers.operations}
            onToggle={toggleOperation}
          />
        );

      case "summary":
        return <SummaryGrid answers={answers} />;
    }
  }
}

function StrategicProfilePanel({
  answers,
  activeKeys,
}: {
  answers: Answers;
  activeKeys: ProfileKey[];
}) {
  const cards = getProfileCards(answers);
  const completed = cards.filter((card) => card.active).length;

  return (
    <aside className="relative min-h-[640px] overflow-hidden bg-[linear-gradient(180deg,#111114_0%,#070708_100%)] px-4 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3879FF]/55 to-transparent" />
      <div className="sticky top-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="rounded-xl border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#38C3DB]">
                Preview ao vivo
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                Seu perfil estratégico
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Cada resposta ativa uma parte do sistema que vai orientar campanhas, conteúdos,
                CTAs e calendário.
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#FF6842]/30 bg-[#FF6842]/12 text-[#FFB3A0]">
              <Sparkles className="size-5" />
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-[#3879FF]"
                initial={false}
                animate={{ width: `${(completed / cards.length) * 100}%` }}
                transition={{ duration: 0.34, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-medium text-white/55">
              {completed}/{cards.length}
            </span>
          </div>
        </motion.div>

        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          {cards.map((card, index) => {
            const highlighted = activeKeys.includes(card.key);
            const Icon = card.icon;

            return (
              <motion.div
                key={card.key}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: highlighted && card.active ? 1.015 : 1,
                }}
                transition={{ duration: 0.28, delay: index * 0.035, ease: "easeOut" }}
                className={cn(
                  "rounded-xl border p-3 transition-colors",
                  card.active
                    ? "border-[#3879FF]/35 bg-[#3879FF]/10"
                    : "border-white/8 bg-white/[0.035]",
                  highlighted && "border-[#FF6842]/55 shadow-[0_0_0_1px_rgba(255,104,66,0.12)]",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg border",
                      card.active
                        ? "border-[#38C3DB]/30 bg-[#38C3DB]/12 text-[#38C3DB]"
                        : "border-white/10 bg-black/20 text-white/35",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/42">
                        {card.key}
                      </p>
                      {card.active ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="grid size-5 place-items-center rounded-full bg-[#FF6842] text-white"
                        >
                          <Check className="size-3" />
                        </motion.span>
                      ) : null}
                    </div>

                    <motion.p
                      key={card.value}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className={cn(
                        "mt-1 truncate text-sm font-semibold",
                        card.active ? "text-white" : "text-white/45",
                      )}
                    >
                      {card.value}
                    </motion.p>

                    <motion.p
                      key={card.status}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className={cn(
                        "mt-2 text-xs",
                        card.active ? "text-[#38C3DB]" : "text-white/32",
                      )}
                    >
                      {card.active ? card.status : "Aguardando resposta"}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function getProfileCards(answers: Answers) {
  return [
    {
      key: "Marca" as const,
      icon: Building2,
      value: answers.brandName || "Nome, canal e segmento",
      status: "Marca entendida",
      active: Boolean(answers.brandName && answers.brandHandle && answers.segment),
    },
    {
      key: "Público" as const,
      icon: UsersRound,
      value: answers.audience || "Público, dor e desejo",
      status: "Público definido",
      active: Boolean(answers.audience && answers.audiencePain && answers.awarenessLevel),
    },
    {
      key: "Oferta" as const,
      icon: PackageCheck,
      value: answers.offerName || answers.offerType || "Oferta a conectar",
      status: "Oferta conectada",
      active: Boolean(answers.offerName && answers.offerType && answers.offerPromise),
    },
    {
      key: "Tom de voz" as const,
      icon: Mic2,
      value: answers.voice || "Voz em construção",
      status: "Tom calibrado",
      active: Boolean(answers.voice),
    },
    {
      key: "Canais" as const,
      icon: RadioTower,
      value: answers.channels.length > 0 ? answers.channels.join(", ") : "Canais pendentes",
      status: "Canais priorizados",
      active: answers.channels.length > 0,
    },
    {
      key: "Objetivo" as const,
      icon: Target,
      value: answers.goal || "Objetivo pendente",
      status: "Objetivo claro",
      active: Boolean(answers.goal),
    },
    {
      key: "Operação" as const,
      icon: FileText,
      value: answers.operations.length > 0 ? answers.operations.join(", ") : "Operação pendente",
      status: "Campanhas prontas para nascer",
      active: answers.operations.length > 0,
    },
  ];
}

function Field({
  label,
  hint,
  icon: Icon,
  children,
}: {
  label: string;
  hint?: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-white/72">
        {Icon ? <Icon className="size-4 text-[#38C3DB]" /> : null}
        {label}
        {hint ? <span className="text-xs font-medium text-white/36">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

function ChoiceGrid({
  title,
  options,
  value,
  onSelect,
  compact = false,
}: {
  title: string;
  options: ChoiceOption[];
  value: string;
  onSelect: (value: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-white/72">{title}</p>
      <div className={cn("grid gap-3", compact ? "sm:grid-cols-2" : "xl:grid-cols-2")}>
        {options.map((option) => (
          <ChoiceCard
            key={option.title}
            option={option}
            selected={value === option.title}
            onClick={() => onSelect(option.title)}
          />
        ))}
      </div>
    </div>
  );
}

function MultiChoiceGrid({
  title,
  options,
  values,
  onToggle,
}: {
  title: string;
  options: ChoiceOption[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white/72">{title}</p>
        <span className="text-xs text-white/36">Selecione um ou mais</span>
      </div>
      <div className="grid gap-3 xl:grid-cols-2">
        {options.map((option) => (
          <ChoiceCard
            key={option.title}
            option={option}
            selected={values.includes(option.title)}
            onClick={() => onToggle(option.title)}
          />
        ))}
      </div>
    </div>
  );
}

function ChoiceCard({
  option,
  selected,
  onClick,
}: {
  option: ChoiceOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex min-h-20 items-start justify-between gap-4 rounded-xl border p-4 text-left transition",
        selected
          ? "border-[#FF6842]/70 bg-[#FF6842]/12 text-white shadow-[0_0_0_1px_rgba(255,104,66,0.12)]"
          : "border-white/10 bg-white/[0.04] text-white/72 hover:border-white/20 hover:bg-white/[0.07] hover:text-white",
      )}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-5">{option.title}</span>
        {option.description ? (
          <span className="mt-1 block text-xs leading-5 text-white/42 group-hover:text-white/55">
            {option.description}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition",
          selected
            ? "border-[#FF6842] bg-[#FF6842] text-white"
            : "border-white/18 bg-black/20 text-transparent",
        )}
      >
        <Check className="size-3" />
      </span>
    </button>
  );
}

function SummaryGrid({ answers }: { answers: Answers }) {
  const items = [
    {
      label: "Marca",
      value: [answers.brandName, answers.segment, answers.brandHandle, answers.brandDescription]
        .filter(Boolean)
        .join(" · ") || "Não informado",
      icon: Building2,
    },
    {
      label: "Público",
      value: [
        answers.audience,
        answers.audiencePain ? `dor: ${answers.audiencePain}` : "",
        answers.audienceDesire ? `desejo: ${answers.audienceDesire}` : "",
        answers.awarenessLevel,
      ]
        .filter(Boolean)
        .join(" · ") || "Não informado",
      icon: UsersRound,
    },
    {
      label: "Oferta",
      value: [
        answers.offerName,
        answers.offerType,
        answers.offerPromise,
        answers.priceRange,
        answers.objection ? `objeção: ${answers.objection}` : "",
      ]
        .filter(Boolean)
        .join(" · ") || "Não informado",
      icon: PackageCheck,
    },
    {
      label: "Voz",
      value: [
        answers.voice,
        answers.wordsUse ? `usa: ${answers.wordsUse}` : "",
        answers.wordsAvoid ? `evita: ${answers.wordsAvoid}` : "",
        answers.references ? `referências: ${answers.references}` : "",
      ]
        .filter(Boolean)
        .join(" · ") || "Não informado",
      icon: Mic2,
    },
    {
      label: "Canais",
      value: answers.channels.length > 0 ? answers.channels.join(", ") : "Não informado",
      icon: RadioTower,
    },
    { label: "Objetivo", value: answers.goal || "Não informado", icon: Target },
    {
      label: "Operação",
      value: answers.operations.length > 0 ? answers.operations.join(", ") : "Não informado",
      icon: FileText,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/42">
              <Icon className="size-4 text-[#38C3DB]" />
              {item.label}
            </div>
            <p className="text-sm font-semibold leading-5 text-white">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
