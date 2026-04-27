import { buildConditionTree, evaluateCondition } from './conditionTreeBuilder';

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
 * Process workflow template and return steps that match the provided data
 * @param workflowTemplateData - The workflow template response from GraphQL
 * @param requestData - The data to evaluate against step conditions
 * @param steps - Optional: Provide steps directly instead of extracting from workflowTemplateData
 * @returns Array of steps that match the conditions
 */
export function getMatchingSteps(
  requestData: Record<string, unknown>,
  steps: WorkFlowStep[]
): WorkFlowStep[] {
  const stepsToProcess = steps

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

    // console.log(`Evaluating Step ${step.stepNumber} with conditions:`, JSON.stringify(evaluateConditionWithDetails(conditionTree, requestData), null, 2));

    // Evaluate conditions
    if (conditionTree && evaluateCondition(conditionTree, requestData)) {
      matchingSteps.push(step);
    }
  }

  return matchingSteps;
}

/**
 * Get the first matching step from workflow template
 * @param workflowTemplateData - The workflow template response from GraphQL
 * @param requestData - The data to evaluate against step conditions
 * @param steps - Optional: Provide steps directly instead of extracting from workflowTemplateData
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
 * @param workflowTemplateData - The workflow template response from GraphQL
 * @param requestData - The data to evaluate against step conditions
 * @param steps - Optional: Provide steps directly instead of extracting from workflowTemplateData
 * @returns true if at least one step matches
 */
export function hasMatchingSteps(
  requestData: Record<string, unknown>,
  steps: WorkFlowStep[]
): boolean {
  return getMatchingSteps(requestData, steps).length > 0;
}
