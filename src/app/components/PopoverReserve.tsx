import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ReserveForm from "./ReserveForm"

export function PopoverReserve() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Make a reservation</Button>
      </PopoverTrigger>
      <PopoverContent>
       <ReserveForm/>
      </PopoverContent>
    </Popover>
  )
}
