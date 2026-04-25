import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

import {
  authCopy,
  type Locale,
  localeLabels,
  locales,
  localizedPath,
} from "@/lib/i18n/auth";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: ReactNode;
  title: string;
  description: string;
  locale: Locale;
  pathname: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
};

export function AuthShell({
  children,
  title,
  description,
  locale,
  pathname,
  backHref,
  backLabel = "Voltar",
  className,
}: AuthShellProps) {
  const copy = authCopy[locale].shell;

  return (
    <main className="min-h-svh bg-background">
      <div className="grid min-h-svh lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)]">
        <section className="relative hidden overflow-hidden border-r bg-zinc-950 text-white lg:block">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
            alt={copy.imageAlt}
            fill
            priority
            sizes="42vw"
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(9,9,11,0.92),rgba(9,9,11,0.42)_58%,rgba(9,9,11,0.78))]" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            <Link
              href="/campanhas"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold"
            >
              <span className="grid h-10 w-[148px] place-items-center rounded-md bg-white px-3">
                <Image
                  src="/logo.svg"
                  alt={copy.brand}
                  width={122}
                  height={23}
                  priority
                  className="h-auto w-full"
                />
              </span>
            </Link>

            <div className="max-w-md space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
                  {copy.visualEyebrow}
                </p>
                <h1 className="text-4xl font-semibold leading-tight">
                  {copy.visualTitle}
                </h1>
              </div>

              <div className="grid gap-3 text-sm text-white/82">
                <AuthShellHighlight icon={CheckCircle2}>
                  {copy.highlightAnalytics}
                </AuthShellHighlight>
                <AuthShellHighlight icon={ShieldCheck}>
                  {copy.highlightSecurity}
                </AuthShellHighlight>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-svh items-center justify-center px-5 py-8 sm:px-8">
          <div className={cn("w-full max-w-[440px] space-y-7", className)}>
            {backHref ? (
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                {backLabel}
              </Link>
            ) : null}

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {copy.eyebrow}
                </p>
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {title}
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
              <LanguageSwitcher locale={locale} pathname={pathname} />
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

function LanguageSwitcher({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  return (
    <div
      className="grid shrink-0 grid-cols-3 overflow-hidden rounded-md border bg-card p-0.5"
      aria-label="Language"
    >
      {locales.map((item) => (
        <Link
          key={item}
          href={localizedPath(pathname, item)}
          aria-current={item === locale ? "page" : undefined}
          className={cn(
            "grid h-8 min-w-9 place-items-center rounded-[5px] px-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground",
            item === locale && "bg-foreground text-background hover:text-background"
          )}
        >
          {localeLabels[item]}
        </Link>
      ))}
    </div>
  );
}

function AuthShellHighlight({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon: typeof CheckCircle2;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-white/14 bg-white/8 p-3 backdrop-blur">
      <Icon className="mt-0.5 size-4 shrink-0 text-white" />
      <span>{children}</span>
    </div>
  );
}
