import { CalendarDays } from "lucide-react";

import { MockRoutePage } from "@/components/app-shell/mock-route-page";

export default function CalendarPage() {
  return (
    <MockRoutePage
      title="Calendário"
      description="Calendário editorial por campanha, canal, status e janela de publicação."
      question="Quando cada conteúdo precisa ir ao ar?"
      action="Planejar semana"
      icon={CalendarDays}
      items={[
        "Visão semanal e mensal",
        "Filtros por campanha e canal",
        "Arrastar publicação entre datas",
        "Sinalização de conflitos de agenda",
      ]}
    />
  );
}
