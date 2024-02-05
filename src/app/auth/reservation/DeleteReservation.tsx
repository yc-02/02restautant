import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";



export async function DeleteReservation(id:string){
    const supabase=createClient()
    console.log('Deleting reservation with ID:', id);
    const {error} = await supabase.from('reservations').delete().eq('id',id)
  
      if (error){
          throw new Error (error.message)
        }else{
            redirect('/auth/reservation')
        }
  }