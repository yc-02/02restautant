"use client"
import { useForm } from "react-hook-form"

import { FormSchema } from "./formSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { CalendarIcon } from "@radix-ui/react-icons"
import { add, format, formatDate, getHours } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Database } from "../../../database.types"
import { useState,useEffect } from "react"




export default function ReserveForm() {
  const router =useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  
  const [times, setTimes] = useState<string[]>([]);
  let hour:any
  let minute:any
  const getTimes=(selectedDate: Date)=>{
    const today = new Date()
    if (selectedDate.toLocaleDateString() == today.toLocaleDateString()){
      const currenthour=today.getHours()
      const currentminutes =today.getMinutes()
      if (currentminutes>30){
        hour=currenthour+1
        minute=0
      }else{
        hour=currenthour
        minute=30
      }
    }else{
      hour=12
      minute=0
    }

    console.log(hour)
    console.log(selectedDate)
    const beginning = add(selectedDate,{hours:hour,minutes:minute})
    const end = add(selectedDate,{hours:22,minutes:0})
    const times=[]
    for(let i=beginning;i<end;i=add(i,{minutes:30})){
      times.push(i)
    }
    setTimes(times.map((time) => formatDate(time, 'kk:mm')));
   }
   
   useEffect(() => {
    if (form.watch('date')) {
      getTimes(form.watch('date'));
    }
  }, [form.watch('date')]);

  const onSubmit =async (data: z.infer<typeof FormSchema>)=> {
    const supabase=createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    
    const {data:reserveData,error} = await supabase.from('reservations').insert(
      {
        date:data.date.toLocaleDateString(),
        time:data.time,
        party:data.party,
        first_name:data.firstname,
        last_name:data.lastname,
        phone:data.phone,
        email:data.email

      }).select()
      if (reserveData && reserveData.length > 0) {
        const firstReserveId = reserveData[0].id;
        console.log(firstReserveId);
        router.push(`/reserve/${firstReserveId}`)
      } else {
        console.log('No reservation data returned.');
      }

      if (error) {
        throw new Error(error.message)
      }

    }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
       <div className="flex flex-col items-center gap-2">
         <FormField
           control={form.control}
           name="date"
           render={({ field }) => (
             <FormItem>
               <Popover>
                 <PopoverTrigger asChild>
                   <FormControl>
                     <Button
                       variant={"outline"}
                       className={cn(
                         "w-[240px] pl-3 text-left font-normal",
                         !field.value && "text-muted-foreground"
                       )}
                     >
                       {field.value ? (
                         format(field.value, "PPP")
                       ) : (
                         <span>Pick a date</span>
                       )}
                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                     </Button>
                   </FormControl>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0" align="start">
                   <Calendar
                   
                     mode="single"
                     selected={field.value}
                     onSelect={field.onChange}
                     disabled={(date) =>
                       date < new Date('1/31/2024')

                     }
                     initialFocus
                   />
                 </PopoverContent>
               </Popover>
               <FormMessage />
             </FormItem>
           )}
         />
        <FormField
           control={form.control}
           name="time"
           render={({ field }) => (
             <FormItem>
               <Select onValueChange={field.onChange} defaultValue={field.value} name="time">
                 <FormControl>
                   <SelectTrigger className="w-[240px]">
                     <SelectValue placeholder="Select a time"/>
        </SelectTrigger>
                 </FormControl>
                 <SelectContent>
                 {times?.map((time,i)=>(
               <div key={i}>
                <SelectItem value={time}>{time}</SelectItem>
                </div>
    ))}
                 </SelectContent>
               </Select>
               <FormMessage/>
             </FormItem>
           )}/>
         <FormField
           control={form.control}
           name="party"
           render={({ field }) => (
             <FormItem>
               <Select onValueChange={field.onChange} defaultValue={field.value} name="party">
                 <FormControl>
                   <SelectTrigger className="w-[240px]">
                     <SelectValue placeholder="Party size"/>
                   </SelectTrigger>
                 </FormControl>
                 <SelectContent>
                   <SelectItem value="2 People">2 People</SelectItem>
                   <SelectItem value="3 People">3 People</SelectItem>
                   <SelectItem value="4 People">4 People</SelectItem>
                   <SelectItem value="5 People">5 People</SelectItem>
                   <SelectItem value="6 People">6 People</SelectItem>
                 </SelectContent>
               </Select>
               <FormMessage/>
             </FormItem>
           )}/>
         <FormField
           control={form.control}
           name="firstname"
           render={({ field }) => (
             <FormItem className="w-[240px]">
               <FormControl>
                 <Input onChange={field.onChange} placeholder="First name" name="firstname"/>
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="w-[240px]">
              <FormControl>
                <Input onChange={field.onChange} placeholder="Last name" name="lastname"/>
              </FormControl>
              <FormMessage />
             </FormItem>
                  )}
                 />
           <FormField
             control={form.control}
             name="phone"
             render={({ field }) => (
               <FormItem className="w-[240px]">
                 <FormControl>
                   <Input onChange={field.onChange} placeholder="Phone number" name="phone"/>
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           <FormField
             control={form.control}
             name="email"
             render={({ field }) => (
               <FormItem className="w-[240px]">
                 <FormControl>
                   <Input onChange={field.onChange} placeholder="Email" name="email"/>
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />
           <Button type="submit" className="bg-slate-500">Submit</Button>
       </div>
       </form>
     </Form>
  )
}
