"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "./AuthProvider";

type Mode = "chat" | "comparison";

type NavbarProps = {
  onComparison?: () => void;
  activeMode?: Mode;
};

export default function Navbar({
  onComparison,
  activeMode = "chat",
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const { user, signOut } = useAuth();

  return (
    <>
      <header className="fixed left-72 right-0 top-0 z-40 border-b border-[#1F293D] bg-[#090D16]/90 backdrop-blur-xl">

        <div className="flex h-16 items-center justify-between px-7">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1F293D] bg-[#111726] text-sm font-semibold text-[#00E5FF]">
              A
            </div>

            <div>
              <h1 className="text-sm font-semibold tracking-tight text-white">
                Arbiter AI
              </h1>

              <p className="text-[10px] text-gray-600">
                Judge Smarter • Decide Faster
              </p>
            </div>

          </div>

          {/* NAVIGATION */}

          <div className="flex items-center gap-1">

            {/* COMPARISON */}

            <button
              onClick={() => onComparison?.()}
              className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition ${
                activeMode === "comparison"
                  ? "border-[#00E5FF]/30 bg-[#00E5FF]/[0.08] text-[#00E5FF]"
                  : "border-transparent text-gray-400 hover:border-[#1F293D] hover:bg-white/[0.03] hover:text-gray-200"
              }`}
            >
              Comparison
            </button>

            {/* RESEARCH */}

            <button
              onClick={() =>
                alert("Research mode is coming next.")
              }
              className="rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-gray-400 transition hover:border-[#1F293D] hover:bg-white/[0.03] hover:text-gray-200"
            >
              Research
            </button>

            {/* ABOUT */}

            <button
              onClick={() => setAboutOpen(true)}
              className="rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-gray-400 transition hover:border-[#1F293D] hover:bg-white/[0.03] hover:text-gray-200"
            >
              About
            </button>

            {/* AUTH */}

            <div className="ml-3">

              {user ? (

                <div className="flex items-center gap-2">

                  <div className="rounded-lg border border-[#1F293D] bg-[#111726] px-3 py-2">

                    <span className="max-w-[180px] truncate text-xs font-medium text-gray-300">
                      {user.user_metadata?.full_name ||
                        user.user_metadata?.name ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </span>

                  </div>

                  <button
                    onClick={signOut}
                    className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3.5 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/[0.12]"
                  >
                    Logout
                  </button>

                </div>

              ) : (

                <button
                  onClick={() => setOpen(true)}
                  className="rounded-lg bg-[#00E5FF] px-4 py-2 text-xs font-semibold text-[#071018] transition hover:bg-[#33eaff]"
                >
                  Login
                </button>

              )}

            </div>

          </div>

        </div>

      </header>

      {/* LOGIN */}

      <AuthModal
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* ABOUT MODAL */}

      {aboutOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setAboutOpen(false);
            }
          }}
        >

          <div
            className="relative w-full max-w-lg rounded-xl border border-[#1F293D] bg-[#111726] shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              onClick={() => setAboutOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-500 transition hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              ×
            </button>

            {/* HEADER */}

            <div className="border-b border-[#1F293D] px-6 py-6">

              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#1F293D] bg-[#090D16] text-sm font-semibold text-[#00E5FF]">
                A
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Arbiter AI
              </h2>

              <p className="mt-1 text-sm text-[#00E5FF]">
                Judge Smarter • Decide Faster
              </p>

            </div>

            {/* CONTENT */}

            <div className="space-y-5 px-6 py-6">

              <div>

                <h3 className="mb-2 text-sm font-semibold text-white">
                  What is Arbiter AI?
                </h3>

                <p className="text-sm leading-6 text-gray-400">
                  Arbiter AI is an AI-powered decision assistant
                  designed to help you understand information,
                  compare options, research topics, and make
                  better-informed decisions.
                </p>

              </div>

              {/* FEATURES */}

              <div className="grid gap-3 sm:grid-cols-3">

                <div className="rounded-lg border border-[#1F293D] bg-[#090D16] p-4">

                  <div className="mb-2 text-[#00E5FF]">
                    💬
                  </div>

                  <h4 className="text-xs font-semibold text-white">
                    AI Chat
                  </h4>

                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Ask questions and get useful answers.
                  </p>

                </div>

                <div className="rounded-lg border border-[#1F293D] bg-[#090D16] p-4">

                  <div className="mb-2 text-[#00E5FF]">
                    ⚖️
                  </div>

                  <h4 className="text-xs font-semibold text-white">
                    Comparison
                  </h4>

                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Compare two options side by side.
                  </p>

                </div>

                <div className="rounded-lg border border-[#1F293D] bg-[#090D16] p-4">

                  <div className="mb-2 text-[#00E5FF]">
                    🔎
                  </div>

                  <h4 className="text-xs font-semibold text-white">
                    Research
                  </h4>

                  <p className="mt-1 text-[11px] leading-5 text-gray-500">
                    Explore topics in greater depth.
                  </p>

                </div>

              </div>

              {/* FOOTER */}

              <div className="border-t border-[#1F293D] pt-4">

                <p className="text-center text-xs text-gray-600">
                  Built to help you judge smarter and decide faster.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}