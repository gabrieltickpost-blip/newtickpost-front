"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Chrome,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/shared/utils/masks";

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

const passwordRules = [
  {
    label: "Mínimo 8 caracteres",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "Uma letra maiúscula",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "Uma letra minúscula",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "Um número",
    test: (value: string) => /\d/.test(value),
  },
];

export function TickpostRegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const passwordChecks = useMemo(
    () => passwordRules.map((rule) => ({ ...rule, isValid: rule.test(password) })),
    [password],
  );
  const isPasswordValid = passwordChecks.every((rule) => rule.isValid);

  const canSubmit =
    name.trim().length > 2 &&
    phone.replace(/\D/g, "").length >= 10 &&
    isValidEmail &&
    isPasswordValid &&
    confirmPassword === password &&
    acceptedTerms;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const cleanPhone = phone.replace(/\D/g, "");

    if (name.trim().length < 3) {
      nextErrors.name = "Informe seu nome completo.";
    }

    if (cleanPhone.length < 10) {
      nextErrors.phone = "Informe um telefone válido.";
    }

    if (!email) {
      nextErrors.email = "Informe seu e-mail.";
    } else if (!isValidEmail) {
      nextErrors.email = "Use um e-mail válido.";
    }

    if (!password) {
      nextErrors.password = "Crie uma senha.";
    } else if (!isPasswordValid) {
      nextErrors.password = "A senha ainda não cumpre todos os requisitos.";
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
    router.push("/verificar-email");
  }

  return (
    <main className="min-h-svh bg-[#060607] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[680px] items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="w-full"
        >
          <div className="text-center">
            <Link href="/campanhas" className="mx-auto mb-8 inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-[#FF6842] text-base font-semibold">
                T
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold">tickpost</span>
                <span className="block text-xs text-white/50">Marketing</span>
              </span>
            </Link>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Crie sua conta
            </h1>
            <p className="mt-4 text-lg leading-7 text-white/58 sm:text-xl">
              Configure sua operação de conteúdo com a Tickpost.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            <Button
              type="button"
              disabled
              variant="outline"
              className="h-14 w-full rounded-full border-white/12 bg-white/[0.03] text-base font-semibold text-white/70 hover:bg-white/[0.03] hover:text-white/70 disabled:opacity-100"
            >
              <Chrome className="size-5 text-[#3879FF]" />
              Continue com Google
              <span className="ml-auto rounded-full bg-white/[0.06] px-3 py-1 text-sm font-medium text-white/42">
                Em breve
              </span>
            </Button>

            <div className="flex items-center gap-5 text-sm text-white/48">
              <span className="h-px flex-1 bg-white/12" />
              ou
              <span className="h-px flex-1 bg-white/12" />
            </div>

            <Field label="Nome completo" htmlFor="name" error={errors.name}>
              <UserRound className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-white/32" />
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                className="h-14 rounded-full border-white/14 bg-white/[0.06] pl-13 text-base text-white placeholder:text-white/38 focus-visible:border-white focus-visible:ring-white/20"
              />
            </Field>

            <Field label="Telefone" htmlFor="phone" error={errors.phone}>
              <Phone className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-white/32" />
              <Input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                placeholder="(00) 00000-0000"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                className="h-14 rounded-full border-white/14 bg-white/[0.06] pl-13 text-base text-white placeholder:text-white/38 focus-visible:border-white focus-visible:ring-white/20"
              />
            </Field>

            <Field label="E-mail" htmlFor="email" error={errors.email}>
              <Mail className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-white/32" />
              <Input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="gabriel.tickpost@gmail.com"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                className="h-14 rounded-full border-white/14 bg-white/[0.06] pl-13 text-base text-white placeholder:text-white/38 focus-visible:border-white focus-visible:ring-white/20"
              />
            </Field>

            <div className="space-y-3">
              <Field label="Senha" htmlFor="password" error={errors.password}>
                <LockKeyhole className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-white/32" />
                <Input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  className="h-14 rounded-full border-white/14 bg-white/[0.06] px-13 text-base text-white placeholder:text-white/38 focus-visible:border-white focus-visible:ring-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-[#FF6842] transition hover:text-[#ff8b70]"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </Field>

              <div className="space-y-2 pl-0.5">
                {passwordChecks.map((rule) => (
                  <div
                    key={rule.label}
                    className={
                      rule.isValid
                        ? "flex items-center gap-3 text-sm font-medium text-[#00A878]"
                        : "flex items-center gap-3 text-sm font-medium text-white/34"
                    }
                  >
                    <Check className="size-4" />
                    {rule.label}
                  </div>
                ))}
              </div>
            </div>

            <Field label="Confirmar senha" htmlFor="confirm-password" error={errors.confirmPassword}>
              <LockKeyhole className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-white/32" />
              <Input
                id="confirm-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repita a senha"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                className="h-14 rounded-full border-white/14 bg-white/[0.06] px-13 text-base text-white placeholder:text-white/38 focus-visible:border-white focus-visible:ring-white/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute top-1/2 right-5 -translate-y-1/2 text-[#FF6842] transition hover:text-[#ff8b70]"
                aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </Field>

            <div className="space-y-2">
              <label className="flex items-start gap-3 text-base leading-6 text-white/62">
                <Checkbox
                  checked={acceptedTerms}
                  onCheckedChange={(value) => setAcceptedTerms(Boolean(value))}
                  className="mt-1 size-6 rounded-md border-white/20 bg-white/[0.06] data-[state=checked]:border-[#FF6842] data-[state=checked]:bg-[#FF6842]"
                  aria-invalid={Boolean(errors.terms)}
                />
                <span>
                  Eu aceito os{" "}
                  <Link href="#" className="font-semibold text-[#FF6842] underline-offset-4 hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link href="#" className="font-semibold text-[#FF6842] underline-offset-4 hover:underline">
                    Política de Privacidade
                  </Link>
                  .
                </span>
              </label>
              {errors.terms ? (
                <p className="flex items-center gap-2 text-sm text-[#FFB3A0]">
                  <AlertCircle className="size-4" />
                  {errors.terms}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !canSubmit}
              className="h-14 w-full rounded-full bg-[#FF6842] text-base font-semibold text-white hover:bg-[#ff7857] disabled:bg-[#a84b45] disabled:text-white/48 disabled:opacity-100"
            >
              {isLoading ? <Loader2 className="size-5 animate-spin" /> : null}
              Criar conta
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/48">
            Já tem conta?{" "}
            <Link href="/login" className="font-medium text-white underline-offset-4 hover:underline">
              Entrar
            </Link>
          </p>
        </motion.section>
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
      <label htmlFor={htmlFor} className="block text-base font-semibold text-white">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error ? <p className="text-sm text-[#FFB3A0]">{error}</p> : null}
    </div>
  );
}
