import { useState, useEffect } from "react";
import { useSession, useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatar from "./components/Avatar";
import { useRouter } from "next/router";
import PromptHistory from "./components/PromptHistory";

export default function Account() {
    const router = useRouter()
    const session = useSession();
    const [loading, setLoading] = useState(true);
    async function getProfile() {

        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`username, website, avatar_url`)
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            alert("Error loading user data!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchHistory() {
        try {
            setLoading(true);
            let { data, error } = await supabase
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
    function handleHistory() {
        fetchHistory();
        console.log(entries)
    }
    useEffect(() => {
        getProfile();
        fetchHistory();
    }, [session]);
    // useEffect(() => {
    //     if (!session || !user) {
    //         router.push('/')
    //     }
    // }, [session])
    const supabase = useSupabaseClient();
    const user = useUser();
    const [username, setUsername] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [entries, setEntries] = useState([]);



    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            };

            let { error } = await supabase.from("profiles").upsert(updates);
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
        <div className="flex flex-row">
            <div className="card w-3/12 bg-base-100 shadow-xl items-center">
                <div>
                    <div className="avatar m-10">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {user && <Avatar
                                uid={user.id}
                                url={avatar_url}
                                size={150}
                                onUpload={(url) => {
                                    setAvatarUrl(url);
                                    updateProfile({ username, website, avatar_url: url });
                                }}
                            />}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-max items-center gap-3">
                    <label className="input-group input-group-horizontal label-input">
                        <span className='justify-center w-2/4'>
                            Email
                        </span>
                        <input
                            className="input input-bordered w-full"
                            id="email"
                            type="text"
                            value={session?.user.email}
                            disabled
                        />
                    </label>
                    <label className="input-group input-group-horizontal label-input">
                        <span className='justify-center w-2/4'>
                            Username
                        </span>
                        <input
                            className="input input-bordered w-full"
                            id="username"
                            type="text"
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    {/* <label className="input-group input-group-horizontal label-input">
                        <span className='justify-center w-2/4'>
                            Website
                        </span>
                        <input
                            className="input input-bordered w-full"
                            id="website"
                            type="website"
                            value={website || ""}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </label> */}

                    <div className="flex flex-col w-full p-10 gap-3">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                updateProfile({ username, website, avatar_url })
                            }
                            disabled={loading}
                        >
                            {loading ? "Loading ..." : "Update"}
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => supabase.auth.signOut()}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
            <div className="card w-9/12 bg-base-100 shadow-xl items-center">
                {/* <button onClick={handleHistory}>HIT</button> */}
                <PromptHistory props={entries} />
            </div>
        </div>
    );
}
