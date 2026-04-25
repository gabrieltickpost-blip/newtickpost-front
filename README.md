# newtickpost-front

Fundacao front-end da TickPost Marketing: uma central de crescimento por conteudo para creators, social medias, agencias e empresas criarem campanhas em massa.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- Recharts

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Integracao futura com backend

O front ja possui a fundacao para conectar no backend:

- `shared/api/http.ts`: client unico com `credentials: "include"`.
- `shared/api/endpoints.ts`: mapa central de endpoints.
- `shared/config/env.ts`: leitura de `NEXT_PUBLIC_API_URL`.
- `modules/auth`: login, cadastro, me, guards e entry route.
- `modules/workspace`: workspaces, switcher e gate.
- `modules/onboarding`: wizard e payload preparado.
- `modules/invitations`: convite por token.
- `modules/billing`: contrato inicial de plano/uso.

Enquanto `NEXT_PUBLIC_USE_MOCK_API` nao for `false`, o app usa mocks locais. Para conectar:

```bash
NEXT_PUBLIC_API_URL=https://api.tickpost.com
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_ENABLE_ROUTE_GUARDS=true
```

O fluxo central deve sempre chamar `GET /auth/me` e obedecer `entry.nextAction` / `entry.nextRoute`.
