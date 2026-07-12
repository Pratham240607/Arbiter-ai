"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Decision AI
        </h1>

        <div className="hidden md:flex gap-10 text-gray-300">

          <a href="#" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Compare
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Trending
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            About
          </a>

        </div>

        <button className="rounded-xl bg-cyan-500 px-6 py-3 font-bold hover:scale-105 hover:bg-cyan-400 transition">
          Login
        </button>

      </div>
    </motion.nav>
  );
}