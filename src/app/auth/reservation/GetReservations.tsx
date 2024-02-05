"use client"

import { useState,useEffect, useTransition, SetStateAction, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { deleteReservation } from './DeleteReservation'
interface reserveData{
  date: string
  email: string
  first_name: string
  id: string
  last_name: string
  party: string
  phone: string
  time: string
}

export default function GetReservations() {
const [isPending,startTransition] =useTransition()
//get operation hours from supabase to auth users 
const [reservations,setReservations]=useState<reserveData[]>([])

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    const supabase=createClient()
  
      const { data, error } = await supabase
        .from("reservations")
        .select()
        .order('date', { ascending:true })
        .order('time', { ascending: true });
      if (error) throw error;
      if (data != null) {
        setReservations(data); 
      }
     if(error) {
      alert(error)
    }
    
  }
//filter and search
  // const [filteredData, setFilteredData] = useState<reserveData[]>([]);
  const [searchData, setSearchData]=useState("")
  const [filterOption, setFilterOption] = useState('all')


//handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  }
  
  const handleFilterChange=(e:React.ChangeEvent<HTMLSelectElement> )=>{
    setFilterOption(e.target.value)
  }


   const filterData = (array:reserveData[]) => {
     return array.filter((el) => {
       const searchTermLower = searchData.toLowerCase();
       // Check if any field contains the search term
       const matchesSearchTerm = Object.values(el).some((value) => {
         if (typeof value === 'string') {
           return value.toLowerCase().includes(searchTermLower);
         }
         return false;
       });
       // Check if the date matches the selected filter option
       const matchesFilterOption = filterOption === 'all' || el.date === filterOption
       return matchesSearchTerm && matchesFilterOption;
     });
   };
  
  
  

  const filtered = filterData(reservations);


    const today =new Date().toLocaleDateString()
    console.log(today)
    
  return(
  <div>
      <input type="text" placeholder="Search" onChange={handleSearchChange} />
      <select onChange={handleFilterChange} value={filterOption}>
      <option value="all">All</option>
      <option value={today}>Today</option>
    </select>
      {filtered.map((item) => (
      <div key={item.id} className='p-2'>
      <div  className='inline-flex justify-between gap-5 my-5 text-wrap border-b-2'>
      <p className='w-32'>{item.first_name},{item.last_name}</p>
      <p className='w-32'>{item.date}</p>
      <p className='w-32'>{item.time}</p>
      <p className='w-32'>{item.party}</p>
      <p className='w-32'>{item.phone}</p>
      <p className='w-40'>{item.email}</p>
      <button className='bg-slate-700 rounded-xl p-1 ml-5' onClick={()=>startTransition(()=>deleteReservation(item.id))}
              disabled={isPending}>
                {isPending && (<span className='text-slate-50'>Deleting....</span>)} 
                {!isPending && (<span className='text-slate-50'>Delete</span> )}</button>
      </div>
      </div>
        ))}

  </div>
  
  )
  }
 