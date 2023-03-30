import {
    useSession,
    useUser,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import Image from "next/image";
import avatar from "/public/avatar.jpg";
export default function Navbar() {
    const session = useSession();
    const user = useUser();
    const supabase = useSupabaseClient();
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl" href="/">
                    Dietomat 🥕
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <Image
                                src={avatar}
                                width={80}
                                height={80}
                                alt="avatar"
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        {session ? (
                            <>
                                <li>
                                    <Link
                                        href="/Account"
                                        className="justify-between"
                                    >
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <a>Settings</a>
                                </li> */}
                                <li>
                                    <Link href="#" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
