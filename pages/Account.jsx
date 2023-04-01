import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession, useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatar from "./components/Avatar";
import { supabaseClient } from "../utils/SupabaseClient";
import PromptHistory from "./components/PromptHistory";
import { getData } from "./api/getUser"
import ProfilePanel from "./components/ProfilePanel";

async function getProfile(id) {

}

export default function Account() {
    const user = useUser();
    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [username, setUsername] = useState(null);
    const [userData, setUserData] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    console.log(userData)


    useEffect(() => {
        if (user) {
            getHistory();
            getProfile();
        }
    }, [user]);

    async function getProfile() {

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
    }

    async function getHistory() {
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
    }
    // useEffect(() => {
    //     const supabase = useSupabaseClient();
    //     const user = useUser();
    //     const router = useRouter()
    //     if (!session) {
    //         router.push('/')
    //     } else {
    //         async function fetchHistory() {
    //             try {
    //                 let { data, error } = await supabase
    //                     .from("prompts")
    //                     .select(`id, user_prompt, gpt_answer, created_at`)
    //                     .eq("user_id", user.id)
    //                     .order("created_at", { ascending: false });
    //                 if (error) throw error;
    //                 setEntries(data);
    //             } catch (error) {
    //                 alert("Error loading user data!");
    //                 console.log(error);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         }
    //         async function getProfile() {

    //             try {
    //                 setLoading(true);

    //                 let { data, error, status } = await supabase
    //                     .from("profiles")
    //                     .select(`username, website, avatar_url`)
    //                     .eq("id", user.id)
    //                     .single();

    //                 if (error && status !== 406) {
    //                     throw error;
    //                 }

    //                 if (data) {
    //                     setUsername(data.username);
    //                     setWebsite(data.website);
    //                     setAvatarUrl(data.avatar_url);
    //                 }
    //             } catch (error) {
    //                 alert("Error loading user data!");
    //                 console.log(error);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         }
    //         getProfile();
    //         fetchHistory();
    //     }
    // }, [session]);




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
                <PromptHistory props={entries} />
            </div>
        </div>
    );
}

// export async function getServerSideProps() {
//     // const { data, error } = await supabaseClient
//     //     .from("profiles")
//     //     .select(`username, website, avatar_url`)
//     //     .eq("id", user.id)
//     //     .single();
//     // Fetch data from external API
//     // const res = await fetch(`https://.../data`)
//     // const data = await res.json()

//     // Pass data to the page via props
//     return { props: { data: "data" } }
// }