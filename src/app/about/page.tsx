"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Vote,
  Rocket,
  Users,
  Trophy,
  Zap,
  Target,
  Shield,
  ArrowRight,
  Github,
} from "lucide-react";
import Stats from "@/components/Stats";
import { GITHUB_URL, X_URL } from "@/constants";
import { XIcon } from "@/components/icons/x-icon";

export default function About() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 gap-1.5 px-4 py-2">
              <Zap className="h-4 w-4" />
              About Vestor
            </Badge>

            <h1 className="mb-6 text-5xl font-extrabold sm:text-6xl">
              Community-Driven
              <span className="text-gradient font-orbitron block">
                AI Project Launchpad
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              Vestor operates like American Idol for AI projects —
              the community submits, votes on, and funds AI project launches on
              Solana. Each 1-hour voting round determines which project gets
              funded, with automatic token creation and Meteora liquidity pool
              seeding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">
            How <span className="text-gradient font-orbitron">Vestor</span>{" "}
            Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A fully on-chain, transparent process with automatic execution
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Vote,
              title: "Submit & Vote",
              description:
                "Submit projects for free, then vote with 0.05 SOL. Each 1-hour round features three projects. One wallet = one vote maximum.",
              color: "text-primary",
              bgColor: "bg-primary/10",
            },
            {
              icon: Trophy,
              title: "Fundraise Phase",
              description:
                "Winners enter a 48-hour fundraising window. Contributors send SOL toward the 85 SOL cap to fund the token launch.",
              color: "text-neon",
              bgColor: "bg-neon/10",
            },
            {
              icon: Rocket,
              title: "Auto-Launch",
              description:
                "At 85 SOL, smart contracts automatically create the token, seed Meteora liquidity, and distribute tokens to contributors.",
              color: "text-solana",
              bgColor: "bg-solana/10",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="rounded-2xl bg-[rgba(21,21,21,1)] p-6 text-center"
            >
              <div
                className={`${step.bgColor} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl`}
              >
                <step.icon className={`${step.color} h-8 w-8`} />
              </div>
              <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Why Vestor?</h2>
            <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
              <p>
                Traditional AI project launches are plagued by failed
                ventures, and lack of community input. Most tokens launch
                without any validation or community backing.
              </p>
              <p>
                Vestor solves this with a democratic, on-chain process. Every
                token that launches has been voted on by the community and
                funded by real believers. No more gambling on random launches.
              </p>
              <p>
                Our automated smart contracts eliminate human error and ensure
                fair distribution. When a project reaches 85 SOL, everything
                happens automatically — token creation, liquidity seeding, and
                contributor rewards.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Core Values</h2>

            {[
              {
                icon: Shield,
                title: "Fully On-Chain",
                description:
                  "All voting, funding, and token launches happen on Solana smart contracts. No centralized control or manual intervention.",
              },
              {
                icon: Users,
                title: "Democratic Process",
                description:
                  "One wallet = one vote. Community decides which projects get funded through transparent 1-hour voting rounds.",
              },
              {
                icon: Target,
                title: "Automatic Execution",
                description:
                  "Smart contracts handle everything — token creation, Meteora liquidity pools, and proportional token distribution.",
              },
            ].map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <value.icon className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Economics Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Platform Economics</h2>
          <p className="text-muted-foreground text-lg">
            Transparent, automated distribution with aligned incentives
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* SOL Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl bg-[rgba(21,21,21,1)] p-6"
          >
            <h3 className="mb-4 text-xl font-bold">
              85 SOL Raise Distribution
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Meteora Liquidity Pool
                </span>
                <span className="font-bold">70 SOL (82%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-bold">10 SOL (12%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Project Submitter Reward
                </span>
                <span className="font-bold">5 SOL (6%)</span>
              </div>
            </div>
          </motion.div>

          {/* Token Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-2xl bg-[rgba(21,21,21,1)] p-6"
          >
            <h3 className="mb-4 text-xl font-bold">
              Token Supply Distribution
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Contributors (Proportional)
                </span>
                <span className="font-bold">~80%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Liquidity Pool</span>
                <span className="font-bold">~19.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-bold">0.5%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 grid gap-6 sm:grid-cols-2"
        >
          <div className="border-primary/10 rounded-xl border bg-[rgba(21,21,21,1)] p-4">
            <h4 className="mb-2 font-bold">Automatic Refunds</h4>
            <p className="text-muted-foreground text-sm">
              If 85 SOL isn&apos;t reached in 48 hours, all contributors get
              automatic refunds via smart contract.
            </p>
          </div>
          <div className="border-neon/10 rounded-xl border bg-[rgba(21,21,21,1)] p-4">
            <h4 className="mb-2 font-bold">Anti-Manipulation</h4>
            <p className="text-muted-foreground text-sm">
              One wallet = one vote maximum, enforced at smart contract level.
              0.05 SOL voting cost deters spam.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="mb-6 text-3xl font-bold">
            Ready to Shape the Future of AI?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join 1-hour voting rounds, contribute to fundraises, and earn tokens
            from successful AI project launches
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="from-primary via-solana to-primary animate-gradient-shift shadow-primary/25 hover:shadow-primary/40 gap-2 bg-linear-to-r bg-size-[200%_100%] px-8 py-6 text-lg font-bold text-white shadow-lg transition-shadow"
            >
              <Link href="/">
                <Vote className="h-5 w-5" />
                Start Voting
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <div className="flex items-center gap-4">
              <Link
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="h-5 w-5" />
              </Link>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
