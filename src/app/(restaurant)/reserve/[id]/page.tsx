import { createClient } from "@/utils/supabase/actions"
import { cookies } from "next/headers"



async function getReservation(id:string){
    const cookieStore = cookies()
    const supabase=createClient(cookieStore)

    const {data,error} = await supabase.from('reservations').select().eq('id',id).single()

    if (!data){
        throw new Error(error?.message)
    }
    return data
}

export default async function reservationDetials({params}:any){
        const data= await getReservation(params.id)
    
    

    return(
   
        <div className="grid md:grid-cols-2 content-center items-center">
        <div className="m-auto p-3 rounded w-72 flex flex-col gap-7">
        <h1 className="font-bold text-3xl">Hi,{data?.first_name}</h1>
        <p className="font-bold">Reservation Accepted</p>
        <p>Date: {data?.date}</p>
        <p>Time: {data?.time}</p>
        <p>Party size: {data?.party}</p>

        <p className="text-sm">Please call to modify or cancel.</p>
        </div>
        <div className="m-auto p-2">
        <p className="font-bold">02 Restaurant</p>
        <iframe className="w-72 h-60 rounded"src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.066200915601!2d-73.96816368872588!3d40.78255873317424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1706737299151!5m2!1sen!2sus" loading="lazy"></iframe>
        </div>
        </div>

    )
}