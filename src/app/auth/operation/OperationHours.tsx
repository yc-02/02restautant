"use client"

import { useState,useEffect } from 'react';
import OpCard from './operationCard';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '../../../../database.types';

interface StoreData{
  close_time: string;
  created_at: string;
  dayofweek: string;
  id: number;
  name: string;
  open_time: string;
}


export default function OperationHours() {

  const [ operation, setOperation] = useState<StoreData[]>([]);


  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    const supabase=createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  
      const { data, error } = await supabase
        .from("store_time")
        .select()
        .order('dayofweek')
      if (error) throw error;
      if (data != null) {
        setOperation(data); // [product1,product2,product3]
      }
     if(error) {
      alert(error)
    }
    
  }





  return(

  <div>
    <div className="grid md:grid-cols-2 gap-5 p-5" >
    {operation?.map((data) => 
    <OpCard key={data.id} operation={data} /> )}
  </div>
  </div>
  
  )
  }
 