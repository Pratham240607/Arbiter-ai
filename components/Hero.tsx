"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PaperAirplaneIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import FloatingSuggestions from "./FloatingSuggestions";

export default function Hero() {
  const [thinking, setThinking] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAsk = () => {
    setShowResult(false);
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      setShowResult(true);
    }, 4000);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden pt-28">

      {/* Badge */}
      <div className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-md">
        ✨ AI-powered comparison & decision engine
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
      >
        Stop Guessing.
        <br />
        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Start Deciding.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed"
      >
        Ask Decision AI anything — compare cars, phones, hotels,
        travel destinations, AI models, colleges, and more.
      </motion.p> <FloatingSuggestions />

      {/* AI Prompt Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-4 shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-3 pb-3">
          <SparklesIcon className="h-5 w-5 text-cyan-400" />
          <span className="text-sm text-gray-300">
            Decision AI Assistant
          </span>
        </div>

        <textarea
          placeholder="Try: Compare BMW X1 vs Audi Q3 for a family under ₹50 lakh..."
          className="mt-4 h-40 w-full resize-none bg-transparent p-2 text-white placeholder-gray-400 outline-none"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">🚗 Cars</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">📱 Phones</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">🏨 Hotels</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">🤖 AI Models</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">✈️ Travel</span>
          </div>

          <button
            onClick={handleAsk}
            disabled={thinking}
            className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:scale-105 hover:bg-cyan-400 disabled:opacity-60"
          >
            {thinking ? "Thinking..." : "Ask AI"}
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>

        </div>
      </motion.div>

      {/* Thinking Animation */}
      {thinking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 w-full max-w-3xl rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 backdrop-blur-xl text-left"
        >

          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            🧠 Decision AI is analyzing...
          </div>

          <div className="mt-4 space-y-3 text-gray-300">

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Understanding your request
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Comparing specifications
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Summarizing reviews
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Calculating Decision Score
            </div>

          </div>
        </motion.div>
      )}

      {/* Result Panel */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl text-left"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">
              BMW X1 vs Audi Q3
            </h3>

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-300 font-semibold">
              🏆 Recommended: Audi Q3
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* BMW */}
            <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold">BMW X1</h4>
                <span className="text-cyan-400 font-bold">91/100</span>
              </div>

              <div className="mt-4 space-y-4">

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance</span>
                    <span>9.2</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[92%] rounded-full bg-cyan-400"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Comfort</span>
                    <span>8.8</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[88%] rounded-full bg-cyan-400"></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Audi */}
            <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold">Audi Q3</h4>
                <span className="text-cyan-400 font-bold">94/100</span>
              </div>

              <div className="mt-4 space-y-4">

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance</span>
                    <span>9.0</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[90%] rounded-full bg-cyan-400"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Comfort</span>
                    <span>9.4</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[94%] rounded-full bg-cyan-400"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* AI Recommendation */}
          <div className="mt-6 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 p-5">
            <h4 className="font-bold text-cyan-300 mb-2">
              🤖 AI Recommendation
            </h4>

            <p className="text-gray-300 leading-relaxed">
              Because your prompt focuses on a family-friendly SUV under ₹50 lakh,
              the Audi Q3 offers a better overall balance of comfort, cabin quality,
              safety features, and long-distance usability. The BMW X1 is slightly
              more engaging to drive, but the Q3 provides stronger value for family buyers.
            </p>
          </div>

        </motion.div>
      )}

    </section>
  );
}