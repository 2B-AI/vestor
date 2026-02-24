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
  X,
} from "lucide-react";
import Stats from "@/components/Stats";

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
              About MemeVote
            </Badge>

            <h1 className="mb-6 text-5xl font-extrabold sm:text-6xl">
              Community-Driven
              <span className="text-gradient block">Meme Coin Launchpad</span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              MemeVote is the first democratic meme coin launchpad on Solana
              where the community decides which tokens get funded and launched.
              No more rug pulls, no more failed launches — only community-vetted
              winners.
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
          <h2 className="mb-4 text-3xl font-bold">How MemeVote Works</h2>
          <p className="text-muted-foreground text-lg">
            A simple, transparent process that puts the power in the
            community&apos;s hands
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Vote,
              title: "Submit & Vote",
              description:
                "Community members submit meme coin ideas and vote on their favorites using SOL. Each wallet gets one vote per round.",
              color: "text-primary",
              bgColor: "bg-primary/10",
            },
            {
              icon: Trophy,
              title: "Winner Selection",
              description:
                "The meme with the most votes wins the round and moves to the fundraising phase. Transparent and democratic.",
              color: "text-neon",
              bgColor: "bg-neon/10",
            },
            {
              icon: Rocket,
              title: "Launch & Distribute",
              description:
                "Once funding goals are met, the token launches on Solana. Contributors receive their share of the token supply.",
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
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
              <p>
                We believe the meme coin space is broken. Too many projects
                launch without community input, leading to failed tokens and
                lost funds.
              </p>
              <p>
                MemeVote fixes this by putting the community first. Every token
                that launches has been democratically chosen and funded by real
                people who believe in its potential.
              </p>
              <p>
                Our platform creates a sustainable ecosystem where creators,
                voters, and contributors all benefit from successful launches.
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
                title: "Transparency",
                description:
                  "All votes, funding, and launches are fully transparent on-chain.",
              },
              {
                icon: Users,
                title: "Community First",
                description:
                  "The community decides everything — from which tokens launch to how funds are distributed.",
              },
              {
                icon: Target,
                title: "Quality Over Quantity",
                description:
                  "We focus on launching fewer, higher-quality tokens that the community truly wants.",
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
            Ready to Join the Community?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Start voting on the next generation of community-driven meme coins
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
                href="https://twitter.com/memevote"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/memevote"
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
