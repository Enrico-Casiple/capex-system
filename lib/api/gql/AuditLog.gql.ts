import { gql } from '@apollo/client';
export const AuditLogFragment = gql`
fragment AuditLogFragment on AuditLog {
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
  actionType {
    id
    name
    description
    modelNameType
    isActive
    createdAt
    updatedAt
  }
  actor {
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
  }
  holiday {
    id
    name
    date
    isRecurring
    description
    createdAt
    updatedAt
  }
  shiftSchedule {
    id
    name
    description
    startTime
    endTime
    lunchStart
    lunchEnd
    breakStart
    breakEnd
    workDays
    restDays
    workInformationId
    createdAt
    updatedAt
  }
  position {
    id
    name
    acronym
    description
    companyId
    isActive
    createdAt
    updatedAt
    scopeTypeId
  }
  jobLevel {
    id
    name
    description
    acronym
    jobcodeTypeId
    companyId
    isActive
    createdAt
    updatedAt
  }
  type {
    id
    name
    description
    modelNameType
    isActive
    createdAt
    updatedAt
  }
  status {
    id
    name
    modelNameType
    isActive
    createdAt
    updatedAt
  }
  location {
    id
    name
    description
    isActive
    createdAt
    updatedAt
  }
  user {
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
  }
  basicInformation {
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
  workInformation {
    id
    employeeNumber
    employeeId
    groupOfCompanyId
    companyId
    departmentId
    positionId
    jobLevelId
    employmentTypeId
    employmentStatusId
    reportingManagerId
    hireDate
    regularizationDate
    firstProbationEvaluationDate
    finalProbationEvaluationDate
    contractEndDate
    seasonalEndDate
    endDate
    workLocationId
    workSetupTypeId
    isActive
    createdAt
    updatedAt
  }
  groupOfCompany {
    id
    name
    acronym
    description
    industryTypeId
    headquartersId
    isActive
    createdAt
    updatedAt
  }
  company {
    id
    name
    acronym
    description
    groupOfCompanyId
    locationsid
    conctactNumber
    email
    logo
    scopeTypeId
    isActive
    createdAt
    updatedAt
  }
  department {
    id
    name
    acronym
    description
    companyId
    scopeTypeId
    isActive
    createdAt
    updatedAt
  }
  userRole {
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
  rolePermission {
    id
    roleId
    permissionId
    scopeValues
    isActive
    createdAt
    updatedAt
  }
  permission {
    id
    name
    description
    module
    resource
    action
    displayOrder
    isGlobal
    isAdmin
    globalLimit
    isActive
    createdAt
    updatedAt
  }
  role {
    id
    name
    description
    roleType
    isDefault
    parentRoleId
    isActive
    createdAt
    updatedAt
  }
  workFlowTemplate {
    id
    name
    description
    isGlobal
    version
    isActive
    createdAt
    updatedAt
  }
  configCondition {
    id
    configId
    nodeType
    logicalOperator
    field
    operator
    value
    parentConditionId
    isActive
    createdAt
    updatedAt
  }
  config {
    id
    modelName
    group
    codeKey
    code
    codeLabel
    value
    modelId
    sortOrder
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
  workFlowInstance {
    id
    templateId
    title
    description
    statusId
    currentStep
    referenceTypeId
    startedAt
    completedAt
    requestId
    budgetId
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
  signature {
    id
    instanceId
    stepId
    attachmentUrl
    userId
    signatureHash
    payload
    ipAddress
    userAgent
    isActive
    createdAt
    updatedAt
  }
  workFlowTemplateScope {
    id
    templateId
    companyId
    departmentId
    positionId
    jobLevelId
    isActive
    createdAt
    updatedAt
  }
  requestItem {
    id
    requestId
    statusId
    isPriceNeed
    itemId
    categoryId
    description
    quantity
    unitOfMeasure
    vatPercentage
    isInclusiveVat
    unitPrice
    amountGrossOfVat
    totalPrice
    attachmentUrl
    isActive
    createdAt
    updatedAt
  }
  budgetSnapshot {
    id
    budgetId
    approvedAmount
    committedAmount
    actualAmount
    availableAmount
    currency
    isActive
    createdAt
    updatedAt
  }
  budgetLedger {
    id
    budgetId
    typeId
    amount
    currency
    sourceTypeId
    sourceId
    referenceNo
    remark
    isActive
    createdAt
    updatedAt
  }
  budget {
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
  request {
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
  category {
    id
    name
    description
    acronym
    modelNameType
    isActive
    createdAt
    updatedAt
  }
  parent {
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
  inventoryItem {
    id
    name
    description
    companyId
    departmentId
    categoryId
    quantityInStock
    unitOfMeasure
    remainingStock
    isActive
    createdAt
    updatedAt
  }
}
`;

export const AuditLogFindAllWithCursor = gql`
  query AuditLogFindAllWithCursor($cursorInput: AuditLogCursorPaginationInput!) {
    AuditLogFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogFindAll = gql`
  query AuditLogFindAll($paginationInput: AuditLogPageInput!) {
    AuditLogFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
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
  ${AuditLogFragment}
`;

export const AuditLogCount = gql`
  query AuditLogCount($input: AuditLogCountInput!) {
    AuditLogCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const AuditLogFindUnique = gql`
  query AuditLogFindUnique($id: String!) {
    AuditLogFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogFindBy = gql`
  query AuditLogFindBy($input: AuditLogFindByInput!) {
    AuditLogFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogFindFirst = gql`
  query AuditLogFindFirst($input: AuditLogFindFirstInput!) {
    AuditLogFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogExportCsv = gql`
  query AuditLogExportCsv($input: AuditLogCsvExportInput!) {
    AuditLogExportCsv(input: $input) {
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

export const AuditLogGroupBy = gql`
  query AuditLogGroupBy($input: AuditLogGroupByInput!) {
    AuditLogGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const AuditLogCreate = gql`
  mutation AuditLogCreate($data: AuditLogCreateInput!, $currentUserId: String) {
    AuditLogCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogCreateMany = gql`
  mutation AuditLogCreateMany($data: [AuditLogCreateInput!]!, $currentUserId: String) {
    AuditLogCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogUpdate = gql`
  mutation AuditLogUpdate($id: String!, $data: AuditLogUpdateInput!, $currentUserId: String) {
    AuditLogUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogUpdateMany = gql`
  mutation AuditLogUpdateMany($data: [AuditLogUpdateInput!]!, $currentUserId: String) {
    AuditLogUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogArchive = gql`
  mutation AuditLogArchive($id: String!, $currentUserId: String) {
    AuditLogArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogArchiveMany = gql`
  mutation AuditLogArchiveMany($ids: [String!]!, $currentUserId: String) {
    AuditLogArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogRestore = gql`
  mutation AuditLogRestore($id: String!, $currentUserId: String) {
    AuditLogRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogRestoreMany = gql`
  mutation AuditLogRestoreMany($ids: [String!]!, $currentUserId: String) {
    AuditLogRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...AuditLogFragment }
    }
  }
  ${AuditLogFragment}
`;

export const AuditLogRemove = gql`
  mutation AuditLogRemove($id: String!, $currentUserId: String) {
    AuditLogRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const AuditLogRemoveMany = gql`
  mutation AuditLogRemoveMany($ids: [String!]!, $currentUserId: String) {
    AuditLogRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const AuditLogSubscription = gql`
  subscription AuditLogSubscription {
    AuditLogSubscription { ...AuditLogFragment }
  }
  ${AuditLogFragment}
`;