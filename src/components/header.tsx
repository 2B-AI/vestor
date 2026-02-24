"use client";

import Link from "next/link";
import { useWallet } from "@/lib/wallet-context";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  LogOut,
  Menu,
  X,
  Zap,
  Trophy,
  PlusCircle,
  History,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Vote", icon: Zap },
  { href: "/fundraise", label: "Fundraise", icon: Trophy },
  { href: "/submit", label: "Submit", icon: PlusCircle },
  { href: "/launches", label: "Launches", icon: History },
];

export function Header() {
  const { connected, address, connect, disconnect } = useWallet();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-neon">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">
              <span className="text-gradient">Meme</span>
              <span className="text-foreground">Vote</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            {connected && (
              <Link
                href="/contributions"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <Wallet className="h-4 w-4" />
                My Portfolio
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {connected ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 border border-border">
                <div className="h-2 w-2 rounded-full bg-neon animate-pulse" />
                <span className="text-sm font-mono text-foreground">
                  {address}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={disconnect}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={connect}
              className="hidden sm:flex bg-linear-to-r from-primary to-solana hover:opacity-90 text-white font-bold gap-2 rounded-md px-6"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          )}

          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              {connected && (
                <Link
                  href="/contributions"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                >
                  <Wallet className="h-4 w-4" />
                  My Portfolio
                </Link>
              )}
              <div className="pt-2 border-t border-border/50 mt-2">
                {connected ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-neon animate-pulse" />
                      <span className="text-sm font-mono text-foreground">
                        {address}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={disconnect}
                      className="text-destructive"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      connect();
                      setMobileOpen(false);
                    }}
                    className="w-full bg-linear-to-r from-primary to-solana text-white font-bold gap-2 rounded-md"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
