import { useState, useEffect, useCallback } from "react";
import { useSession, useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabaseClient } from "../utils/SupabaseClient";
import PromptHistory from "./components/PromptHistory";
import ProfilePanel from "./components/ProfilePanel";

export default function Account() {
    const user = useUser();
    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    const historyCallback = {

    }

    const getHistory = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabaseClient
                .from("profiles")
                .select(`username, avatar_url`)
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            alert("Error loading user data!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);
            let { data, error } = await supabaseClient
                .from("prompts")
                .select(`id, user_prompt, gpt_answer, created_at`)
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });
            if (error) throw error;
            setEntries(data);
        } catch (error) {
            alert("Error loading user data!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getHistory();
            getProfile();
        }
    }, [user, getHistory, getProfile]);
    async function updateProfile({ username, avatar_url }) {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                username,
                avatar_url,
                updated_at: new Date().toISOString(),
            };

            let { error } = await supabaseClient.from("profiles").upsert(updates);
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col sm:flex-row">
            <ProfilePanel session={session} username={username} setUsername={setUsername} updateProfile={updateProfile} loading={loading} />
            <div className="card sm:w-9/12 md:w-9/12  bg-base-100 shadow-xl items-center">
                {/* <button onClick={handleHistory}>HIT</button> */}
                <PromptHistory props={entries} loading={loading} />
            </div>
        </div>
    );
}