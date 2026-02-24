"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { useWallet } from "@/lib/wallet-context";
import { MOCK_ACTIVE_VOTE, MOCK_ACTIVE_FUNDRAISE, MOCK_QUEUE_MEMES } from "@/lib/mock-data";
import {
  Zap,
  Vote,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Flame,
  Trophy,
  Rocket,
  Clock,
} from "lucide-react";

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
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-8">
          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <Badge className="bg-neon/10 text-neon border-neon/20 gap-1.5 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
              </span>
              Round #{MOCK_ACTIVE_VOTE.id.split("-")[1]} Live
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              {voteCount} votes cast
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              1hr rounds
            </Badge>
          </motion.div>

          {/* Main Voting Card */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Meme Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md flex-shrink-0"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden purple-glow">
                <Image
                  src={meme.imageUrl}
                  alt={meme.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/50 backdrop-blur-sm text-white border-white/10 gap-1">
                    <Flame className="h-3 w-3 text-orange-400" />
                    Trending
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-white/60 font-medium">Submitted by</p>
                      <p className="text-sm font-mono text-primary">{meme.submitter}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/60 font-medium">Supply</p>
                      <p className="text-sm font-mono text-white">
                        {meme.tokenSupply.toLocaleString()}
                      </p>
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
              className="flex-1 text-center lg:text-left space-y-6"
            >
              <div>
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-3">
                  <h1 className="text-5xl sm:text-6xl font-black tracking-tight">
                    {meme.name}
                  </h1>
                  <span className="rounded-full bg-primary/20 px-4 py-1.5 text-lg font-bold text-primary">
                    {meme.ticker}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  {meme.description}
                </p>
              </div>

              {/* Timer */}
              <div className="glass-card rounded-2xl p-6 inline-block">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                  Voting Ends In
                </p>
                <CountdownTimer endTime={MOCK_ACTIVE_VOTE.endTime} size="lg" />
              </div>

              {/* Vote Count */}
              <div className="flex items-center gap-8 justify-center lg:justify-start">
                <div>
                  <p className="text-4xl font-black text-gradient tabular-nums">{voteCount}</p>
                  <p className="text-sm text-muted-foreground font-medium">Total Votes</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-4xl font-black text-foreground">0.05</p>
                  <p className="text-sm text-muted-foreground font-medium">SOL per vote</p>
                </div>
              </div>

              {/* Vote Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <AnimatePresence mode="wait">
                  {hasVoted ? (
                    <motion.div
                      key="voted"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 rounded-full bg-neon/10 border border-neon/20 px-8 py-4"
                    >
                      <CheckCircle2 className="h-5 w-5 text-neon" />
                      <span className="text-neon font-bold">Vote Recorded!</span>
                    </motion.div>
                  ) : (
                    <motion.div key="vote" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleVote}
                        disabled={voteAnimating}
                        size="lg"
                        className="relative overflow-hidden bg-gradient-to-r from-primary via-solana to-primary bg-[length:200%_100%] animate-gradient-shift text-white font-black text-lg rounded-full px-10 py-7 gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                      >
                        {voteAnimating ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          <>
                            <Vote className="h-5 w-5" />
                            {connected ? "Vote Now — 0.05 SOL" : "Connect Wallet to Vote"}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">1 wallet = 1 vote per round</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Active Fundraise Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/fundraise" className="block group">
            <div className="glass-card rounded-2xl p-6 sm:p-8 neon-glow hover:shadow-[0_0_30px_rgba(20,241,149,0.2)] transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon/10">
                    <Rocket className="h-5 w-5 text-neon" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neon uppercase tracking-widest">
                      Active Fundraise
                    </p>
                    <p className="text-xl font-black">
                      {MOCK_ACTIVE_FUNDRAISE.meme.name}{" "}
                      <span className="text-primary text-base font-bold">
                        {MOCK_ACTIVE_FUNDRAISE.meme.ticker}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-neon transition-colors">
                  Contribute SOL <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-bold text-lg">
                      {MOCK_ACTIVE_FUNDRAISE.solRaised.toFixed(1)}
                    </span>{" "}
                    / {MOCK_ACTIVE_FUNDRAISE.solCap} SOL
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {MOCK_ACTIVE_FUNDRAISE.contributors} contributors
                    </span>
                    <span className="font-mono text-neon font-bold">
                      {((MOCK_ACTIVE_FUNDRAISE.solRaised / MOCK_ACTIVE_FUNDRAISE.solCap) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "linear-gradient(90deg, #9945ff, #14f195)" }}
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-black">Up Next</h2>
            </div>
            <Link
              href="/submit"
              className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
            >
              Submit a Meme <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_QUEUE_MEMES.map((queueMeme, i) => (
              <motion.div
                key={queueMeme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="glass-card rounded-xl overflow-hidden group hover:border-primary/30 transition-colors"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={queueMeme.imageUrl}
                    alt={queueMeme.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white border-white/10 text-xs">
                      #{i + 1} in queue
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-lg font-black text-white">{queueMeme.name}</p>
                    <p className="text-xs text-white/60">{queueMeme.ticker}</p>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {queueMeme.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Raised", value: "1,247 SOL", icon: TrendingUp, color: "text-neon" },
            { label: "Tokens Launched", value: "18", icon: Rocket, color: "text-primary" },
            { label: "Total Voters", value: "4,892", icon: Users, color: "text-chart-3" },
            { label: "Winning Memes", value: "23", icon: Trophy, color: "text-warning" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-3xl font-black text-center mb-10">
            How <span className="text-gradient">MemeVote</span> Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Submit",
                desc: "Anyone can submit a meme coin idea for free. Add a name, ticker, image, and token supply.",
                icon: Zap,
              },
              {
                step: "02",
                title: "Vote",
                desc: "Community votes on memes in 1-hour rounds. 0.05 SOL per vote, 1 wallet = 1 vote.",
                icon: Vote,
              },
              {
                step: "03",
                title: "Fund",
                desc: "Winners enter a 48-hour fundraise. Contribute SOL toward the 85 SOL cap.",
                icon: TrendingUp,
              },
              {
                step: "04",
                title: "Launch",
                desc: "On cap fill, the token is auto-created and deployed on Meteora. Contributors get their tokens.",
                icon: Rocket,
              },
            ].map((item, i) => (
              <div key={item.step} className="glass-card rounded-xl p-6 relative group hover:border-primary/30 transition-colors">
                <span className="absolute top-4 right-4 text-5xl font-black text-white/[0.03]">
                  {item.step}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
