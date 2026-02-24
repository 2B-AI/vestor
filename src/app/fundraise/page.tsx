"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { SolProgressBar } from "@/components/sol-progress-bar";
import { useWallet } from "@/lib/wallet-context";
import { MOCK_ACTIVE_FUNDRAISE } from "@/lib/mock-data";
import {
  Users,
  Clock,
  Shield,
  CheckCircle2,
  Coins,
  PieChart,
  Wallet,
  Info,
} from "lucide-react";

export default function FundraisePage() {
  const { connected, connect } = useWallet();
  const [solAmount, setSolAmount] = useState("");
  const [contributing, setContributing] = useState(false);
  const [contributed, setContributed] = useState(false);
  const fund = MOCK_ACTIVE_FUNDRAISE;
  const meme = fund.meme;

  const handleContribute = () => {
    if (!connected) {
      connect();
      return;
    }
    if (!solAmount || parseFloat(solAmount) <= 0) return;
    setContributing(true);
    setTimeout(() => {
      setContributing(false);
      setContributed(true);
    }, 1500);
  };

  const remainingCap = fund.solCap - fund.solRaised;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3 mb-8"
      >
        <Badge className="bg-neon/10 text-neon border-neon/20 gap-1.5 px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
          </span>
          Fundraise Active
        </Badge>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1 text-muted-foreground"
        >
          <Users className="h-3 w-3" />
          {fund.contributors} contributors
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Meme Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6"
        >
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <Image
                src={meme.imageUrl}
                alt={meme.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black text-white">
                    {meme.name}
                  </h1>
                  <span className="rounded-full bg-primary/30 backdrop-blur-sm px-4 py-1 text-base font-bold text-primary">
                    {meme.ticker}
                  </span>
                </div>
                <p className="text-white/70 text-sm max-w-lg">
                  {meme.description}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Progress */}
              <SolProgressBar raised={fund.solRaised} cap={fund.solCap} />

              {/* Timer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                    Time Remaining
                  </p>
                  <CountdownTimer endTime={fund.endTime} size="md" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
                    Remaining Cap
                  </p>
                  <p className="text-2xl font-black text-neon">
                    {remainingCap.toFixed(1)} SOL
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Info */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              How Funds Are Used
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Meteora Liquidity",
                  amount: "70 SOL",
                  pct: "82%",
                  color: "bg-neon",
                },
                {
                  label: "Platform Fee",
                  amount: "10 SOL",
                  pct: "12%",
                  color: "bg-primary",
                },
                {
                  label: "Submitter Reward",
                  amount: "5 SOL",
                  pct: "6%",
                  color: "bg-warning",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-secondary/50 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <p className="text-xl font-black">{item.amount}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.pct} of raise
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Token Distribution */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Token Distribution
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "IPO Contributors",
                  pct: "80%",
                  desc: "Proportional to SOL contributed",
                },
                {
                  label: "Liquidity Pool",
                  pct: "19.5%",
                  desc: "Deposited into Meteora with SOL",
                },
                { label: "Platform", pct: "0.5%", desc: "Platform allocation" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-secondary/30 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <span className="text-lg font-black text-gradient">
                    {item.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Contribute Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="glass-card rounded-2xl p-6 sticky top-24 space-y-6">
            <div>
              <h2 className="text-xl font-black mb-1">Contribute SOL</h2>
              <p className="text-sm text-muted-foreground">
                Fund this meme coin launch and receive tokens proportionally.
              </p>
            </div>

            {contributed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl bg-neon/10 border border-neon/20 p-6 text-center space-y-3"
              >
                <CheckCircle2 className="h-12 w-12 text-neon mx-auto" />
                <p className="text-lg font-bold text-neon">
                  Contribution Successful!
                </p>
                <p className="text-sm text-muted-foreground">
                  You contributed {solAmount} SOL. Your tokens will be
                  distributed when the cap is reached.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">
                    Amount (SOL)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={solAmount}
                      onChange={(e) => setSolAmount(e.target.value)}
                      className="h-14 text-lg font-mono bg-secondary/50 border-border pr-16"
                      min="0"
                      step="0.1"
                      max={remainingCap}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                      SOL
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 5, 10, 25].map((amt) => (
                      <button
                        key={amt}
                        onClick={() =>
                          setSolAmount(String(Math.min(amt, remainingCap)))
                        }
                        className="flex-1 rounded-lg bg-secondary/50 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        {amt} SOL
                      </button>
                    ))}
                  </div>
                </div>

                {solAmount && parseFloat(solAmount) > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-xl bg-secondary/30 p-4 space-y-2"
                  >
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                      Estimated Allocation
                    </p>
                    <p className="text-lg font-bold">
                      ~
                      {(
                        (parseFloat(solAmount) / fund.solCap) *
                        meme.tokenSupply *
                        0.8
                      ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      <span className="text-sm text-primary ml-1">
                        {meme.ticker}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {((parseFloat(solAmount) / fund.solCap) * 80).toFixed(2)}%
                      of contributor supply
                    </p>
                  </motion.div>
                )}

                <Button
                  onClick={handleContribute}
                  disabled={contributing}
                  size="lg"
                  className="w-full bg-linear-to-r from-neon to-primary hover:opacity-90 text-black font-black text-base rounded-xl py-6 gap-2"
                >
                  {contributing ? (
                    <>
                      <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : connected ? (
                    <>
                      <Wallet className="h-5 w-5" />
                      Contribute {solAmount || "0"} SOL
                    </>
                  ) : (
                    <>
                      <Wallet className="h-5 w-5" />
                      Connect Wallet
                    </>
                  )}
                </Button>
              </>
            )}

            {/* Safety Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-neon shrink-0 mt-0.5" />
                <span>Funds held in on-chain escrow smart contract</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <span>
                  Auto-refund if 85 SOL cap not reached within 48 hours
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>No minimum contribution — any amount accepted</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
