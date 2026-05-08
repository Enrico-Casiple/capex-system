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

type AuthButtonButtonProps = {
  isViewMode: boolean;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
}

const modelAPI = modelGQL;


const AuthButton = ({ isViewMode, id, setOpen, isAuth }: AuthButtonButtonProps) => {
  const { modelName, model } = useListContext();
  const session = useSession();
  const toast = useToast();

  const { execute: executeUpdate, executing: executingUpdate, } = useMutationActions({
    mutationGQL: modelAPI[model].update,
    setOpen: setOpen,
    successMessage: `${isAuth ? "Disable" : "Enable"} Authentication Success`,
    successDescription: `The user's authentication has been ${isAuth ? "disabled" : "enabled"} successfully.`,
    errorMessage: `${isAuth ? "Disable" : "Enable"} Authentication Failed`,
    errorDescription: ` An error occurred while ${isAuth ? "disabling" : "enabling"} the user's authentication. Please try again or contact support if the issue persists.`,
  });

  const handleToEnable = async () => {
    return await executeUpdate({
      variables: {
        id: id,
        data: {
          isTwoFactorAuthEnabled: !isAuth,
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
          description: result.UserUpdate.message || ` The user's authentication has been ${isAuth ? "disabled" : "enabled"} successfully.`,
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
  const handleToDisable = async () => {
    return await executeUpdate({
      variables: {
        id: id,
        data: {
          isTwoFactorAuthEnabled: !isAuth,
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
          description: result.UserUpdate.message || `The user's authentication has been ${isAuth ? "disabled" : "enabled"} successfully.`,
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
        !isAuth ? (
          <ProtectedButton
            modelName={modelName}
            action="user-auth-enable"
            buttonProps={{
              type: "button",
              size: "sm",
              onClick: handleToEnable,
              className: `gap-1.5 ${isViewMode ? "hidden" : ""}`,
              title: `${isAuth ? "Enable" : "Disable"} the user authentication`,
            }}
            icon={KeyIcon}
            buttonName={`${(executingUpdate) ? "Enabling..." : "Enable"}`}
          />
        ) : (
          <ProtectedButton
            modelName={modelName}
            action="user-auth-disable"
            buttonProps={{
              type: "button",
              size: "sm",
              onClick: handleToDisable,
              className: `gap-1.5 ${isViewMode ? "hidden" : ""}`,
              title: `${isAuth ? "Disable" : "Enable"} the user authentication`,
            }}
            icon={KeyIcon}
            buttonName={`${(executingUpdate) ? "Disabling..." : "Disable"}`}
          />
        )
      }


    </div>
  )
}

export default AuthButton