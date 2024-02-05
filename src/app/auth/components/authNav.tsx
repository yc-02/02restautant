import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

import Link from 'next/link'
import SignoutButton from './signoutButton'


export default async function AuthNav() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.auth.getUser()

  return (
    <div className='flex shadow justify-between p-3 items-center bg-slate-700'>
    <p className='text-slate-50'>Hello, {data?.user?.email}</p>
    <div className='flex gap-5 items-baseline'>
    <Link href="/auth/reservation" className=" text-slate-50 cursor-pointer">Reservations</Link>
    <Link href='/auth/operation' className="text-slate-50 cursor-pointer">Operating hours</Link>
    <SignoutButton/>
    </div>
    </div>
  )
}
