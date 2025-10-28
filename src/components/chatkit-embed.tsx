"use client";

import React, { useEffect } from 'react';
import { toast } from "sonner";

// Define o tipo para o elemento do ChatKit para segurança de tipo.
interface ChatKitElement extends HTMLElement {
  setOptions: (options: any) => void;
}

export function ChatKitEmbed() {
  useEffect(() => {
    const initChatKit = async () => {
      const workflowId = process.env.NEXT_PUBLIC_OPENAI_WORKFLOW_ID;

      // Verifica se o WORKFLOW_ID está configurado antes de continuar.
      if (!workflowId || workflowId === "wf_COLE_SEU_ID_AQUI") {
        console.warn("O WORKFLOW_ID do ChatKit não está configurado. O chat não será inicializado.");
        return;
      }

      // O SDK do ChatKit define este elemento customizado. Esperamos ele estar pronto.
      await customElements.whenDefined('openai-chatkit');

      // Evita criar elementos duplicados em caso de recarregamento (HMR) em desenvolvimento.
      if (document.querySelector('openai-chatkit')) {
        return;
      }

      const chatEl = document.createElement('openai-chatkit') as ChatKitElement;

      // *** INSTRUÇÃO PARA O USUÁRIO DO TEMPLATE ***
      // Cole aqui o JSON de configuração do seu agente obtido na plataforma da OpenAI.
      // O objeto abaixo é um exemplo mínimo para o chat funcionar.
      const chatKitConfig = {
        theme: {
          colorScheme: 'dark',
          radius: 'round',
        },
        header: {
          title: { text: 'Assistente Virtual' }
        },
        startScreen: {
            greeting: "Olá! Como posso te ajudar hoje?",
            prompts: [],
        },
        composer: {
            attachments: {
              enabled: true,
            },
        },
      };

      chatEl.setOptions({
        // Função para obter o client_secret da nossa API.
        api: {
          async getClientSecret() {
            try {
              const response = await fetch('/api/chatkit-start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workflow_id: workflowId })
              });

              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || 'Falha ao buscar client_secret do servidor.';
                toast.error(`Erro no Chat: ${errorMessage}`);
                return null;
              }

              const { client_secret } = await response.json();
              return client_secret;
            } catch (error) {
              console.error('Erro em getClientSecret:', error);
              toast.error('Erro no Chat: Não foi possível conectar ao servidor.');
              return null;
            }
          }
        },
        // Aplica a configuração definida acima.
        ...chatKitConfig
      });

      // Anexa o chat diretamente no container com o id 'chat-container'.
      const container = document.getElementById('chat-container');
      if (container) {
        container.appendChild(chatEl);
      } else {
        console.error("O container com id 'chat-container' não foi encontrado no DOM.");
      }
    };

    initChatKit();

  }, []);

  // Este componente não renderiza nada diretamente, apenas injeta o chat no DOM.
  // O container div é retornado para que o React saiba onde montar o chat.
  return <div id="chat-container" className="w-full h-full min-h-[420px] rounded-2xl" />;
}