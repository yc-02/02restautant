import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import ReserveForm from "./ReserveForm"

export function PopoverReserve() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Make a reservation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
       <ReserveForm/>
       </AlertDialogContent>
    </AlertDialog>
  )
}
