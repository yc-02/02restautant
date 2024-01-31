"use client"
import { useForm } from "react-hook-form"

import { FormSchema } from "./formSchema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { CalendarIcon } from "@radix-ui/react-icons"
import { add, format, formatDate } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Input } from "@/components/ui/input"






export default function ReserveForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)

   }
   const getTimes=()=>{
    const date=new Date()
    const formattedDate = date.toLocaleDateString()
    const beginning = add(formattedDate,{hours:12})
    const end = add(formattedDate,{hours:22})
    const times=[]
    for(let i=beginning;i<end;i=add(i,{minutes:30})){
      times.push(i)
    }
    return times
   }
 const times= getTimes()

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
                       date < new Date()
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
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                 <FormControl>
                   <SelectTrigger className="w-[240px]">
                     <SelectValue placeholder="Select a time"/>
                   </SelectTrigger>
                 </FormControl>
                 <SelectContent>
                 {times?.map((time,i)=>(
               <div key={i}>
                <SelectItem value={formatDate(time,"kk:mm")}>{formatDate(time,"kk:mm")}</SelectItem>
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
               <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                 <Input placeholder="First name" {...field}/>
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
                <Input onChange={field.onChange} placeholder="Last name"/>
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
                   <Input onChange={field.onChange} placeholder="Phone number"/>
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
                   <Input onChange={field.onChange} placeholder="Email"/>
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
