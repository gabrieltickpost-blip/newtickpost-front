import Link from "next/link";
import { UserPlus } from "lucide-react";

import { AuthField, AuthFormCard, InlineAuthLink } from "@/components/auth/auth-form-card";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { authCopy, getLocaleFromSearchParams, localizedPath } from "@/lib/i18n/auth";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const locale = await getLocaleFromSearchParams(searchParams);
  const copy = authCopy[locale];

  return (
    <AuthShell
      title={copy.register.title}
      description={copy.register.description}
      locale={locale}
      pathname="/cadastro"
      backHref={localizedPath("/login", locale)}
      backLabel={copy.common.backToLogin}
    >
      <AuthFormCard
        footer={
          <>
            {copy.register.alreadyHave}{" "}
            <InlineAuthLink href={localizedPath("/login", locale)}>
              {copy.common.loginNow}
            </InlineAuthLink>
          </>
        }
      >
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthField label={copy.register.firstName} htmlFor="first-name">
              <Input id="first-name" name="firstName" placeholder={copy.register.firstNamePlaceholder} autoComplete="given-name" />
            </AuthField>
            <AuthField label={copy.register.lastName} htmlFor="last-name">
              <Input id="last-name" name="lastName" placeholder={copy.register.lastNamePlaceholder} autoComplete="family-name" />
            </AuthField>
          </div>

          <AuthField label={copy.common.corporateEmail} htmlFor="register-email">
            <Input id="register-email" name="email" type="email" placeholder={copy.common.emailPlaceholder} autoComplete="email" />
          </AuthField>

          <AuthField label={copy.register.company} htmlFor="company">
            <Input id="company" name="company" placeholder={copy.register.companyPlaceholder} autoComplete="organization" />
          </AuthField>

          <AuthField label={copy.common.password} htmlFor="register-password" hint={copy.common.minPassword}>
            <Input id="register-password" name="password" type="password" placeholder={copy.register.passwordPlaceholder} autoComplete="new-password" />
          </AuthField>

          <label className="flex items-start gap-2 text-sm leading-5 text-muted-foreground">
            <Checkbox id="terms" className="mt-0.5" />
            {copy.register.terms}
          </label>

          <Button asChild className="w-full">
            <Link href={localizedPath("/confirmacao-email", locale)}>
              <UserPlus className="size-4" />
              {copy.register.submit}
            </Link>
          </Button>
        </form>
      </AuthFormCard>
    </AuthShell>
  );
}
