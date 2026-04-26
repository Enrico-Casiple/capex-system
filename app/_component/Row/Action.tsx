import { useListContext } from '@/app/_context/ListContext/ListProvider';
import useToast from '@/app/_hooks/useToast';
import CustomDrawer from '@/components/custom/CusotmDrawer';
import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Archive, ArchiveRestore, Copy, Edit, EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import RoleGate from '../RoleGate/RoleGate';
import ArchiveOne from './Archive';
import RemoveOne from './RemoveOne';
import RestoreOne from './RestoreOne';

export type ActionType = 'view' | 'edit' | 'duplicate' | 'archive' | 'restore' | 'delete' | 'none'; // none -> create
export type PopupType = 'dialog' | 'drawer' | 'none';

interface ActionState {
  id: string | null;
  actionType: ActionType;
  popupType: PopupType;
}

type ActionProps = {
  rowId: string | null;
  component: (
    rowid: string | null,
    actionType: ActionType,
    popupType: PopupType,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => React.ReactNode;
};

const Action = ({ rowId, component }: ActionProps) => {
  const { active, modelName } = useListContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<ActionState | null>(null);
  const toast = useToast();

  const handleAction = (actionType: ActionType, popupType: PopupType = 'none') => {
    const actionState: ActionState = {
      id: rowId ?? null,
      actionType,
      popupType,
    };

    setCurrentAction(actionState);

    switch (popupType) {
      case 'drawer':
        setDrawerOpen(true);
        break;
      case 'dialog':
        setDialogOpen(true);
        break;
      case 'none':
        toast.error({
          message: `Action: ${actionType} executed`,
          description: `No popup for this action. ID: ${rowId}`,
        });
        break;
    }
  };

  const getActionDetails = (actionType: ActionType) => {
    const titles: Record<ActionType, string> = {
      view: `View ${modelName} Details`,
      edit: `Edit ${modelName} Information`,
      duplicate: `Duplicate ${modelName}`,
      archive: `Archive ${modelName}`,
      restore: `Restore ${modelName}`,
      delete: `Delete ${modelName}`,
      none: 'Action',
    };

    const descriptions: Record<ActionType, string> = {
      view: `Review the complete information for this ${modelName.toLowerCase()}.`,
      edit: `Update ${modelName.toLowerCase()} information, settings, and permissions.`,
      duplicate: `Create a copy of this ${modelName.toLowerCase()} with new details.`,
      archive:
        `Are you sure? This ${modelName.toLowerCase()} will be moved to archived records and won't be active.`,
      restore: `Are you sure? This ${modelName.toLowerCase()} will return to active records.`,
      delete: `This action is permanent and cannot be undone. All associated data will be deleted.`,
      none: `Perform an action on this ${modelName.toLowerCase()}.`,
    };

    return {
      title: titles[actionType] || 'Action',
      description: descriptions[actionType] || 'Perform an action.',
    };
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

        <DropdownMenuContent
          align="end"
          className="w-42.5"
          style={{
            width: '170px',
            overflow: 'hidden',
          }}
        >
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {active && (
            <React.Fragment>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
                resource={[`${modelName.toLowerCase()}`, "*"]}
                action={['read', '*']}
              >
                <DropdownMenuItem
                  onSelect={() => handleAction('view', 'drawer')}
                  className="cursor-pointer group"
                >
                  <EyeIcon className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span>View Details</span>
                </DropdownMenuItem>

              </RoleGate>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
                resource={[`${modelName.toLowerCase()}`, "*"]}
                action={['update', '*']}
              >
                <DropdownMenuItem
                  onSelect={() => handleAction('edit', 'drawer')}
                  className="cursor-pointer group"
                >
                  <Edit className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </RoleGate>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
                resource={[`${modelName.toLowerCase()}`, "*"]}
                action={['duplicate', '*']}
              >

                <DropdownMenuItem
                  onSelect={() => handleAction('duplicate', 'drawer')}
                  className="cursor-pointer group"
                >
                  <Copy className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
              </RoleGate>
            </React.Fragment>
          )}

          {active ? (
            <RoleGate
              module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
              resource={[`${modelName.toLowerCase()}`, "*"]}
              action={['archive', '*']}
            >
              <DropdownMenuItem
                onSelect={() => handleAction('archive', 'dialog')}
                className="cursor-pointer group group-hover:text-foreground transition-colors"
              >
                <Archive className="h-4 w-4 mr-3" />
                <span>Archive</span>
              </DropdownMenuItem>
            </RoleGate>
          ) : (
            <>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
                resource={[`${modelName.toLowerCase()}`, "*"]}
                action={['restore', '*']}
              >

                <DropdownMenuItem
                  onSelect={() => handleAction('restore', 'dialog')}
                  className="cursor-pointer group group-hover:text-foreground transition-colors"
                >
                  <ArchiveRestore className="h-4 w-4 mr-3" />
                  <span>Restore</span>
                </DropdownMenuItem>
              </RoleGate>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
                resource={[`${modelName.toLowerCase()}`, "*"]}
                action={['delete', '*']}
              >
                <DropdownMenuItem
                  onSelect={() => handleAction('delete', 'dialog')}
                  className="cursor-pointer group group-hover:text-foreground transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </RoleGate>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {currentAction?.popupType === 'drawer' && (
        <CustomDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          title={getActionDetails(currentAction.actionType).title}
          description={getActionDetails(currentAction.actionType).description}
        >
          {drawerOpen &&
            component(
              currentAction.id ?? null,
              currentAction.actionType,
              currentAction.popupType,
              drawerOpen,
              setDrawerOpen,
            )}
        </CustomDrawer>
      )}

      {currentAction?.popupType === 'dialog' && (
        <CustomDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          title={getActionDetails(currentAction.actionType).title}
          description={getActionDetails(currentAction.actionType).description}
        >
          {currentAction.actionType === 'archive' && (
            <ArchiveOne rowId={currentAction.id ?? null} setDialogOpen={setDialogOpen} />
          )}
          {currentAction.actionType === 'restore' && (
            <RestoreOne rowId={currentAction.id ?? null} setDialogOpen={setDialogOpen} />
          )}
          {currentAction.actionType === 'delete' && (
            <RemoveOne rowId={currentAction.id ?? null} setDialogOpen={setDialogOpen} />
          )}
        </CustomDialog>
      )}
    </React.Fragment>
  );
};

export default Action;
