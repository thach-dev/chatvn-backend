import { supabase } from "../config/supabaseClient.js";

export const sendMessage = async (req, res) => {
  const { conversation_id, sender_id, content } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ conversation_id, sender_id, content }])
    .select()
    .single();

  if (error) return res.status(400).json({ error });

  res.json(data);
};

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) return res.status(400).json({ error });

  res.json(data);
};