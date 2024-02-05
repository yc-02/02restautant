
import { useState } from 'react';
import {addMinutes,format,set,parse} from 'date-fns';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';



interface StoreData{
  close_time: string;
  created_at: string;
  dayofweek: string;
  id: number;
  name: string;
  open_time: string;
}

interface OpCardProps {
  operation: StoreData;
}


const OpCard: React.FC<OpCardProps> = ({ operation }) => {

const opData = operation
const [edit,setEdit]=useState(false)
const [open_time,setOpenTime]=useState(opData.open_time)
const [close_time,setCloseTime]=useState(opData.close_time)


//edit operation time 
async function updateTime() {
  const supabase=createClient()
//parse time back to 24 hour clock
    const opentime = open_time;
    const parsedOpenTime = parse(opentime, 'h:mm a', new Date());
    const insertOpenTime = format(parsedOpenTime, 'HH:mm').toString()
    const closetime = close_time;
    const parsedCloseTime = parse(closetime, 'h:mm a', new Date());
    const insertCloseTime = format(parsedCloseTime, 'HH:mm').toString()


      const { data, error } = await supabase
          .from("store_time")
          .update({
            open_time:insertOpenTime,
            close_time:insertCloseTime
          })
          .eq("id",opData.id)
      
      if (error){
        throw new Error(error.message)
      }else{
        redirect('/auth/operation')
      }

  }

 
 
let time: any[]=[]
const open = set(new Date(),{hours:3,minutes:0})
const close = set(new Date(),{hours:23,minutes:0})
for (let i = open; i < close; i = addMinutes(i, 30)) {
 time.push(i);}
const formattedTime = time.map((time)=>time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }))

 return(
 <div className='my-2 ml-10'>
     {edit==false?
     <div className='flex items-start gap-5'>
          <p className='w-36'>Day: {opData.name}</p>
          <p className='w-36'>Day of Week: {opData.dayofweek}</p>
          <p className='w-36'>Open: {opData.open_time}</p>
          <p className='w-36'>close:{opData.close_time}</p>
 
        <button onClick={()=>setEdit(true)} className='bg-slate-700 text-slate-50 rounded-xl p-1'>Edit</button>
      </div>:
        <div className='flex items-start gap-5'>
        <p className='w-36'>Day: {opData.name}</p>
        <p className='w-36'>Day of Week: {opData.dayofweek}</p>
        <form className='flex items-start' action={updateTime} >
            <label className='w-36' htmlFor="open_time">
              Open Time:
              <select name="open_time" defaultValue={opData.open_time}
                            onChange={(e) => setOpenTime(e.target.value)}>
              {formattedTime.map((t,i)=>
                <option value={t} key={i}>{t}</option>
                )}
              </select>
            </label>
            <label htmlFor="close_time" className='w-36'>
              Close Time:
              <select name="close_time" defaultValue={opData.close_time}
                            onChange={(e) => setCloseTime(e.target.value)}>
              {formattedTime.map((t,i)=>
                <option value={t} key={i}>{t}</option>
                )}
              </select>
            </label>
            <button onClick={()=>setEdit(false)} className='bg-slate-700 text-slate-50 rounded-xl p-1 mx-10'>Back</button>
            <button type='submit' className='bg-slate-700 text-slate-50 rounded-xl p-1'>Update</button>
        </form>
        </div>
       }
</div>
)
}

export default OpCard;