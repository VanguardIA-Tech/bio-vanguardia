This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Sobre este Repositório

Este repositório serve como um template e base de estudo para os mentorados da Vanguardia. Ele demonstra como integrar e utilizar o ChatKit da OpenAI em um aplicativo, site ou landing page, oferecendo um ponto de partida prático para o desenvolvimento de soluções interativas com IA. Sinta-se à vontade para explorar, modificar e adaptar este código para seus próprios projetos.

## Getting Started

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd next-template # ou o nome da sua pasta
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    # ou
    bun install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:

    ```
    OPENAI_API_KEY=sua_chave_api_openai
    NEXT_PUBLIC_OPENAI_WORKFLOW_ID=seu_workflow_id_chatkit
    NEXT_PUBLIC_BRAND_NAME="Vanguardia"
    NEXT_PUBLIC_BRAND_PRIMARY="#2563EB"
    NEXT_PUBLIC_WELCOME_MESSAGE="Olá! Como posso te ajudar hoje?"
    NEXT_PUBLIC_CHAT_MODE="floating" # ou "embedded"
    NEXT_PUBLIC_THEME_COLORSCHEME="dark" # ou "light"
    NEXT_PUBLIC_THEME_RADIUS="pill" # ou "round", "sharp"
    NEXT_PUBLIC_THEME_DENSITY="normal" # ou "compact"
    ```
    *   `OPENAI_API_KEY`: Sua chave de API da OpenAI.
    *   `NEXT_PUBLIC_OPENAI_WORKFLOW_ID`: O ID do seu workflow do ChatKit, obtido na plataforma OpenAI.
    *   As demais variáveis são para customização do ChatKit e da interface.

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    # ou
    bun dev
    ```

    Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado. O aplicativo será recarregado automaticamente conforme você edita os arquivos.

Você pode começar a editar a página modificando `app/page.tsx`. A página é atualizada automaticamente conforme você edita o arquivo.

Este projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente [Geist](https://vercel.com/font), uma nova família de fontes para Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.