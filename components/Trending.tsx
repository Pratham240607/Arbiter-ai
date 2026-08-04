"use client";

import { motion } from "framer-motion";

const items = [
  {
    emoji: "🚗",
    title: "BMW X1 vs Audi Q3",
    category: "Cars",
  },
  {
    emoji: "📱",
    title: "iPhone 17 vs Samsung S26",
    category: "Phones",
  },
  {
    emoji: "🤖",
    title: "ChatGPT vs Claude",
    category: "AI Models",
  },
  {
    emoji: "🏨",
    title: "Goa vs Bali",
    category: "Travel",
  },
];

export default function Trending() {
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
            🔥 Trending Comparisons
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            Popular decisions people are asking Decision AI right now.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl cursor-pointer"
            >

              <div className="text-5xl">{item.emoji}</div>

              <div className="mt-5">

                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {item.category}
                </span>

                <h3 className="mt-4 text-xl font-bold text-white leading-snug">
                  {item.title}
                </h3>

                <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
                  <span>Compare now</span>
                  <span>→</span>
                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}