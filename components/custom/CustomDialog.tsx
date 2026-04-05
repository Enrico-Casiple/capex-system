import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomDialogProps  {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  children: React.ReactNode;
}

const CustomDialog = (props: CustomDialogProps) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogContent  style={{
        maxWidth: '50vw',
      }}>
        <AlertDialogHeader className="relative p-6 pb-4">
          {
            props.open && (
              <AlertDialogCancel asChild>
                <Button
                  variant="link"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDialogCancel>
            )
          }
          <AlertDialogTitle className="text-xl pr-8">{props.title}</AlertDialogTitle>
          {
            props.description && (
              <AlertDialogDescription className="text-base">
                {props.description}
              </AlertDialogDescription>
            )
          }
        </AlertDialogHeader>
        <div className="px-6 pb-6">
          {props.children}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomDialog