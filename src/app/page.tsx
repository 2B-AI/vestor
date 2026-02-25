"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/countdown-timer";
import { useWallet } from "@/lib/wallet-context";
import { MOCK_ACTIVE_VOTE, MOCK_ACTIVE_FUNDRAISE } from "@/lib/mock-data";
import { Users, ArrowRight, Rocket, Clock } from "lucide-react";
import UpNext from "@/components/UpNext";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import { ProjectCard } from "@/components/meme-card";

export default function Home() {
  const { connected, connect } = useWallet();
  const [voteCounts, setVoteCounts] = useState(MOCK_ACTIVE_VOTE.voteCounts);
  const [hasVoted, setHasVoted] = useState(MOCK_ACTIVE_VOTE.hasVoted || {});
  const [voteAnimating, setVoteAnimating] = useState<{
    [projectId: string]: boolean;
  }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const projectIds = Object.keys(voteCounts);
        const randomProjectId =
          projectIds[Math.floor(Math.random() * projectIds.length)];
        setVoteCounts((prev) => ({
          ...prev,
          [randomProjectId]:
            prev[randomProjectId] + Math.floor(Math.random() * 3) + 1,
        }));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [voteCounts]);

  const handleVote = (projectId: string) => {
    if (!connected) {
      connect();
      return;
    }
    setVoteAnimating((prev) => ({ ...prev, [projectId]: true }));
    setTimeout(() => {
      setHasVoted((prev) => ({ ...prev, [projectId]: true }));
      setVoteCounts((prev) => ({ ...prev, [projectId]: prev[projectId] + 1 }));
      setVoteAnimating((prev) => ({ ...prev, [projectId]: false }));
    }, 1200);
  };

  const projects = MOCK_ACTIVE_VOTE.projects;
  const totalVotes = Object.values(voteCounts).reduce(
    (sum, count) => sum + count,
    0
  );

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
              {totalVotes} votes cast
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground gap-1.5 px-3 py-1"
            >
              <Clock className="h-3 w-3" />
              1hr rounds
            </Badge>
          </motion.div>

          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 text-center"
          >
            <div className="inline-block rounded-md border border-[rgba(35,35,35,1)] bg-[rgba(21,21,21,1)] p-6">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase">
                Voting Ends In
              </p>
              <CountdownTimer endTime={MOCK_ACTIVE_VOTE.endTime} size="lg" />
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const projectVoteCount = voteCounts[project.id] || 0;
              const projectHasVoted = hasVoted[project.id] || false;
              const projectVoteAnimating = voteAnimating[project.id] || false;

              return (
                <ProjectCard
                  project={project}
                  index={index}
                  key={project.id}
                  projectVoteCount={projectVoteCount}
                  projectHasVoted={projectHasVoted}
                  projectVoteAnimating={projectVoteAnimating}
                  handleVote={handleVote}
                />
              );
            })}
          </div>

          {/* Voting Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-gradient text-3xl font-black tabular-nums">
                  {totalVotes}
                </p>
                <p className="text-sm font-medium">Total Votes</p>
              </div>
              <div className="border-primary/20 h-12 w-px border" />
              <div>
                <p className="text-foreground text-3xl font-black">0.05</p>
                <p className="text-sm font-medium">SOL per vote</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              1 wallet = 1 vote per project • Vote for up to 3 projects
            </p>
          </motion.div>
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
                    {MOCK_ACTIVE_FUNDRAISE.project.name}{" "}
                    <span className="text-primary text-base font-bold">
                      {MOCK_ACTIVE_FUNDRAISE.project.ticker}
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
