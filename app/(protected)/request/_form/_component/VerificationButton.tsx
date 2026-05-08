import ProtectedButton from '@/app/_component/RoleGate/ProtectedButton'
import { ActionType } from '@/app/_component/Row/Action'
import useMutationActions from '@/app/_hooks/useBulkActions'
import useToast from '@/app/_hooks/useToast'
import { modelGQL } from '@/lib/api/crud.gql'
import { CapitalRecoveryFactorFindUnique } from '@/lib/api/gql/CapitalRecoveryFactor.gql'
import { BudgetResponse, CapitalRecoveryFactorResponse, RequestResponse } from '@/lib/generated/api/customHookAPI/graphql'
import { generate_code } from '@/lib/util/bcryptjs'
import { buildRefCode } from '@/lib/util/generateOtpCode'
import { useQuery } from '@apollo/client/react'
import { connect } from 'http2'
import { CheckCircle2Icon, PackagePlus, RefreshCcwIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { format } from 'path'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

type VerificationButtonProps = {
  modelName: string,
  isViewMode: boolean,
  getValueBudgetId: (name: "requestedCRF.budgetId") => string
  getValueId: (name: "requestedCRF.id") => string
  form: UseFormReturn<Record<string, unknown>>;
}

const modelAPI = modelGQL;

const VerificationButton = ({
  modelName,
  isViewMode,
  getValueBudgetId,
  getValueId,
  form
}: VerificationButtonProps) => {
  const toast = useToast();
  const session = useSession();

  // TODO: Create a Budget Base on the CRF ID
  const crfFindUniqueQuery = useQuery<
    { CapitalRecoveryFactorFindUnique: CapitalRecoveryFactorResponse },
    { id: string }
  >(CapitalRecoveryFactorFindUnique, {
    variables: { id: getValueId("requestedCRF.id") },
    skip: !getValueId("requestedCRF.id"),
  })

  const currentDate = new Date();
  const yearComplete = currentDate.getFullYear().toString();
  const statusCode = 'AX'; // or determine dynamically

  // Use buildRefCode instead
  const [budgetNumberPrefix, setBudgetNumberPrefix] = React.useState<string>('');

  React.useEffect(() => {
    const generatePrefix = async () => {
      const prefix = await buildRefCode({
        yearCode: yearComplete,
        statusCode,
        companyAcronym: crfFindUniqueQuery.data?.CapitalRecoveryFactorFindUnique.data?.company?.acronym,
        fallbackName: crfFindUniqueQuery.data?.CapitalRecoveryFactorFindUnique.data?.company?.name,
      });
      setBudgetNumberPrefix(prefix);
    };
    generatePrefix();
  }, [crfFindUniqueQuery.data]);


  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: modelAPI.BudgetGQL.create,
    setOpen: () => { },
    successMessage: 'Created a budget reference for the capex request.',
    successDescription: `The budget reference has been successfully created. You can now proceed with the next steps in the capex request process.`,
    errorMessage: 'Failed to create budget reference.',
    errorDescription: `An error occurred while creating the budget reference. Please try again or contact support if the issue persists.`,
  });

  const { execute: executeUpdate, executing: executingUpdate } = useMutationActions({
    mutationGQL: modelAPI.RequestGQL.update,
    setOpen: () => { },
    successMessage: 'Updated the capex request with the new budget reference.',
    successDescription: `The capex request has been successfully updated with the new budget reference. You can now proceed with the next steps in the capex request process.`,
    errorMessage: 'Failed to update capex request.',
    errorDescription: `An error occurred while updating the capex request. Please try again or contact support if the issue persists.`,
  });


  const handleToVerify = async () => {
    try {
      // Validation: Check if verification notes are provided
      if (!form.watch("requestedCRF.remark.verificationNotes")) {
        toast.error({
          message: "Verification Notes Required",
          description: "Please provide verification notes before proceeding with verification.",
        });
        return;
      }
      if (parseInt(form.watch("quotationAmount") as never) <= 0) {
        toast.error({
          message: "Invalid Quotation Amount",
          description: "Please enter a valid quotation amount greater than zero.",
        });
        return;
      }

      // Step 1: Create Budget
      const budgetResponse = await new Promise((resolve, reject) => {
        executeCreate({
          variables: {
            data: {
              budgetRefNo: budgetNumberPrefix,
              approvedAmount: form.watch("quotationAmount") || 0,
              categoryId: crfFindUniqueQuery.data?.CapitalRecoveryFactorFindUnique.data?.categoryId || null,
              companyId: crfFindUniqueQuery.data?.CapitalRecoveryFactorFindUnique.data?.companyId || null,
              crf: {
                connect: { id: getValueId("requestedCRF.id") as string }
              },
              currency: "PHP",
              departmentId: crfFindUniqueQuery.data?.CapitalRecoveryFactorFindUnique.data?.departmentId || null,
              fiscalYear: String(currentDate.getFullYear()),
              purpose: `Budget reference for CRF ${form.watch("requestedCRF.crfReferenceNo")}`,
              quantity: 1,
              remainingAmount: form.watch("quotationAmount") || 0,
              remark: {
                note: form.watch("requestedCRF.remark.notes" as never),
                verificationNotes: form.watch("requestedCRF.remark.verificationNotes" as never),
              },
              requestedAmount: form.watch("quotationAmount") || 0,
              requesterId: session.data?.user?.id || "",
              specs: `Budget reference for CRF ${form.watch("requestedCRF.crfReferenceNo")}`,
            },
            currentUserId: session.data?.user?.id || "",
            statusId: crfFindUniqueQuery.data?.CapitalRecoveryFactorFindUnique.data?.statusId || "",
          },
          onCompleted: (data) => resolve(data),
          onError: (error) => reject(error),
          refetchQueries: ['CapitalRecoveryFactorFindUnique', 'RequestFindUnique'],
          awaitRefetchQueries: true,
        });
      });

      const budgetData = budgetResponse as unknown as { BudgetCreate: BudgetResponse };
      console.log("Budget creation response:", budgetData.BudgetCreate.data);

      // Check if budget creation was successful
      if (!budgetData?.BudgetCreate?.isSuccess) {
        toast.error({
          message: "Budget Creation Failed",
          description: "Failed to create budget reference. Please try again.",
        });
        return;
      }


      // Step 2: Update Request after budget is created
      await new Promise((resolve, reject) => {
        executeUpdate({
          variables: {
            id: form.watch("id") as string,
            data: {
              statusId: "69ef2112f681bdf7f3214d87", // Set status to "For Approval"
              requestedCRF: {
                update: {
                  where: { id: getValueId("requestedCRF.id") },
                  data: {
                    budgetId: budgetData.BudgetCreate.data?.id || null,
                    approvedAmount: budgetData.BudgetCreate.data?.approvedAmount || 0,
                    remark: {
                      notes: form.watch("requestedCRF.remark.notes" as never),
                      verificationNotes: form.watch("requestedCRF.remark.verificationNotes" as never),
                    },
                  }
                }
              }
            },
            currentUserId: session.data?.user?.id || "",
          },
          onCompleted: (data) => resolve(data),
          onError: (error) => reject(error),
        });
      });

      // Success message
      toast.success({
        message: "Verification Successful",
        description: "The capex request has been successfully verified and a budget reference has been created.",
      });


    } catch (error) {
      console.error("Verification error:", error);
      toast.error({
        message: "Verification Failed",
        description: "An error occurred during verification. Please try again or contact support.",
      });
    }
  };

  const handleToReturn = async () => {
    if (!form.watch("requestedCRF.remark.verificationNotes")) {
      toast.error({
        message: "Verification Notes Required",
        description: "Please provide verification notes before proceeding with return.",
      });
      return;
    }
    await executeUpdate({
      variables: {
        id: form.watch("id") as string,
        data: {
          statusId: "69ef2112f681bdf7f3214d85", // Set status to "Return From Finance Review"
          requestedCRF: {
            update: {
              where: { id: getValueId("requestedCRF.id") },
              data: {
                remark: {
                  notes: form.watch("requestedCRF.remark.notes" as never),
                  verificationNotes: form.watch("requestedCRF.remark.verificationNotes" as never),
                }
              }
            }
          }
        },
        currentUserId: session.data?.user?.id || "",
      },
      onCompleted: (data) => {
        const dataType = data as unknown as { RequestUpdate: RequestResponse };

        if (!dataType.RequestUpdate.isSuccess) {
          toast.error({
            message: "Return Failed",
            description: "Failed to return the capex request. Please try again.",
          });
          return;
        }

        toast.success({
          message: "Return Successful",
          description: "The capex request has been successfully returned to the previous stage.",
        })

        return data;
      },
      refetchQueries: ['RequestFindUnique'],
      awaitRefetchQueries: true,
    });
  }

  return (
    <React.Fragment>
      <ProtectedButton
        modelName={modelName}
        action="verification"
        buttonProps={{
          type: "button",
          size: "sm",
          onClick: handleToVerify,
          className: `gap-1.5 ${isViewMode ? "hidden" : ""}`,
          title: "Refresh budget reference details and quotation data",
        }}
        icon={CheckCircle2Icon}
        buttonName={`${(executingCreate || executingUpdate) ? "Verifying..." : "Verify"}`}
      />
      <ProtectedButton
        modelName={modelName}
        action="verification"
        buttonProps={{
          type: "button",
          size: "sm",
          onClick: handleToReturn,
          className: `gap-1.5 ${isViewMode ? "hidden" : ""}`,
          title: "Return the capex request to the previous stage for further edits",
        }}
        icon={RefreshCcwIcon}
        buttonName={`${(executingCreate || executingUpdate) ? "Return..." : "Return"}`}
      />
    </React.Fragment>
  )
}

export default VerificationButton