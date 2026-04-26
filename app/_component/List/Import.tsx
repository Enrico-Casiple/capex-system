import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import React from "react"

interface ImportProps {
  importFormComponent: (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
}

const Import = ({ importFormComponent }: ImportProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
        <Upload className="h-4 w-4" />
        Import & Create
      </Button>
      <CustomDialog
        open={isOpen}
        setOpen={setIsOpen}
        title={`Import Data`}
        description={`This is a dialog for importing data. You can upload a file or paste data to import.`}
      >
        {importFormComponent(isOpen, setIsOpen)}
      </CustomDialog>
    </React.Fragment>
  )
}

export default Import
