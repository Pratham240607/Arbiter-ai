"use client";

import { useEffect, useState } from "react";
import {
  PlusIcon,
  ScaleIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "./AuthProvider";
import { getChats } from "../lib/chat";

type Mode = "chat" | "comparison";

type Chat = {
  id: string;
  title: string;
};

type SidebarProps = {
  onNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
  onComparison?: () => void;
  activeMode?: Mode;
};

export default function Sidebar({
  onNewChat,
  onSelectChat,
  onComparison,
  activeMode = "chat",
}: SidebarProps) {
  const { user } = useAuth();

  const [chats, setChats] = useState<Chat[]>([]);

  const [loading, setLoading] = useState(false);

  /*
   * LOAD USER CHATS
   */

  useEffect(() => {
    if (!user) {
      setChats([]);
      return;
    }

    loadChats();
  }, [user]);

  const loadChats = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const data = await getChats(user.id);

      setChats(data || []);
    } catch (error) {
      console.error(
        "SIDEBAR GET CHATS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * NEW CHAT
   */

  const handleNewChat = () => {
    onNewChat?.();
  };

  /*
   * COMPARISON
   */

  const handleComparison = () => {
    onComparison?.();
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-[#1F293D] bg-[#0B101A]">

      {/* ================================================= */}
      {/* BRAND */}
      {/* ================================================= */}

      <div className="flex h-16 items-center border-b border-[#1F293D] px-5">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1F293D] bg-[#111726] text-sm font-semibold text-[#00E5FF]">
            A
          </div>

          <div>

            <div className="text-sm font-semibold tracking-tight text-white">
              Arbiter AI
            </div>

            <div className="text-[10px] text-gray-500">
              Decision Intelligence
            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div className="p-4">

        {/* NEW CHAT */}

        <button
          onClick={handleNewChat}
          className="flex w-full items-center gap-3 rounded-lg border border-[#1F293D] bg-[#111726] px-3.5 py-2.5 text-sm font-medium text-gray-200 transition hover:border-[#334155] hover:bg-[#151C2B]"
        >

          <PlusIcon className="h-5 w-5 text-[#00E5FF]" />

          <span>
            New Chat
          </span>

          <span className="ml-auto text-[10px] text-gray-600">
            Ctrl K
          </span>

        </button>

        {/* COMPARISON */}

        <button
          onClick={handleComparison}
          className={`mt-2 flex w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition ${
            activeMode === "comparison"
              ? "border-[#00E5FF]/30 bg-[#00E5FF]/[0.08] text-[#00E5FF]"
              : "border-transparent text-gray-400 hover:border-[#1F293D] hover:bg-white/[0.03] hover:text-gray-200"
          }`}
        >

          <ScaleIcon className="h-5 w-5" />

          <span>
            Compare
          </span>

          {activeMode === "comparison" && (
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />
          )}

        </button>

      </div>

      {/* ================================================= */}
      {/* RECENT CHATS */}
      {/* ================================================= */}

      <div className="flex-1 overflow-y-auto px-4">

        <div className="mb-3 flex items-center gap-2 px-2">

          <ChatBubbleLeftIcon className="h-3.5 w-3.5 text-gray-600" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">
            Recent Chats
          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="px-2 py-3 text-xs text-gray-600">
            Loading conversations...
          </div>

        )}

        {/* NO CHATS */}

        {!loading && chats.length === 0 && (

          <div className="rounded-lg border border-[#1F293D] bg-[#111726]/50 p-4 text-center text-xs leading-relaxed text-gray-600">
            Your conversations will appear here.
          </div>

        )}

        {/* CHAT LIST */}

        {!loading && chats.length > 0 && (

          <div className="space-y-1">

            {chats.map((chat) => (

              <button
                key={chat.id}
                onClick={() => {
                  onSelectChat?.(chat.id);
                }}
                className="group w-full rounded-lg border border-transparent px-3 py-2.5 text-left transition hover:border-[#1F293D] hover:bg-[#111726]"
              >

                <div className="flex items-center gap-2">

                  <ChatBubbleLeftIcon className="h-4 w-4 shrink-0 text-gray-600 transition group-hover:text-[#00E5FF]" />

                  <span className="truncate text-sm text-gray-400 group-hover:text-gray-200">
                    {chat.title}
                  </span>

                </div>

              </button>

            ))}

          </div>

        )}

      </div>

      {/* ================================================= */}
      {/* BOTTOM INFO */}
      {/* ================================================= */}

      <div className="border-t border-[#1F293D] p-4">

        <div className="rounded-lg border border-[#1F293D] bg-[#111726]/60 p-3">

          <div className="text-xs font-medium text-gray-300">
            Arbiter AI
          </div>

          <div className="mt-1 text-[10px] leading-relaxed text-gray-600">
            Compare, research and make better decisions.
          </div>

        </div>

      </div>

    </aside>
  );
}