import { useState } from "react";
import SupabaseAuth from "../components/SupabaseAuth";

export default function LoginPage() {
    const [user, setUser] = useState(null);

    return (
        <div>
            <h1>Login</h1>
            <SupabaseAuth setUser={setUser} />
            {user && <p>Logged in as {user.email}</p>}
        </div>
    );
}
