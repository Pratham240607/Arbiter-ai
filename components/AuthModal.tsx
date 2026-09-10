"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({
  open,
  onClose,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(
    "login"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const handleAuth = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      /*
       * LOGIN
       */

      if (mode === "login") {
        const {
          data,
          error,
        } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error(
            "Login failed. Please try again."
          );
        }

        /*
         * AuthProvider will automatically detect
         * the new session.
         */

        setEmail("");
        setPassword("");

        onClose();

        return;
      }

      /*
       * SIGN UP
       */

      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (error) {
        throw error;
      }

      /*
       * If email confirmation is enabled,
       * Supabase may not immediately create
       * an active session.
       */

      if (data.session) {
        setSuccess("Account created successfully.");

        setTimeout(() => {
          onClose();
        }, 700);
      } else {
        setSuccess(
          "Account created successfully. You can now log in."
        );

        setMode("login");
        setPassword("");
      }
    } catch (err: any) {
      console.error("AUTH ERROR:", err);

      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setError("");
    setSuccess("");

    setMode(
      mode === "login"
        ? "signup"
        : "login"
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >

      {/* MODAL */}

      <div
        className="relative w-full max-w-md overflow-y-auto rounded-xl border border-[#1F293D] bg-[#111726] shadow-2xl"
        style={{
          maxHeight: "calc(100vh - 32px)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-lg text-gray-500 transition hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          ×
        </button>

        {/* HEADER */}

        <div className="border-b border-[#1F293D] px-6 py-5">

          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#1F293D] bg-[#090D16] text-sm font-semibold text-[#00E5FF]">
            A
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white">
            {mode === "login"
              ? "Welcome back"
              : "Create your account"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {mode === "login"
              ? "Sign in to continue to Arbiter AI."
              : "Create an account to save your conversations."}
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleAuth}
          className="space-y-4 px-6 py-6"
        >

          {/* NAME */}

          {mode === "signup" && (
            <div>

              <label className="mb-2 block text-xs font-medium text-gray-400">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-[#1F293D] bg-[#090D16] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#00E5FF]/50"
              />

            </div>
          )}

          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#1F293D] bg-[#090D16] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#00E5FF]/50"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={
                mode === "login"
                  ? "current-password"
                  : "new-password"
              }
              className="w-full rounded-lg border border-[#1F293D] bg-[#090D16] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#00E5FF]/50"
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm leading-5 text-red-300">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="rounded-lg border border-[#00E5FF]/20 bg-[#00E5FF]/[0.06] px-4 py-3 text-sm leading-5 text-[#7eeeff]">
              {success}
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#00E5FF] px-4 py-3 text-sm font-semibold text-[#071018] transition hover:bg-[#33eaff] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create account"}
          </button>

        </form>

        {/* SWITCH */}

        <div className="border-t border-[#1F293D] px-6 py-5 text-center">

          <span className="text-sm text-gray-600">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={switchMode}
            className="ml-2 text-sm font-medium text-[#00E5FF] transition hover:text-white"
          >
            {mode === "login"
              ? "Create account"
              : "Login"}
          </button>

        </div>

      </div>

    </div>
  );
}