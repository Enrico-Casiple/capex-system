import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import React from "react"

interface ImportUpdateProps {
  importUpdateFormComponent: (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
}

const ImportUpdate = ({ importUpdateFormComponent }: ImportUpdateProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
        <Upload className="h-4 w-4" />
        Import & Update
      </Button>
      <CustomDialog
        open={isOpen}
        setOpen={setIsOpen}
        title={`Import & Update Data`}
        description={`This is a dialog for importing and updating data. You can upload a file or paste data to import.`}
      >
        {importUpdateFormComponent(isOpen, setIsOpen)}
      </CustomDialog>
    </React.Fragment>
  )
}

export default ImportUpdate
