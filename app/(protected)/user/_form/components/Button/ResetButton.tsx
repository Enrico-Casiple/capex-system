import ProtectedButton from '@/app/_component/RoleGate/ProtectedButton';
import { useListContext } from '@/app/_context/ListContext/ListProvider'
import useMutationActions from '@/app/_hooks/useBulkActions';
import { modelGQL } from '@/lib/api/crud.gql';
import { KeyIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react'

type ResetButtonProps = {
  isViewMode: boolean;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const modelAPI = modelGQL;
const ResetButton = ({ isViewMode, id, setOpen }: ResetButtonProps) => {
  const { modelName, model } = useListContext();
  const session = useSession();

  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: modelAPI[model].update,
    setOpen: setOpen,
    successMessage: 'Reset Password Success',
    successDescription: `The user's password has been reset successfully. Please inform the user to check their email for the new password details.`,
    errorMessage: 'Reset Password Failed',
    errorDescription: `An error occurred while resetting the user's password. Please try again or contact support if the issue persists.`,
  });

  const handleToReset = () => { }

  return (
    <ProtectedButton
      modelName={modelName}
      action="user-reset-password"
      buttonProps={{
        type: "button",
        size: "sm",
        onClick: handleToReset,
        className: `gap-1.5 ${isViewMode ? "hidden" : ""}`,
        title: `Reset Password`,
      }}
      icon={KeyIcon}
      buttonName={`${(executingCreate) ? "Resetting..." : "Reset Password"}`}
    />
  )
}

export default ResetButton