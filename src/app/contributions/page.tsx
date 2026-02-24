"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/wallet-context";
import { MOCK_CONTRIBUTIONS } from "@/lib/mock-data";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Coins,
  ExternalLink,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "bg-warning/10 text-warning border-warning/20",
  },
  distributed: {
    label: "Tokens Received",
    icon: CheckCircle2,
    color: "bg-neon/10 text-neon border-neon/20",
  },
  refunded: {
    label: "Refunded",
    icon: ArrowDownLeft,
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export default function ContributionsPage() {
  const { connected, connect } = useWallet();

  if (!connected) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-12 text-center space-y-6 max-w-lg mx-auto"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
            <Wallet className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-black">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Connect your Solana wallet to view your contributions, token
            allocations, and refund status.
          </p>
          <Button
            onClick={connect}
            size="lg"
            className="bg-linear-to-r from-primary to-solana hover:opacity-90 text-white font-bold gap-2 rounded-md px-8"
          >
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </Button>
        </motion.div>
      </div>
    );
  }

  const totalContributed = MOCK_CONTRIBUTIONS.reduce(
    (sum, c) => sum + c.solAmount,
    0,
  );
  const totalRefunded = MOCK_CONTRIBUTIONS.filter(
    (c) => c.status === "refunded",
  ).reduce((sum, c) => sum + c.solAmount, 0);
  const totalPending = MOCK_CONTRIBUTIONS.filter(
    (c) => c.status === "pending",
  ).reduce((sum, c) => sum + c.solAmount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-black">My Portfolio</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Track your SOL contributions, token allocations, and refunds.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground font-medium">
              Total Contributed
            </span>
          </div>
          <p className="text-2xl font-black">
            {totalContributed.toFixed(1)} SOL
          </p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-sm text-muted-foreground font-medium">
              Pending
            </span>
          </div>
          <p className="text-2xl font-black text-warning">
            {totalPending.toFixed(1)} SOL
          </p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownLeft className="h-4 w-4 text-destructive" />
            <span className="text-sm text-muted-foreground font-medium">
              Refunded
            </span>
          </div>
          <p className="text-2xl font-black text-destructive">
            {totalRefunded.toFixed(1)} SOL
          </p>
        </div>
      </motion.div>

      {/* Contributions List */}
      <div className="space-y-4">
        {MOCK_CONTRIBUTIONS.map((contrib, i) => {
          const status = statusConfig[contrib.status];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={contrib.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative w-full sm:w-36 h-36 sm:h-auto shrink-0">
                  <Image
                    src={contrib.meme.imageUrl}
                    alt={contrib.meme.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 p-5 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-black">
                          {contrib.meme.name}
                        </h3>
                        <span className="text-sm font-bold text-primary">
                          {contrib.meme.ticker}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {contrib.timestamp.toLocaleDateString()} at{" "}
                        {contrib.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge className={`${status.color} gap-1.5 px-3 py-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Contributed
                      </p>
                      <p className="text-lg font-black">
                        {contrib.solAmount} SOL
                      </p>
                    </div>
                    {contrib.tokensReceived && (
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Tokens Received
                        </p>
                        <p className="text-lg font-black text-neon">
                          {contrib.tokensReceived.toLocaleString()}{" "}
                          <span className="text-sm text-primary">
                            {contrib.meme.ticker}
                          </span>
                        </p>
                      </div>
                    )}
                    {contrib.tokenAddress && (
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Token
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-mono">
                            {contrib.tokenAddress}
                          </span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
