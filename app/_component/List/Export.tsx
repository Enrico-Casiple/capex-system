import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import React from "react"

interface ExportProps {
  exportFormComponent: (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
}
const Export = ({ exportFormComponent }: ExportProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <React.Fragment>
     <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
        <Download className="h-4 w-4" />
        Export
     </Button>
      <CustomDialog 
        open={isOpen} 
        setOpen={setIsOpen}
        title={`Export Data`} 
        description={`This is a dialog for exporting data. You can choose the format and options for the export.`}
      >
        {exportFormComponent(isOpen, setIsOpen)}
      </CustomDialog>
    </React.Fragment>
  )
}

export default Export