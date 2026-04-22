import { Spinner } from '@/app/_component/Spinner';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import useMutationActions from '@/app/_hooks/useBulkActions';
import useToast from '@/app/_hooks/useToast';
import CustomDialog from '@/components/custom/CustomDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Archive, RotateCcw, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import RoleGate from '../RoleGate/RoleGate';

type ListBulkActionProps = {
  newBulkAction: React.ReactNode[];
};

const ListBulkAction = (props: ListBulkActionProps) => {
  const { active, modelGQL, model, table, modelName } = useListContext();
  const [isArchiveOpen, setIsArchiveOpen] = React.useState(false);
  const [isRestoreOpen, setIsRestoreOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const session = useSession();
  const toast = useToast();
  const { execute: executeArchive, executing: executingArchive } = useMutationActions({
    mutationGQL: modelGQL[model].archiveMany,
    setOpen: setIsArchiveOpen,
    successMessage: 'Records archived successfully',
    successDescription: `The selected records have been archived. You can view them in the archive section.`,
    errorMessage: 'Failed to archive records',
    errorDescription: `An error occurred while archiving the selected records. Please try again.`,
  });
  const { execute: executeRestore, executing: executingRestore } = useMutationActions({
    mutationGQL: modelGQL[model].restoreMany,
    setOpen: setIsRestoreOpen,
    successMessage: 'Records restored successfully',
    successDescription: `The selected records have been restored. You can view them in the main view.`,
    errorMessage: 'Failed to restore records',
    errorDescription: `An error occurred while restoring the selected records. Please try again.`,
  });

  const { execute: executeDelete, executing: executingDelete } = useMutationActions({
    mutationGQL: modelGQL[model].removeMany,
    setOpen: setIsDeleteOpen,
    successMessage: 'Records deleted successfully',
    successDescription: `The selected records have been deleted.`,
    errorMessage: 'Failed to delete records',
    errorDescription: `An error occurred while deleting the selected records. Please try again.`,
  });

  if (!session.data?.user) {
    return (
      <div className="flex flex-col h-screen">
        <Spinner />
      </div>
    );
  }

  const handleAction = async (actionType: 'archive' | 'restore' | 'delete') => {
    const selectedIds = table.getSelectedRowModel().flatRows.map((row) => row.original.id);
    if (selectedIds.length === 0) {
      toast.error({
        message: 'No records selected',
        description: 'Please select at least one record to perform this action.',
      });
      return;
    }

    try {
      switch (actionType) {
        case 'archive':
          await executeArchive({
            variables: { ids: selectedIds, currentUserId: session.data?.user?.id },
          });
          table.setRowSelection({});
          // Wait for mutation to complete, then change active state
          // setTimeout(() => setActive(true), 200);
          break;
        case 'restore':
          await executeRestore({
            variables: { ids: selectedIds, currentUserId: session.data?.user?.id },
          });
          table.setRowSelection({});
          // setTimeout(() => setActive(true), 200);
          break;
        case 'delete':
          await executeDelete({
            variables: { ids: selectedIds, currentUserId: session.data?.user?.id },
          });
          table.setRowSelection({});
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  return (
    <Card className="p-3 bg-muted/50">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Bulk Actions:</span>
        <div className="flex items-center gap-1">
          {active ? (
            <React.Fragment>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
                resource={[`${modelName.toLowerCase()}`, '*']}
                action={['bulk_archive', '*']}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 h-8 px-3"
                  onClick={() => setIsArchiveOpen(true)}
                >
                  <Archive className="h-3.5 w-3.5" />
                  Archive
                </Button>
              </RoleGate>
              {props.newBulkAction}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
                resource={[`${modelName.toLowerCase()}`, '*']}
                action={['bulk_restore', '*']}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 h-8 px-3"
                  onClick={() => setIsRestoreOpen(true)}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restore
                </Button>
              </RoleGate>
              <RoleGate
                module={[`${modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
                resource={[`${modelName.toLowerCase()}`, '*']}
                action={['bulk_delete', '*']}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 h-8 px-3"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </RoleGate>
            </React.Fragment>
          )}
        </div>
      </div>
      {/* Archive Confirmation Dialogs */}
      <CustomDialog
        open={isArchiveOpen}
        setOpen={setIsArchiveOpen}
        title={`Are you sure you want to archive these records?`}
        description={`Archiving will hide the records from the main view but they can be restored later.`}
      >
        <div className="flex justify-end gap-2">
          {!executingArchive && (
            <Button variant="outline" type="button" onClick={() => setIsArchiveOpen(false)}>
              Cancel
            </Button>
          )}
          <Button
            variant="default"
            type="button"
            onClick={() => handleAction('archive')}
            disabled={executingArchive}
          >
            {executingArchive ? 'Loading' : 'Confirm'}
          </Button>
        </div>
      </CustomDialog>
      {/* Restore Confirmation Dialogs */}
      <CustomDialog
        open={isRestoreOpen}
        setOpen={setIsRestoreOpen}
        title={`Are you sure you want to restore these records?`}
        description={`Restoring will make the records visible in the main view.`}
      >
        <div className="flex justify-end gap-2">
          {!executingRestore && (
            <Button variant="outline" type="button" onClick={() => setIsRestoreOpen(false)}>
              Cancel
            </Button>
          )}
          <Button
            variant="default"
            type="button"
            onClick={() => handleAction('restore')}
            disabled={executingRestore}
          >
            {executingRestore ? 'Loading' : 'Confirm'}
          </Button>
        </div>
      </CustomDialog>
      {/* Delete Confirmation Dialogs */}
      <CustomDialog
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        title={`Are you sure you want to delete these records?`}
        description={`Deleting will permanently remove the records from the system.`}
      >
        <div className="flex justify-end gap-2">
          {!executingDelete && (
            <Button variant="outline" type="button" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
          )}
          <Button
            variant="default"
            type="button"
            onClick={() => handleAction('delete')}
            disabled={executingDelete}
          >
            {executingDelete ? 'Loading' : 'Confirm'}
          </Button>
        </div>
      </CustomDialog>
    </Card>
  );
};

export default ListBulkAction;
