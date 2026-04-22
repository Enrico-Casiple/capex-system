import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { Button } from '@/components/ui/button'
import { Archive, RotateCcw } from 'lucide-react'
import React from 'react';
import RoleGate from '../RoleGate/RoleGate';

interface ListActionProps {
  importComponent: React.ReactNode;
  exportComponent: React.ReactNode;
}

const ListAction = ({ importComponent, exportComponent }: ListActionProps) => {
  const {active, setActive, modelName} = useListContext();
  return (
     <div className="flex items-center gap-2">
      {
        active && (
          <React.Fragment>
            <RoleGate
              module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
              resource={[`${modelName.toLowerCase()}`, "*"]}
              action={['bulk_create', '*', 'import'] }
              >
                {importComponent}
              </RoleGate>
            {/* <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button> */}
             <RoleGate
              module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
              resource={[`${modelName.toLowerCase()}`, "*"]}
              action={['export', '*']}
              >
                {exportComponent}
              </RoleGate>
           
          </React.Fragment>
        )
      }
        
        {
          active ? ( 
             <RoleGate
              module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
              resource={[`${modelName.toLowerCase()}`, "*"]}
              action={['archive', '*']}
              >
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setActive(false)}>
                  <Archive className="h-4 w-4" />
                  Archive
                </Button>
                
              </RoleGate>
          ) : ( 
            <RoleGate
              module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
              resource={[`${modelName.toLowerCase()}`, "*"]}
              action={['restore', '*']}
              >
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setActive(true)}>
                <RotateCcw className="h-4 w-4" />
                Restore
              </Button>
              </RoleGate>
          )
        }
      </div>
  )
}

export default ListAction