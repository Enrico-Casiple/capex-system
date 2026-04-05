import { Spinner, useListContext } from '@/app/_context/ListContext/ListProvider';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import React from 'react'

type ArchiveOneProps = {
  rowId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArchiveOne = (props: ArchiveOneProps) => {
  const session = useSession();
  const {modelGQL, model, returnQuery} = useListContext();
    const {execute: executeArchive, executing: executingArchive} = useMutationActions({
    mutationGQL: modelGQL[model].archive,
    setOpen: props.setDialogOpen,
    successMessage: "Records archived successfully",
    successDescription: `The selected records have been archived. You can view them in the archive section.`,
    errorMessage: "Failed to archive records",
    errorDescription: `An error occurred while archiving the selected records. Please try again.`,
  })

  if(!session.data?.user) {
    return <div className='flex flex-col h-screen'><Spinner /></div>;
  }

  const handleAction = async () => {
     await executeArchive({ variables: { id: props.rowId, currentUserId: session.data?.user?.id } });
    //  setActive(false); // Set active to false to hide the archived record from the main view
     return returnQuery.refetch();
  }
  return (
    <div className="flex justify-end gap-2">
      {
        !executingArchive && (
          <Button variant="outline" type='button' onClick={() => props.setDialogOpen(false)}>Cancel</Button>
        )
      }
      <Button variant="default" type='button' onClick={() => handleAction()} disabled={executingArchive}>
        {executingArchive ? 'Loading' : 'Confirm'}
      </Button>
    </div>
  )
}

export default ArchiveOne