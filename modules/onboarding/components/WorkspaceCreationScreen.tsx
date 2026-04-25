"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Check, FileText, Target } from "lucide-react";
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

export function WorkspaceCreationScreen() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [operationType, setOperationType] = useState("");
  const [monthlyContent, setMonthlyContent] = useState("");
  const [mainGoal, setMainGoal] = useState("");

  const canContinue =
    workspaceName.trim().length > 2 &&
    Boolean(operationType) &&
    Boolean(monthlyContent) &&
    Boolean(mainGoal);

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    window.localStorage.setItem(
      "tickpost.workspaceDraft",
      JSON.stringify({
        workspaceName,
        operationType,
        monthlyContent,
        mainGoal,
      }),
    );

    router.push("/onboarding/brand");
  }

  return (
    <main className="min-h-svh overflow-hidden bg-[#060607] px-5 py-8 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(56,121,255,0.22),transparent_32rem),radial-gradient(circle_at_82%_78%,rgba(255,104,66,0.18),transparent_28rem)]" />
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between gap-4">
          <TickpostLogo className="h-9" />
          <div className="text-right text-xs text-white/46">
            <span className="block font-medium text-white/70">Etapa 1 de 2</span>
            Workspace
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-3xl">
            <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 rounded-full bg-[#FF6842]" />
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur">
              <div className="border-b border-white/10 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#FF6842] text-white">
                    <Building2 className="size-5" />
                  </span>
                  <div>
                    <h1 className="text-3xl font-semibold tracking-[-0.04em]">
                      Crie seu workspace
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
                      Esse será o espaço onde você vai organizar campanhas, conteúdos, canais e equipe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-7 p-6 sm:p-8">
                <div className="space-y-2">
                  <label htmlFor="workspace-name" className="text-sm font-medium text-white/78">
                    Nome do workspace
                  </label>
                  <Input
                    id="workspace-name"
                    value={workspaceName}
                    onChange={(event) => setWorkspaceName(event.target.value)}
                    placeholder="Ex: TickPost Marketing"
                    autoComplete="organization"
                    className="h-12 border-white/10 bg-white/[0.07] text-white placeholder:text-white/32 focus-visible:border-[#3879FF]"
                  />
                </div>

                <OptionGroup
                  icon={Target}
                  title="Tipo de operação"
                  options={operationTypes}
                  value={operationType}
                  onChange={setOperationType}
                />

                <OptionGroup
                  icon={FileText}
                  title="Quantidade aproximada de conteúdos por mês"
                  options={monthlyContentOptions}
                  value={monthlyContent}
                  onChange={setMonthlyContent}
                  compact
                />

                <OptionGroup
                  icon={Check}
                  title="Principal objetivo"
                  options={mainGoals}
                  value={mainGoal}
                  onChange={setMainGoal}
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="text-sm leading-6 text-white/46">
                  Depois disso, vamos configurar a identidade da marca.
                </p>
                <Button
                  type="button"
                  disabled={!canContinue}
                  onClick={handleContinue}
                  className="h-11 bg-[#FF6842] px-5 text-white hover:bg-[#ff7857] disabled:bg-white/10 disabled:text-white/36 disabled:opacity-100"
                >
                  Continuar
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function OptionGroup({
  icon: Icon,
  title,
  options,
  value,
  onChange,
  compact = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-white/78">
        <Icon className="size-4 text-[#38C3DB]" />
        {title}
      </div>
      <div className={cn("grid gap-2", compact ? "sm:grid-cols-4" : "sm:grid-cols-2")}>
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "flex min-h-11 items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left text-sm font-medium transition",
                selected
                  ? "border-[#FF6842]/65 bg-[#FF6842]/14 text-white shadow-[0_0_0_1px_rgba(255,104,66,0.16)]"
                  : "border-white/10 bg-black/18 text-white/62 hover:border-white/18 hover:bg-white/[0.06] hover:text-white",
              )}
            >
              <span>{option}</span>
              {selected ? <Check className="size-4 shrink-0 text-[#FF6842]" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
