
import { ImageSlider } from "@/app/components/ImageSlider"
import { PopoverReserve } from "@/app/components/PopoverReserve"


export default function menus() {

  return (
   <div>
   <div className="text-center my-10">
    <PopoverReserve/>
   </div>
   <h2 className="mb-5 text-center text-sm">For parties of seven or more, please email or call us. </h2>
   <ImageSlider/>
   <div>

   </div>

   </div>
  )
}
