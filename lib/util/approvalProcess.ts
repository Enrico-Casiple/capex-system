import { WorkFlowInstanceStep } from "../generated/api/customHookAPI/graphql"

/**
 * Check if the current user is an approver in the workflow process
 * @param steps - Array of workflow instance steps
 * @param currentUserId - The ID of the current user
 * @returns boolean - True if user is an approver, false otherwise
 */
export const isUserApproverInProcess = (
  steps: WorkFlowInstanceStep[],
  currentUserId: string
): boolean => {
  if (!steps || steps.length === 0) return false
  if (!currentUserId) return false

  return steps.some(
    (step) =>
      step.assignedToUserId === currentUserId &&
      step.isActive &&
      step.isRequired
  )
}

/**
 * Check if the current user is an approver and can take action (pending & editable)
 * @param steps - Array of workflow instance steps
 * @param currentUserId - The ID of the current user
 * @returns boolean - True if user can approve/reject, false otherwise
 */
export const canUserApproveNow = (
  steps: WorkFlowInstanceStep[],
  currentUserId: string
): boolean => {
  if (!steps || steps.length === 0) return false
  if (!currentUserId) return false

  return steps.some(
    (step) =>
      step.assignedToUserId === currentUserId &&
      step.isActive &&
      step.isRequired &&
      step.isEditable &&
      step.status?.name === "Pending"
  )
}

/**
 * Get the current pending step for a user
 * @param steps - Array of workflow instance steps
 * @param currentUserId - The ID of the current user
 * @returns WorkFlowInstanceStep | null - The current pending step or null
 */
export const getUserCurrentPendingStep = (
  steps: WorkFlowInstanceStep[],
  currentUserId: string
): WorkFlowInstanceStep | null => {
  if (!steps || steps.length === 0) return null
  if (!currentUserId) return null

  return (
    steps.find(
      (step) =>
        step.assignedToUserId === currentUserId &&
        step.isActive &&
        step.isEditable &&
        step.status?.name === "Pending"
    ) || null
  )
}

/**
 * Get all approval steps assigned to a user
 * @param steps - Array of workflow instance steps
 * @param currentUserId - The ID of the current user
 * @returns WorkFlowInstanceStep[] - All steps assigned to the user
 */
export const getUserApprovalSteps = (
  steps: WorkFlowInstanceStep[],
  currentUserId: string
): WorkFlowInstanceStep[] => {
  if (!steps || steps.length === 0) return []
  if (!currentUserId) return []

  return steps.filter(
    (step) =>
      step.assignedToUserId === currentUserId &&
      step.isRequired &&
      step.isActive
  )
}

/**
 * Check if all approval steps are completed
 * @param steps - Array of workflow instance steps
 * @returns boolean - True if all steps are completed, false otherwise
 */
export const areAllApprovalStepsCompleted = (
  steps: WorkFlowInstanceStep[]
): boolean => {
  if (!steps || steps.length === 0) return false

  return steps.every(
    (step) =>
      step.isActive &&
      (step.status?.name === "Approved" || step.status?.name === "Rejected")
  )
}

/**
 * Get the current step in the workflow (first pending step)
 * @param steps - Array of workflow instance steps
 * @returns WorkFlowInstanceStep | null - The current active step or null
 */
export const getCurrentStep = (
  steps: WorkFlowInstanceStep[]
): WorkFlowInstanceStep | null => {
  if (!steps || steps.length === 0) return null

  return (
    steps.find(
      (step) =>
        step.isActive &&
        step.isRequired &&
        step.status?.name === "Pending"
    ) || null
  )
}

/**
 * Get the next step after the current one
 * @param steps - Array of workflow instance steps
 * @returns WorkFlowInstanceStep | null - The next step or null
 */
export const getNextStep = (
  steps: WorkFlowInstanceStep[]
): WorkFlowInstanceStep | null => {
  if (!steps || steps.length === 0) return null

  const currentStep = getCurrentStep(steps)
  if (!currentStep) return null

  return (
    steps.find(
      (step) =>
        (step?.stepNumber ?? 1) > (currentStep?.stepNumber ?? 1) &&
        step.isRequired &&
        step.isActive
    ) || null
  )
}

/**
 * Get previous steps that are already approved
 * @param steps - Array of workflow instance steps
 * @returns WorkFlowInstanceStep[] - All approved steps before current
 */
export const getPreviousApprovedSteps = (
  steps: WorkFlowInstanceStep[]
): WorkFlowInstanceStep[] => {
  if (!steps || steps.length === 0) return []

  const currentStep = getCurrentStep(steps)
  if (!currentStep) return []

  return steps.filter(
    (step) =>
      (step.stepNumber ?? 1) < (currentStep.stepNumber ?? 1) &&
      step.isActive &&
      step.status?.name === "Approved"
  )
}

/**
 * Check if all previous steps are approved (sequential approval)
 * @param steps - Array of workflow instance steps
 * @returns boolean - True if all previous steps are approved
 */
export const canProceedToNextStep = (
  steps: WorkFlowInstanceStep[]
): boolean => {
  if (!steps || steps.length === 0) return false

  const currentStep = getCurrentStep(steps)
  if (!currentStep) return false

  const previousSteps = steps.filter(
    (step) =>
      (step.stepNumber ?? 1) < (currentStep.stepNumber ?? 1) &&
      step.isRequired &&
      step.isActive
  )

  return previousSteps.every((step) => step.status?.name === "Approved")
}

