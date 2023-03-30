import React from 'react'
import { useRouter } from 'next/router'

function Page() {
    const router = useRouter()
    return (
        <>
            {/* a div that is placed in the middle of the screen using tailwind */}
            <div className="flex items-center justify-center h-screen">
                <button onClick={() => { router.push('/creator') }} className="btn btn-primary">Dashboard</button>
            </div>


        </>
    )
}

export default Page