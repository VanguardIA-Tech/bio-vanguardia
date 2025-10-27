import React from "react";
import { Instagram, Linkedin, Youtube, MapPin } from "lucide-react";
import { BioSocialButton } from "./bio-social-button";
import Image from "next/image";

export function BioHeader() {
  return (
    <header className="flex flex-col items-center text-center p-8">
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden border-2 border-blue-500 animate-glow">
        <Image
          src="/vanguardia-logo.png"
          alt="Vanguardia Logo"
          width={96}
          height={96}
          className="object-contain p-2"
        />
      </div>
      <h1 className="text-2xl font-bold mb-2 text-foreground">Vanguardia</h1>
      <p className="text-muted-foreground max-w-md mb-2">
        Liderando o futuro com inovação e excelência.
      </p>
      <p className="text-muted-foreground text-sm mb-6">
        Rua da Inovação, 123 — Centro, Cidade/Estado
      </p>
      <div className="flex space-x-4 mb-8">
        <BioSocialButton icon={Instagram} href="https://instagram.com/vanguardia" />
        <BioSocialButton icon={Linkedin} href="https://linkedin.com/company/vanguardia" />
        <BioSocialButton icon={Youtube} href="https://youtube.com/vanguardia" />
        <BioSocialButton icon={MapPin} href="https://maps.google.com/?q=Rua+da+Inovação,+123,+Cidade" />
      </div>
    </header>
  );
}