import { evaluateCondition } from './conditionTreeBuilder';

type ConditionNode = {
  type: 'GROUP' | 'RULE';
  operator?: 'AND' | 'OR';
  field?: string;
  comparison?: string;
  value?: unknown;
  children?: ConditionNode[];
};

type Step = {
  stepNumber?: number | null;
  assignmentTypeId?: string | null;
  assignedToUserId?: string | null;
  isHaveCondition?: boolean | null;
  conditionTree?: ConditionNode | null;
  [key: string]: unknown;
};

/**
 * Find the matching step based on the provided data
 * @param steps - Array of workflow steps with conditions
 * @param data - Data to evaluate against conditions
 * @returns The matching step or the first step without conditions
 */
export function findMatchingStep(steps: Step[], data: Record<string, unknown>): Step | null {
  if (!steps || steps.length === 0) return null;

  // First, try to find a step where conditions match
  for (const step of steps) {
    if (step.isHaveCondition && step.conditionTree) {
      const matches = evaluateCondition(step.conditionTree, data);
      if (matches) {
        return step;
      }
    }
  }

  // If no conditions match, return the first step without conditions (fallback)
  const fallbackStep = steps.find(step => !step.isHaveCondition);
  return fallbackStep || steps[0] || null;
}

/**
 * Get all steps that match the conditions
 * @param steps - Array of workflow steps with conditions
 * @param data - Data to evaluate against conditions
 * @returns Array of matching steps
 */
export function findAllMatchingSteps(steps: Step[], data: Record<string, unknown>): Step[] {
  if (!steps || steps.length === 0) return [];

  return steps.filter(step => {
    if (!step.isHaveCondition || !step.conditionTree) {
      return true; // Include steps without conditions
    }
    return evaluateCondition(step.conditionTree, data);
  });
}

/**
 * Check if data matches step conditions
 * @param step - Workflow step with conditions
 * @param data - Data to evaluate against conditions
 * @returns true if conditions match or no conditions exist
 */
export function doesStepMatch(step: Step, data: Record<string, unknown>): boolean {
  if (!step.isHaveCondition || !step.conditionTree) {
    return true; // No conditions means always match
  }
  return evaluateCondition(step.conditionTree, data);
}
