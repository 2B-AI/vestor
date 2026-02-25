import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 pb-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h2 className="mb-16 text-4xl font-bold">
          How <span className="text-gradient font-orbitron">Vestor</span>{" "}
          Works
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Submit",
              desc: "Anyone can submit an AI project idea for free. Add a name, ticker, image, and token supply.",
            },
            {
              step: "02",
              title: "Vote",
              desc: "Community votes on projects in 1-hour rounds. 0.05 SOL per vote, 1 wallet = 1 vote.",
            },
            {
              step: "03",
              title: "Fund",
              desc: "Winners enter a 48-hour fundraise. Contribute SOL toward the 85 SOL cap.",
            },
            {
              step: "04",
              title: "Launch",
              desc: "On cap fill, the token is auto-created and deployed on Meteora. Contributors get their tokens.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-grid group hover:border-primary/30 relative rounded-xl p-6 transition-colors"
            >
              <span className="text-primary/50 absolute -top-8 right-4 text-6xl font-medium">
                {item.step}
              </span>

              <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
