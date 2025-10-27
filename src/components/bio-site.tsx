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
    url: "vanguardia.com.br/carreiras",
    badges: [{ text: "Carreiras" }],
    href: "https://vanguardia.com.br/carreiras",
  },
  {
    icon: Users,
    title: "Nossos Serviços",
    url: "vanguardia.com.br/servicos",
    badges: [{ text: "Soluções" }],
    href: "https://vanguardia.com.br/servicos",
  },
  {
    icon: Building,
    title: "Sobre a Vanguardia",
    url: "vanguardia.com.br/sobre",
    href: "https://vanguardia.com.br/sobre",
  },
  {
    icon: Calendar,
    title: "Eventos & Notícias",
    url: "vanguardia.com.br/eventos",
    href: "https://vanguardia.com.br/eventos",
  },
  {
    icon: Lightbulb,
    title: "Inovação & Tecnologia",
    url: "vanguardia.com.br/inovacao",
    href: "https://vanguardia.com.br/inovacao",
  },
  {
    icon: ShieldCheck,
    title: "Segurança & Compliance",
    url: "vanguardia.com.br/seguranca",
    href: "https://vanguardia.com.br/seguranca",
  },
  {
    icon: MessageCircle,
    title: "Contato — WhatsApp",
    url: "wa.me/5511999999999",
    badges: [{ text: "Fale com a gente" }],
    href: "https://wa.me/5511999999999",
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