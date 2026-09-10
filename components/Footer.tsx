"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl py-12 px-6">

      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Arbiter AI
          </h3>

          <p className="mt-4 text-gray-400 leading-relaxed">
            Your personal AI-powered decision assistant for comparing products,
            travel, hotels, AI models, colleges, and more.
          </p>

        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <h4 className="text-lg font-bold text-white">
            Quick Links
          </h4>

          <ul className="mt-4 space-y-3 text-gray-400">

            <li><a href="#" className="hover:text-cyan-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Compare</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Trending</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">About</a></li>

          </ul>

        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <h4 className="text-lg font-bold text-white">
            Connect
          </h4>

          <div className="mt-4 space-y-3 text-gray-400">

            <a
              href="https://github.com/Pratham240607"
              target="_blank"
              className="block hover:text-cyan-400 transition"
            >
              🔗 GitHub
            </a>

            <p>🚀 Built by Pratham Padwal</p>

            <p>🎓 BTech Cybersecurity Student</p>

          </div>

        </motion.div>

      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
        © 2026 Arbiter AI. Built with ❤️ using Next.js, TypeScript & Tailwind CSS.
      </div>

    </footer>
  );
}