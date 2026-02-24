"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_PAST_LAUNCHES } from "@/lib/mock-data";
import {
  Rocket,
  Trophy,
  XCircle,
  ExternalLink,
  Vote,
  TrendingUp,
  Clock,
} from "lucide-react";

const statusConfig = {
  launched: {
    label: "Launched",
    icon: Rocket,
    color: "bg-neon/10 text-neon border-neon/20",
    dotColor: "bg-neon",
  },
  funded: {
    label: "Funded",
    icon: Trophy,
    color: "bg-primary/10 text-primary border-primary/20",
    dotColor: "bg-primary",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    dotColor: "bg-destructive",
  },
};

export default function LaunchesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Trophy className="text-primary h-5 w-5" />
          </div>
          <h1 className="text-3xl font-black">Past Launches</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Browse all past winning memes and their launch status.
        </p>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 grid grid-cols-3 gap-4"
      >
        {[
          {
            label: "Launched",
            count: MOCK_PAST_LAUNCHES.filter((l) => l.status === "launched")
              .length,
            color: "text-neon",
          },
          {
            label: "Funded",
            count: MOCK_PAST_LAUNCHES.filter((l) => l.status === "funded")
              .length,
            color: "text-primary",
          },
          {
            label: "Failed",
            count: MOCK_PAST_LAUNCHES.filter((l) => l.status === "failed")
              .length,
            color: "text-destructive",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-grid rounded-xl p-4 text-center">
            <p className={`text-2xl font-black ${stat.color}`}>{stat.count}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Launches List */}
      <div className="space-y-4">
        {MOCK_PAST_LAUNCHES.map((launch, i) => {
          const status = statusConfig[launch.status];
          const StatusIcon = status.icon;
          const pct = (launch.solRaised / launch.solCap) * 100;

          return (
            <motion.div
              key={launch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="bg-grid hover:border-primary/20 overflow-hidden rounded-2xl transition-colors"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-48">
                  <Image
                    src={launch.meme.imageUrl}
                    alt={launch.meme.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 hidden bg-linear-to-r from-transparent to-black/40 sm:block" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent sm:hidden" />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4 p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-xl font-black">
                          {launch.meme.name}
                        </h3>
                        <span className="text-primary text-sm font-bold">
                          {launch.meme.ticker}
                        </span>
                      </div>
                      <p className="text-muted-foreground line-clamp-1 text-sm">
                        {launch.meme.description}
                      </p>
                    </div>
                    <Badge className={`${status.color} gap-1.5 px-3 py-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="text-muted-foreground flex items-center gap-1.5">
                      <Vote className="h-3.5 w-3.5" />
                      <span>
                        <span className="text-foreground font-bold">
                          {launch.voteCount}
                        </span>{" "}
                        votes
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>
                        <span className="text-foreground font-bold">
                          {launch.solRaised}
                        </span>{" "}
                        / {launch.solCap} SOL
                      </span>
                    </div>
                    {launch.launchedAt && (
                      <div className="text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{launch.launchedAt.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-secondary relative h-2 w-full overflow-hidden rounded-full">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${pct}%`,
                        background:
                          launch.status === "failed"
                            ? "#ef4444"
                            : "linear-gradient(90deg, rgba(99,181,17,1), rgba(191,249,133,1))",
                      }}
                    />
                  </div>

                  {/* Links */}
                  {launch.status === "launched" && (
                    <div className="flex flex-wrap gap-2">
                      {launch.solscanUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 rounded-full text-xs"
                          asChild
                        >
                          <a
                            href={launch.solscanUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Solscan
                          </a>
                        </Button>
                      )}
                      {launch.meteoraPoolUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 rounded-full text-xs"
                          asChild
                        >
                          <a
                            href={launch.meteoraPoolUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Meteora Pool
                          </a>
                        </Button>
                      )}
                      {launch.tokenAddress && (
                        <Badge variant="outline" className="text-xs">
                          {launch.tokenAddress}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
