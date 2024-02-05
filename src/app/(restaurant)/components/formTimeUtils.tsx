import { createClient } from "@/utils/supabase/client";



export async function formTimeUtils() {
    
    //get all times from database

    const supabase=createClient()
    const{data,error}= await supabase.from('store_time').select()
    if (error) {
        throw new Error(error.message);
      }
      return data


}