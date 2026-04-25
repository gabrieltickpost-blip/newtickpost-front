"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  FileText,
  Target,
} from "lucide-react";
import { useState } from "react";

import { TickpostLogo } from "@/components/brand/tickpost-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const operationTypes = [
  "Creator solo",
  "Social media freelancer",
  "Agência",
  "Empresa",
  "Infoprodutor/Expert",
];

const monthlyContentOptions = [
  "até 20",
  "20 a 50",
  "50 a 100",
  "mais de 100",
];

const mainGoals = [
  "organizar conteúdo",
  "gerar leads",
  "vender mais",
  "aprovar conteúdos com clientes",
  "crescer autoridade",
];

const stepLabels = ["Workspace", "Volume", "Objetivo"];

export function WorkspaceCreationScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("");
  const [operationType, setOperationType] = useState("");
  const [monthlyContent, setMonthlyContent] = useState("");
  const [mainGoal, setMainGoal] = useState("");

  const canContinue =
    step === 0
      ? workspaceName.trim().length > 2 && Boolean(operationType)
      : step === 1
        ? Boolean(monthlyContent)
        : Boolean(mainGoal);

  function persistDraft() {
    window.localStorage.setItem(
      "tickpost.workspaceDraft",
      JSON.stringify({
        workspaceName,
        operationType,
        monthlyContent,
        mainGoal,
      }),
    );
  }

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    persistDraft();

    if (step < stepLabels.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    router.push("/onboarding/brand");
  }

  return (
    <main className="min-h-svh bg-[#6f6f6f] px-4 py-6 text-[#242428] sm:px-6 sm:py-8">
      <section className="mx-auto grid min-h-[calc(100svh-3rem)] w-full max-w-6xl overflow-hidden rounded-[1.6rem] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:grid-cols-[0.62fr_1fr]">
        <div className="relative hidden min-h-[760px] overflow-hidden md:block">
          <Image
            src="/onboarding-sky.svg"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A6FE5]/20 via-transparent to-white/5" />
        </div>

        <div className="flex min-h-[720px] flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-14">
          <div className="mb-12 flex items-center justify-between">
            <TickpostLogo className="h-10" />
            <span className="rounded-full bg-[#f5f2f0] px-3 py-1 text-xs font-medium text-[#6f7278]">
              {step + 1}/{stepLabels.length}
            </span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-10">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#242428]">
                Crie seu workspace
              </h1>
              <p className="mt-3 text-base leading-7 text-[#5f6269]">
                Esse será o espaço onde você vai organizar campanhas, conteúdos, canais e equipe.
              </p>
            </div>

            {step === 0 ? (
              <div className="space-y-6">
                <Field label="Nome do workspace" required>
                  <Input
                    value={workspaceName}
                    onChange={(event) => setWorkspaceName(event.target.value)}
                    placeholder="ex.: TickPost Marketing"
                    autoComplete="organization"
                    className="h-12 rounded-md border-[#d8d8dc] bg-white text-base shadow-none placeholder:text-[#a0a6b2] focus-visible:border-[#3879FF]"
                  />
                </Field>

                <OptionGroup
                  icon={Building2}
                  title="Tipo de operação"
                  options={operationTypes}
                  value={operationType}
                  onChange={setOperationType}
                />
              </div>
            ) : null}

            {step === 1 ? (
              <OptionGroup
                icon={FileText}
                title="Quantidade aproximada de conteúdos por mês"
                options={monthlyContentOptions}
                value={monthlyContent}
                onChange={setMonthlyContent}
                roomy
              />
            ) : null}

            {step === 2 ? (
              <OptionGroup
                icon={Target}
                title="Principal objetivo"
                options={mainGoals}
                value={mainGoal}
                onChange={setMainGoal}
              />
            ) : null}

            <div className="mt-10 flex items-center gap-3">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((current) => current - 1)}
                  className="h-12 rounded-md border-[#d8d8dc] bg-white px-4 text-[#242428] hover:bg-[#f5f2f0]"
                >
                  <ChevronLeft className="size-4" />
                </Button>
              ) : null}
              <Button
                type="button"
                disabled={!canContinue}
                onClick={handleContinue}
                className="h-12 rounded-md bg-[#242428] px-6 text-base text-white hover:bg-black disabled:bg-[#f5f2f0] disabled:text-[#a0a6b2] disabled:opacity-100"
              >
                Continuar
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="mt-auto flex justify-center gap-3 pt-10">
            {stepLabels.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                aria-label={label}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === step ? "w-10 bg-[#144BFF]" : "w-10 bg-[#e8e8eb]",
                )}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[#5f6269]">
        {label} {required ? "*" : null}
      </span>
      {children}
    </label>
  );
}

function OptionGroup({
  icon: Icon,
  title,
  options,
  value,
  onChange,
  roomy = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  roomy?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#5f6269]">
        <Icon className="size-4 text-[#144BFF]" />
        {title}
      </div>
      <div className={cn("grid gap-3", roomy ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "flex min-h-12 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition",
                selected
                  ? "border-[#144BFF] bg-[#144BFF]/8 text-[#242428] shadow-[0_0_0_1px_rgba(20,75,255,0.12)]"
                  : "border-[#e1e3e8] bg-white text-[#5f6269] hover:border-[#bfc4d1] hover:bg-[#f8f8f9]",
              )}
            >
              <span>{option}</span>
              {selected ? <Check className="size-4 shrink-0 text-[#144BFF]" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
