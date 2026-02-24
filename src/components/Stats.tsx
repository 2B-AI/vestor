import { Users, TrendingUp, Trophy, Rocket } from "lucide-react";

import { motion } from "framer-motion";
const Stats = () => {
  return (
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
          },
          {
            label: "Tokens Launched",
            value: "18",
            icon: Rocket,
          },
          {
            label: "Total Voters",
            value: "4,892",
            icon: Users,
          },
          {
            label: "Winning Memes",
            value: "23",
            icon: Trophy,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-grid space-y-3 rounded-xl p-5 text-center"
          >
            <div className="bg-primary/40 mx-auto w-fit rounded-full p-3">
              <stat.icon className={`text-primary h-6 w-6`} />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
