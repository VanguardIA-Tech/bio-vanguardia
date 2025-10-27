"use client";

import React from "react";
import { Briefcase, Users, Building, Calendar, Lightbulb, ShieldCheck, MessageCircle } from "lucide-react";
import { BioHeader } from "./bio-header";
import { BioLinkCard } from "./bio-link-card";
import { BioFooter } from "./bio-footer";

const bioLinks = [
  {
    icon: Briefcase,
    title: "Vagas abertas",
    url: "cudotlotion.site",
    badges: [{ text: "Carreiras" }],
    href: "https://cudotlotion.site",
  },
  {
    icon: Users,
    title: "Coworkers — Planos & Tour",
    url: "doithub.com.br",
    badges: [{ text: "Espaços" }],
    href: "https://doithub.com.br",
  },
  {
    icon: Building,
    title: "Serviços para empresas",
    url: "doithub.com.br",
    href: "https://doithub.com.br",
  },
  {
    icon: Calendar,
    title: "Comunidade & Eventos",
    url: "doithub.com.br",
    href: "https://doithub.com.br",
  },
  {
    icon: Lightbulb,
    title: "Circuito de Inovação",
    url: "doithub.com.br",
    href: "https://doithub.com.br",
  },
  {
    icon: ShieldCheck,
    title: "DO IT Safe",
    url: "doithub.com.br",
    href: "https://doithub.com.br",
  },
  {
    icon: MessageCircle,
    title: "Contato — WhatsApp",
    url: "wa.me",
    badges: [{ text: "Fale com a gente" }],
    href: "https://wa.me",
  },
];

export function BioSite() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-background text-foreground">
      <BioHeader />
      <main className="flex flex-col items-center space-y-4 w-full px-4 pb-8">
        {bioLinks.map((link, index) => (
          <BioLinkCard
            key={index}
            icon={link.icon}
            title={link.title}
            url={link.url}
            badges={link.badges}
            href={link.href}
          />
        ))}
        {/* This container is used by ChatKit when CHAT_MODE is "embedded" */}
        
          <div id="chat-slot" className="w-full max-w-md" style={{ minHeight: 420, borderRadius: 20 }} />
        
      </main>
      <BioFooter />
    </div>
  );
}