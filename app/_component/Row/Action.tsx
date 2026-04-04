import { useListContext } from '@/app/_context/ListContext/ListProvider';
import useToast from '@/app/_hooks/useToast';
import CustomDrawer from '@/components/custom/CusotmDrawer';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Archive,
  ArchiveRestore,
  Copy, 
  Edit, 
  EyeIcon, 
  MoreHorizontal, 
  Trash2 
} from 'lucide-react';
import React, { useState } from 'react';

type ActionType = 'view' | 'edit' | 'duplicate' | 'archive' | 'restore' | 'delete';
type PopupType = 'dialog' | 'drawer' | 'none';

interface ActionState {
  id: string;
  actionType: ActionType;
  popupType: PopupType;
}

type ActionProps = {
  rowId: string;
}

const Action = ({ rowId }: ActionProps) => {
  const { active } = useListContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionState | null>(null);
  const toast = useToast();

  const handleAction = (actionType: ActionType, popupType: PopupType = 'none') => {
    const actionState: ActionState = {
      id: rowId,
      actionType,
      popupType,
    };
    
    setCurrentAction(actionState);

    switch (popupType) {
      case 'drawer':
        setDrawerOpen(true);
        break;
      case 'dialog':
        // Implement dialog logic here
        alert(`Dialog for ${actionType} - ID: ${rowId}`);
        break;
      case 'none':
        toast.error({
            message: `Action: ${actionType} executed`,
            description: `No popup for this action. ID: ${rowId}`,
          }
        );
        break;
    }

  };


  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-muted transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-42.5" style={{
          width: "170px",
          overflow: "hidden"
        }}>
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem 
            onSelect={() => handleAction('view', 'drawer')}
            className="cursor-pointer group"
          >
            <EyeIcon className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>View Details</span>
          </DropdownMenuItem>

          {active && (
            <DropdownMenuItem 
              onSelect={() => handleAction('edit', 'drawer')}
              className="cursor-pointer group"
            >
              <Edit className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>Edit</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem 
            onSelect={() => handleAction('duplicate', 'drawer')}
            className="cursor-pointer group"
          >
            <Copy className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>Duplicate</span>
          </DropdownMenuItem>

          {active ? (
            <DropdownMenuItem 
              onSelect={() => handleAction('archive', 'dialog')}
              className="cursor-pointer group text-amber-600 focus:text-amber-600 focus:bg-amber-50"
            >
              <Archive className="h-4 w-4 mr-3" />
              <span>Archive</span>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem 
                onSelect={() => handleAction('restore', 'dialog')}
                className="cursor-pointer group text-blue-600 focus:text-blue-600 focus:bg-blue-50"
              >
                <ArchiveRestore className="h-4 w-4 mr-3" />
                <span>Restore</span>
              </DropdownMenuItem>

              <DropdownMenuItem 
                onSelect={() => handleAction('delete', 'dialog')}
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 group"
              >
                <Trash2 className="h-4 w-4 mr-3" />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {currentAction && (
        <CustomDrawer 
          open={drawerOpen} 
          setOpen={setDrawerOpen}
          title={`${currentAction.actionType.charAt(0).toUpperCase() + currentAction.actionType.slice(1)} - ID: ${currentAction.id}`} 
          description={`This is a ${currentAction.popupType} for ${currentAction.actionType} action.`}
        >
          {currentAction.actionType === 'view' && <div>Viewing details for ID: {currentAction.id}</div>}
          {currentAction.actionType === 'edit' && <div>Editing item with ID: {currentAction.id}</div>}
          {currentAction.actionType === 'duplicate' && <div>Duplicating item with ID: {currentAction.id}</div>}
        </CustomDrawer>
      )}
    </React.Fragment>
  );
};

export default Action;
