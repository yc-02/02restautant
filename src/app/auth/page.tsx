import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export default async function AuthPage() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
  
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      return redirect('/auth/login')
    }

    return(
        <div>
            <p>Auth Home Page</p>
        </div>

    )
}