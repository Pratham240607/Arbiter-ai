"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";

type Mode = "chat" | "comparison";

export default function Home() {
  const [mode, setMode] = useState<Mode>("chat");
  const [selectedChatId, setSelectedChatId] =
    useState<string | null>(null);

  // This changes every time New Chat is pressed.
  // Hero uses it to completely reset itself.
  const [newChatKey, setNewChatKey] = useState(0);

  const handleNewChat = () => {
    setSelectedChatId(null);
    setMode("chat");

    // Force Hero to become a completely fresh component
    setNewChatKey((previous) => previous + 1);
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setMode("chat");
  };

  const handleComparison = () => {
    setSelectedChatId(null);
    setMode("comparison");
  };

  return (
    <main className="min-h-screen bg-[#090D16] text-white">

      <Sidebar
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onComparison={handleComparison}
        activeMode={mode}
      />

      <div className="pl-72">

        <Navbar
          onComparison={handleComparison}
          activeMode={mode}
        />

        <Hero
          key={newChatKey}
          mode={mode}
          selectedChatId={selectedChatId}
        />

      </div>

    </main>
  );
}