"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Chrome,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  LockKeyhole,
  Mail,
  Megaphone,
  MessageCircle,
  Trophy,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

const flowCards = [
  { label: "Campanha", icon: Megaphone, color: "#3879FF", iconColor: "#ffffff" },
  { label: "Conteúdo", icon: FileText, color: "#38C3DB", iconColor: "#0b1b20" },
  { label: "Calendário", icon: CalendarDays, color: "#3240AA", iconColor: "#ffffff" },
  { label: "Conversas", icon: MessageCircle, color: "#FF6842", iconColor: "#ffffff" },
  { label: "Resultado", icon: Trophy, color: "#F5F2F0", iconColor: "#18181b" },
];

export function TickpostRegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (name.trim().length < 3) {
      nextErrors.name = "Informe seu nome completo.";
    }

    if (!email) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!isValidEmail) {
      nextErrors.email = "Use um e-mail válido.";
    }

    if (!password) {
      nextErrors.password = "Crie uma senha.";
    } else if (password.length < 8) {
      nextErrors.password = "A senha precisa ter pelo menos 8 caracteres.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirme sua senha.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "As senhas precisam ser iguais.";
    }

    if (!acceptedTerms) {
      nextErrors.terms = "Aceite os termos para continuar.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    router.push("/onboarding");
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
                Comece a criar conteúdo com estratégia
              </h1>
              <p className="text-sm leading-6 text-black/58 dark:text-white/58">
                Monte campanhas, gere conteúdos em lote e organize sua operação de marketing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Field label="Nome completo" htmlFor="name" error={errors.name}>
                <UserRound className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  className="h-11 border-black/10 bg-white pl-10 text-[#18181b] placeholder:text-black/32 focus-visible:border-[#3879FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/32"
                />
              </Field>

              <Field label="E-mail" htmlFor="email" error={errors.email}>
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                <Input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@empresa.com"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className="h-11 border-black/10 bg-white pl-10 text-[#18181b] placeholder:text-black/32 focus-visible:border-[#3879FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/32"
                />
              </Field>

              <Field label="Senha" htmlFor="password" error={errors.password}>
                <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                <Input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  className="h-11 border-black/10 bg-white px-10 text-[#18181b] placeholder:text-black/32 focus-visible:border-[#3879FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/32"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-black/38 transition hover:text-black dark:text-white/40 dark:hover:text-white"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </Field>

              <Field label="Confirmar senha" htmlFor="confirm-password" error={errors.confirmPassword}>
                <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                <Input
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repita a senha"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  className="h-11 border-black/10 bg-white px-10 text-[#18181b] placeholder:text-black/32 focus-visible:border-[#3879FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/32"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-black/38 transition hover:text-black dark:text-white/40 dark:hover:text-white"
                  aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </Field>

              <div className="space-y-2">
                <label className="flex items-start gap-2 text-sm leading-5 text-black/58 dark:text-white/58">
                  <Checkbox
                    checked={acceptedTerms}
                    onCheckedChange={(value) => setAcceptedTerms(Boolean(value))}
                    className="mt-0.5 border-black/20 bg-white data-[state=checked]:border-[#FF6842] data-[state=checked]:bg-[#FF6842] dark:border-white/20 dark:bg-white/[0.06]"
                    aria-invalid={Boolean(errors.terms)}
                  />
                  <span>
                    Eu aceito os{" "}
                    <Link href="#" className="font-medium text-[#18181b] underline-offset-4 hover:underline dark:text-white">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link href="#" className="font-medium text-[#18181b] underline-offset-4 hover:underline dark:text-white">
                      Política de Privacidade
                    </Link>
                    .
                  </span>
                </label>
                {errors.terms ? (
                  <p className="flex items-center gap-2 text-xs text-[#c15a3d] dark:text-[#FFB3A0]">
                    <AlertCircle className="size-4" />
                    {errors.terms}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full bg-[#FF6842] text-white hover:bg-[#ff7857]"
              >
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                Criar conta
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-black/10 bg-white text-[#18181b] hover:bg-[#ede9e6] hover:text-[#18181b] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <Chrome className="size-4" />
                Criar conta com Google
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-black/50 dark:text-white/50">
              Já tem uma conta?{" "}
              <Link href="/login" className="font-medium text-[#18181b] underline-offset-4 hover:underline dark:text-white">
                Entrar
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
                <div className="mb-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#38C3DB]">
                    Sistema de crescimento
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    Do plano ao resultado em um fluxo
                  </h2>
                </div>

                <div className="space-y-3">
                  {flowCards.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.34, delay: index * 0.09, ease: "easeOut" }}
                        className="flex items-center justify-between rounded-2xl border border-black/8 bg-white/78 p-4 dark:border-white/10 dark:bg-black/24"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="grid size-9 place-items-center rounded-xl"
                            style={{ backgroundColor: item.color, color: item.iconColor }}
                          >
                            <Icon className="size-4" />
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </span>
                        {index < flowCards.length - 1 ? (
                          <ArrowRight className="size-5 text-black/36 dark:text-white/36" />
                        ) : (
                          <CheckCircle2 className="size-5 text-[#38C3DB]" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-black/80 dark:text-white/80">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error ? <p className="text-xs text-[#c15a3d] dark:text-[#FFB3A0]">{error}</p> : null}
    </div>
  );
}
