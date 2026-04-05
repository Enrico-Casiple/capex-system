import { Spinner, useListContext } from '@/app/_context/ListContext/ListProvider';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import React from 'react'

type RestoreOneProps = {
  rowId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestoreOne = (props: RestoreOneProps) => {
  const session = useSession();
  const {modelGQL, model, returnQuery} = useListContext();
    const {execute: executeRestore, executing: executingRestore} = useMutationActions({
    mutationGQL: modelGQL[model].restore,
    setOpen: props.setDialogOpen,
    successMessage: "Records restored successfully",
    successDescription: `The selected records have been restored. You can view them in the active section.`,
    errorMessage: "Failed to restore records",
    errorDescription: `An error occurred while restoring the selected records. Please try again.`,
  })

  if(!session.data?.user) {
    return <div className='flex flex-col h-screen'><Spinner /></div>;
  }

  const handleAction = async () => {
     await executeRestore({ variables: { id: props.rowId, currentUserId: session.data?.user?.id } });
     return returnQuery.refetch();
  }
  return (
    <div className="flex justify-end gap-2">
      {
        !executingRestore && (
          <Button variant="outline" type='button' onClick={() => props.setDialogOpen(false)}>Cancel</Button>
        )
      }
      <Button variant="default" type='button' onClick={() => handleAction()} disabled={executingRestore}>
        {executingRestore ? 'Loading' : 'Confirm'}
      </Button>
    </div>
  )
}

export default RestoreOne