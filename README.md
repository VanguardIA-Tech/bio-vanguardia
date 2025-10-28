# Vanguardia Bio Site

Mini site de bio construído com Next.js (App Router), Shadcn/UI, Tailwind CSS e um chat embutido usando OpenAI ChatKit.

## Sumário
- [Visão Geral](#visão-geral)
- [Principais Recursos](#principais-recursos)
- [Stack Tecnológica](#stack-tecnológica)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Setup](#instalação-e-setup)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [ChatKit (OpenAI) — Como funciona](#chatkit-openai--como-funciona)
- [UI/Design System](#uidesign-system)
- [Padrões e Boas Práticas](#padrões-e-boas-práticas)
- [Dicas de Desenvolvimento](#dicas-de-desenvolvimento)
- [Troubleshooting (Problemas Comuns)](#troubleshooting-problemas-comuns)
- [Deploy (Vercel)](#deploy-vercel)
- [Licença](#licença)

---

## Visão Geral
Este repositório é um template de estudo/partida para mentorados da Vanguardia. Ele demonstra:
- Como montar um bio site com Next.js e Tailwind.
- Como integrar o ChatKit da OpenAI no modo embutido (embedded), com backend seguro para emissão de `client_secret` via rota da aplicação.

## Principais Recursos
- Next.js 15 (App Router) + TypeScript.
- Tema dark com Tailwind e `next-themes` (modo claro/escuro).
- Componentes Shadcn/UI (Radix + Tailwind).
- Ícones com `lucide-react`.
- Toasts com `sonner`.
- ChatKit embutido via web component `<openai-chatkit>` com sessão segura criada no backend.

## Stack Tecnológica
- Framework: Next.js (App Router)
- Linguagem: TypeScript
- UI: Shadcn/UI (Radix + Tailwind)
- Estilos: Tailwind CSS + tailwindcss-animate
- Ícones: lucide-react
- Formularização: react-hook-form + zod (quando aplicável)
- Toasts: sonner
- Charts: Recharts (quando necessário)
- Temas: next-themes

## Pré-requisitos
- Node.js 18+
- Conta OpenAI com acesso ao ChatKit e um Workflow configurado

## Instalação e Setup
1) Clone ou baixe o repositório:
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd next-template
```

2) Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3) Crie o arquivo `.env.local` na raiz do projeto e configure as variáveis (veja abaixo).

4) Rode em desenvolvimento:
```bash
npm run dev
```

5) Acesse:
- http://localhost:3000

## Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz com:

```env
# Necessário para o ChatKit (servidor)
OPENAI_API_KEY=coloque_sua_chave_da_openai

# Necessário para o ChatKit (cliente)
NEXT_PUBLIC_OPENAI_WORKFLOW_ID=coloque_o_id_do_seu_workflow

# Opcionais (não usados diretamente no código atual, mas úteis para branding/temas)
NEXT_PUBLIC_BRAND_NAME="Vanguardia"
NEXT_PUBLIC_BRAND_PRIMARY="#2563EB"
NEXT_PUBLIC_WELCOME_MESSAGE="Olá! Como posso te ajudar hoje?"
NEXT_PUBLIC_CHAT_MODE="embedded" # ou "floating"
NEXT_PUBLIC_THEME_COLORSCHEME="dark" # ou "light"
NEXT_PUBLIC_THEME_RADIUS="round" # ou "pill", "sharp"
NEXT_PUBLIC_THEME_DENSITY="normal" # ou "compact"
```

Notas importantes:
- `OPENAI_API_KEY` é confidencial (servidor). Nunca exponha essa chave no cliente.
- `NEXT_PUBLIC_OPENAI_WORKFLOW_ID` é público (cliente) e necessário para inicializar o ChatKit.

## Executando o Projeto
- Dev: `npm run dev`
- Build: `npm run build`
- Start (produção local): `npm run start`
- Lint: `npm run lint`

## Estrutura do Projeto
Principais pastas/arquivos:
```
src/
  app/
    api/
      chatkit-start/
        route.ts          # Rota server-side que cria a sessão do ChatKit (retorna client_secret)
    layout.tsx            # Carrega temas, fontes, sonner e o script do ChatKit (CDN)
    page.tsx              # Página inicial
    globals.css           # Estilos globais + variáveis de tema
  components/
    bio-site.tsx          # Página de bio com os links e o slot do chat
    bio-header.tsx
    bio-footer.tsx
    bio-link-card.tsx
    bio-social-button.tsx
    chatkit-embed.tsx     # Componente que injeta e configura <openai-chatkit>
    ui/                   # Componentes Shadcn/UI
  hooks/
    use-mobile.tsx
  lib/
    utils.ts              # Função cn()
tailwind.config.ts
next.config.ts
README.md
```

## ChatKit (OpenAI) — Como funciona
Fluxo de inicialização:
1) O script do ChatKit é carregado no `RootLayout`:
   - `src/app/layout.tsx` inclui:
   ```tsx
   <Script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js" strategy="afterInteractive" />
   ```

2) O componente `ChatKitEmbed` (`src/components/chatkit-embed.tsx`) cria dinamicamente um `<openai-chatkit>` e chama `setOptions` com:
   - `api.getClientSecret`: faz POST a `/api/chatkit-start` para obter um `client_secret` temporário.
   - Tema, header e opções do composer (anexos etc.).
   - O elemento é inserido no container `#chat-container` (com altura mínima e `position: relative`).

3) A rota `/api/chatkit-start` (`src/app/api/chatkit-start/route.ts`):
   - Gera um `userId` anônimo.
   - Chama `https://api.openai.com/v1/chatkit/sessions` com o `workflow_id` e `OPENAI_API_KEY` (servidor).
   - Retorna `{ client_secret }` para o cliente.

Requisitos para funcionar:
- Defina `OPENAI_API_KEY` e `NEXT_PUBLIC_OPENAI_WORKFLOW_ID` no `.env.local`.
- Assegure-se de que o Workflow do ChatKit está ativo e que sua conta tem acesso ao ChatKit.

## UI/Design System
- Componentes prontos em `src/components/ui/` (Shadcn/UI).
- Estilização exclusivamente com Tailwind (`src/app/globals.css` possui variáveis CSS de tema).
- Ícones via `lucide-react`.
- Toasts via `sonner` (`<Toaster />` já está em `layout.tsx`).

## Padrões e Boas Práticas
- TypeScript em todos os arquivos novos.
- Preferir componentes da pasta `src/components/ui/` antes de criar novos.
- Formularização com `react-hook-form` + validação com `zod` quando necessário.
- Utilizar `src/lib/utils.ts` para helpers (ex.: `cn()`).
- Evitar CSS global específico de componente (manter utilitários no Tailwind).
- Mantê-lo simples e legível; evite overengineering.

## Dicas de Desenvolvimento
- Tema: `ThemeProvider` com `next-themes` já configurado (modo dark padrão).
- Animações: `tailwindcss-animate` (ver `tailwind.config.ts`).
- Fonte: Geist (`next/font`), já importada em `layout.tsx`.
- Responsividade: utilitários Tailwind + hook `useIsMobile` (768px breakpoint).

## Troubleshooting (Problemas Comuns)
1) Chat não aparece, apesar de `<openai-chatkit>` no DOM:
   - Verifique se o container tem altura/posicionamento: `#chat-container` usa `relative` e `min-h-[420px]`.
   - Confirme `NEXT_PUBLIC_OPENAI_WORKFLOW_ID` definido (não usar placeholder).
   - Cheque o console por erros de rede no POST `/api/chatkit-start`.

2) Erro 500 em `/api/chatkit-start`:
   - Certifique-se de que `OPENAI_API_KEY` está definido no ambiente do servidor (local ou Vercel).
   - Veja os logs do servidor para detalhes do erro retornado pela OpenAI.

3) Script do ChatKit não carrega:
   - Acesse o console de rede; confirme que `https://cdn.platform.openai.com/deployments/chatkit/chatkit.js` está acessível.
   - Verifique bloqueadores de conteúdo/extensões.

4) Workflow não responde:
   - Confirme o ID do workflow e permissões na conta OpenAI.
   - Teste o endpoint do ChatKit diretamente via API para verificar se o workflow está ativo.

5) Estilos quebrados/sem Tailwind:
   - Verifique `src/app/globals.css` e `tailwind.config.ts` (paths do `content` corretos).
   - Garanta que não há cache antigo (reinicie o servidor).

## Deploy (Vercel)
1) Faça push do repositório para o GitHub/GitLab.
2) Crie um novo projeto na Vercel e selecione o repositório.
3) Configure as variáveis de ambiente no painel da Vercel:
   - `OPENAI_API_KEY` (Server)
   - `NEXT_PUBLIC_OPENAI_WORKFLOW_ID` (Client)
4) Deploy automático a cada push na branch configurada.

## Licença
Consulte o arquivo `LICENSE` na raiz do projeto.