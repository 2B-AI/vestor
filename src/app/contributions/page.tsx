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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card mx-auto max-w-lg space-y-6 rounded-2xl p-12 text-center"
        >
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <Wallet className="text-primary h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Connect your Solana wallet to view your contributions, token
            allocations, and refund status.
          </p>
          <Button
            onClick={connect}
            size="lg"
            className="from-primary to-solana gap-2 rounded-md bg-linear-to-r px-8 font-bold text-white hover:opacity-90"
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
    0
  );
  const totalRefunded = MOCK_CONTRIBUTIONS.filter(
    (c) => c.status === "refunded"
  ).reduce((sum, c) => sum + c.solAmount, 0);
  const totalPending = MOCK_CONTRIBUTIONS.filter(
    (c) => c.status === "pending"
  ).reduce((sum, c) => sum + c.solAmount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Coins className="text-primary h-5 w-5" />
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
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="glass-card rounded-xl p-5">
          <div className="mb-2 flex items-center gap-2">
            <ArrowUpRight className="text-primary h-4 w-4" />
            <span className="text-muted-foreground text-sm font-medium">
              Total Contributed
            </span>
          </div>
          <p className="text-2xl font-black">
            {totalContributed.toFixed(1)} SOL
          </p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="text-warning h-4 w-4" />
            <span className="text-muted-foreground text-sm font-medium">
              Pending
            </span>
          </div>
          <p className="text-warning text-2xl font-black">
            {totalPending.toFixed(1)} SOL
          </p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="mb-2 flex items-center gap-2">
            <ArrowDownLeft className="text-destructive h-4 w-4" />
            <span className="text-muted-foreground text-sm font-medium">
              Refunded
            </span>
          </div>
          <p className="text-destructive text-2xl font-black">
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
              className="glass-card hover:border-primary/20 overflow-hidden rounded-2xl transition-colors"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative h-36 w-full shrink-0 sm:h-auto sm:w-36">
                  <Image
                    src={contrib.meme.imageUrl}
                    alt={contrib.meme.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-lg font-black">
                          {contrib.meme.name}
                        </h3>
                        <span className="text-primary text-sm font-bold">
                          {contrib.meme.ticker}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs">
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
                      <p className="text-muted-foreground text-xs font-medium">
                        Contributed
                      </p>
                      <p className="text-lg font-black">
                        {contrib.solAmount} SOL
                      </p>
                    </div>
                    {contrib.tokensReceived && (
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">
                          Tokens Received
                        </p>
                        <p className="text-neon text-lg font-black">
                          {contrib.tokensReceived.toLocaleString()}{" "}
                          <span className="text-primary text-sm">
                            {contrib.meme.ticker}
                          </span>
                        </p>
                      </div>
                    )}
                    {contrib.tokenAddress && (
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">
                          Token
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-sm">
                            {contrib.tokenAddress}
                          </span>
                          <ExternalLink className="text-muted-foreground h-3 w-3" />
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
