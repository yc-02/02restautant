import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import Link from 'next/link'
import SignoutButton from './signoutButton'

export default async function AuthNav() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.auth.getUser()

  return (
    <div className='flex shadow justify-between p-3 items-center'>
    <p>Hello, {data?.user?.email}</p>
    <div className='flex gap-5'>
    <Link href="/auth" className="bg-slate-200 p-1 rounded cursor-pointer">Reservations</Link>
    <Link href='/auth/operation' className="bg-slate-200 p-1 rounded cursor-pointer">Hours of Operation</Link>
    <SignoutButton/>
    </div>
    </div>
  )
}
