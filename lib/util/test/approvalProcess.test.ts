import {
  isStepApproved,
  isStepRejected,
  isPreviousStepsApproved,
  canApproveStep,
  getNextPendingStep,
} from '../approvalProcess'
import { WorkFlowInstanceStep } from '@/lib/generated/api/customHookAPI/graphql'

describe('Approval Process Utilities', () => {
  const mockSteps = [
    {
      id: 'step-1',
      stepNumber: 1,
      status: { name: 'Approved' },
      assignedToUser: { name: 'John', email: 'john@example.com' },
      assignedToUserId: 'user-1',
      instanceId: 'instance-1',
      isActive: true,
      isRequired: true,
      isEditable: false,
    },
    {
      id: 'step-2',
      stepNumber: 2,
      status: { name: 'Pending' },
      assignedToUser: { name: 'Jane', email: 'jane@example.com' },
      assignedToUserId: 'user-2',
      instanceId: 'instance-1',
      isActive: true,
      isRequired: true,
      isEditable: true,
    },
    {
      id: 'step-3',
      stepNumber: 3,
      status: { name: 'Pending' },
      assignedToUser: { name: 'Bob', email: 'bob@example.com' },
      assignedToUserId: 'user-3',
      instanceId: 'instance-1',
      isActive: true,
      isRequired: true,
      isEditable: false,
    },
  ] as WorkFlowInstanceStep[]

  describe('isStepApproved', () => {
    it('should return true if step status is Approved', () => {
      const result = isStepApproved(mockSteps[0])
      expect(result).toBe(true)
    })

    it('should return false if step status is not Approved', () => {
      const result = isStepApproved(mockSteps[1])
      expect(result).toBe(false)
    })

    it('should return false if step has no status', () => {
      const stepNoStatus = { ...mockSteps[0], status: null } as WorkFlowInstanceStep
      const result = isStepApproved(stepNoStatus)
      expect(result).toBe(false)
    })

    it('should handle undefined step', () => {
      const result = isStepApproved(undefined)
      expect(result).toBe(false)
    })

    it('should handle null step', () => {
      const result = isStepApproved(null)
      expect(result).toBe(false)
    })
  })

  describe('isStepRejected', () => {
    it('should return true if step status is Rejected', () => {
      const rejectedStep = { ...mockSteps[0], status: { name: 'Rejected' } } as WorkFlowInstanceStep
      const result = isStepRejected(rejectedStep)
      expect(result).toBe(true)
    })

    it('should return false if step status is not Rejected', () => {
      const result = isStepRejected(mockSteps[0])
      expect(result).toBe(false)
    })

    it('should handle null status', () => {
      const stepNoStatus = { ...mockSteps[0], status: null } as WorkFlowInstanceStep
      const result = isStepRejected(stepNoStatus)
      expect(result).toBe(false)
    })

    it('should handle undefined step', () => {
      const result = isStepRejected(undefined)
      expect(result).toBe(false)
    })

    it('should handle null step', () => {
      const result = isStepRejected(null)
      expect(result).toBe(false)
    })
  })

  describe('isPreviousStepsApproved', () => {
    it('should return true if all previous steps are approved', () => {
      // Index 1 has one previous step (index 0) which is Approved
      const result = isPreviousStepsApproved(mockSteps, 1)
      expect(result).toBe(true)
    })

    it('should return true for first step (no previous steps)', () => {
      const result = isPreviousStepsApproved(mockSteps, 0)
      expect(result).toBe(true)
    })

    it('should return false if any previous step is not approved', () => {
      const stepsWithPending = [
        { ...mockSteps[0], status: { name: 'Pending' } },
        mockSteps[1],
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      // Index 2 has previous steps that are not all approved
      const result = isPreviousStepsApproved(stepsWithPending, 2)
      expect(result).toBe(false)
    })

    it('should return false if any previous step is rejected', () => {
      const stepsWithRejected = [
        { ...mockSteps[0], status: { name: 'Rejected' } },
        mockSteps[1],
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      const result = isPreviousStepsApproved(stepsWithRejected, 2)
      expect(result).toBe(false)
    })

    it('should return true for empty steps array', () => {
      const result = isPreviousStepsApproved([], 0)
      expect(result).toBe(true)
    })
  })

  describe('canApproveStep', () => {
    it('should return true if user can approve step', () => {
      const result = canApproveStep(mockSteps[1], mockSteps, 1, 'user-2')
      expect(result).toBe(true)
    })

    it('should return false if step is not pending', () => {
      const result = canApproveStep(mockSteps[0], mockSteps, 0, 'user-1')
      expect(result).toBe(false)
    })

    it('should return false if user is not assigned to step', () => {
      const result = canApproveStep(mockSteps[1], mockSteps, 1, 'user-1')
      expect(result).toBe(false)
    })

    it('should return false if previous steps are not approved', () => {
      const stepsWithPending = [
        { ...mockSteps[0], status: { name: 'Pending' }, isActive: true, isRequired: true },
        mockSteps[1],
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      const result = canApproveStep(stepsWithPending[1], stepsWithPending, 1, 'user-2')
      expect(result).toBe(false)
    })

    it('should return false if any previous step is rejected', () => {
      const stepsWithRejected = [
        { ...mockSteps[0], status: { name: 'Rejected' }, isActive: true, isRequired: true },
        mockSteps[1],
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      const result = canApproveStep(stepsWithRejected[1], stepsWithRejected, 1, 'user-2')
      expect(result).toBe(false)
    })

    it('should return false if step is null', () => {
      const result = canApproveStep(null as any, mockSteps, 1, 'user-2')
      expect(result).toBe(false)
    })

    it('should return false if currentUserId is empty', () => {
      const result = canApproveStep(mockSteps[1], mockSteps, 1, '')
      expect(result).toBe(false)
    })
  })

  describe('getNextPendingStep', () => {
    it('should return the first pending step', () => {
      const result = getNextPendingStep(mockSteps)
      expect(result?.stepNumber).toBe(2)
      expect(result?.assignedToUserId).toBe('user-2')
    })

    it('should return null if no pending steps', () => {
      const allApprovedSteps = mockSteps.map((step) => ({
        ...step,
        status: { name: 'Approved' },
      })) as WorkFlowInstanceStep[]

      const result = getNextPendingStep(allApprovedSteps)
      expect(result).toBeNull()
    })

    it('should skip rejected steps and return next pending', () => {
      const stepsWithRejected = [
        { ...mockSteps[0], status: { name: 'Approved' }, isActive: true, isRequired: true },
        { ...mockSteps[1], status: { name: 'Rejected' }, isActive: true, isRequired: true },
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      const result = getNextPendingStep(stepsWithRejected)
      expect(result?.stepNumber).toBe(3)
    })

    it('should return null for empty steps array', () => {
      const result = getNextPendingStep([])
      expect(result).toBeNull()
    })

    it('should handle steps with null status', () => {
      const stepsWithNull = [
        { ...mockSteps[0], status: null, isActive: true, isRequired: true },
        mockSteps[1],
      ] as WorkFlowInstanceStep[]

      const result = getNextPendingStep(stepsWithNull)
      expect(result?.stepNumber).toBe(2)
    })

    it('should only return steps that are active and required', () => {
      const stepsWithInactive = [
        { ...mockSteps[0], status: { name: 'Approved' }, isActive: true, isRequired: true },
        { ...mockSteps[1], status: { name: 'Pending' }, isActive: false, isRequired: true },
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      const result = getNextPendingStep(stepsWithInactive)
      expect(result?.stepNumber).toBe(3)
    })
  })

  describe('Integration Tests', () => {
    it('should process complete approval workflow', () => {
      expect(isStepApproved(mockSteps[0])).toBe(true)
      expect(canApproveStep(mockSteps[1], mockSteps, 1, 'user-2')).toBe(true)
      expect(getNextPendingStep(mockSteps)?.stepNumber).toBe(2)
    })

    it('should handle rejection blocking workflow', () => {
      const stepsWithRejection = [
        { ...mockSteps[0], status: { name: 'Approved' }, isActive: true, isRequired: true },
        { ...mockSteps[1], status: { name: 'Rejected' }, isActive: true, isRequired: true },
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      expect(canApproveStep(stepsWithRejection[2], stepsWithRejection, 2, 'user-3')).toBe(false)
      expect(isStepRejected(stepsWithRejection[1])).toBe(true)
    })

    it('should sequence through complete workflow', () => {
      let steps = [...mockSteps] as WorkFlowInstanceStep[]

      expect(isStepApproved(steps[0])).toBe(true)

      let nextStep = getNextPendingStep(steps)
      expect(nextStep?.stepNumber).toBe(2)
      expect(canApproveStep(nextStep!, steps, 1, 'user-2')).toBe(true)

      steps = [
        steps[0],
        { ...steps[1], status: { name: 'Approved' }, isActive: true, isRequired: true },
        steps[2],
      ] as WorkFlowInstanceStep[]

      nextStep = getNextPendingStep(steps)
      expect(nextStep?.stepNumber).toBe(3)
      expect(canApproveStep(nextStep!, steps, 2, 'user-3')).toBe(true)
    })

    it('should handle workflow with multiple rejections', () => {
      const stepsWithMultipleRejections = [
        { ...mockSteps[0], status: { name: 'Rejected' }, isActive: true, isRequired: true },
        { ...mockSteps[1], status: { name: 'Pending' }, isActive: true, isRequired: true },
        mockSteps[2],
      ] as WorkFlowInstanceStep[]

      expect(canApproveStep(stepsWithMultipleRejections[1], stepsWithMultipleRejections, 1, 'user-2')).toBe(false)
    })

    it('should identify current approver correctly', () => {
      const nextStep = getNextPendingStep(mockSteps)
      expect(nextStep?.assignedToUserId).toBe('user-2')
      expect(canApproveStep(nextStep!, mockSteps, 1, 'user-2')).toBe(true)
    })
  })
})