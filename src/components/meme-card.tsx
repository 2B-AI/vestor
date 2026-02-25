"use client";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/mock-data";
import { Vote, CheckCircle2, Flame } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

interface ProjectCardProps {
  project: Project;
  index: number;
  projectVoteCount: number;
  projectHasVoted: boolean;
  projectVoteAnimating: boolean;
  handleVote: (projectId: string) => void;
}

export function ProjectCard({
  project,
  index,
  projectVoteCount,
  projectHasVoted,
  projectVoteAnimating,
  handleVote,
}: ProjectCardProps) {
  const { connected } = useWallet();
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Project Card */}
      <div className="card-glow bg-grid relative overflow-hidden rounded-3xl">
        <Image
          src={project.imageUrl}
          alt={project.name}
          height={308}
          width={340}
          className="h-77 w-full object-cover"
        />

        {/* Top Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="gap-1 border-white/10 bg-black/50 text-white backdrop-blur-sm">
            <Flame className="h-3 w-3 text-orange-400" />#{index + 1}
          </Badge>
        </div>

        {/* Vote Count Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="gap-1 border-white/10 bg-black/50 text-white backdrop-blur-sm">
            <Vote className="h-3 w-3" />
            {projectVoteCount}
          </Badge>
        </div>

        {/* Content */}
        <div className="bg-black/80 p-6">
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-xl font-black text-white">{project.name}</h3>
              <span className="border-primary text-primary rounded-full border px-2 py-0.5 text-xs font-semibold">
                {project.ticker}
              </span>
            </div>
            <p className="line-clamp-2 text-sm text-white/80">
              {project.description}
            </p>
          </div>

          <div className="text-muted-foreground mb-4 flex items-center justify-between text-xs font-semibold">
            <span>
              By: <span className="text-white">{project.submitter}</span>
            </span>
            <span>
              <span className="text-white">
                {project.tokenSupply.toLocaleString()}
              </span>{" "}
              supply
            </span>
          </div>

          {/* Vote Button */}
          <AnimatePresence mode="wait">
            {projectHasVoted ? (
              <motion.div
                key="voted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-neon/20 border-neon/30 flex items-center justify-center gap-2 rounded-full border px-4 py-3"
              >
                <CheckCircle2 className="text-neon h-4 w-4" />
                <span className="text-neon text-sm font-bold">Voted!</span>
              </motion.div>
            ) : (
              <motion.div
                key="vote"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleVote(project.id)}
                  disabled={projectVoteAnimating}
                  className="from-primary via-solana to-primary animate-gradient-shift shadow-primary/25 hover:shadow-primary/40 w-full gap-2 bg-linear-to-r bg-size-[200%_100%] font-bold text-white shadow-lg transition-shadow"
                >
                  {projectVoteAnimating ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Voting...
                    </>
                  ) : (
                    <>
                      <Vote className="h-4 w-4" />
                      {connected ? "Vote — 0.05 SOL" : "Connect to Vote"}
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
