import { MOCK_QUEUE_PROJECTS } from "@/lib/mock-data";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const UpNext = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black">Up Next</h2>

          <Link
            href="/submit"
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
          >
            Submit a Project <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_QUEUE_PROJECTS.map((queueProject, i) => (
            <motion.div
              key={queueProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="group hover:border-primary/30 overflow-hidden rounded-xl bg-[rgba(21,21,21,1)] transition-colors"
            >
              <div className="bg-grid relative h-56 overflow-hidden !border-b-0">
                <Image
                  src={queueProject.imageUrl}
                  alt={queueProject.name}
                  width={240}
                  height={240}
                  className="mx-auto transition-transform duration-500 group-hover:scale-105"
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
                  <p className="text-xl font-black">{queueProject.name}</p>
                  <p className="text-sm font-medium">{queueProject.ticker}</p>
                </div>
              </div>
              <div className="border border-t-0 border-[rgba(35,35,35,1)] p-3">
                <p className="text-muted-foreground line-clamp-2 text-sm font-medium">
                  {queueProject.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default UpNext;
