"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";

interface ChatKitElement extends HTMLElement {
  setOptions: (options: any) => void;
}

export function ChatKitEmbed() {
  useEffect(() => {
    const initChatKit = async () => {
      const workflowId = process.env.NEXT_PUBLIC_OPENAI_WORKFLOW_ID;

      if (!workflowId || workflowId === "wf_COLE_SEU_ID_AQUI") {
        console.warn("O WORKFLOW_ID do ChatKit não está configurado. O chat não será inicializado.");
        return;
      }

      await customElements.whenDefined("openai-chatkit");

      if (document.querySelector("openai-chatkit")) {
        return;
      }

      const chatEl = document.createElement("openai-chatkit") as ChatKitElement;
      chatEl.style.display = "block";
      chatEl.style.width = "100%";
      chatEl.style.minHeight = "400px";
      chatEl.style.borderRadius = "1rem";
      chatEl.style.overflow = "hidden";
      chatEl.style.backgroundColor = "rgba(15, 23, 42, 0.6)";

      const chatKitConfig = {
        theme: {
    colorScheme: 'dark',
    radius: 'pill',
    density: 'normal',
    color: {
      grayscale: {
        hue: 25,
        tint: 8
      },
      accent: {
        primary: '#f56e00',
        level: 1
      }
    },
    typography: {
      baseSize: 16,
      fontFamily: '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
      fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
      fontSources: [
        {
          family: 'OpenAI Sans',
          src: 'https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2',
          weight: 400,
          style: 'normal',
          display: 'swap'
        }
      // ...and 7 more font sources
      ]
    }
  },
  composer: {
    attachments: {
      enabled: false
    },
  },
  startScreen: {
    greeting: '',
    prompts: [
      {
        icon: 'circle-question',
        label: 'What is ChatKit?',
        prompt: 'What is ChatKit?'
      }
      // ...and 4 more prompts
    ],
  },
        
      };

      chatEl.setOptions({
        api: {
          async getClientSecret() {
            try {
              const response = await fetch("/api/chatkit-start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workflow_id: workflowId }),
              });

              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || "Falha ao buscar client_secret do servidor.";
                toast.error(`Erro no Chat: ${errorMessage}`);
                return null;
              }

              const { client_secret } = await response.json();
              return client_secret;
            } catch (error) {
              console.error("Erro em getClientSecret:", error);
              toast.error("Erro no Chat: Não foi possível conectar ao servidor.");
              return null;
            }
          },
        },
        ...chatKitConfig,
      });

      const container = document.getElementById("chat-container");
      if (container) {
        container.appendChild(chatEl);
      } else {
        console.error("O container com id 'chat-container' não foi encontrado no DOM.");
      }
    };

    initChatKit();
  }, []);

  return (
    <div
      id="chat-container"
      className="relative w-full min-h-[420px] rounded-2xl border border-slate-700/60 bg-slate-900/50 backdrop-blur-sm shadow-lg"
    />
  );
}