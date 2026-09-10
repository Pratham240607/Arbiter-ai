import { supabase } from "./supabase";

export async function createChat(userId: string, title: string) {
  const { data, error } = await supabase
    .from("chats")
    .insert({
      user_id: userId,
      title,
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE CHAT ERROR:", JSON.stringify(error));
    throw error;
  }

  return data;
}

export async function saveMessage(
  chatId: string,
  role: "user" | "assistant",
  content: string
) {
  const { error } = await supabase
    .from("messages")
    .insert({
      chat_id: chatId,
      role,
      content,
    });

  if (error) {
    console.error("SAVE MESSAGE ERROR:", JSON.stringify(error));
    throw error;
  }
}

export async function getChats(userId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET CHATS ERROR:", JSON.stringify(error));
    throw error;
  }

  return data || [];
}

/* NEW: Load messages from a saved chat */
export async function getMessages(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("GET MESSAGES ERROR:", JSON.stringify(error));
    throw error;
  }

  return data || [];
}