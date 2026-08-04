"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <motion.div
        animate={{
          x: [0, 120, -100, 0],
          y: [0, -80, 100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl top-20 left-20"
      />

      <motion.div
        animate={{
          x: [0, -150, 120, 0],
          y: [0, 120, -100, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
        }}
        className="absolute w-[450px] h-[450px] rounded-full bg-purple-500/20 blur-3xl bottom-10 right-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute w-80 h-80 rounded-full bg-blue-500/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

    </div>
  );
}