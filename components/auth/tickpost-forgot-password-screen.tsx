"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormErrors = {
  email?: string;
};

const recoverySteps = [
  {
    title: "E-mail verificado",
    description: "Conferimos se existe uma conta TickPost vinculada.",
    icon: Mail,
  },
  {
    title: "Link seguro",
    description: "Você recebe um caminho temporário para redefinir a senha.",
    icon: ShieldCheck,
  },
  {
    title: "Workspace protegido",
    description: "Depois da troca, sua central de conteúdo continua organizada.",
    icon: Sparkles,
  },
];

export function TickpostForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!email) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!isValidEmail) {
      nextErrors.email = "Use um e-mail válido.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    setIsLoading(false);
    setIsSuccess(true);
  }

  return (
    <main className="min-h-svh bg-[#f5f2f0] text-[#18181b] dark:bg-[#060607] dark:text-white">
      <div className="grid min-h-svh lg:grid-cols-[0.92fr_1.08fr]">
        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="w-full max-w-[440px]"
          >
            <Link href="/campanhas" className="inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[#FF6842] text-base font-semibold text-white">
                T
              </span>
              <span>
                <span className="block text-sm font-semibold">tickpost</span>
                <span className="block text-xs text-black/50 dark:text-white/50">Marketing</span>
              </span>
            </Link>

            <div className="mt-12 space-y-3">
              <h1 className="text-4xl font-semibold tracking-[-0.05em]">
                Recupere sua senha
              </h1>
              <p className="text-sm leading-6 text-black/58 dark:text-white/58">
                Informe seu e-mail e enviaremos um link para redefinir sua senha.
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mt-8 rounded-2xl border border-[#38C3DB]/30 bg-[#38C3DB]/10 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#38C3DB] text-black">
                    <CheckCircle2 className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold">Link enviado</h2>
                    <p className="mt-1 text-sm leading-6 text-black/58 dark:text-white/58">
                      Se o e-mail existir, você receberá instruções para redefinir sua senha.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="recovery-email" className="text-sm font-medium text-black/80 dark:text-white/80">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                    <Input
                      id="recovery-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="voce@empresa.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      className="h-11 border-black/10 bg-white pl-10 text-[#18181b] placeholder:text-black/32 focus-visible:border-[#3879FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/32"
                    />
                  </div>
                  {errors.email ? <p className="text-xs text-[#c15a3d] dark:text-[#FFB3A0]">{errors.email}</p> : null}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 w-full bg-[#FF6842] text-white hover:bg-[#ff7857]"
                >
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
                  Enviar link
                </Button>
              </form>
            )}

            <Button
              type="button"
              variant="outline"
              className="mt-4 h-11 w-full border-black/10 bg-white text-[#18181b] hover:bg-[#ede9e6] hover:text-[#18181b] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] dark:hover:text-white"
              asChild
            >
              <Link href="/login">
                <ArrowLeft className="size-4" />
                Voltar para login
              </Link>
            </Button>

            <p className="mt-6 text-center text-sm text-black/50 dark:text-white/50">
              Ainda não tem acesso?{" "}
              <Link href="/cadastro" className="font-medium text-[#18181b] underline-offset-4 hover:underline dark:text-white">
                Criar conta
              </Link>
            </p>
          </motion.div>
        </section>

        <section className="relative hidden overflow-hidden border-l border-black/8 bg-[#ece8e2] lg:block dark:border-white/10 dark:bg-[#0B0B0D]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(56,121,255,0.18),transparent_32rem),radial-gradient(circle_at_75%_70%,rgba(255,104,66,0.14),transparent_28rem)] dark:bg-[radial-gradient(circle_at_25%_15%,rgba(56,121,255,0.28),transparent_32rem),radial-gradient(circle_at_75%_70%,rgba(255,104,66,0.22),transparent_28rem)]" />
          <div className="relative flex min-h-svh items-center justify-center p-10">
            <div className="w-full max-w-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-[2rem] border border-black/8 bg-white/72 p-6 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#38C3DB]">
                      Acesso seguro
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                      Volte para sua operação
                    </h2>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-[#FF6842] text-white">
                    <MessageSquareText className="size-5" />
                  </span>
                </div>

                <div className="space-y-3">
                  {recoverySteps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.34, delay: index * 0.09, ease: "easeOut" }}
                        className="flex items-start gap-4 rounded-2xl border border-black/8 bg-white/78 p-4 dark:border-white/10 dark:bg-black/24"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#3240AA] text-white">
                          <Icon className="size-4" />
                        </span>
                        <span>
                          <span className="block font-medium">{step.title}</span>
                          <span className="mt-1 block text-sm leading-5 text-black/52 dark:text-white/52">
                            {step.description}
                          </span>
                        </span>
                        <CheckCircle2 className="ml-auto size-5 shrink-0 text-[#38C3DB]" />
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-2xl border border-[#FF6842]/25 bg-[#FF6842]/10 p-4 text-sm leading-6 text-[#9f462f] dark:text-[#FFD7CB]">
                  Por segurança, o link de redefinição será temporário e preparado para integração com o backend.
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
