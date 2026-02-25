"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/mock-data";

interface ProjectCardProps {
  project: Project;
  size?: "sm" | "lg";
}

export function ProjectCard({ project, size = "lg" }: ProjectCardProps) {
  const isLarge = size === "lg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-grid overflow-hidden rounded-2xl ${isLarge ? "max-w-md" : "max-w-xs"}`}
    >
      <div
        className={`relative ${isLarge ? "h-80" : "h-48"} w-full overflow-hidden`}
      >
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute right-4 bottom-4 left-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">{project.name}</span>
            <span className="bg-primary/20 text-primary rounded-full px-3 py-0.5 text-sm font-bold">
              {project.ticker}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>
            Supply:{" "}
            <span className="text-foreground">
              {project.tokenSupply.toLocaleString()}
            </span>
          </span>
          <span>
            by <span className="text-primary">{project.submitter}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
