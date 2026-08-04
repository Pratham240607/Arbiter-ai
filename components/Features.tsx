"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "Fast AI Analysis",
    desc: "Get instant comparisons and recommendations in seconds instead of spending hours researching.",
  },
  {
    icon: "⭐",
    title: "Review Summaries",
    desc: "Decision AI combines specs, ratings, and review insights into a simple understandable answer.",
  },
  {
    icon: "📊",
    title: "Decision Score",
    desc: "Every comparison includes a smart score so you can quickly see which option offers better value.",
  },
  {
    icon: "🧠",
    title: "Personalized Recommendations",
    desc: "Tell the AI your budget, priorities, and use case to receive recommendations tailored for you.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Why Decision AI?
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            Everything you need to make smarter decisions with confidence.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >

              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-400 leading-relaxed text-sm">
                {feature.desc}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}