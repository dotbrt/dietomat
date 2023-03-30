"use client"
import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import avatar from './avatar.jpg'
import { useRouter } from "next/navigation";
import { useState } from 'react';
// import { useAuth } from "pages/api/AuthContext";

export default function Navbar() {
    // const { user, logOut } = useAuth();
    const router = useRouter();
    const [theme, setTheme] = useState('synthwave');
    // const handleLogout = async () => {
    //     try {
    //         await logOut();
    //         router.push("/");
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href='/' className="btn btn-ghost normal-case text-xl font-outfit">FounderAI</a>
            </div>
            {/* <div>
                <div className="dropdown">
                    <label tabIndex={0} className="btn m-1">Theme select</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>synthwave</a></li>
                        <li><a>dracula</a></li>
                    </ul>
                </div>
            </div> */}
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {/* <Image src={avatar} width={10} height={10} alt='avatar' /> */}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>Settings</li>
                        <li></li>
                        {/* <li>{!user ? <Link href="/auth/login">Sign In</Link> : <a onClick={handleLogout}>Logout</a>}</li> */}
                        {/* {!user && <li><Link href="/auth/signup">Register</Link></li>} */}
                    </ul>
                </div>
            </div>
        </div >
    )
}