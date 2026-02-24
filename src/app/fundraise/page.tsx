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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap items-center gap-3"
      >
        <Badge className="bg-neon/10 text-neon border-neon/20 gap-1.5 px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="bg-neon absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-neon relative inline-flex h-2 w-2 rounded-full" />
          </span>
          Fundraise Active
        </Badge>
        <Badge
          variant="outline"
          className="text-muted-foreground gap-1.5 px-3 py-1"
        >
          <Users className="h-3 w-3" />
          {fund.contributors} contributors
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left: Meme Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 lg:col-span-3"
        >
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="relative h-64 overflow-hidden sm:h-80">
              <Image
                src={meme.imageUrl}
                alt={meme.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute right-6 bottom-6 left-6">
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-4xl font-black text-white">
                    {meme.name}
                  </h1>
                  <span className="bg-primary/30 text-primary rounded-full px-4 py-1 text-base font-bold backdrop-blur-sm">
                    {meme.ticker}
                  </span>
                </div>
                <p className="max-w-lg text-sm text-white/70">
                  {meme.description}
                </p>
              </div>
            </div>

            <div className="space-y-6 p-6">
              {/* Progress */}
              <SolProgressBar raised={fund.solRaised} cap={fund.solCap} />

              {/* Timer */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium tracking-widest uppercase">
                    Time Remaining
                  </p>
                  <CountdownTimer endTime={fund.endTime} size="md" />
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
                    Remaining Cap
                  </p>
                  <p className="text-neon text-2xl font-black">
                    {remainingCap.toFixed(1)} SOL
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Info */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <PieChart className="text-primary h-5 w-5" />
              How Funds Are Used
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                  className="bg-secondary/50 rounded-xl p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <p className="text-xl font-black">{item.amount}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.pct} of raise
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Token Distribution */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Coins className="text-primary h-5 w-5" />
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
                  className="bg-secondary/30 flex items-center justify-between rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-muted-foreground text-xs">{item.desc}</p>
                  </div>
                  <span className="text-gradient text-lg font-black">
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
          <div className="glass-card sticky top-24 space-y-6 rounded-2xl p-6">
            <div>
              <h2 className="mb-1 text-xl font-black">Contribute SOL</h2>
              <p className="text-muted-foreground text-sm">
                Fund this meme coin launch and receive tokens proportionally.
              </p>
            </div>

            {contributed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-neon/10 border-neon/20 space-y-3 rounded-xl border p-6 text-center"
              >
                <CheckCircle2 className="text-neon mx-auto h-12 w-12" />
                <p className="text-neon text-lg font-bold">
                  Contribution Successful!
                </p>
                <p className="text-muted-foreground text-sm">
                  You contributed {solAmount} SOL. Your tokens will be
                  distributed when the cap is reached.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="text-muted-foreground text-sm font-medium">
                    Amount (SOL)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={solAmount}
                      onChange={(e) => setSolAmount(e.target.value)}
                      className="bg-secondary/50 border-border h-14 pr-16 font-mono text-lg"
                      min="0"
                      step="0.1"
                      max={remainingCap}
                    />
                    <span className="text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 text-sm font-bold">
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
                        className="bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary flex-1 rounded-lg py-2 text-xs font-bold transition-colors"
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
                    className="bg-secondary/30 space-y-2 rounded-xl p-4"
                  >
                    <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
                      Estimated Allocation
                    </p>
                    <p className="text-lg font-bold">
                      ~
                      {(
                        (parseFloat(solAmount) / fund.solCap) *
                        meme.tokenSupply *
                        0.8
                      ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      <span className="text-primary ml-1 text-sm">
                        {meme.ticker}
                      </span>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {((parseFloat(solAmount) / fund.solCap) * 80).toFixed(2)}%
                      of contributor supply
                    </p>
                  </motion.div>
                )}

                <Button
                  onClick={handleContribute}
                  disabled={contributing}
                  size="lg"
                  className="from-neon to-primary w-full gap-2 rounded-xl bg-linear-to-r py-6 text-base font-black text-black hover:opacity-90"
                >
                  {contributing ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
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
              <div className="text-muted-foreground flex items-start gap-2 text-xs">
                <Shield className="text-neon mt-0.5 h-4 w-4 shrink-0" />
                <span>Funds held in on-chain escrow smart contract</span>
              </div>
              <div className="text-muted-foreground flex items-start gap-2 text-xs">
                <Clock className="text-warning mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Auto-refund if 85 SOL cap not reached within 48 hours
                </span>
              </div>
              <div className="text-muted-foreground flex items-start gap-2 text-xs">
                <Info className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <span>No minimum contribution — any amount accepted</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
