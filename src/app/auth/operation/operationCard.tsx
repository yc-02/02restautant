
import { Card,CardHeader,CardFooter,CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import {addMinutes,format,set} from 'date-fns';
import { createBrowserClient } from '@supabase/ssr';
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

async function updateTime() {
  const supabase=createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      const { data, error } = await supabase
          .from("store_time")
          .update({
            open_time:open_time,
            close_time:close_time
          })
          .eq("id",opData.id)
      
      if (error){
        throw new Error(error.message)
      }else{
        redirect('/auth/operation')
      }

  }

console.log(opData)

let time: any[]=[]
const open = set(new Date(),{hours:3,minutes:0})
const close = set(new Date(),{hours:23,minutes:0})
for (let i = open; i < close; i = addMinutes(i, 30)) {
 time.push(i);}
 
 console.log(opData)
 return(
 <div>
     {edit==false?
        <Card className=" hover:bg-slate-50">
        <CardHeader>
          <CardTitle>Day: {opData.name}</CardTitle>
          <CardTitle>Day of Week: {opData.dayofweek}</CardTitle>
          <CardTitle>Open: {opData.open_time}</CardTitle>
          <CardTitle>close:{opData.close_time}</CardTitle>
        </CardHeader>
        <CardFooter>
        <button onClick={()=>setEdit(true)} className='bg-slate-300 rounded p-1'>Edit</button>
        </CardFooter>
        </Card>:
        <Card>
        <form className='flex flex-col gap-2 p-2' action={updateTime}>
            <label>Name: <input type="text" name='name' defaultValue={opData.name}/></label>
            <label>Day of Week: <input type="text" name='dayofweek' defaultValue={opData.dayofweek}/></label>
            <label htmlFor="open_time">
              Open Time:
              <select name="open_time" defaultValue={opData.open_time}
                            onChange={(e) => setOpenTime(e.target.value)}>
              {time.map((t,i)=>
                <option value={format(t,'kk:mm')} key={i}>{format(t,'kk:mm')}</option>
                )}
              </select>
            </label>
            <label htmlFor="close_time">
              Close Time:
              <select name="close_time" defaultValue={opData.close_time}
                            onChange={(e) => setCloseTime(e.target.value)}>
              {time.map((t,i)=>
                <option value={format(t,'kk:mm')} key={i}>{format(t,'kk:mm')}</option>
                )}
              </select>
            </label>
            <div className='flex justify-between'>
            <button onClick={()=>setEdit(false)} className='bg-slate-300 rounded p-1'>Back</button>
            <button type='submit' className='bg-slate-300 rounded p-1'>Update</button>
            </div>
        </form>
        </Card>}
</div>
)
}

export default OpCard;