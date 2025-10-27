import React from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BioLinkCardProps {
  icon: React.ElementType;
  title: string;
  url: string;
  badges?: { text: string; variant?: "default" | "secondary" | "destructive" | "outline" }[];
  href: string;
}

export function BioLinkCard({ icon: Icon, title, url, badges, href }: BioLinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border border-blue-500/30 bg-card transition-all duration-500",
        "w-full max-w-md",
        "hover:bg-blue-500/10 hover:border-blue-500",
        "hover:scale-105 transition-transform"
      )}
    >
      <div className="flex items-center space-x-4">
        <Icon className="h-6 w-6 text-blue-500 transition-colors duration-200 group-hover:text-blue-400" />
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-foreground transition-colors duration-200 group-hover:text-blue-300">{title}</h3>
            {badges && (
              <div className="flex space-x-1">
                {badges.map((badge, index) => (
                  <Badge key={index} variant={badge.variant || "secondary"} className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                    {badge.text}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground transition-colors duration-200 group-hover:text-blue-400">{url}</p>
        </div>
      </div>
      <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors duration-200 group-hover:text-blue-400" />
    </a>
  );
}