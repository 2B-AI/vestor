"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { useWallet } from "@/lib/wallet-context";
import {
  MOCK_ACTIVE_VOTE,
  MOCK_ACTIVE_FUNDRAISE,
  MOCK_QUEUE_MEMES,
} from "@/lib/mock-data";
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
                <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
                  <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
                    {meme.name}
                  </h1>
                  <span className="bg-primary/20 text-primary rounded-full px-4 py-1.5 text-lg font-bold">
                    {meme.ticker}
                  </span>
                </div>
                <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                  {meme.description}
                </p>
              </div>

              {/* Timer */}
              <div className="glass-card inline-block rounded-2xl p-6">
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
                  <p className="text-muted-foreground text-sm font-medium">
                    Total Votes
                  </p>
                </div>
                <div className="bg-border h-12 w-px" />
                <div>
                  <p className="text-foreground text-4xl font-black">0.05</p>
                  <p className="text-muted-foreground text-sm font-medium">
                    SOL per vote
                  </p>
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
                <p className="text-muted-foreground text-xs">
                  1 wallet = 1 vote per round
                </p>
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
            <div className="glass-card neon-glow rounded-2xl p-6 transition-shadow hover:shadow-[0_0_30px_rgba(20,241,149,0.2)] sm:p-8">
              <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-neon/10 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Rocket className="text-neon h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-neon text-xs font-medium tracking-widest uppercase">
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
                <div className="text-muted-foreground group-hover:text-neon flex items-center gap-2 text-sm transition-colors">
                  Contribute SOL <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    <span className="text-foreground text-lg font-bold">
                      {MOCK_ACTIVE_FUNDRAISE.solRaised.toFixed(1)}
                    </span>{" "}
                    / {MOCK_ACTIVE_FUNDRAISE.solCap} SOL
                  </span>
                  <div className="flex items-center gap-4">
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
                      background: "linear-gradient(90deg, #9945ff, #14f195)",
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
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                <Clock className="text-primary h-4 w-4" />
              </div>
              <h2 className="text-2xl font-black">Up Next</h2>
            </div>
            <Link
              href="/submit"
              className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
            >
              Submit a Meme <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_QUEUE_MEMES.map((queueMeme, i) => (
              <motion.div
                key={queueMeme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="glass-card group hover:border-primary/30 overflow-hidden rounded-xl transition-colors"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={queueMeme.imageUrl}
                    alt={queueMeme.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="outline"
                      className="border-white/10 bg-black/50 text-xs text-white backdrop-blur-sm"
                    >
                      #{i + 1} in queue
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-lg font-black text-white">
                      {queueMeme.name}
                    </p>
                    <p className="text-xs text-white/60">{queueMeme.ticker}</p>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-muted-foreground line-clamp-2 text-xs">
                    {queueMeme.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {[
            {
              label: "Total Raised",
              value: "1,247 SOL",
              icon: TrendingUp,
              color: "text-neon",
            },
            {
              label: "Tokens Launched",
              value: "18",
              icon: Rocket,
              color: "text-primary",
            },
            {
              label: "Total Voters",
              value: "4,892",
              icon: Users,
              color: "text-chart-3",
            },
            {
              label: "Winning Memes",
              value: "23",
              icon: Trophy,
              color: "text-warning",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-5 text-center"
            >
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="text-muted-foreground text-xs font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-12 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="mb-10 text-center text-3xl font-black">
            How <span className="text-gradient">MemeVote</span> Works
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            ].map((item) => (
              <div
                key={item.step}
                className="glass-card group hover:border-primary/30 relative rounded-xl p-6 transition-colors"
              >
                <span className="absolute top-4 right-4 text-5xl font-black text-white/3">
                  {item.step}
                </span>
                <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-xl">
                  <item.icon className="text-primary h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
