"use client";

import Image from "next/image";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-neon">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold">
              <span className="text-gradient">Meme</span>
              <span className="text-foreground">Vote</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Image src="/solana-logo.svg" alt="Solana" width={80} height={16} className="opacity-70 hover:opacity-100 transition-opacity" />
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-2">
              <Image src="/meteora-logo.svg" alt="Meteora" width={85} height={16} className="opacity-70 hover:opacity-100 transition-opacity" />
            </span>
            <span className="h-3 w-px bg-border" />
            <span>&copy; 2026 MemeVote</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
