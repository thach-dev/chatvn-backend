import { supabase } from "../config/supabaseClient.js";

export const getAllUsers = async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  if (error) return res.status(400).json({ error });

  res.json(data);
};