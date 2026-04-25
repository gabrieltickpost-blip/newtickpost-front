import { Clock3 } from "lucide-react";

import { MockRoutePage } from "@/components/app-shell/mock-route-page";

export default function TodayPage() {
  return (
    <MockRoutePage
      title="Hoje"
      description="Prioridades do dia para campanha, conteúdo, aprovação e publicação."
      question="O que precisa avançar agora?"
      action="Organizar hoje"
      icon={Clock3}
      items={[
        "Posts pendentes de revisão",
        "Campanhas com prazo próximo",
        "Publicações agendadas para hoje",
        "Sinais de conversa que merecem atenção",
      ]}
    />
  );
}
