"use client";

import { ReactNode } from "react";
import { WalletProvider } from "@/lib/wallet-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <TooltipProvider>
        <div className="bg-background relative min-h-screen">
          <div className="pointer-events-none fixed inset-0" />
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </div>
      </TooltipProvider>
    </WalletProvider>
  );
}
