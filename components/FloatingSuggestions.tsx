"use client";

import { motion } from "framer-motion";

const suggestions = [
  "🚗 Compare BMW X1 vs Audi Q3",
  "📱 Best phone under ₹40,000",
  "🏨 Jaipur hotels for couples",
  "🤖 ChatGPT vs Claude for coding",
  "💻 Best laptop for cybersecurity",
  "✈️ Goa or Bali for a budget trip",
];

export default function FloatingSuggestions() {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-5xl">
      {suggestions.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.15,
            duration: 0.5,
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md cursor-pointer hover:border-cyan-400/40 hover:text-white transition"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}