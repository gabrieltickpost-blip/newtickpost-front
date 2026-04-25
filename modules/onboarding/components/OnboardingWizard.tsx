"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { onboardingApi } from "@/modules/onboarding/api/onboarding.api";
import type { OnboardingPayload } from "@/modules/onboarding/types/onboarding.types";

const steps = [
  "Empresa",
  "Nicho e objetivo",
  "Operacao",
  "Marca",
  "Finalizacao",
];

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState<OnboardingPayload>({
    name: "Tickpost",
    onboardingData: {
      language: "pt-BR",
    },
  });

  async function finish() {
    await onboardingApi.submit(payload);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap gap-2">
        {steps.map((item, index) => (
          <span
            key={item}
            className="rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground"
          >
            {index + 1}. {item}
          </span>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <p className="text-sm font-medium text-primary">Etapa {step + 1}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
          {steps[step]}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Guarde os dados essenciais para o backend montar workspace, perfil de marca e preferencias de conteudo.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input
            value={payload.name}
            onChange={(event) =>
              setPayload((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Nome da empresa"
          />
          <Input
            value={payload.website ?? ""}
            onChange={(event) =>
              setPayload((current) => ({ ...current, website: event.target.value }))
            }
            placeholder="Website"
          />
          <Input
            value={payload.workNiche ?? ""}
            onChange={(event) =>
              setPayload((current) => ({ ...current, workNiche: event.target.value }))
            }
            placeholder="Nicho"
          />
          <Input
            value={payload.tickpostUsageGoals ?? ""}
            onChange={(event) =>
              setPayload((current) => ({
                ...current,
                tickpostUsageGoals: event.target.value,
              }))
            }
            placeholder="Objetivo principal"
          />
        </div>

        <div className="mt-6 flex justify-end">
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((current) => current + 1)}>
              Continuar
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button onClick={() => void finish()}>
              Finalizar onboarding
              <CheckCircle2 className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
