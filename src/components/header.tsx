"use client";

import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@/lib/wallet-context";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  LogOut,
  Menu,
  X,
  Trophy,
  PlusCircle,
  History,
  Github,
  Info,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GITHUB_URL, X_URL } from "@/constants";
import { XIcon } from "@/components/icons/x-icon";

const NAV_LINKS = [
  { href: "/fundraise", label: "Fundraise", icon: Trophy },
  { href: "/submit", label: "Submit", icon: PlusCircle },
  { href: "/launches", label: "Launches", icon: History },
  { href: "/about", label: "About", icon: Info },
];

export function Header() {
  const { connected, address, connect, disconnect } = useWallet();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={146} height={48} />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground hover:bg-accent flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            {connected && (
              <Link
                href="/contributions"
                className="hover:text-foreground hover:bg-accent flex items-center gap-1.5 rounded-lg px-3 py-2 font-medium transition-colors"
              >
                <Wallet className="h-4 w-4" />
                My Portfolio
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Social Links */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Follow us on X (Twitter)"
              aria-label="Follow us on X (Twitter)"
            >
              <XIcon className="h-5 w-5" />
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              title="View our GitHub"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View our GitHub"
            >
              <Github className="h-6 w-6" />
            </Link>
          </div>
          {connected ? (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="bg-secondary border-border flex items-center gap-2 rounded-full border px-4 py-2">
                <div className="bg-neon h-2 w-2 animate-pulse rounded-full" />
                <span className="text-foreground text-sm">{address}</span>
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
              className="from-primary to-solana hidden cursor-pointer gap-2 rounded-md bg-linear-to-r px-6 font-bold text-white hover:opacity-90 sm:flex"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          )}

          <button
            className="text-muted-foreground hover:text-foreground md:hidden"
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
            className="header border-border/50 overflow-hidden border-t md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-foreground hover:bg-accent flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              {connected && (
                <Link
                  href="/contributions"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-foreground hover:bg-accent flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors"
                >
                  <Wallet className="h-4 w-4" />
                  My Portfolio
                </Link>
              )}

              {/* Mobile Social Links */}
              <div className="border-border/50 mt-2 border-t pt-2">
                <div className="mb-3 flex items-center justify-center gap-4">
                  <Link
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow us on X (Twitter)"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Follow us on X (Twitter)"
                  >
                    <XIcon className="h-5 w-5" />
                  </Link>
                  <Link
                    href={GITHUB_URL}
                    target="_blank"
                    title="View our GitHub"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View our GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                </div>
              </div>

              <div className="border-border/50 border-t pt-2">
                {connected ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-neon h-2 w-2 animate-pulse rounded-full" />
                      <span className="text-foreground text-sm">{address}</span>
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
                    className="from-primary to-solana w-full gap-2 rounded-md bg-linear-to-r font-bold text-white"
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
