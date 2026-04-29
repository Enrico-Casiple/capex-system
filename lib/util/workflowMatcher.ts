import { buildConditionTree, evaluateCondition, evaluateConditionWithDetails } from './conditionTreeBuilder';

type ConditionValue = {
  nodeType: 'RULE' | 'GROUP';
  logicalOperator?: string;
  field?: string;
  operator?: string;
  value?: unknown;
};

type Condition = {
  __typename?: string;
  modelName: string;
  group: string;
  codeKey: string;
  code: string;
  codeLabel: string;
  value: ConditionValue;
};

type WorkFlowStep = {
  __typename?: string;
  id?: string;
  stepNumber?: number | null;
  assignmentTypeId?: string | null;
  assignedToUserId?: string | null;
  isHaveCondition?: boolean | null;
  conditions?: Condition[];
  [key: string]: unknown;
};

/**
 * Remove duplicate steps based on assignedToUserId and keep only the highest step number
 * @param steps - Array of steps that may contain duplicates
 * @returns Array of steps with duplicates removed (keeping highest step number per user)
 */
function removeDuplicateSteps(steps: WorkFlowStep[]): WorkFlowStep[] {
  if (!steps || steps.length === 0) {
    return [];
  }

  // ✅ FIXED: Separate steps with null assignedToUserId from user-assigned steps
  const stepsWithoutUser: WorkFlowStep[] = [];
  const userStepMap = new Map<string, WorkFlowStep>();

  for (const step of steps) {
    const assignedToUserId = step.assignedToUserId;
    const stepNumber = step.stepNumber ?? 0;

    // Keep steps without assigned user (null/undefined)
    if (assignedToUserId === null || assignedToUserId === undefined) {
      stepsWithoutUser.push(step);
      continue;
    }

    // If user doesn't exist or current step number is higher, add it
    if (
      !userStepMap.has(assignedToUserId) ||
      (userStepMap.get(assignedToUserId)?.stepNumber ?? 0) < stepNumber
    ) {
      userStepMap.set(assignedToUserId, step);
    }
  }

  // Combine: steps without user + user-assigned steps, then sort by step number
  const result = [
    ...stepsWithoutUser,
    ...Array.from(userStepMap.values()),
  ].sort((a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0));

  return result;
}

/**
 * Process workflow template and return steps that match the provided data
 * @param requestData - The data to evaluate against step conditions
 * @param steps - Provide steps directly
 * @returns Array of steps that match the conditions (duplicates removed by assignedToUserId, highest step kept)
 */
export function getMatchingSteps(
  requestData: Record<string, unknown>,
  steps: WorkFlowStep[]
): WorkFlowStep[] {
  const stepsToProcess = steps;

  if (!stepsToProcess || stepsToProcess.length === 0) {
    return [];
  }

  const matchingSteps: WorkFlowStep[] = [];

  for (const step of stepsToProcess) {
    // If step has no conditions, include it
    if (!step.isHaveCondition || !step.conditions || step.conditions.length === 0) {
      matchingSteps.push(step);
      continue;
    }

    // Filter out empty conditions
    const validConditions = step.conditions.filter(condition => {
      const value = condition.value;
      if (value.nodeType === 'RULE') {
        return value.field && value.operator && value.value !== undefined && value.value !== '';
      }
      if (value.nodeType === 'GROUP') {
        return value.logicalOperator;
      }
      return false;
    });

    // Build condition tree
    const conditionTree = buildConditionTree(validConditions as never);

    console.log(
      `Evaluating Step ${step.stepNumber} with conditions:`,
      JSON.stringify(evaluateConditionWithDetails(conditionTree, requestData), null, 2)
    );

    // Evaluate conditions
    if (conditionTree && evaluateCondition(conditionTree, requestData)) {
      matchingSteps.push(step);
    }
  }

  // ✅ FIXED: Remove duplicates by assignedToUserId and keep only highest step number
  return removeDuplicateSteps(matchingSteps);
}

/**
 * Get the first matching step from workflow template
 * @param requestData - The data to evaluate against step conditions
 * @param steps - Provide steps directly
 * @returns The first matching step or null
 */
export function getFirstMatchingStep(
  requestData: Record<string, unknown>,
  steps: WorkFlowStep[]
): WorkFlowStep | null {
  const matchingSteps = getMatchingSteps(requestData, steps);
  return matchingSteps.length > 0 ? matchingSteps[0] : null;
}

/**
 * Check if workflow template has any matching steps
 * @param requestData - The data to evaluate against step conditions
 * @param steps - Provide steps directly
 * @returns true if at least one step matches
 */
export function hasMatchingSteps(
  requestData: Record<string, unknown>,
  steps: WorkFlowStep[]
): boolean {
  return getMatchingSteps(requestData, steps).length > 0;
}