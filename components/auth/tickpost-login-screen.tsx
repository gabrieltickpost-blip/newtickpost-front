"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Chrome,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { TickpostLogo } from "@/components/brand/tickpost-logo";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type FormErrors = {
  email?: string;
  password?: string;
  credentials?: string;
};

const rightCards = [
  "Campanha criada",
  "20 conteúdos gerados",
  "8 posts agendados",
  "14 conversas geradas",
  "5 leads identificados",
];

export function TickpostLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    if (!password) {
      nextErrors.password = "Informe sua senha.";
    } else if (password.length < 8) {
      nextErrors.password = "A senha precisa ter pelo menos 8 caracteres.";
    }

    if (email === "erro@tickpost.com") {
      nextErrors.credentials = "E-mail ou senha incorretos.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    router.push("/app/marketing");
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
                Entre na sua central de conteúdo
              </h1>
              <p className="text-sm leading-6 text-black/58 dark:text-white/58">
                Crie campanhas, organize conteúdos e transforme posts em conversas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {errors.credentials ? (
                <div className="flex items-center gap-2 rounded-xl border border-[#FF6842]/30 bg-[#FF6842]/10 px-3 py-2 text-sm text-[#c15a3d] dark:text-[#FFB3A0]">
                  <AlertCircle className="size-4" />
                  {errors.credentials}
                </div>
              ) : null}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-black/80 dark:text-white/80">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                  <Input
                    id="email"
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

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-black/80 dark:text-white/80">
                  Senha
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
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
                </div>
                {errors.password ? <p className="text-xs text-[#c15a3d] dark:text-[#FFB3A0]">{errors.password}</p> : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-black/58 dark:text-white/58">
                  <Checkbox
                    checked={remember}
                    onCheckedChange={(value) => setRemember(Boolean(value))}
                    className="border-black/20 bg-white dark:border-white/20 dark:bg-white/[0.06]"
                  />
                  Lembrar de mim
                </label>
                <Link
                  href="/recuperar-senha"
                  className="font-medium text-[#18181b] underline-offset-4 hover:underline dark:text-white"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full bg-[#FF6842] text-white hover:bg-[#ff7857]"
              >
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                Entrar
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-11 w-full border-black/10 bg-white text-[#18181b] hover:bg-[#ede9e6] hover:text-[#18181b] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <Chrome className="size-4" />
                Entrar com Google
              </Button>
            </form>

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
                      Fluxo TickPost
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                      Conteúdo vira pipeline
                    </h2>
                  </div>
                  <span className="rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs text-black/60 dark:border-white/10 dark:bg-black/20 dark:text-white/60">
                    ao vivo
                  </span>
                </div>

                <div className="space-y-3">
                  {rightCards.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.34, delay: index * 0.09, ease: "easeOut" }}
                      className="flex items-center justify-between rounded-2xl border border-black/8 bg-white/78 p-4 dark:border-white/10 dark:bg-black/24"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-lg bg-[#3240AA] text-xs font-semibold text-white">
                          {index + 1}
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