/**
 * Get workflow timeline (all steps in order with their status)
 * @param steps - Array of workflow instance steps
 * @returns Array of steps sorted by step number
 */
export const getWorkflowTimeline = (
  steps: WorkFlowInstanceStep[]
): WorkFlowInstanceStep[] => {
  if (!steps || steps.length === 0) return []

  return steps
    .filter((step) => step.isRequired && step.isActive)
    .sort((a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0))
}

/**
 * Check if a step can be edited (only current step can be edited)
 * @param steps - Array of workflow instance steps
 * @param stepId - The step ID to check
 * @returns boolean - True if step can be edited
 */
export const canEditStep = (
  steps: WorkFlowInstanceStep[] | undefined | null,
  stepId: string
): boolean => {
  if (!steps || steps.length === 0) return false
  if (!stepId) return false

  const currentStep = getCurrentStep(steps)
  if (!currentStep) return false

  return currentStep.id === stepId && (currentStep.isEditable ?? false)
}

/**
 * Get pending steps that are locked (waiting for previous approval)
 * @param steps - Array of workflow instance steps
 * @returns WorkFlowInstanceStep[] - All locked pending steps
 */
export const getLockedSteps = (
  steps: WorkFlowInstanceStep[]
): WorkFlowInstanceStep[] => {
  if (!steps || steps.length === 0) return []

  const currentStep = getCurrentStep(steps)
  if (!currentStep) return []

  return steps.filter(
    (step) =>
      (step.stepNumber ?? 0) > (currentStep.stepNumber ?? 0) &&
      step.isRequired &&
      step.isActive &&
      step.status?.name === "Pending"
  )
}

/**
 * Get step information with approval chain
 * @param steps - Array of workflow instance steps
 * @returns Object with current, previous approved, next, and locked steps
 */
export const getApprovalChainInfo = (steps: WorkFlowInstanceStep[]) => {
  return {
    current: getCurrentStep(steps),
    previousApproved: getPreviousApprovedSteps(steps),
    next: getNextStep(steps),
    locked: getLockedSteps(steps),
    timeline: getWorkflowTimeline(steps),
    canProceed: canProceedToNextStep(steps),
  }
}

/**
 * Get the approval percentage based on completed steps
 * @param steps - Array of workflow instance steps
 * @returns Object with completed count, total count, and percentage
 */
export const getApprovalProgress = (steps: WorkFlowInstanceStep[]) => {
  if (!steps || steps.length === 0) {
    return { completed: 0, total: 0, percentage: 0 }
  }

  const requiredSteps = steps.filter((s) => s.isRequired && s.isActive)
  const completedSteps = requiredSteps.filter(
    (s) => s.status?.name === "Approved" || s.status?.name === "Rejected"
  )

  return {
    completed: completedSteps.length,
    total: requiredSteps.length,
    percentage: Math.round((completedSteps.length / requiredSteps.length) * 100),
  }
}

// ✅ TEST HELPER FUNCTIONS
/**
 * Check if a step is approved
 * @param step - The workflow step to check
 * @returns boolean - True if step status is Approved
 */
export const isStepApproved = (step: WorkFlowInstanceStep | null | undefined): boolean => {
  if (!step) return false
  return step.status?.name === "Approved"
}

/**
 * Check if a step is rejected
 * @param step - The workflow step to check
 * @returns boolean - True if step status is Rejected
 */
export const isStepRejected = (step: WorkFlowInstanceStep | null | undefined): boolean => {
  if (!step) return false
  return step.status?.name === "Rejected"
}

/**
 * Check if all previous steps are approved
 * @param steps - Array of workflow instance steps
 * @param stepIndex - Index of the current step
 * @returns boolean - True if all previous steps are approved
 */
export const isPreviousStepsApproved = (
  steps: WorkFlowInstanceStep[],
  stepIndex: number
): boolean => {
  if (!steps || steps.length === 0) return true
  if (stepIndex <= 0) return true

  return steps
    .slice(0, stepIndex)
    .every((step) => step.status?.name === "Approved")
}

/**
 * Check if user can approve a specific step
 * @param step - The workflow step
 * @param steps - Array of all workflow steps
 * @param stepIndex - Index of the step
 * @param currentUserId - ID of current user
 * @returns boolean - True if user can approve this step
 */
export const canApproveStep = (
  step: WorkFlowInstanceStep,
  steps: WorkFlowInstanceStep[],
  stepIndex: number,
  currentUserId: string
): boolean => {
  if (!step || !currentUserId) return false

  if (step.status?.name !== "Pending") return false

  if (step.assignedToUserId !== currentUserId) return false

  return isPreviousStepsApproved(steps, stepIndex)
}

/**
 * Get the next pending step
 * @param steps - Array of workflow instance steps
 * @returns WorkFlowInstanceStep | null - The first pending step or null
 */
export const getNextPendingStep = (
  steps: WorkFlowInstanceStep[]
): WorkFlowInstanceStep | null => {
  if (!steps || steps.length === 0) return null

  return (
    steps.find(
      (step) =>
        step.status?.name === "Pending" &&
        step.isActive &&
        step.isRequired
    ) || null
  )
}