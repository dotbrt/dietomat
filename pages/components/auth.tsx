

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
// import Account from '../Account'

const Home = () => {
    const session = useSession()
    const supabase = useSupabaseClient()

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? (
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="light" />
            ) : (
                // <Account props={session} />
                <p></p>
            )}
        </div>
    )
}

export default Home