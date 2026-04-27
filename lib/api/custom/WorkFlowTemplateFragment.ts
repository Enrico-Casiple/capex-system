import { gql } from '@apollo/client';
export const WorkFlowTemplateFragment = gql`
fragment WorkFlowTemplateFragment on WorkFlowTemplate {
  id
  name
  description
  isGlobal
  version
  isActive
  createdAt
  updatedAt
  scope {
    id
    companyId
    company {
      name
    }
    departmentId
    department {
      name
    }
    positionId
    position {
      name
    }
    jobLevelId
    jobLevel {
      name
    }
  }
  steps {
    id
    stepNumber
    assignmentTypeId
    assignedToUserId
    isHaveCondition
    conditions {
      modelName
      group
      codeKey
      code
      codeLabel
      value
    }
  }
}
`;
