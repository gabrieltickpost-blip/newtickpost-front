import { FormActions, FormField, FormSection } from "@/components/forms/form-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function OpportunityIntakeForm() {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Novo lead estruturado</CardTitle>
        <CardDescription>
          Exemplo de formulario padronizado para reaproveitar em toda a empresa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormSection
          title="Dados principais"
          description="Campos organizados para plugar validação e envio para API."
        >
          <FormField label="Empresa" required>
            <Input placeholder="Nome da empresa" />
          </FormField>
          <FormField label="Responsavel" required>
            <Input placeholder="Nome do contato principal" />
          </FormField>
          <FormField label="Etapa do funil" required>
            <Select defaultValue="discovery">
              <SelectTrigger>
                <SelectValue placeholder="Selecione a etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discovery">Discovery</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="won">Won</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </FormSection>

        <FormSection
          title="Contexto comercial"
          description="A mesma estrutura pode ser validada no frontend e no backend."
        >
          <FormField label="Valor potencial" hint="Use a mesma tipagem do contrato comercial.">
            <Input placeholder="R$ 120.000" />
          </FormField>
          <FormField label="Descricao da oportunidade">
            <Textarea placeholder="Resumo do escopo, necessidade e prazo." />
          </FormField>
        </FormSection>

        <FormActions>
          <Button variant="outline">Salvar rascunho</Button>
          <Button>Criar oportunidade</Button>
        </FormActions>
      </CardContent>
    </Card>
  );
}
