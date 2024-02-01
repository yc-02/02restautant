
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export default async function PrivatePage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return redirect('/auth/login')
  }
  
  const {data:reserveData}=await supabase.from('reservations').select().order('date', { ascending:true }).order('time', { ascending: true });


const today = new Date().toLocaleDateString()
const todayData = reserveData?.filter((data) => data.date === today);
const notTodayData=reserveData?.filter((data)=>data.date>today)

console.log(todayData)
  return( 
  <div>
    <div>
    <p className='text-center pt-5 font-bold'>Reservations - Today</p>
    
    {todayData && todayData.length > 0 ? todayData.map((fd)=>
          <div className='grid md:grid-cols-3 gap-5 m-2'>
          <div key={fd.id} className='border b-2 p-2 rounded bg-pink-200'>
          <h1>Name: {fd.first_name} {fd.last_name}</h1>
          <p>Date: {fd.date}</p>
          <p>Time: {fd.time}</p>
          <p>Party Size: {fd.party}</p>
          <p>Phone: {fd.phone}</p>
          <p>email: {fd.email}</p>
         </div>
         </div>
      ):<p className='text-center my-5'>No Reservations today</p>}
    </div>
    <p className='text-center border-t-2 pt-5 font-bold'>Reservations - Others </p>
    <div className='grid md:grid-cols-3 gap-5 m-2'>
    {notTodayData?.map((data)=>
        <div key={data.id} className='border b-2 p-2 rounded bg-slate-200'>
        <h1>Name: {data.first_name} {data.last_name}</h1>
        <p>Date: {data.date}</p>
        <p>Time: {data.time}</p>
        <p>Party Size: {data.party}</p>
        <p>Phone: {data.phone}</p>
        <p>email: {data.email}</p>
       </div>
    )}
    </div>
  </div>
  )
}
