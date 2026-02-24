"use client";

import { motion } from "framer-motion";

interface SolProgressBarProps {
  raised: number;
  cap: number;
}

export function SolProgressBar({ raised, cap }: SolProgressBarProps) {
  const pct = Math.min((raised / cap) * 100, 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground font-medium">
          <span className="text-foreground font-bold">{raised.toFixed(1)}</span>{" "}
          / {cap} SOL
        </span>
        <span className="text-neon font-mono font-bold">{pct.toFixed(1)}%</span>
      </div>
      <div className="bg-secondary relative h-4 w-full overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #9945ff, #14f195)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div
          className="animate-shimmer absolute inset-y-0 left-0 rounded-full opacity-40"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </div>
    </div>
  );
}
