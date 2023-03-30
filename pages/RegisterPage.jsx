import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SupabaseRegister from "./components/SupabaseRegister";

export default function RegisterPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    return (
        <div>
            <h1>Register</h1>
            <SupabaseRegister setUser={setUser} />
            {user && <p>Registered as {user.email}</p>}
        </div>
    );
}
