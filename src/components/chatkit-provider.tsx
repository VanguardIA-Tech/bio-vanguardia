"use client";

import React, { useEffect } from 'react';
import { toast } from "sonner";

// Define types for better safety
declare global {
  interface Window {
    APP_CONFIG?: {
      WORKFLOW_ID: string;
      BRAND_NAME: string;
      BRAND_PRIMARY: string;
      WELCOME_MESSAGE: string;
      CHAT_MODE: 'floating' | 'embedded';
      THEME: {
        colorScheme: 'light' | 'dark';
        radius: 'round' | 'sharp' | 'pill';
        density: 'normal' | 'compact';
      };
    };
  }
}

interface ChatKitElement extends HTMLElement {
  setOptions: (options: any) => void;
}

export function ChatKitProvider() {
  useEffect(() => {
    // Ensure APP_CONFIG exists on the client and is deterministic (avoid server/client mismatch)
    if (!window.APP_CONFIG) {
      window.APP_CONFIG = {
        WORKFLOW_ID: (process.env.NEXT_PUBLIC_OPENAI_WORKFLOW_ID as string) || "wf_COLE_SEU_ID_AQUI",
        BRAND_NAME: (process.env.NEXT_PUBLIC_BRAND_NAME as string) || "Do It Hub",
        BRAND_PRIMARY: (process.env.NEXT_PUBLIC_BRAND_PRIMARY as string) || "#F97316",
        WELCOME_MESSAGE: (process.env.NEXT_PUBLIC_WELCOME_MESSAGE as string) || "Olá! Como posso te ajudar hoje?",
        CHAT_MODE: ((process.env.NEXT_PUBLIC_CHAT_MODE as any) || "floating") as 'floating' | 'embedded',
        THEME: {
          colorScheme: ((process.env.NEXT_PUBLIC_THEME_COLORSCHEME as any) || "dark") as 'light' | 'dark',
          radius: ((process.env.NEXT_PUBLIC_THEME_RADIUS as any) || "pill") as 'round' | 'sharp' | 'pill',
          density: ((process.env.NEXT_PUBLIC_THEME_DENSITY as any) || "normal") as 'normal' | 'compact',
        },
      };
    }

    const computeMinHeight = () => {
      // Prefer a chat area that is a fraction of the viewport height but bounded
      const vh = window.innerHeight;
      const fromVh = Math.round(vh * 0.55); // 55% of viewport height
      const min = 420; // never less than 420px
      const max = Math.round(vh * 0.85); // never more than 85% of viewport
      return Math.max(min, Math.min(fromVh, max));
    };

    const initChatKit = async () => {
      const CFG = window.APP_CONFIG;
      
      if (!CFG || !CFG.WORKFLOW_ID || CFG.WORKFLOW_ID === "wf_COLE_SEU_ID_AQUI") {
        console.warn("ChatKit WORKFLOW_ID is not configured in window.APP_CONFIG. The chat will not be initialized.");
        return;
      }

      // The SDK script defines this custom element. We wait for it to be ready.
      await customElements.whenDefined('openai-chatkit');

      // Avoid creating duplicate chat elements on hot reloads in development
      if (document.querySelector('openai-chatkit')) {
        return;
      }

      const chatEl = document.createElement('openai-chatkit') as ChatKitElement;

      chatEl.setOptions({
        api: {
          async getClientSecret() {
            try {
              const response = await fetch('/api/chatkit-start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workflow_id: CFG.WORKFLOW_ID })
              });
              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || 'Failed to fetch client_secret from server.';
                console.error('Failed to fetch client_secret:', errorMessage);
                toast.error(`Chat Error: ${errorMessage}`);
                return null;
              }
              const { client_secret } = await response.json();
              return client_secret;
            } catch (error) {
              console.error('Error in getClientSecret:', error);
              toast.error('Chat Error: Could not connect to the server.');
              return null;
            }
          }
        },
        // Theme básico (evita estruturas não suportadas)
        theme: {
    colorScheme: 'dark',
    radius: 'round',
    density: 'normal',
    color: {
      grayscale: {
        hue: 45,
        tint: 9,
        shade: 4
      },
      accent: {
        primary: '#ffffff',
        level: 1
      },
      surface: {
        background: '#ffffff',
        foreground: '#281506'
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
        // header.title deve ser um objeto { text: string }
        header: {
          title: { text: CFG.BRAND_NAME || 'Assistant' }
        },
        // startScreen.greeting é string
composer: {
    attachments: {
      enabled: true,
      maxCount: 5,
      maxSize: 10485760
    },
  },
  startScreen: {
    greeting: '',
    prompts: [],
  },
      });

      // Prefer embedding into #chat-slot if present (places the chat above the footer inside main).
      const slot = document.getElementById('chat-slot');

      if (slot) {
        // Create a wrapper so the chat participates in document flow and doesn't overlap content.
        // If a wrapper already exists (e.g., due to HMR), reuse it.
        let wrapper = document.getElementById('openai-chatkit-wrapper') as HTMLDivElement | null;
        if (!wrapper) {
          wrapper = document.createElement('div');
          wrapper.id = 'openai-chatkit-wrapper';
          // Make sure wrapper occupies normal document flow and stretches full width of the slot.
          wrapper.style.position = 'relative';
          wrapper.style.width = '100%';
          wrapper.style.display = 'block';
          wrapper.style.zIndex = 'auto';
          // Use visible overflow so internal absolutely positioned items are shown
          wrapper.style.overflow = 'visible';
          // Small default padding separation from content if needed (optional)
          wrapper.style.paddingTop = '8px';
          wrapper.style.paddingBottom = '8px';
          slot.appendChild(wrapper);
        }

        // Compute a responsive minHeight and apply it
        const applyHeight = () => {
          const minHeight = `${computeMinHeight()}px`;
          wrapper!.style.minHeight = minHeight;
          wrapper!.style.maxHeight = 'none';

          // Ensure the chat element fills wrapper and is not clipped
          chatEl.style.position = 'static';
          chatEl.style.right = '';
          chatEl.style.bottom = '';
          chatEl.style.zIndex = '';
          chatEl.style.width = '100%';
          chatEl.style.maxWidth = '100%';
          chatEl.style.display = 'block';
          chatEl.style.boxSizing = 'border-box';
          chatEl.style.overflow = 'visible';
          chatEl.style.minHeight = minHeight;
          chatEl.style.height = 'auto';
          chatEl.style.maxHeight = 'none';
        };

        // Initial apply
        applyHeight();

        // Listen for window resize to keep chat usable on different viewports
        const onResize = () => {
          applyHeight();
        };
        window.addEventListener('resize', onResize);

        // Append chat element into wrapper so it flows with the page layout.
        wrapper.appendChild(chatEl);

        // Clean-up reference when HMR triggers a re-render (we don't remove the wrapper here
        // to avoid removing a user-open chat on hot reload, but event listener must be cleaned
        // up in the outer effect cleanup).
        const cleanupWrapper = () => {
          window.removeEventListener('resize', onResize);
        };

        // Attach a property so cleanup in the outer scope can find and remove the listener if needed.
        // (This is defensive: the outer useEffect cleanup will run on unmount / HMR.)
        (wrapper as any).__chatkit_cleanup = cleanupWrapper;
      } else {
        // Fallback to previous behavior: embedded mode requested but slot not found => warn + append to body
        if (CFG.CHAT_MODE === 'embedded') {
          console.warn('#chat-slot element not found for embedded chat mode — falling back to floating widget.');
        }
        // Floating placement (fixed in bottom-right)
        chatEl.style.position = 'fixed';
        chatEl.style.right = '20px';
        chatEl.style.bottom = '20px';
        chatEl.style.zIndex = '9999';
        chatEl.style.width = '';
        document.body.appendChild(chatEl);
      }
    };

    // The SDK is loaded asynchronously. We need to wait for it.
    if (customElements.get('openai-chatkit')) {
      initChatKit();
    } else {
      customElements.whenDefined('openai-chatkit').then(initChatKit);
    }

    // Cleanup on unmount / HMR: remove any resize listeners attached to wrapper
    return () => {
      const wrapper = document.getElementById('openai-chatkit-wrapper') as any;
      if (wrapper && typeof wrapper.__chatkit_cleanup === 'function') {
        try {
          wrapper.__chatkit_cleanup();
        } catch (e) {
          // noop
        }
      }
    };
  }, []);

  return null; // This component only runs side effects, it doesn't render anything.
}