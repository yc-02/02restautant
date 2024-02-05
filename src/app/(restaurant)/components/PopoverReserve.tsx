import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import ReserveTimeOptions from "./ReserveTimeOptions"


export function PopoverReserve() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Make a reservation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
       <ReserveTimeOptions/>
       </AlertDialogContent>
    </AlertDialog>
  )
}
