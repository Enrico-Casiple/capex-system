import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { Button } from '@/components/ui/button'
import { Archive, RotateCcw } from 'lucide-react'
import React from 'react';

interface ListActionProps {
  importComponent: React.ReactNode;
  exportComponent: React.ReactNode;
}

const ListAction = ({ importComponent, exportComponent }: ListActionProps) => {
  const {active, setActive} = useListContext();
  return (
     <div className="flex items-center gap-2">
      {
        active && (
          <React.Fragment>
            {importComponent}
            {/* <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button> */}
           {exportComponent}
           
          </React.Fragment>
        )
      }
        
        {
          active ? ( 
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setActive(false)}>
              <Archive className="h-4 w-4" />
              Archive
            </Button>
          ) : ( 
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setActive(true)}>
            <RotateCcw className="h-4 w-4" />
            Restore
          </Button>
          )
        }
      </div>
  )
}

export default ListAction