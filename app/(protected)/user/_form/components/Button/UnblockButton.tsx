// import React from 'react'

// type Props = {}

// const UnblockButton = (props: Props) => {
//   return (
//     <div>UnblockButton</div>
//   )
// }

// export default UnblockButton
import ProtectedButton from '@/app/_component/RoleGate/ProtectedButton';
import { useListContext } from '@/app/_context/ListContext/ListProvider'
import useMutationActions from '@/app/_hooks/useBulkActions';
import useToast from '@/app/_hooks/useToast';
import { modelGQL } from '@/lib/api/crud.gql';
import { UserResponse } from '@/lib/generated/api/customHookAPI/graphql';
import { KeyIcon, LockKeyholeIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react'

type UnblockButtonProps = {
  isViewMode: boolean;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBlocked: boolean;
}

const modelAPI = modelGQL;


const UnblockButton = ({ isViewMode, id, setOpen, isBlocked }: UnblockButtonProps) => {
  const { modelName, model } = useListContext();
  const session = useSession();
  const toast = useToast();

  const { execute: executeUpdate, executing: executingUpdate, } = useMutationActions({
    mutationGQL: modelAPI[model].update,
    setOpen: setOpen,
    successMessage: 'Reset Password Success',
    successDescription: `The user's password has been reset successfully. Please inform the user to check their email for the new password details.`,
    errorMessage: 'Reset Password Failed',
    errorDescription: `An error occurred while resetting the user's password. Please try again or contact support if the issue persists.`,
  });

  const handleToBlocK = async () => {
    return await executeUpdate({
      variables: {
        id: id,
        data: {
          isActive: !isBlocked,
        },
        currentUserId: session.data?.user?.id || "",
      },
      onCompleted(data) {
        const result = data as unknown as { UserUpdate: UserResponse }

        console.log("🚀 ~ file: UnblockButton.tsx:78 ~ onCompleted ~ result:", result.UserUpdate)

        if (!result.UserUpdate.isSuccess) {
          toast.error({
            message: result.UserUpdate.code || "Error",
            description: result.UserUpdate.message || "An error occurred while updating the user's status. Please try again or contact support if the issue persists.",
          })
          return
        }

        toast.success({
          message: result.UserUpdate.code || "Success",
          description: result.UserUpdate.message || `The user's account has been ${isBlocked ? "unblocked" : "blocked"} successfully.`,
        })

        return result
      },
      onError(error) {
        toast.error({
          message: "Error",
          description: error.message || `An error occurred while updating the user's status. Please try again or contact support if the issue persists.`,
        })
      }
    })
  }
  const handleToUnBlocK = async () => {
    return await executeUpdate({
      variables: {
        id: id,
        data: {
          isActive: !isBlocked,
        },
        currentUserId: session.data?.user?.id || "",
      },
      onCompleted(data) {
        const result = data as unknown as { UserUpdate: UserResponse }

        if (!result.UserUpdate.isSuccess) {
          toast.error({
            message: result.UserUpdate.code || "Error",
            description: result.UserUpdate.message || "An error occurred while updating the user's status. Please try again or contact support if the issue persists.",
          })
          return
        }


        toast.success({
          message: result.UserUpdate.code || "Success",
          description: result.UserUpdate.message || `The user's account has been ${isBlocked ? "unblocked" : "blocked"} successfully.`,
        })

        return result
      },
      onError(error) {
        toast.error({
          message: "Error",
          description: error.message || `An error occurred while updating the user's status. Please try again or contact support if the issue persists.`,
        })
      }
    })
  }

  return (
    <div>
      {
        !isBlocked ? (
          <ProtectedButton
            modelName={modelName}
            action="user-unblock"
            buttonProps={{
              type: "button",
              size: "sm",
              onClick: handleToUnBlocK,
              className: `gap-1.5 ${isViewMode ? "hidden" : ""}`,
              title: `${isBlocked ? "Unblock" : "Block"} the user account`,
            }}
            icon={LockKeyholeIcon}
            buttonName={`${(executingUpdate) ? "UnBlocking..." : "Unblock"}`}
          />
        ) : (
          <ProtectedButton
            modelName={modelName}
            action="user-block"
            buttonProps={{
              type: "button",
              size: "sm",
              onClick: handleToBlocK,
              className: `gap-1.5 ${isViewMode ? "hidden" : ""}`,
              title: `${isBlocked ? "Unblock" : "Block"} the user account`,
            }}
            icon={LockKeyholeIcon}
            buttonName={`${(executingUpdate) ? "Blocking..." : "Block"}`}
          />
        )
      }


    </div>
  )
}

export default UnblockButton