"use client"
import { useRouter} from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function SignoutButton() {
    const router=useRouter()
    const supabase=createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const handleSignOut=async()=>{
        const{error} = await supabase.auth.signOut()
        if (error){
          console.log(error)
        }else{
            router.refresh()
        }
    }

  return (
    <button onClick={handleSignOut} className="bg-slate-200 p-1 rounded cursor-pointer">Sign out</button>
  )
}