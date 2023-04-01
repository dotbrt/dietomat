import { supabaseClient } from "../../utils/SupabaseClient";

export async function getProfileData(userId) {
    let { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", userId)
        .single();

    if (error && status !== 406) {
        throw error;
    }

    return data;
}

export async function getHistoryData(userId) {
    let { data, error } = await supabaseClient
        .from("prompts")
        .select(`id, user_prompt, gpt_answer, created_at`)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}

export async function updateProfileData(userId, username, avatarUrl) {
    const updates = {
        id: userId,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
    };

    let { error } = await supabaseClient.from("profiles").upsert(updates);

    if (error) throw error;
}
