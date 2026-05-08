import ProtectedButton from '@/app/_component/RoleGate/ProtectedButton'
import { useListContext } from '@/app/_context/ListContext/ListProvider'
import useMutationActions from '@/app/_hooks/useBulkActions'
import useToast from '@/app/_hooks/useToast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { modelGQL } from '@/lib/api/crud.gql'
import { WorkFlowInstanceFindUnique } from '@/lib/api/gql/WorkFlowInstance.gql'
import { Request, RequestResponse, WorkFlowInstanceResponse, WorkFlowInstanceStep } from '@/lib/generated/api/customHookAPI/graphql'
import { useQuery } from '@apollo/client/react'
import { Check, MailCheck, X, Clock, Lock, AlertCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

type WorkApprovalInstanceProcessProps = {
  form: UseFormReturn<Record<string, unknown>>
  isViewMode: boolean
}

const modelAPI = modelGQL

const WorkApprovalInstanceProcess = ({ form, isViewMode }: WorkApprovalInstanceProcessProps) => {
  const { modelName } = useListContext()
  const session = useSession()
  const toast = useToast()
  const [comment, setComment] = React.useState<string>('')
  const [activeStepId, setActiveStepId] = React.useState<string | null>(null)

  const workFlowInstanceQuery = useQuery<
    { WorkFlowInstanceFindUnique: WorkFlowInstanceResponse },
    { id: string }
  >(WorkFlowInstanceFindUnique, {
    variables: {
      id: form.watch('workFlowInstance.id') as unknown as string,
    },
    skip: !form.watch('workFlowInstance.id'),
  })

  const steps = workFlowInstanceQuery.data?.WorkFlowInstanceFindUnique.data?.steps || []
  const userId = session.data?.user?.id || ""

  // Helper: Get status styling
  const getStatusColor = (status: string | null | undefined): string => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
    }
  }

  // Helper: Get status icon
  const getStatusIcon = (status: string | null | undefined) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock className="w-3 h-3 mr-1" />
      case 'approved':
        return <Check className="w-3 h-3 mr-1" />
      case 'rejected':
        return <X className="w-3 h-3 mr-1" />
      default:
        return null
    }
  }

  // Helper: Format comments
  const formatComment = (comment: string | null | undefined): string => {
    if (!comment) return "Waiting for approver's action"
    if (comment.length <= 100) return comment
    return comment
  }

  // Helper: Check if user is assigned to this step
  const isUserAssignedToStep = (step: WorkFlowInstanceStep): boolean => {
    return step.assignedToUserId === userId
  }

  // Helper: Get safe status name
  const getStatusName = (status: WorkFlowInstanceStep['status']): string => {
    return status?.name ?? 'Unknown'
  }

  // ✅ Helper: Check if any previous step is rejected
  const hasRejectedStep = (stepIndex: number): boolean => {
    return steps
      .slice(0, stepIndex)
      .some(s => s.status?.name === 'Rejected')
  }

  // Helper: Check if all previous steps are approved
  const allPreviousApproved = (stepIndex: number): boolean => {
    return steps
      .slice(0, stepIndex)
      .every(s => s.status?.name === 'Approved')
  }

  // Helper: Check if step is locked (waiting for previous approval)
  const isStepLocked = (step: WorkFlowInstanceStep, stepIndex: number): boolean => {
    return (
      step.status?.name === 'Pending' &&
      !isUserAssignedToStep(step) &&
      !allPreviousApproved(stepIndex) &&
      !hasRejectedStep(stepIndex)
    )
  }

  // Helper: Check if user can perform actions on this step
  const canUserActOnStep = (step: WorkFlowInstanceStep, stepIndex: number): boolean => {
    // ✅ NEW: If any previous step is rejected, block all approvals
    if (hasRejectedStep(stepIndex)) {
      console.log('❌ Previous step rejected - workflow blocked', { stepNumber: step.stepNumber })
      return false
    }

    // User must be assigned to this step
    if (step.assignedToUserId !== userId) {
      console.log('❌ Not assigned to this step', { userId, assignedToUserId: step.assignedToUserId })
      return false
    }

    // Step must be pending
    if (step.status?.name !== 'Pending') {
      console.log('❌ Step not pending:', step.status?.name)
      return false
    }

    // ✅ All previous steps must be approved
    if (!allPreviousApproved(stepIndex)) {
      console.log('❌ Previous steps not all approved', { stepNumber: step.stepNumber })
      return false
    }

    // console.log('✅ Can act on step:', { stepNumber: step.stepNumber })
    return true
  }

  const { execute: executeUpdate, executing: executingUpdate } = useMutationActions({
    mutationGQL: modelAPI.RequestGQL.update,
    setOpen: () => { },
    successMessage: 'Step approved successfully.',
    successDescription: `The approval step has been processed. You can now proceed with the next steps in the workflow.`,
    errorMessage: 'Failed to update capex request.',
    errorDescription: `An error occurred while updating the capex request. Please try again or contact support if the issue persists.`,
  })
  const handleToApprove = async (step: WorkFlowInstanceStep) => {
    // Validate comment is provided
    if (!comment.trim()) {
      toast.error({
        message: 'Comment Required',
        description: 'Please provide a comment before approving this step.',
      })
      return
    }

    const allPendingSteps = steps.every((s) => s.status?.name === 'Pending')
    console.log('Approving step', { stepNumber: step.stepNumber, allPendingSteps })

    await executeUpdate({
      variables: {
        id: form.watch('id') as unknown as string,
        data: {
          statusId: allPendingSteps ? "69ef2113f681bdf7f3214d8d" : "69ef2112f681bdf7f3214d89",
          workFlowInstance: {
            update: {
              where: {
                id: step.instanceId
              },
              data: {
                currentStep: allPendingSteps ? (step.stepNumber ?? 1) + 1 : step.stepNumber,
                completedAt: allPendingSteps ? null : new Date().toISOString(),
                statusId: allPendingSteps ? "69ef2115f681bdf7f3214d9d" : "69ef2115f681bdf7f3214d9b",
                steps: {
                  update: {
                    where: {
                      id: step.id
                    },
                    data: {
                      comments: comment,
                      actionAt: new Date().toISOString(),
                      statusId: "69ef2116f681bdf7f3214da1",
                      isEditable: false,
                    }
                  }
                }
              }
            },
          }
        },
        currentUserId: userId,
      },
      onCompleted: (data) => {
        const dataType = data as unknown as { RequestUpdate: RequestResponse }
        if (!dataType.RequestUpdate.isSuccess) {
          toast.error({
            message: 'Approval Failed',
            description: `An error occurred while approving step ${step.stepNumber}. Please try again.`,
          })
          return
        }
        toast.success({
          message: 'Step Approved',
          description: `You have successfully approved step ${step.stepNumber}.`,
        })
        setComment('')
        setActiveStepId(null)
        return dataType.RequestUpdate.isSuccess
      }
    })
  }

  const handleToReject = async (step: WorkFlowInstanceStep) => {
    if (!comment.trim()) {
      toast.error({
        message: 'Comment Required',
        description: 'Please provide a comment explaining the rejection.',
      })
      return
    }

    await executeUpdate({
      variables: {
        id: form.watch('id') as unknown as string,
        data: {
          statusId: "69ef2114f681bdf7f3214d97",
          workFlowInstance: {
            update: {
              where: {
                id: step.instanceId
              },
              data: {
                currentStep: step.stepNumber,
                statusId: "69f1bf738146ee76c5123f69",
                steps: {
                  update: {
                    where: {
                      id: step.id
                    },
                    data: {
                      comments: comment,
                      actionAt: new Date().toISOString(),
                      statusId: "69ef2117f681bdf7f3214da3", // Rejected status ID
                      isEditable: false,
                    }
                  }
                }
              }
            },
          }
        },
        currentUserId: userId,
      },
      onCompleted: (data) => {
        const dataType = data as unknown as { RequestUpdate: RequestResponse }
        if (!dataType.RequestUpdate.isSuccess) {
          toast.error({
            message: 'Rejection Failed',
            description: `An error occurred while rejecting step ${step.stepNumber}. Please try again.`,
          })
          return
        }
        toast.success({
          message: 'Step Rejected',
          description: `You have rejected step ${step.stepNumber}.`,
        })
        setComment('')
        setActiveStepId(null)
        return dataType.RequestUpdate.isSuccess
      }
    })
  }


  return (
    <section className="space-y-4">
      {/* <pre>{JSON.stringify(workFlowInstanceQuery.data?.WorkFlowInstanceFindUnique.data, null, 2)}</pre> */}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-xs shrink-0">
            IV.
          </div>
          <div>
            <h3 className="text-base font-semibold leading-tight">Approval Steps</h3>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
              Complete approval workflow sequentially - each step must be approved before the next begins.
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-16">Step</TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Approver</TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Timestamp</TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Comment</TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {steps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No approval steps available
                </TableCell>
              </TableRow>
            ) : (
              steps.map((step, stepIndex) => {
                const canAct = canUserActOnStep(step, stepIndex)
                const isAssigned = isUserAssignedToStep(step)
                const previousApproved = allPreviousApproved(stepIndex)
                const isLocked = isStepLocked(step, stepIndex)
                const isActive = activeStepId === step.id
                const workflowBlocked = hasRejectedStep(stepIndex)

                return (
                  <TableRow
                    key={step.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors ${workflowBlocked
                      ? 'bg-red-50/30 dark:bg-red-950/10 border-l-4 border-l-red-500'
                      : step.status?.name === 'Pending'
                        ? isAssigned && previousApproved
                          ? 'bg-blue-50/30 dark:bg-blue-950/10 border-l-4 border-l-blue-500'
                          : isAssigned
                            ? 'bg-amber-50/30 dark:bg-amber-950/10 border-l-4 border-l-amber-500'
                            : 'bg-yellow-50/30 dark:bg-yellow-950/10'
                        : ''
                      }`}
                  >
                    {/* Step Number */}
                    <TableCell className="font-medium text-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {step.stepNumber ?? '-'}
                      </span>
                    </TableCell>

                    {/* Approver Name & Email */}
                    <TableCell className="text-sm">
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {step.assignedToUser?.name ?? 'Unassigned'}
                        {isAssigned && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {step.assignedToUser?.email ?? 'N/A'}
                      </div>
                    </TableCell>

                    {/* Timestamp */}
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                      {step.actionAt ? (
                        <div className="text-xs">
                          {new Date(step.actionAt).toLocaleString()}
                        </div>
                      ) : (
                        <div className="text-xs italic">Pending</div>
                      )}
                    </TableCell>

                    {/* Status with Color & Icon */}
                    <TableCell className="text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                          step.status?.name
                        )}`}
                      >
                        {getStatusIcon(step.status?.name)}
                        {getStatusName(step.status)}
                      </span>
                    </TableCell>

                    {/* Comment */}
                    <TableCell className="text-sm max-w-xs">
                      {canAct && !isViewMode ? (
                        <div>
                          <Textarea
                            placeholder="Add comment (required for approval)"
                            value={isActive ? comment : ''}
                            onChange={(e) => setComment(e.target.value)}
                            onFocus={() => setActiveStepId(step.id)}
                            className="mb-2 text-xs"
                            rows={2}
                          />
                        </div>
                      ) : (
                        <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {formatComment(step.comments)}
                        </div>
                      )}
                    </TableCell>

                    {/* Action Buttons */}
                    <TableCell className="text-sm">
                      {canAct && !isViewMode ? (
                        <div className="flex gap-1.5 flex-wrap">
                          <ProtectedButton
                            modelName={modelName}
                            action="verification"
                            buttonProps={{
                              type: "button",
                              size: "sm",
                              onClick: async () => {
                                console.log("Approve Clicked for step", step.stepNumber)
                                await handleToApprove(step)
                              },
                              disabled: executingUpdate || !comment.trim(),
                              className: "gap-1.5 rounded-md",
                              title: "Approve Request",
                              variant: "default",
                            }}
                            icon={Check}
                            buttonName={`${executingUpdate ? 'Approving...' : 'Approve'}`}
                          />

                          <ProtectedButton
                            modelName={modelName}
                            action="verification"
                            buttonProps={{
                              type: "button",
                              size: "sm",
                              variant: "destructive",
                              onClick: async () => {
                                console.log("Reject Clicked for step", step.stepNumber)
                                await handleToReject(step)
                              },
                              disabled: executingUpdate || !comment.trim(),
                              className: "gap-1.5 rounded-md",
                              title: "Reject Request",
                            }}
                            icon={X}
                            buttonName="Reject"
                          />
                        </div>
                      ) : workflowBlocked ? (
                        // ✅ NEW: Workflow blocked due to rejection
                        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                          <AlertCircle className="w-3 h-3" />
                          <span>Workflow blocked</span>
                        </div>
                      ) : !previousApproved && isAssigned && step.status?.name === 'Pending' ? (
                        <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
                          <Clock className="w-3 h-3" />
                          <span>Waiting for approval</span>
                        </div>
                      ) : isLocked ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">
                          {getStatusName(step.status)}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default WorkApprovalInstanceProcess