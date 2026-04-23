import { gql } from '@apollo/client';
export const BudgetFragment = gql`
fragment BudgetFragment on Budget {
  id
  fiscalYear
  statusId
  budgetRefNo
  companyId
  departmentId
  categoryId
  requesterId
  purpose
  specs
  quantity
  remark
  workflowTemplateId
  submittedAt
  approvedAt
  rejectedAt
  requestedAmount
  approvedAmount
  remainingAmount
  currency
  isFrozen
  freezeReason
  frozenAt
  isActive
  createdAt
  updatedAt
  budgetLedgers {
    budgetId
    typeId
    type {
      name
    }
  }
}
`;