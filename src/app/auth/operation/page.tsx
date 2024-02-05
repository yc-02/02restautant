import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import OperatingHours from './OperatingHours'

export default async function OperationPage() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
  
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      return redirect('/auth/login')
    }

    return(
        <div>
            <OperatingHours/>
        </div>

    )
}