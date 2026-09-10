"use client";

import { useAuth } from "../components/AuthProvider";
import { supabase } from "../lib/supabase";

export async function createChat(userId: string, title: string) {
  const { data, error } = await supabase
    .from("chats")
    .insert({
      user_id: userId,
      title,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function saveMessage(
  chatId: string,
  role: "user" | "assistant",
  content: string
) {
  const { error } = await supabase.from("messages").insert({
    chat_id: chatId,
    role,
    content,
  });

  if (error) throw error;
}

export async function loadMessages(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
}