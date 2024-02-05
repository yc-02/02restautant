"use client"

import { useForm} from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addMinutes,set } from "date-fns"
import { useEffect,useState } from "react"

import ReservationForm from "./ReserveForm"
import { FormTimeUtils } from "./FormTimeUtils"
import { FormSchema } from "./FormSchema"


interface TimeData{
  close_time: string;
  created_at: string;
  dayofweek: string;
  id: number;
  name: string;
  open_time: string;
}

const ReserveTimeOptions: React.FC = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })


    
  const [times, setTimes] = useState<TimeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timesData = await FormTimeUtils();
        setTimes(timesData);
        console.log('Fetched times:', timesData);

      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
    



//reservation times array
const[timeOption,setTimeOption]=useState<string[]>([])


  const getTimeOption=(selectedDate:Date)=>{
      let beginningHour;
      let endHour;
      let beginningMinutes;
      let endMinutes;
      times.forEach((time)=>{
        let day = time.dayofweek
        let open =time.open_time
        let close=time.close_time
      if (selectedDate.getDay().toString()==day){
         [beginningHour,beginningMinutes] = open.split(":"),
         [endHour,endMinutes]=close.split(":")
      }
  //customer cannot select any time before now
      const checktoday=selectedDate.toDateString()
       if (checktoday==new Date().toDateString()){
        beginningHour=new Date().getHours()
        beginningMinutes=new Date().getMinutes()
        if(beginningMinutes>30){
          beginningHour+=1
          beginningMinutes=0
        }else {
          beginningMinutes=30
        }
      }
    })
    const beginningOption =set(selectedDate,{hours:beginningHour ,minutes:beginningMinutes})
    const endOption=set(selectedDate,{hours:endHour,minutes:endMinutes})
  console.log(beginningOption)
  console.log(endOption)
    const options=[];
    for (let i=beginningOption;i<endOption;i=addMinutes(i,30)){
      options.push(i)
    }
    console.log(options)
    setTimeOption(options.map((time)=>time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })))
    }

  return (<div>
    <ReservationForm timeOption={timeOption} getTimeOption={getTimeOption}/>
  </div>)
}

export default ReserveTimeOptions