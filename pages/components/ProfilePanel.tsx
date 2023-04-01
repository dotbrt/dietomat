import React from 'react'
import Avatar from './Avatar';

function ProfilePanel({ user, session, username, setUsername, avatar_url, setAvatarUrl, updateProfile, loading }) {
    return (
        <div className="card sm:w-9/12 md:w-3/12 bg-base-100 shadow-xl items-center">
            <div>
                <div className="avatar m-10">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {user && <Avatar
                            uid={session?.user.id}
                            url={avatar_url}
                            size={150}
                            onUpload={(url) => {
                                setAvatarUrl(url);
                                updateProfile({ username, avatar_url: url });
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
                            updateProfile({ username, avatar_url })
                        }
                        disabled={loading}
                    >
                        {loading ? "Loading ..." : "Update"}
                    </button>
                    {/* <button
                        className="btn btn-secondary"
                        onClick={() => supabase.auth.signOut()}
                    >
                        Sign Out
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default ProfilePanel