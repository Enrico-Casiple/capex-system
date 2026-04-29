import { gql } from '@apollo/client';
export const StatusFragment = gql`
fragment StatusFragment on Status {
  id
  name
  modelNameType
  isActive
  createdAt
  updatedAt
  workInformations {
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
  workFlowInstanceSteps {
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
  workFlowInstances {
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
  requestItems {
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
  crfStatus {
    id
    name
    description
    crfReferenceNo
    statusId
    companyId
    departmentId
    categoryId
    utilizedBudget
    approvedAmount
    requestedAmount
    newBalanceAmmount
    projectedBudget
    remark
    remainingAmount
    requestId
    budgetId
    isActive
    createdAt
    updatedAt
  }
}
`;

export const StatusFindAllWithCursor = gql`
  query StatusFindAllWithCursor($cursorInput: StatusCursorPaginationInput!) {
    StatusFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...StatusFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${StatusFragment}
`;

export const StatusFindAll = gql`
  query StatusFindAll($paginationInput: StatusPageInput!) {
    StatusFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...StatusFragment }
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
  ${StatusFragment}
`;

export const StatusCount = gql`
  query StatusCount($input: StatusCountInput!) {
    StatusCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const StatusFindUnique = gql`
  query StatusFindUnique($id: String!) {
    StatusFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusFindBy = gql`
  query StatusFindBy($input: StatusFindByInput!) {
    StatusFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusFindFirst = gql`
  query StatusFindFirst($input: StatusFindFirstInput!) {
    StatusFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusExportCsv = gql`
  query StatusExportCsv($input: StatusCsvExportInput!) {
    StatusExportCsv(input: $input) {
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

export const StatusGroupBy = gql`
  query StatusGroupBy($input: StatusGroupByInput!) {
    StatusGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const StatusCreate = gql`
  mutation StatusCreate($data: StatusCreateInput!, $currentUserId: String) {
    StatusCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusCreateMany = gql`
  mutation StatusCreateMany($data: [StatusCreateInput!]!, $currentUserId: String) {
    StatusCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusUpdate = gql`
  mutation StatusUpdate($id: String!, $data: StatusUpdateInput!, $currentUserId: String) {
    StatusUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusUpdateMany = gql`
  mutation StatusUpdateMany($data: [StatusUpdateInput!]!, $currentUserId: String) {
    StatusUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusArchive = gql`
  mutation StatusArchive($id: String!, $currentUserId: String) {
    StatusArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusArchiveMany = gql`
  mutation StatusArchiveMany($ids: [String!]!, $currentUserId: String) {
    StatusArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusRestore = gql`
  mutation StatusRestore($id: String!, $currentUserId: String) {
    StatusRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusRestoreMany = gql`
  mutation StatusRestoreMany($ids: [String!]!, $currentUserId: String) {
    StatusRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...StatusFragment }
    }
  }
  ${StatusFragment}
`;

export const StatusRemove = gql`
  mutation StatusRemove($id: String!, $currentUserId: String) {
    StatusRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const StatusRemoveMany = gql`
  mutation StatusRemoveMany($ids: [String!]!, $currentUserId: String) {
    StatusRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const StatusSubscription = gql`
  subscription StatusSubscription {
    StatusSubscription { ...StatusFragment }
  }
  ${StatusFragment}
`;