"use client";

import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ChatMessage from "./ChatMessage";
import { useAuth } from "./AuthProvider";
import {
  createChat,
  saveMessage,
  getMessages,
} from "../lib/chat";

type Mode = "chat" | "comparison";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type HeroProps = {
  mode: Mode;
  selectedChatId?: string | null;
};

export default function Hero({
  mode,
  selectedChatId,
}: HeroProps) {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [thinking, setThinking] = useState(false);

  const [currentChatId, setCurrentChatId] =
    useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [itemOne, setItemOne] = useState("");
  const [itemTwo, setItemTwo] = useState("");
  const [description, setDescription] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  /*
   * LOAD SELECTED CHAT
   *
   * When the user clicks a chat in the sidebar,
   * completely replace the current conversation.
   */

  useEffect(() => {
    if (!selectedChatId) {
      setCurrentChatId(null);
      setMessages([]);
      return;
    }

    const loadSelectedChat = async () => {
      try {
        setThinking(true);

        const data = await getMessages(selectedChatId);

        setCurrentChatId(selectedChatId);

        setMessages(
          data.map((message) => ({
            role: message.role as "user" | "assistant",
            content: message.content,
          }))
        );
      } catch (error) {
        console.error("LOAD CHAT ERROR:", error);

        setMessages([
          {
            role: "assistant",
            content:
              "⚠️ I couldn't load this conversation.",
          },
        ]);
      } finally {
        setThinking(false);
      }
    };

    loadSelectedChat();
  }, [selectedChatId]);

  /*
   * AUTO SCROLL
   */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, thinking]);

  /*
   * SEND NORMAL CHAT MESSAGE
   */

  const handleAsk = async () => {
    if (!query.trim() || thinking) return;

    const userMessage = query.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setQuery("");
    setThinking(true);

    let chatId = currentChatId;

    /*
     * CREATE NEW CHAT ONLY IF THIS
     * IS THE FIRST MESSAGE.
     */

    try {
      if (!chatId && user) {
        const chat = await createChat(
          user.id,
          userMessage.slice(0, 40)
        );

        chatId = chat.id;

        setCurrentChatId(chat.id);
      }

      if (chatId) {
        await saveMessage(
          chatId,
          "user",
          userMessage
        );
      }
    } catch (error) {
      console.error(
        "CHAT SAVE ERROR:",
        error
      );
    }

    /*
     * CALL YOUR EXISTING AI API
     */

    let answer = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          mode: "chat",
        }),
      });

      const data = await response.json();

      answer =
        data.reply ||
        "⚠️ Could not generate a response.";
    } catch (error) {
      console.error(
        "AI REQUEST ERROR:",
        error
      );

      answer =
        "⚠️ Failed to contact Arbiter AI.";
    }

    /*
     * SHOW AI ANSWER
     */

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: answer,
      },
    ]);

    /*
     * SAVE AI ANSWER
     */

    try {
      if (chatId) {
        await saveMessage(
          chatId,
          "assistant",
          answer
        );
      }
    } catch (error) {
      console.error(
        "AI MESSAGE SAVE ERROR:",
        error
      );
    }

    setThinking(false);
  };

  /*
   * COMPARISON
   */

  const handleComparison = async () => {
    if (
      !itemOne.trim() ||
      !itemTwo.trim() ||
      thinking
    ) {
      return;
    }

    const comparisonPrompt = `
Compare these two options:

Option 1:
${itemOne.trim()}

Option 2:
${itemTwo.trim()}

Additional requirements:
${description.trim() || "Give a balanced overall comparison."}

Please provide:
1. Key differences
2. Advantages of each
3. Disadvantages of each
4. Which option is better for different types of users
5. Final recommendation
`;

    const visibleQuestion = `Compare ${itemOne.trim()} vs ${itemTwo.trim()}`;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: visibleQuestion,
      },
    ]);

    setThinking(true);

    let chatId = currentChatId;

    /*
     * CREATE CHAT FOR COMPARISON
     */

    try {
      if (!chatId && user) {
        const chat = await createChat(
          user.id,
          `${itemOne.trim()} vs ${itemTwo.trim()}`.slice(
            0,
            40
          )
        );

        chatId = chat.id;

        setCurrentChatId(chat.id);
      }

      if (chatId) {
        await saveMessage(
          chatId,
          "user",
          comparisonPrompt
        );
      }
    } catch (error) {
      console.error(
        "COMPARISON CHAT SAVE ERROR:",
        error
      );
    }

    /*
     * CALL AI
     */

    let answer = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: comparisonPrompt,
          mode: "comparison",
        }),
      });

      const data = await response.json();

      answer =
        data.reply ||
        "⚠️ Could not generate a comparison.";
    } catch (error) {
      console.error(
        "COMPARISON AI ERROR:",
        error
      );

      answer =
        "⚠️ Failed to generate the comparison.";
    }

    /*
     * SHOW RESULT
     */

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: answer,
      },
    ]);

    /*
     * SAVE RESULT
     */

    try {
      if (chatId) {
        await saveMessage(
          chatId,
          "assistant",
          answer
        );
      }
    } catch (error) {
      console.error(
        "COMPARISON SAVE ERROR:",
        error
      );
    }

    setThinking(false);
  };

  /*
   * NEW CHAT
   */

  const startNewChat = () => {
    setCurrentChatId(null);

    setMessages([]);

    setQuery("");

    setItemOne("");
    setItemTwo("");
    setDescription("");

    setThinking(false);
  };

  /*
   * =====================================================
   * COMPARISON MODE
   * =====================================================
   */

  if (mode === "comparison") {
    return (
      <section className="min-h-screen bg-[#090D16] px-8 pb-16 pt-24">

        <div className="mx-auto max-w-5xl">

          {/* HEADER */}

          <div className="mb-8">

            <div className="mb-3 flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00E5FF]">
                Comparison Engine
              </span>

            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Compare your options.
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Enter two things you are considering and
              let Arbiter analyze the differences,
              trade-offs and best choice.
            </p>

          </div>

          {/* TWO OPTIONS */}

          <div className="grid gap-4 md:grid-cols-2">

            {/* OPTION ONE */}

            <div className="rounded-xl border border-[#1F293D] bg-[#111726]">

              <div className="border-b border-[#1F293D] px-5 py-3">

                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Option 01
                </span>

              </div>

              <input
                value={itemOne}
                onChange={(e) =>
                  setItemOne(e.target.value)
                }
                placeholder="e.g. MacBook Air M4"
                className="w-full bg-transparent px-5 py-5 text-base font-medium text-white outline-none placeholder:text-gray-600"
              />

            </div>

            {/* OPTION TWO */}

            <div className="rounded-xl border border-[#1F293D] bg-[#111726]">

              <div className="border-b border-[#1F293D] px-5 py-3">

                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Option 02
                </span>

              </div>

              <input
                value={itemTwo}
                onChange={(e) =>
                  setItemTwo(e.target.value)
                }
                placeholder="e.g. Dell XPS 14"
                className="w-full bg-transparent px-5 py-5 text-base font-medium text-white outline-none placeholder:text-gray-600"
              />

            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="mt-4 rounded-xl border border-[#1F293D] bg-[#111726]">

            <div className="border-b border-[#1F293D] px-5 py-3">

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                What matters to you?
              </span>

            </div>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Tell Arbiter what you care about — price, performance, battery, gaming, cybersecurity, portability, etc."
              className="h-28 w-full resize-none bg-transparent px-5 py-4 text-sm leading-6 text-gray-300 outline-none placeholder:text-gray-600"
            />

            <div className="flex items-center justify-between border-t border-[#1F293D] px-4 py-3">

              <span className="text-xs text-gray-600">
                Be specific for a better recommendation.
              </span>

              <button
                onClick={handleComparison}
                disabled={
                  thinking ||
                  !itemOne.trim() ||
                  !itemTwo.trim()
                }
                className="flex items-center gap-2 rounded-lg bg-[#00E5FF] px-5 py-2.5 text-sm font-semibold text-[#071018] transition hover:bg-[#33eaff] disabled:cursor-not-allowed disabled:opacity-40"
              >

                {thinking
                  ? "Analyzing..."
                  : "Compare"}

                <PaperAirplaneIcon className="h-4 w-4" />

              </button>

            </div>

          </div>

          {/* RESULT */}

          {(messages.length > 0 ||
            thinking) && (

            <div className="mt-10">

              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
                Analysis
              </div>

              <div className="space-y-5">

                {messages.map(
                  (message, index) => (
                    <ChatMessage
                      key={index}
                      role={message.role}
                      content={message.content}
                    />
                  )
                )}

                {thinking && (
                  <div className="border-l-2 border-[#00E5FF] bg-[#111726] px-5 py-4 text-sm text-gray-400">
                    Arbiter is analyzing the options...
                  </div>
                )}

                <div ref={bottomRef} />

              </div>

            </div>
          )}

        </div>

      </section>
    );
  }

  /*
   * =====================================================
   * NORMAL CHAT MODE
   * =====================================================
   */

  return (
    <section className="min-h-screen bg-[#090D16] px-8 pb-16 pt-24">

      <div className="mx-auto max-w-4xl">

        {/* EMPTY / NEW CHAT */}

        {messages.length === 0 && (

          <div className="flex min-h-[65vh] flex-col justify-center">

            <div className="mb-8">

              <div className="mb-3 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00E5FF]">
                  Arbiter AI
                </span>

              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white">
                What do you want to decide?
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Ask a question, explore an idea, or get help
                making a decision.
              </p>

            </div>

            {/* INPUT */}

            <div className="rounded-xl border border-[#1F293D] bg-[#111726]">

              <textarea
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleAsk();
                  }

                }}
                placeholder="Ask Arbiter anything..."
                className="h-32 w-full resize-none rounded-xl bg-transparent px-5 py-4 text-sm leading-6 text-gray-200 outline-none placeholder:text-gray-600"
              />

              <div className="flex items-center justify-between border-t border-[#1F293D] px-4 py-3">

                <span className="text-xs text-gray-600">
                  Enter to send · Shift + Enter for new line
                </span>

                <button
                  onClick={handleAsk}
                  disabled={
                    thinking ||
                    !query.trim()
                  }
                  className="flex items-center gap-2 rounded-lg bg-[#00E5FF] px-4 py-2 text-sm font-semibold text-[#071018] transition hover:bg-[#33eaff] disabled:cursor-not-allowed disabled:opacity-40"
                >

                  {thinking
                    ? "Thinking..."
                    : "Ask AI"}

                  <PaperAirplaneIcon className="h-4 w-4" />

                </button>

              </div>

            </div>

          </div>
        )}

        {/* EXISTING CHAT */}

        {messages.length > 0 && (

          <div>

            <div className="mb-8">

              <div className="mb-3 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00E5FF]">
                  Conversation
                </span>

              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Arbiter AI
              </h1>

            </div>

            {/* MESSAGES */}

            <div className="space-y-5">

              {messages.map(
                (message, index) => (

                  <ChatMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                  />

                )
              )}

              {thinking && (

                <div className="border-l-2 border-[#00E5FF] bg-[#111726] px-5 py-4 text-sm text-gray-400">
                  Arbiter is thinking...
                </div>

              )}

              <div ref={bottomRef} />

            </div>

            {/* FOLLOW-UP INPUT */}

            <div className="sticky bottom-4 mt-8 rounded-xl border border-[#1F293D] bg-[#111726] shadow-2xl">

              <textarea
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleAsk();
                  }

                }}
                placeholder="Continue the conversation..."
                className="h-24 w-full resize-none bg-transparent px-5 py-4 text-sm text-gray-200 outline-none placeholder:text-gray-600"
              />

              <div className="flex justify-end border-t border-[#1F293D] px-4 py-3">

                <button
                  onClick={handleAsk}
                  disabled={
                    thinking ||
                    !query.trim()
                  }
                  className="flex items-center gap-2 rounded-lg bg-[#00E5FF] px-4 py-2 text-sm font-semibold text-[#071018] transition hover:bg-[#33eaff] disabled:cursor-not-allowed disabled:opacity-40"
                >

                  {thinking
                    ? "Thinking..."
                    : "Send"}

                  <PaperAirplaneIcon className="h-4 w-4" />

                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}