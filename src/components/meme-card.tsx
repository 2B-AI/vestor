"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Meme } from "@/lib/mock-data";

interface MemeCardProps {
  meme: Meme;
  size?: "sm" | "lg";
}

export function MemeCard({ meme, size = "lg" }: MemeCardProps) {
  const isLarge = size === "lg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass-card rounded-2xl overflow-hidden ${isLarge ? "max-w-md" : "max-w-xs"}`}
    >
      <div className={`relative ${isLarge ? "h-80" : "h-48"} w-full overflow-hidden`}>
        <Image
          src={meme.imageUrl}
          alt={meme.name}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">{meme.name}</span>
            <span className="rounded-full bg-primary/20 px-3 py-0.5 text-sm font-bold text-primary">
              {meme.ticker}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{meme.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Supply: <span className="text-foreground font-mono">{meme.tokenSupply.toLocaleString()}</span>
          </span>
          <span>
            by <span className="text-primary font-mono">{meme.submitter}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
