"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { TickpostLogo } from "@/components/brand/tickpost-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormErrors = {
  password?: string;
  confirmPassword?: string;
};

const securityCards = [
  "Senha forte",
  "Sessão protegida",
  "Workspace seguro",
];

export function TickpostResetPasswordScreen({
  isExpired = false,
}: {
  isExpired?: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!password) {
      nextErrors.password = "Informe uma nova senha.";
    } else if (password.length < 8) {
      nextErrors.password = "A senha precisa ter pelo menos 8 caracteres.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirme sua nova senha.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "As senhas precisam ser iguais.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    router.push("/login");
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
              <TickpostLogo className="h-11" />
            </Link>

            <div className="mt-12 space-y-3">
              <h1 className="text-4xl font-semibold tracking-[-0.05em]">
                Crie uma nova senha
              </h1>
              <p className="text-sm leading-6 text-black/58 dark:text-white/58">
                Escolha uma senha segura para voltar ao seu workspace.
              </p>
            </div>

            {isExpired ? (
              <div className="mt-8 rounded-2xl border border-[#FF6842]/30 bg-[#FF6842]/10 p-5">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#FF6842] text-white">
                    <AlertCircle className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold">Token expirado</h2>
                    <p className="mt-1 text-sm leading-6 text-black/58 dark:text-white/58">
                      Esse link não está mais válido. Solicite um novo link de recuperação.
                    </p>
                  </div>
                </div>
                <Button className="mt-5 h-11 w-full bg-[#FF6842] text-white hover:bg-[#ff7857]" asChild>
                  <Link href="/recuperar-senha">Enviar novo link</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <Field label="Nova senha" htmlFor="new-password" error={errors.password}>
                  <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                  <Input
                    id="new-password"
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
                    placeholder="Repita a nova senha"
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 w-full bg-[#FF6842] text-white hover:bg-[#ff7857]"
                >
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
                  Salvar nova senha
                </Button>
              </form>
            )}
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
                      Segurança TickPost
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                      Proteção para sua central
                    </h2>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl bg-[#3240AA] text-white">
                    <ShieldCheck className="size-5" />
                  </span>
                </div>

                <div className="space-y-3">
                  {securityCards.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.34, delay: index * 0.09, ease: "easeOut" }}
                      className="flex items-center justify-between rounded-2xl border border-black/8 bg-white/78 p-4 dark:border-white/10 dark:bg-black/24"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-xl bg-[#FF6842] text-white">
                          <KeyRound className="size-4" />
                        </span>
                        <span className="font-medium">{item}</span>
                      </span>
                      <CheckCircle2 className="size-5 text-[#38C3DB]" />
                    </motion.div>
                  ))}
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
