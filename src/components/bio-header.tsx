import React from "react";
import { Instagram, Linkedin, Youtube, MapPin } from "lucide-react";
import { BioSocialButton } from "./bio-social-button";
import Image from "next/image"; // Importar o componente Image do Next.js

export function BioHeader() {
  return (
    <header className="flex flex-col items-center text-center p-8">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center mb-4 overflow-hidden">
        <Image
          src="/doit-hub-logo.png" // Caminho para a nova logo
          alt="Do It Hub Logo"
          width={96} // Largura da imagem (equivalente a w-24)
          height={96} // Altura da imagem (equivalente a h-24)
          className="object-contain p-2" // Ajusta a imagem para caber no círculo
        />
      </div>
      <h1 className="text-2xl font-bold mb-2 text-foreground">Do It Hub</h1>
      <p className="text-muted-foreground max-w-md mb-2">
        Referência em estrutura, networking e geração de negócios no Norte do Brasil. 🚀
      </p>
      <p className="text-muted-foreground text-sm mb-6">
        Rua Averiano Rocha, 192 — Campina, Belém/PA
      </p>
      <div className="flex space-x-4 mb-8">
        <BioSocialButton icon={Instagram} href="https://instagram.com" />
        <BioSocialButton icon={Linkedin} href="https://linkedin.com" />
        <BioSocialButton icon={Youtube} href="https://youtube.com" />
        <BioSocialButton icon={MapPin} href="https://maps.google.com" />
      </div>
    </header>
  );
}