"use client";

import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  HelpCircle,
  Home,
  Link2,
  Shield,
  SlidersHorizontal,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TickpostLogo } from "@/components/brand/tickpost-logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "Pessoal",
    items: [
      { id: "home", label: "Home", icon: Home },
      { id: "account", label: "Conta", icon: UserRound },
      { id: "notifications", label: "Notificações", icon: Bell },
      { id: "security", label: "Segurança", icon: Shield },
    ],
  },
  {
    label: "Espaço de trabalho",
    items: [
      { id: "workspace", label: "Workspace", icon: Building2 },
      { id: "crm", label: "CRM", icon: SlidersHorizontal },
      { id: "brand", label: "Marca", icon: BriefcaseBusiness },
      { id: "members", label: "Membros da equipe", icon: UsersRound },
      { id: "integrations", label: "Integrações", icon: Link2 },
      { id: "billing", label: "Billing", icon: CreditCard },
    ],
  },
  {
    label: "Ajuda",
    items: [{ id: "support", label: "Suporte", icon: HelpCircle }],
  },
];

export function SettingsModal() {
  const router = useRouter();
  const [active, setActive] = useState("account");

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent
        showCloseButton={false}
        className="h-[min(860px,calc(100vh-2rem))] w-[min(1120px,calc(100vw-2rem))] max-w-none overflow-hidden border border-black/8 bg-[#f7f4f1] p-0 text-[#18181b] shadow-2xl sm:max-w-none dark:border-white/10 dark:bg-[#171717] dark:text-white"
      >
        <div className="grid h-full min-h-0 md:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex min-h-0 flex-col border-b border-black/8 bg-[#f1ede9] p-5 md:border-r md:border-b-0 dark:border-white/10 dark:bg-[#1c1c1b]">
            <div>
              <h2 className="truncate text-lg font-semibold tracking-[-0.03em]">
                Gabriel Barbosa - Criação
              </h2>
              <p className="mt-1 text-sm text-black/50 dark:text-white/48">
                Preferências do workspace
              </p>
            </div>

            <nav className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
              {sections.map((section) => (
                <div key={section.label} className="space-y-2">
                  <p className="px-3 text-xs font-semibold text-black/45 dark:text-white/46">
                    {section.label}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "flex h-10 w-full items-center gap-3 rounded-lg border border-transparent px-3 text-left text-sm font-medium text-black/60 transition-colors hover:bg-black/[0.04] hover:text-black dark:text-white/48 dark:hover:bg-white/[0.04] dark:hover:text-white",
                          active === item.id &&
                            "border-[#3879ff]/35 bg-white/80 text-black shadow-sm dark:border-[#FF6842]/35 dark:bg-black dark:text-white",
                        )}
                      >
                        <item.icon className="size-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="border-t border-black/8 pt-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <TickpostLogo className="h-7 max-w-[132px]" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Tickpost Empresa</p>
                  <p className="truncate text-xs text-black/45 dark:text-white/42">
                    gabriel.tickpost@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section className="min-h-0 overflow-y-auto bg-[#f7f4f1] dark:bg-[#171717]">
            <div className="sticky top-0 z-10 border-b border-black/8 bg-[#f7f4f1]/95 px-5 py-5 backdrop-blur md:px-7 dark:border-white/10 dark:bg-[#171717]/95">
              <DialogHeader className="text-left">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <DialogTitle className="text-2xl tracking-[-0.04em] text-[#18181b] dark:text-white">
                      Configurações de perfil
                    </DialogTitle>
                    <DialogDescription className="mt-2 max-w-xl text-black/56 dark:text-white/52">
                      Atualize sua conta, foto e informações pessoais.
                    </DialogDescription>
                    <p className="mt-3 text-sm text-black/48 dark:text-white/42">
                      Gabriel Barbosa - Criação conteudo · Owner
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-lg p-2 text-black/48 transition-colors hover:bg-black/[0.05] hover:text-black dark:text-white/48 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </DialogHeader>
            </div>

            <div className="p-5 md:p-7">
              <div className="min-w-0 overflow-hidden rounded-2xl border border-black/8 bg-white/75 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur md:max-w-4xl dark:border-white/10 dark:bg-[#191919]">
                <div className="border-b border-black/8 p-5 md:p-7 dark:border-white/10">
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">Conta</h3>
                  <p className="mt-2 text-sm text-black/56 dark:text-white/50">
                    Atualize suas informações pessoais e a foto do seu perfil na Tickpost.
                  </p>
                </div>

                <div className="space-y-6 p-5 md:p-7">
                  <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
                    <div>
                      <p className="font-medium">Foto de perfil</p>
                      <p className="mt-2 text-sm leading-5 text-black/52 dark:text-white/45">
                        Esta imagem aparece em toda a sua área de trabalho.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar className="size-16">
                        <AvatarFallback className="bg-[#FF6842] text-xl text-white">
                          GB
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        className="border-black/10 bg-white text-[#18181b] hover:bg-[#f7f4f1] hover:text-[#18181b] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] dark:hover:text-white"
                      >
                        Escolher foto
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-black/62 hover:bg-black/[0.05] hover:text-black dark:text-white/64 dark:hover:bg-white/[0.06] dark:hover:text-white"
                      >
                        Remover foto
                      </Button>
                    </div>
                  </div>

                  <SettingsRow label="Nome completo">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <SettingsInput defaultValue="Tickpost" />
                      <SettingsInput defaultValue="Empresa" />
                    </div>
                  </SettingsRow>

                  <SettingsRow
                    label="Endereço de email"
                    hint="Use um email válido para manter alertas e acessos sincronizados."
                  >
                    <SettingsInput defaultValue="gabriel.tickpost@gmail.com" />
                  </SettingsRow>

                  <SettingsRow label="Telefone">
                    <SettingsInput defaultValue="(32) 93618-9556" />
                  </SettingsRow>

                  <SettingsRow
                    label="Bio"
                    hint="Uma descrição curta ajuda a identificar melhor seu perfil dentro da operação."
                    rightHint="20 caracteres"
                  >
                    <Textarea
                      defaultValue="Bio QA 1777011611083"
                      className="min-h-28 resize-none border-black/10 bg-white text-[#18181b] placeholder:text-black/30 focus-visible:border-[#3879FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/30"
                    />
                  </SettingsRow>
                </div>

                <div className="flex flex-wrap justify-end gap-3 border-t border-black/8 p-5 dark:border-white/10">
                  <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-black/62 hover:bg-black/[0.05] hover:text-black dark:text-white/62 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  >
                    Cancelar
                  </Button>
                  <Button className="bg-[#18181b] text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90">
                    Salvar alterações
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SettingsRow({
  label,
  hint,
  rightHint,
  children,
}: {
  label: string;
  hint?: string;
  rightHint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-medium">{label}</p>
          {rightHint ? (
            <p className="text-xs text-black/40 md:hidden dark:text-white/40">{rightHint}</p>
          ) : null}
        </div>
        {hint ? (
          <p className="mt-2 text-sm leading-5 text-black/52 dark:text-white/45">{hint}</p>
        ) : null}
      </div>
      <div className="min-w-0 space-y-2">
        {rightHint ? (
          <p className="text-right text-xs text-black/40 max-md:hidden dark:text-white/40">
            {rightHint}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

function SettingsInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className={cn(
        "h-11 min-w-0 border-black/10 bg-white text-[#18181b] placeholder:text-black/30 focus-visible:border-[#3879FF] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/30",
        props.className,
      )}
    />
  );
}
