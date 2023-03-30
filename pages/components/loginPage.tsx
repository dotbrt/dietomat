import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import {
  ThemeSupa,
} from '@supabase/auth-ui-shared'
function LoginPage() {
  const user = useUser()
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="w-80 container mx-auto">
      <div className="row">
        <div className="col-6 flex flex-col items-center my-8">
          <h1 className="header">Generator diety</h1>
          <p className="">
            Podaj swoje dane i otrzymaj dopasowaną dietę
          </p>
        </div>
        <div className="col-6 auth-widget">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              className: {
                anchor: 'my-awesome-anchor',
                button: 'btn btn-primary',
                input: 'input input-bordered',
                label: 'label'
                //..
              },
            }}
            theme="light"
            providers={['google', 'facebook']}
            socialLayout='horizontal'
            magicLink={true}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Twój adres email',
                  password_label: 'Wybierz silne hasło',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage