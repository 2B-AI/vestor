"use client";

import Image from "next/image";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/50 bg-background/50 border-t backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="from-primary to-neon flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold">
              <span className="text-gradient">Meme</span>
              <span className="text-foreground">Vote</span>
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-6 text-xs">
            <span className="flex items-center gap-2">
              <Image
                src="/solana-logo.svg"
                alt="Solana"
                width={80}
                height={16}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            </span>
            <span className="bg-border h-3 w-px" />
            <span className="flex items-center gap-2">
              <Image
                src="/meteora-logo.svg"
                alt="Meteora"
                width={85}
                height={16}
                className="opacity-70 transition-opacity hover:opacity-100"
              />
            </span>
            <span className="bg-border h-3 w-px" />
            <span>&copy; 2026 MemeVote</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
