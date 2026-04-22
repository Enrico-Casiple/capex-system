import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { Spinner } from '@/app/_component/Spinner';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import React from 'react';

type RemoveOneProps = {
  rowId: string | null;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemoveOne = (props: RemoveOneProps) => {
  const session = useSession();
  const {modelGQL, model, returnQuery} = useListContext();
    const {execute: executeRemove, executing: executingRemove} = useMutationActions({
    mutationGQL: modelGQL[model].remove,
    setOpen: props.setDialogOpen,
    successMessage: "Records removed successfully",
    successDescription: `The selected records have been removed.`,
    errorMessage: "Failed to remove records",
    errorDescription: `An error occurred while removing the selected records. Please try again.`,
  })

  if(!session.data?.user) {
    return <div className='flex flex-col h-screen'><Spinner /></div>;
  }

  const handleAction = async () => {
     await executeRemove({ variables: { id: props.rowId, currentUserId: session.data?.user?.id } });
    //  setActive(true); // Set active to false to hide the removed record from the main view
     return returnQuery.refetch();
  }
  return (
    <div className="flex justify-end gap-2">
      {
        !executingRemove && (
          <Button variant="outline" type='button' onClick={() => props.setDialogOpen(false)}>Cancel</Button>
        )
      }
      <Button variant="default" type='button' onClick={() => handleAction()} disabled={executingRemove}>
        {executingRemove ? 'Loading' : 'Confirm'}
      </Button>
    </div>
  )
}

export default RemoveOne
