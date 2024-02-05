"use client"

import { useState,useEffect } from 'react';
import OpCard from './OperationForm';
import { createClient } from '@/utils/supabase/client';

interface StoreData{
  close_time: string;
  created_at: string;
  dayofweek: string;
  id: number;
  name: string;
  open_time: string;
}


export default function OperatingHours() {


//get operation hours from supabase to operation and pass it to card
  const [ operation, setOperation] = useState<StoreData[]>([]);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    const supabase=createClient()
  
      const { data, error } = await supabase
        .from("store_time")
        .select()
        .order('dayofweek')
      if (error) throw error;
      if (data != null) {
        setOperation(data); 
      }
     if(error) {
      alert(error)
    }
    
  }





  return(

  <div>
    <div>
    {operation?.map((data) => 
    <OpCard key={data.id} operation={data} /> )}
  </div>
  </div>
  
  )
  }
 