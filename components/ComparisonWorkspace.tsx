"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ComparisonWorkspace() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [showResult, setShowResult] = useState(false);

  return (
    <section className="min-h-screen p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            ⚖️ Comparison Workspace
          </h1>

          <p className="mt-3 text-gray-400">
            Enter two products, places, hotels, AI tools, or anything you want to compare visually.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <input
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="First item"
            className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder-gray-400 outline-none"
          />

          <input
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Second item"
            className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white placeholder-gray-400 outline-none"
          />

        </div>

        <button
          onClick={() => setShowResult(true)}
          className="mt-6 rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition"
        >
          Compare
        </button>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl"
          >

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <h2 className="text-3xl font-black text-white">
                {left || "First Item"} vs {right || "Second Item"}
              </h2>

              <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-300 font-semibold">
                🏆 Recommended: {right || "Second Item"}
              </span>

            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-bold text-white">
                  {left || "First Item"}
                </h3>

                <div className="mt-5 space-y-4">

                  <Bar label="Performance" value={78} />
                  <Bar label="Features" value={82} />
                  <Bar label="Value" value={85} />

                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-bold text-white">
                  {right || "Second Item"}
                </h3>

                <div className="mt-5 space-y-4">

                  <Bar label="Performance" value={92} />
                  <Bar label="Features" value={90} />
                  <Bar label="Value" value={88} />

                </div>
              </div>

            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                <h4 className="font-bold text-green-300">👍 Pros</h4>

                <ul className="mt-3 space-y-2 text-sm text-gray-200">
                  <li>• Better overall performance</li>
                  <li>• More premium user experience</li>
                  <li>• Stronger long-term value</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                <h4 className="font-bold text-red-300">👎 Cons</h4>

                <ul className="mt-3 space-y-2 text-sm text-gray-200">
                  <li>• Slightly higher price</li>
                  <li>• More features than some users need</li>
                  <li>• Can be less budget-friendly</li>
                </ul>
              </div>

            </div>

            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <h4 className="font-bold text-cyan-300">🤖 AI Recommendation</h4>

              <p className="mt-3 text-gray-200 leading-relaxed">
                Based on the comparison factors, <strong>{right || "Second Item"}</strong> appears to be the stronger overall choice for most users because it offers better performance, features, and long-term usability.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-400">
              🔍 <strong>Source Note:</strong> This is a visual comparison workspace. The next version can be connected to real product, hotel, and travel APIs for live ratings, reviews, prices, and citations.
            </div>

          </motion.div>
        )}

      </div>

    </section>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>

      <div className="h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-cyan-400 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}