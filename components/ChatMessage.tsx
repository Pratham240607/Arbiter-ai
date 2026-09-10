"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({ role, content }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={
        role === "user"
          ? "ml-auto max-w-[85%] rounded-xl border border-[#1F293D] bg-[#111726] px-5 py-4"
          : "max-w-[94%] rounded-xl border border-[#1F293D] bg-[#111726]/80 px-6 py-6"
      }
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">

        {/* Avatar */}
        <div
          className={
            role === "user"
              ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1F293D] bg-[#090D16] text-xs font-semibold text-[#CBD5E1]"
              : "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1F293D] bg-[#090D16] text-sm font-semibold text-[#00E5FF]"
          }
        >
          {role === "user" ? "Y" : "A"}
        </div>

        {/* Name */}
        <div className="min-w-0">

          <div className="text-sm font-semibold text-[#F8FAFC]">
            {role === "user" ? "You" : "Arbiter AI"}
          </div>

          <div className="text-xs text-[#94A3B8]">
            {role === "user"
              ? "Your prompt"
              : "AI-generated response"}
          </div>

        </div>
      </div>

      {/* Content */}
      {role === "assistant" ? (
        <div
          className="
            prose prose-invert max-w-none

            text-[15px]
            leading-[1.6]
            text-[#F8FAFC]

            prose-headings:text-[#F8FAFC]
            prose-headings:font-semibold
            prose-headings:tracking-tight

            prose-h1:text-2xl
            prose-h1:mt-8
            prose-h1:mb-4

            prose-h2:text-xl
            prose-h2:mt-7
            prose-h2:mb-4

            prose-h3:text-lg
            prose-h3:mt-6
            prose-h3:mb-3

            prose-p:my-4
            prose-p:text-[#F8FAFC]

            prose-ul:my-4
            prose-ol:my-4

            prose-li:my-1.5
            prose-li:text-[#CBD5E1]

            prose-strong:text-[#F8FAFC]

            prose-a:text-[#00E5FF]
            prose-a:no-underline
            hover:prose-a:underline

            prose-table:my-6
            prose-table:w-full

            prose-th:border
            prose-th:border-[#1F293D]
            prose-th:bg-[#090D16]
            prose-th:p-3
            prose-th:text-left
            prose-th:text-[#CBD5E1]

            prose-td:border
            prose-td:border-[#1F293D]
            prose-td:p-3
            prose-td:text-[#CBD5E1]

            prose-code:text-[#00E5FF]
            prose-code:bg-[#090D16]
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:rounded

            prose-blockquote:border-l-[#00E5FF]
            prose-blockquote:text-[#CBD5E1]
          "
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <div className="whitespace-pre-wrap text-[15px] leading-[1.6] text-[#F8FAFC]">
          {content}
        </div>
      )}
    </motion.div>
  );
}