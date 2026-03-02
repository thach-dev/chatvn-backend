import { supabase } from "../config/supabaseClient.js";

export const register = async (req, res) => {
    const { email, password, full_name } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) return res.status(400).json({ error: error.message });

    await supabase.from("profiles").insert([
        {
            id: data.user.id,
            email,
            full_name,
            phone,
            password,
        },
    ]);

    res.json(data);
};

export const login = async (req, res) => {
    const { phone, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
};