
import { Card,CardHeader,CardFooter,CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import {addMinutes,format,set,parse} from 'date-fns';
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


//edit operation time 
async function updateTime() {
  const supabase=createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
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
              {formattedTime.map((t,i)=>
                <option value={t} key={i}>{t}</option>
                )}
              </select>
            </label>
            <label htmlFor="close_time">
              Close Time:
              <select name="close_time" defaultValue={opData.close_time}
                            onChange={(e) => setCloseTime(e.target.value)}>
              {formattedTime.map((t,i)=>
                <option value={t} key={i}>{t}</option>
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