"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { useWallet } from "@/lib/wallet-context";
import { MOCK_ACTIVE_VOTE, MOCK_ACTIVE_FUNDRAISE } from "@/lib/mock-data";
import {
  Vote,
  Users,
  ArrowRight,
  CheckCircle2,
  Flame,
  Rocket,
  Clock,
} from "lucide-react";
import UpNext from "@/components/UpNext";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  const { connected, connect } = useWallet();
  const [voteCount, setVoteCount] = useState(MOCK_ACTIVE_VOTE.voteCount);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteAnimating, setVoteAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setVoteCount((c) => c + Math.floor(Math.random() * 3) + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = () => {
    if (!connected) {
      connect();
      return;
    }
    setVoteAnimating(true);
    setTimeout(() => {
      setHasVoted(true);
      setVoteCount((c) => c + 1);
      setVoteAnimating(false);
    }, 1200);
  };

  const meme = MOCK_ACTIVE_VOTE.meme;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6">
          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-wrap items-center gap-3"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
              </span>
              Round #{MOCK_ACTIVE_VOTE.id.split("-")[1]} Live
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground gap-1.5 px-3 py-1"
            >
              <Users className="h-3 w-3" />
              {voteCount} votes cast
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground gap-1.5 px-3 py-1"
            >
              <Clock className="h-3 w-3" />
              1hr rounds
            </Badge>
          </motion.div>

          {/* Main Voting Card */}
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            {/* Meme Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md shrink-0"
            >
              <div className="purple-glow bg-grid relative aspect-square overflow-hidden rounded-3xl">
                <Image
                  src={meme.imageUrl}
                  alt={meme.name}
                  height={300}
                  width={220}
                  className="mx-auto object-cover"
                />
                <div className="button-gradient mx-auto mt-3 text-white">
                  {meme.name}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="gap-1 border-white/10 bg-black/50 text-white backdrop-blur-sm">
                    <Flame className="h-3 w-3 text-orange-400" />
                    Trending
                  </Badge>
                </div>
                <div className="absolute right-4 bottom-4 left-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-1">
                      <span className="font-medium">Submitted by</span>
                      <span className="text-primary">{meme.submitter}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-medium">Supply</span>
                      <span className="text-primary">
                        {meme.tokenSupply.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Voting Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              <div>
                <div className="mb-3 flex items-baseline justify-center gap-3 lg:justify-start">
                  <h1 className="text-5xl font-extrabold sm:text-6xl">
                    {meme.name}
                  </h1>
                  <span className="border-primary text-primary mb-1 rounded-full border px-2 py-0.5 font-semibold">
                    {meme.ticker}
                  </span>
                </div>
                <p className="max-w-lg text-lg leading-relaxed">
                  {meme.description}
                </p>
              </div>

              {/* Timer */}
              <div className="inline-block rounded-md border border-[rgba(35,35,35,1)] bg-[rgba(21,21,21,1)] p-6">
                <p className="text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase">
                  Voting Ends In
                </p>
                <CountdownTimer endTime={MOCK_ACTIVE_VOTE.endTime} size="lg" />
              </div>

              {/* Vote Count */}
              <div className="flex items-center justify-center gap-8 lg:justify-start">
                <div>
                  <p className="text-gradient text-4xl font-black tabular-nums">
                    {voteCount}
                  </p>
                  <p className="text-sm font-medium">Total Votes</p>
                </div>
                <div className="border-primary/20 h-12 w-px border" />
                <div>
                  <p className="text-foreground text-4xl font-black">0.05</p>
                  <p className="text-sm font-medium">SOL per vote</p>
                </div>
              </div>

              {/* Vote Button */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <AnimatePresence mode="wait">
                  {hasVoted ? (
                    <motion.div
                      key="voted"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-neon/10 border-neon/20 flex items-center gap-2 rounded-full border px-8 py-4"
                    >
                      <CheckCircle2 className="text-neon h-5 w-5" />
                      <span className="text-neon font-bold">
                        Vote Recorded!
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="vote"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleVote}
                        disabled={voteAnimating}
                        size="lg"
                        className="from-primary via-solana to-primary animate-gradient-shift shadow-primary/25 hover:shadow-primary/40 relative cursor-pointer gap-2 overflow-hidden rounded-md bg-linear-to-r bg-size-[200%_100%] px-10 py-7 text-lg font-black text-white shadow-lg transition-shadow"
                      >
                        {voteAnimating ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-md border-2 border-white/30 border-t-white" />
                            Confirming...
                          </>
                        ) : (
                          <>
                            <Vote className="h-5 w-5" />
                            {connected
                              ? "Vote Now — 0.05 SOL"
                              : "Connect Wallet to Vote"}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-sm">1 wallet = 1 vote per round</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Active Fundraise Banner */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/fundraise" className="group block">
            <div className="rounded-2xl bg-[rgba(21,21,21,1)] p-6 drop-shadow-lg drop-shadow-[rgba(112,224,0,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(20,241,149,0.2)] sm:p-8">
              <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-neon/10 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Rocket className="text-neon h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-primary text-sm font-medium tracking-widest uppercase">
                      Active Fundraise
                    </p>
                  </div>
                </div>
                <div className="text-primary flex items-center gap-2 text-sm transition-colors">
                  Contribute SOL <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-xl font-black">
                    {MOCK_ACTIVE_FUNDRAISE.meme.name}{" "}
                    <span className="text-primary text-base font-bold">
                      {MOCK_ACTIVE_FUNDRAISE.meme.ticker}
                    </span>
                  </p>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {MOCK_ACTIVE_FUNDRAISE.contributors} contributors
                    </span>
                    <span className="text-neon font-bold">
                      {(
                        (MOCK_ACTIVE_FUNDRAISE.solRaised /
                          MOCK_ACTIVE_FUNDRAISE.solCap) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
                <div className="bg-secondary relative h-3 w-full overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(99,181,17,1), rgba(191,249,133,1))",
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(MOCK_ACTIVE_FUNDRAISE.solRaised / MOCK_ACTIVE_FUNDRAISE.solCap) * 100}%`,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Up Next Queue */}
      <UpNext />

      {/* Stats Section */}
      <Stats />

      {/* How It Works */}
      <HowItWorks />
    </div>
  );
}
