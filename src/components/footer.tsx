"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-border/50 bg-background/50 border-t backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={146} height={48} />
          </div>
          <div className="text-muted-foreground flex items-center gap-6 text-sm font-bold">
            <span>&copy; 2026 Vestor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
