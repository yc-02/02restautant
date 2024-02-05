"use client"
import { useRouter} from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignoutButton() {
    const router=useRouter()
    const supabase=createClient()
    const handleSignOut=async()=>{
        const{error} = await supabase.auth.signOut()
        if (error){
          console.log(error)
        }else{
            router.refresh()
        }
    }

  return (
    <button onClick={handleSignOut} className="bg-slate-50 text-slate-800 rounded-xl p-1 cursor-pointer">Sign out</button>
  )
}