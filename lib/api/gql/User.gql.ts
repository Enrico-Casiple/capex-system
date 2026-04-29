import { gql } from '@apollo/client';
export const UserFragment = gql`
fragment UserFragment on User {
  id
  name
  email
  password
  userName
  emailVerified
  image
  isTwoFactorAuthEnabled
  otpCode
  emailOtpExpiresAt
  incrementalLoginAttempts
  isActive
  createdAt
  updatedAt
  basicInformations {
    id
    firstName
    middleName
    lastName
    suffix
    fullName
    birthDate
    gender
    phoneNumber
    address
    city
    province
    country
    userId
    isActive
    createdAt
    updatedAt
  }
  auditLogs {
    id
    modelId
    modelName
    action
    actionTypeId
    timestamp
    actorId
    oldDetails
    newDetails
    parentId
    isActive
    createdAt
    updatedAt
    inventoryItemId
  }
  actions {
    id
    modelId
    modelName
    action
    actionTypeId
    timestamp
    actorId
    oldDetails
    newDetails
    parentId
    isActive
    createdAt
    updatedAt
    inventoryItemId
  }
  userRoles {
    id
    userId
    roleId
    scopeTypeId
    scopeValues
    conditionOverrides
    assignedById
    expiresAt
    isActive
    createdAt
    updatedAt
  }
  userAssignedBy {
    id
    userId
    roleId
    scopeTypeId
    scopeValues
    conditionOverrides
    assignedById
    expiresAt
    isActive
    createdAt
    updatedAt
  }
  workFlowStepTemplate {
    id
    workflowTemplateId
    stepNumber
    assignmentTypeId
    assignedToUserId
    assignmentRules
    isHaveCondition
    isParallel
    requiredApprovals
    slaHours
    escalationRules
    esignatureRequired
    attachmentRequired
    isActive
    createdAt
    updatedAt
  }
  workFlowInstanceStep {
    id
    instanceId
    stepTemplateId
    stepNumber
    statusId
    assignedToUserId
    startedAt
    actionAt
    comments
    isEditable
    source
    isRequired
    isActive
    createdAt
    updatedAt
  }
  requester {
    id
    title
    description
    requestNumber
    requesterId
    companyId
    departmentId
    dateNeeded
    responsibilityCenterId
    quotationUrl
    quotationAmount
    currency
    workflowTemplateId
    approvedAt
    statusId
    isActive
    createdAt
    updatedAt
  }
  budgetRequester {
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
  }
}
`;

export const UserFindAllWithCursor = gql`
  query UserFindAllWithCursor($cursorInput: UserCursorPaginationInput!) {
    UserFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...UserFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${UserFragment}
`;

export const UserFindAll = gql`
  query UserFindAll($paginationInput: UserPageInput!) {
    UserFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...UserFragment }
      allCount
      active
      inActive
      pageinfo {
        hasNextPage
        hasPreviousPage
        pageSize
        currentPage
        totalPages
        totalCount
      }
    }
  }
  ${UserFragment}
`;

export const UserCount = gql`
  query UserCount($input: UserCountInput!) {
    UserCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const UserFindUnique = gql`
  query UserFindUnique($id: String!) {
    UserFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserFindBy = gql`
  query UserFindBy($input: UserFindByInput!) {
    UserFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserFindFirst = gql`
  query UserFindFirst($input: UserFindFirstInput!) {
    UserFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserExportCsv = gql`
  query UserExportCsv($input: UserCsvExportInput!) {
    UserExportCsv(input: $input) {
      code
      data {
        csv
        excelBase64
        excelFileName
        excelMimeType
        fileName
        mimeType
        rowCount
      }
      isSuccess
      message
    }
  }
`;

export const UserGroupBy = gql`
  query UserGroupBy($input: UserGroupByInput!) {
    UserGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const UserCreate = gql`
  mutation UserCreate($data: UserCreateInput!, $currentUserId: String) {
    UserCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserCreateMany = gql`
  mutation UserCreateMany($data: [UserCreateInput!]!, $currentUserId: String) {
    UserCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserUpdate = gql`
  mutation UserUpdate($id: String!, $data: UserUpdateInput!, $currentUserId: String) {
    UserUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserUpdateMany = gql`
  mutation UserUpdateMany($data: [UserUpdateInput!]!, $currentUserId: String) {
    UserUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserArchive = gql`
  mutation UserArchive($id: String!, $currentUserId: String) {
    UserArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserArchiveMany = gql`
  mutation UserArchiveMany($ids: [String!]!, $currentUserId: String) {
    UserArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserRestore = gql`
  mutation UserRestore($id: String!, $currentUserId: String) {
    UserRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserRestoreMany = gql`
  mutation UserRestoreMany($ids: [String!]!, $currentUserId: String) {
    UserRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...UserFragment }
    }
  }
  ${UserFragment}
`;

export const UserRemove = gql`
  mutation UserRemove($id: String!, $currentUserId: String) {
    UserRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const UserRemoveMany = gql`
  mutation UserRemoveMany($ids: [String!]!, $currentUserId: String) {
    UserRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const UserSubscription = gql`
  subscription UserSubscription {
    UserSubscription { ...UserFragment }
  }
  ${UserFragment}
`;