import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DataContextProvider } from './context/data-context';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import Layout from './components/Layout'


function App({ Component, pageProps }: AppProps) {
    const [supabase] = useState(() => createBrowserSupabaseClient())
    return (
        <DataContextProvider>
            <SessionContextProvider
                supabaseClient={supabase}
                initialSession={pageProps.initialSession}
            >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionContextProvider >
        </DataContextProvider>
    );
}

export default App;