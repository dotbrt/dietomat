import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SupabaseAuth = ({ setUser }) => {
    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        // Cleanup
        return () => {
            authListener.unsubscribe();
        };
    }, [setUser]);

    const handleLogin = async (email, password) => {
        const { user, error } = await supabase.auth.signIn({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        setUser(user);
        router.push("/creator");
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <div>
            {session ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin(
                            e.target.email.value,
                            e.target.password.value
                        );
                    }}
                >
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default SupabaseAuth;
