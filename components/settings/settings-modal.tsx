"use client";

import { Bell, BriefcaseBusiness, Building2, CreditCard, HelpCircle, Home, Link2, Shield, SlidersHorizontal, UserRound, UsersRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
        className="max-h-[88svh] max-w-[1120px] overflow-hidden border-white/10 bg-[#171717] p-0 text-white shadow-2xl"
      >
        <div className="grid min-h-[720px] grid-cols-[300px_1fr]">
          <aside className="flex flex-col border-r border-white/10 bg-[#1C1C1B] p-5">
            <div>
              <h2 className="truncate text-lg font-semibold tracking-[-0.03em]">
                Gabriel Barbosa - Criação
              </h2>
              <p className="mt-1 text-sm text-white/48">Preferências do workspace</p>
            </div>

            <nav className="mt-6 flex-1 space-y-6">
              {sections.map((section) => (
                <div key={section.label} className="space-y-2">
                  <p className="px-3 text-xs font-semibold text-white/46">{section.label}</p>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "flex h-9 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium text-white/48 transition-colors hover:bg-white/[0.04] hover:text-white",
                          active === item.id &&
                            "border border-[#FF6842]/35 bg-black text-white"
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

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-[#FF6842] text-white">T</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Tickpost Empresa</p>
                  <p className="truncate text-xs text-white/42">
                    gabriel.tickpost@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section className="overflow-auto bg-[#171717]">
            <div className="sticky top-0 z-10 border-b border-white/10 bg-[#171717]/95 px-7 py-5 backdrop-blur">
              <DialogHeader className="text-left">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <DialogTitle className="text-2xl tracking-[-0.04em] text-white">
                      Configurações de perfil
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-white/52">
                      Atualize sua conta, foto e informações pessoais.
                    </DialogDescription>
                    <p className="mt-3 text-sm text-white/42">
                      Gabriel Barbosa - Criação conteudo · Owner
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-lg p-2 text-white/48 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </DialogHeader>
            </div>

            <div className="p-7">
              <div className="max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#191919]">
                <div className="border-b border-white/10 p-7">
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">Conta</h3>
                  <p className="mt-2 text-sm text-white/50">
                    Atualize suas informações pessoais e a foto do seu perfil na Tickpost.
                  </p>
                </div>

                <div className="space-y-6 p-7">
                  <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                    <div>
                      <p className="font-medium">Foto de perfil</p>
                      <p className="mt-2 text-sm leading-5 text-white/45">
                        Esta imagem aparece em toda a sua área de trabalho.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar className="size-16">
                        <AvatarFallback className="bg-[#FF6842] text-xl text-white">
                          GB
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-white">
                        Escolher foto
                      </Button>
                      <Button variant="ghost" className="text-white/64 hover:bg-white/[0.06] hover:text-white">
                        Remover foto
                      </Button>
                    </div>
                  </div>

                  <SettingsRow label="Nome completo">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <DarkInput defaultValue="Tickpost" />
                      <DarkInput defaultValue="Empresa" />
                    </div>
                  </SettingsRow>

                  <SettingsRow
                    label="Endereço de email"
                    hint="Use um email válido para manter alertas e acessos sincronizados."
                  >
                    <DarkInput defaultValue="gabriel.tickpost@gmail.com" />
                  </SettingsRow>

                  <SettingsRow label="Telefone">
                    <DarkInput defaultValue="(32) 93618-9556" />
                  </SettingsRow>

                  <SettingsRow
                    label="Bio"
                    hint="Uma descrição curta ajuda a identificar melhor seu perfil dentro da operação."
                    rightHint="20 caracteres"
                  >
                    <Textarea
                      defaultValue="Bio QA 1777011611083"
                      className="min-h-28 border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus-visible:border-[#3879FF]"
                    />
                  </SettingsRow>
                </div>

                <div className="flex justify-end gap-3 border-t border-white/10 p-5">
                  <Button variant="ghost" onClick={() => router.back()} className="text-white/62 hover:bg-white/[0.06] hover:text-white">
                    Cancelar
                  </Button>
                  <Button className="bg-white text-black hover:bg-white/90">
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
    <div className="grid gap-5 md:grid-cols-[220px_1fr]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-medium">{label}</p>
          {rightHint ? <p className="text-xs text-white/40 md:hidden">{rightHint}</p> : null}
        </div>
        {hint ? <p className="mt-2 text-sm leading-5 text-white/45">{hint}</p> : null}
      </div>
      <div className="space-y-2">
        {rightHint ? <p className="text-right text-xs text-white/40 max-md:hidden">{rightHint}</p> : null}
        {children}
      </div>
    </div>
  );
}

function DarkInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className={cn(
        "h-11 border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus-visible:border-[#3879FF]",
        props.className
      )}
    />
  );
}
