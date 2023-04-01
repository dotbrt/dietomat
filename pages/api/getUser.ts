import { supabaseClient } from "../../utils/SupabaseClient";
export async function getData(user) {
    console.log(user);
    try {
        let { data, error, status } = await supabaseClient
            .from("profiles")
            .select(`username, website, avatar_url`)
            .eq("id", user.id)
            .single();

        if (error && status !== 406) {
            throw error;
        }
    } catch (error) {
        // alert("Error loading user data!");
        console.log(error);
    }
    return "hello";
}
export default async function handler(req, res) {
    // const data = await getData(req.session);
    res.status(200).json(req.body);
}
