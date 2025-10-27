import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BioSocialButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  icon: React.ElementType;
  href: string;
}

export function BioSocialButton({ icon: Icon, href, className, ...props }: BioSocialButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className={cn(
        "rounded-full w-10 h-10 bg-orange-500/10 border-orange-500 text-orange-500 transition-colors duration-200",
        "hover:bg-orange-500 hover:text-white", // Adicionado hover com fundo laranja sólido e texto branco
        className
      )}
      {...props}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Icon className="h-5 w-5" />
      </a>
    </Button>
  );
}