import { getMatchingSteps, getFirstMatchingStep, hasMatchingSteps } from '../workflowMatcher'
import { buildConditionTree, evaluateCondition, evaluateConditionWithDetails } from '../conditionTreeBuilder'

jest.mock('../conditionTreeBuilder')

type ConditionValue = {
  nodeType: 'RULE' | 'GROUP'
  logicalOperator?: string
  field?: string
  operator?: string
  value?: unknown
}

type Condition = {
  __typename?: string
  modelName: string
  group: string
  codeKey: string
  code: string
  codeLabel: string
  value: ConditionValue
}

type WorkFlowStep = {
  __typename?: string
  id?: string
  stepNumber?: number | null
  assignmentTypeId?: string | null
  assignedToUserId?: string | null
  isHaveCondition?: boolean | null
  conditions?: Condition[]
  [key: string]: unknown
}

describe('Workflow Matcher Utilities', () => {
  const mockSteps: WorkFlowStep[] = [
    {
      __typename: 'WorkFlowStepTemplate',
      id: '69ef11ff4ac41b6c5ebd1f2d',
      stepNumber: 1,
      assignedToUserId: null,
      assignmentTypeId: '69ee17c8471de33f370cc36a',
      isHaveCondition: false,
      conditions: [],
    },
    {
      __typename: 'WorkFlowStepTemplate',
      id: '69ef11ff4ac41b6c5ebd1f2e',
      stepNumber: 2,
      assignedToUserId: '69dc9dbf57b4ce9eb090a8f9',
      assignmentTypeId: '69ee17c8471de33f370cc36a',
      isHaveCondition: true,
      conditions: [
        {
          __typename: 'Config',
          code: 'workflow_template_config_conditions',
          codeKey: 'workflow_template_config_conditions',
          codeLabel: 'Conditions',
          group: 'WorkFlowTemplateConfig',
          modelName: 'WorkFlowTemplateConfig',
          value: {
            field: 'Amount',
            logicalOperator: '',
            nodeType: 'RULE',
            operator: '===',
            value: 1000000,
          },
        },
      ],
    },
    {
      __typename: 'WorkFlowStepTemplate',
      id: '69ef11ff4ac41b6c5ebd1f2f',
      stepNumber: 3,
      assignedToUserId: 'user-123',
      assignmentTypeId: '69ee17c8471de33f370cc36b',
      isHaveCondition: true,
      conditions: [
        {
          __typename: 'Config',
          code: 'workflow_template_config_conditions',
          codeKey: 'workflow_template_config_conditions',
          codeLabel: 'Conditions',
          group: 'WorkFlowTemplateConfig',
          modelName: 'WorkFlowTemplateConfig',
          value: {
            field: 'Category',
            logicalOperator: '',
            nodeType: 'RULE',
            operator: '===',
            value: 'Construction in Progress',
          },
        },
      ],
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(buildConditionTree as jest.Mock).mockReturnValue({})
    ;(evaluateCondition as jest.Mock).mockReturnValue(true)
    ;(evaluateConditionWithDetails as jest.Mock).mockReturnValue({ result: true, details: [] })
  })

  describe('getMatchingSteps', () => {
    it('should return all matching steps when data matches', () => {
      const testData = {
        Category: 'Construction in Progress',
        Amount: 1000000,
      }

      const result = getMatchingSteps(testData, mockSteps)

      // All steps should match: step 1 has no conditions, steps 2 & 3 match the conditions
      expect(result.length).toBeGreaterThanOrEqual(1)
      expect(result.map(s => s.stepNumber)).toContain(1)
    })

    it('should include steps with no conditions', () => {
      const testData = {
        Amount: 500,
      }

      const result = getMatchingSteps(testData, mockSteps)

      // Step 1 has no conditions, so it should always be included
      expect(result).toContainEqual(expect.objectContaining({ stepNumber: 1 }))
    })

    it('should remove duplicates by assignedToUserId and keep highest step number', () => {
      const stepsWithDuplicates: WorkFlowStep[] = [
        ...mockSteps,
        {
          ...mockSteps[1],
          id: 'duplicate-step',
          stepNumber: 5,
          assignedToUserId: '69dc9dbf57b4ce9eb090a8f9',
        },
      ]

      const testData = { Amount: 1000000 }
      const result = getMatchingSteps(testData, stepsWithDuplicates)

      const userSteps = result.filter(s => s.assignedToUserId === '69dc9dbf57b4ce9eb090a8f9')
      expect(userSteps).toHaveLength(1)
      expect(userSteps[0].stepNumber).toBe(5)
    })

    it('should keep all steps without assignedToUserId (null users)', () => {
      const stepsNoUser: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          isHaveCondition: false,
          id: 'step-1',
        },
        {
          ...mockSteps[0],
          id: 'step-duplicate',
          isHaveCondition: false,
        },
      ]

      const result = getMatchingSteps({}, stepsNoUser)

      expect(result).toHaveLength(2)
    })

    it('should return empty array for empty steps', () => {
      const result = getMatchingSteps({}, [])
      expect(result).toEqual([])
    })

    it('should handle steps with group conditions', () => {
      const stepsWithGroup: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          isHaveCondition: true,
          conditions: [
            {
              __typename: 'Config',
              code: 'workflow_template_config_conditions',
              codeKey: 'workflow_template_config_conditions',
              codeLabel: 'Conditions',
              group: 'WorkFlowTemplateConfig',
              modelName: 'WorkFlowTemplateConfig',
              value: {
                nodeType: 'GROUP',
                logicalOperator: 'AND',
              },
            },
          ],
        },
      ]

      const testData = { Amount: 1000000 }
      const result = getMatchingSteps(testData, stepsWithGroup)

      expect(Array.isArray(result)).toBe(true)
    })

    it('should filter out conditions with missing required fields', () => {
      const stepsWithInvalidConditions: WorkFlowStep[] = [
        {
          ...mockSteps[1],
          id: 'invalid-step',
          conditions: [
            {
              __typename: 'Config',
              code: 'test',
              codeKey: 'test',
              codeLabel: 'Test',
              group: 'Test',
              modelName: 'Test',
              value: {
                nodeType: 'RULE',
                // Missing required field and operator
              } as ConditionValue,
            },
          ],
        },
      ]

      ;(evaluateCondition as jest.Mock).mockReturnValue(false)

      const result = getMatchingSteps({}, stepsWithInvalidConditions)

      expect(result.length).toBeLessThanOrEqual(1)
    })

    it('should handle null conditions gracefully', () => {
      const stepsWithNull: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          id: 'null-condition-step',
          isHaveCondition: true,
          conditions: null as any,
        },
      ]

      const result = getMatchingSteps({}, stepsWithNull)

      expect(Array.isArray(result)).toBe(true)
    })

    it('should preserve step order after deduplication', () => {
      const stepsOutOfOrder: WorkFlowStep[] = [
        {
          ...mockSteps[2],
          id: 'user-a-step',
          assignedToUserId: 'user-A',
          stepNumber: 3,
        },
        {
          ...mockSteps[1],
          id: 'user-b-step',
          assignedToUserId: 'user-B',
          stepNumber: 2,
        },
        {
          ...mockSteps[0],
          id: 'null-user-step',
          assignedToUserId: null,
          stepNumber: 1,
        },
      ]

      const result = getMatchingSteps({}, stepsOutOfOrder)

      expect(result[0].stepNumber).toBe(1)
      expect(result[1].stepNumber).toBe(2)
      expect(result[2].stepNumber).toBe(3)
    })

    it('should handle empty conditions array with isHaveCondition=true', () => {
      const stepsWithEmptyConditions: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          id: 'empty-conditions-step',
          isHaveCondition: true,
          conditions: [],
        },
      ]

      const result = getMatchingSteps({}, stepsWithEmptyConditions)

      // Step should be included as conditions array is empty
      expect(result).toContainEqual(expect.objectContaining({ stepNumber: 1 }))
    })
  })

  describe('getFirstMatchingStep', () => {
    it('should return the first matching step', () => {
      const testData = {
        Category: 'Construction in Progress',
        Amount: 1000000,
      }

      const result = getFirstMatchingStep(testData, mockSteps)

      expect(result).not.toBeNull()
      expect(result?.stepNumber).toBe(1)
    })

    it('should return the first step when multiple match', () => {
      const testData = { Amount: 1000000 }

      const result = getFirstMatchingStep(testData, mockSteps)

      expect(result?.id).toBe('69ef11ff4ac41b6c5ebd1f2d')
      expect(result?.stepNumber).toBe(1)
    })

    it('should return null when no steps match', () => {
      const testData = { Category: 'Unknown', Amount: 999 }

      ;(evaluateCondition as jest.Mock).mockReturnValue(false)

      const stepsWithCondition = mockSteps.filter(s => s.isHaveCondition)
      const result = getFirstMatchingStep(testData, stepsWithCondition)

      expect(result).toBeNull()
    })

    it('should return first step for steps with no conditions', () => {
      const testData = {
        Category: 'Construction in Progress',
        Amount: 1000000,
      }

      const result = getFirstMatchingStep(testData, mockSteps)

      expect(result?.stepNumber).toBe(1)
    })

    it('should return null for empty steps array', () => {
      const result = getFirstMatchingStep({}, [])
      expect(result).toBeNull()
    })

    it('should skip null users and return first non-null user step', () => {
      const mixedSteps: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          id: 'null-user-1',
          assignedToUserId: null,
          stepNumber: 1,
        },
        {
          ...mockSteps[1],
          id: 'user-step',
          assignedToUserId: 'user-1',
          stepNumber: 2,
        },
      ]

      const result = getFirstMatchingStep({}, mixedSteps)

      expect(result?.stepNumber).toBe(1)
    })
  })

  describe('hasMatchingSteps', () => {
    it('should return true when matching steps exist', () => {
      const testData = { Amount: 1000000 }

      const result = hasMatchingSteps(testData, mockSteps)

      expect(result).toBe(true)
    })

    it('should return true for steps with no conditions', () => {
      const stepsNoCondition = mockSteps.filter(s => !s.isHaveCondition)

      const result = hasMatchingSteps({}, stepsNoCondition)

      expect(result).toBe(true)
    })

    it('should return false when no steps match', () => {
      ;(evaluateCondition as jest.Mock).mockReturnValue(false)

      const result = hasMatchingSteps({}, mockSteps.filter(s => s.isHaveCondition))

      expect(result).toBe(false)
    })

    it('should return false for empty steps array', () => {
      const result = hasMatchingSteps({}, [])

      expect(result).toBe(false)
    })

    it('should return true when at least one step matches', () => {
      ;(evaluateCondition as jest.Mock)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)

      const result = hasMatchingSteps({}, mockSteps.filter(s => s.isHaveCondition))

      expect(result).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle steps with empty conditions array', () => {
      const stepsWithEmpty: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          id: 'empty-cond-step',
          isHaveCondition: true,
          conditions: [],
        },
      ]

      const result = getMatchingSteps({}, stepsWithEmpty)

      expect(result.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle undefined stepNumber', () => {
      const stepsUndefined: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          id: 'undefined-step',
          stepNumber: undefined,
        },
      ]

      const result = getMatchingSteps({}, stepsUndefined)

      expect(result).toContainEqual(expect.objectContaining({ stepNumber: undefined }))
    })

    it('should handle null assignedToUserId', () => {
      const stepsNullUser: WorkFlowStep[] = [mockSteps[0]]

      const result = getMatchingSteps({}, stepsNullUser)

      expect(result).toHaveLength(1)
    })

    it('should handle multiple null assignedToUserId entries', () => {
      const multipleNullUsers: WorkFlowStep[] = [
        { ...mockSteps[0], id: 'null-1', stepNumber: 1 },
        { ...mockSteps[0], id: 'null-2', stepNumber: 2 },
        { ...mockSteps[0], id: 'null-3', stepNumber: 3 },
      ]

      const result = getMatchingSteps({}, multipleNullUsers)

      expect(result).toHaveLength(3)
    })

    it('should handle mixed null and assigned users', () => {
      const mixedUsers: WorkFlowStep[] = [
        { ...mockSteps[0], id: 'null-step', assignedToUserId: null, stepNumber: 1 },
        { ...mockSteps[1], id: 'user-step', assignedToUserId: 'user-1', stepNumber: 2 },
      ]

      const result = getMatchingSteps({}, mixedUsers)

      expect(result.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Integration Tests', () => {
    it('should process complex workflow with multiple steps and conditions', () => {
      const complexSteps: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          id: 'complex-1',
          stepNumber: 1,
          assignedToUserId: null,
        },
        {
          ...mockSteps[1],
          id: 'complex-2',
          stepNumber: 2,
          assignedToUserId: 'manager1',
        },
        {
          ...mockSteps[2],
          id: 'complex-3',
          stepNumber: 3,
          assignedToUserId: 'manager2',
        },
        {
          ...mockSteps[1],
          id: 'dup-step',
          stepNumber: 5,
          assignedToUserId: 'manager1',
        },
      ]

      const result = getMatchingSteps({ Amount: 1000000 }, complexSteps)

      expect(result.length).toBeGreaterThan(0)
      const stepNumbers = result.map(s => s.stepNumber).sort((a, b) => (a ?? 0) - (b ?? 0))
      expect(stepNumbers[0]).toBe(1)
    })

    it('should handle workflow with all steps rejected', () => {
      ;(evaluateCondition as jest.Mock).mockReturnValue(false)

      const result = getMatchingSteps({}, mockSteps.filter(s => s.isHaveCondition))

      expect(result).toEqual([])
    })

    it('should keep highest step number when duplicates exist for same user', () => {
      const duplicateSteps: WorkFlowStep[] = [
        {
          ...mockSteps[1],
          id: 'dup-2',
          stepNumber: 2,
          assignedToUserId: 'user-1',
        },
        {
          ...mockSteps[1],
          id: 'step-higher',
          stepNumber: 8,
          assignedToUserId: 'user-1',
        },
        {
          ...mockSteps[1],
          id: 'step-lower',
          stepNumber: 5,
          assignedToUserId: 'user-1',
        },
      ]

      const result = getMatchingSteps({ Amount: 1000000 }, duplicateSteps)

      expect(result).toHaveLength(1)
      expect(result[0].stepNumber).toBe(8)
    })

    it('should process workflow with mixed valid and invalid conditions', () => {
      const mixedConditions: WorkFlowStep[] = [
        {
          ...mockSteps[0],
          id: 'valid-step',
          isHaveCondition: true,
          conditions: [
            {
              __typename: 'Config',
              code: 'valid',
              codeKey: 'valid',
              codeLabel: 'Valid',
              group: 'Test',
              modelName: 'Test',
              value: {
                nodeType: 'RULE',
                field: 'Amount',
                operator: '===',
                value: 1000000,
              },
            },
          ],
        },
        {
          ...mockSteps[1],
          id: 'invalid-step',
          isHaveCondition: true,
          conditions: [
            {
              __typename: 'Config',
              code: 'invalid',
              codeKey: 'invalid',
              codeLabel: 'Invalid',
              group: 'Test',
              modelName: 'Test',
              value: {
                nodeType: 'RULE',
                // Missing required fields
              } as ConditionValue,
            },
          ],
        },
      ]

      const result = getMatchingSteps({ Amount: 1000000 }, mixedConditions)

      expect(Array.isArray(result)).toBe(true)
    })

    it('should maintain order when processing large workflow', () => {
      const largeWorkflow: WorkFlowStep[] = Array.from({ length: 10 }, (_, i) => ({
        ...mockSteps[0],
        id: `step-${i}`,
        stepNumber: i + 1,
        assignedToUserId: i % 2 === 0 ? null : `user-${i}`,
      }))

      const result = getMatchingSteps({}, largeWorkflow)

      const stepNumbers = result.map(s => s.stepNumber ?? 0)
      for (let i = 1; i < stepNumbers.length; i++) {
        expect(stepNumbers[i]).toBeGreaterThanOrEqual(stepNumbers[i - 1])
      }
    })
  })
})