import { supabase } from "../config/supabaseClient.js";

export const createConversation = async (req, res) => {
  const { userIds } = req.body;

  const { data: conversation, error } = await supabase
    .from("conversations")
    .insert([{}])
    .select()
    .single();

  if (error) return res.status(400).json({ error });

  const members = userIds.map((id) => ({
    conversation_id: conversation.id,
    user_id: id,
  }));

  await supabase.from("conversation_members").insert(members);

  res.json(conversation);
};

export const getUserConversations = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("conversation_members")
    .select("conversation_id, conversations(*)")
    .eq("user_id", userId);

  if (error) return res.status(400).json({ error });

  res.json(data);
};