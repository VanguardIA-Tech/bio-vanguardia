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
          colorScheme: "dark",
          radius: "round",
        },
        header: {
          title: { text: "Assistente Virtual" },
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
        widgets: {
          async onAction(action: { type: string; payload?: Record<string, any> }) {
            console.log("🎯 ChatKit onAction:", action);

            if (action?.type === "send_whatsapp") {
              const payload = action.payload ?? {};
              const tour = payload.tour ?? {};
              const fullName = tour.fullName?.trim?.() || "";
              const date = tour.date || "";
              const time = tour.time || "";

              if (!fullName || !date || !time) {
                toast.error("Preencha nome, data e horário para prosseguir.");
                return;
              }

              // Certifique-se de definir NEXT_PUBLIC_BUSINESS_WHATSAPP no seu arquivo .env.local
              const businessWhatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP;
              if (!businessWhatsapp) {
                console.error("A variável de ambiente NEXT_PUBLIC_BUSINESS_WHATSAPP não está definida.");
                toast.error("Configuração de WhatsApp ausente.");
                return;
              }

              const message = `Olá! Quero agendar um tour.\nNome: ${fullName}\nData: ${date}\nHorário: ${time}`;
              const encoded = encodeURIComponent(message);
              const url = `https://wa.me/${businessWhatsapp}?text=${encoded}`;

              try {
                window.open(url, "_blank", "noopener,noreferrer");
                console.log("✅ Link do WhatsApp aberto:", url);
              } catch (err) {
                console.error("Erro ao abrir link do WhatsApp:", err);
                toast.error("Erro ao tentar abrir o WhatsApp.");
              }
            }
          },
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