import { gql } from '@apollo/client';
export const WorkInformationFragment = gql`
fragment WorkInformationFragment on WorkInformation {
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
  employee {
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
  employmentType {
    id
    name
    description
    modelNameType
    isActive
    createdAt
    updatedAt
  }
  employmentStatus {
    id
    name
    modelNameType
    isActive
    createdAt
    updatedAt
  }
  reportingManager {
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
  workLocation {
    id
    name
    description
    isActive
    createdAt
    updatedAt
  }
  workSetupType {
    id
    name
    description
    modelNameType
    isActive
    createdAt
    updatedAt
  }
  shiftingSchedule {
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
}
`;

export const WorkInformationFindAllWithCursor = gql`
  query WorkInformationFindAllWithCursor($cursorInput: WorkInformationCursorPaginationInput!) {
    WorkInformationFindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationFindAll = gql`
  query WorkInformationFindAll($paginationInput: WorkInformationPageInput!) {
    WorkInformationFindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
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
  ${WorkInformationFragment}
`;

export const WorkInformationCount = gql`
  query WorkInformationCount($input: WorkInformationCountInput!) {
    WorkInformationCount(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
`;

export const WorkInformationFindUnique = gql`
  query WorkInformationFindUnique($id: String!) {
    WorkInformationFindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationFindBy = gql`
  query WorkInformationFindBy($input: WorkInformationFindByInput!) {
    WorkInformationFindBy(input: $input) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationFindFirst = gql`
  query WorkInformationFindFirst($input: WorkInformationFindFirstInput!) {
    WorkInformationFindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationExportCsv = gql`
  query WorkInformationExportCsv($input: WorkInformationCsvExportInput!) {
    WorkInformationExportCsv(input: $input) {
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

export const WorkInformationGroupBy = gql`
  query WorkInformationGroupBy($input: WorkInformationGroupByInput!) {
    WorkInformationGroupBy(input: $input) {
      code
      data
      isSuccess
      message
    }
  }
`;


export const WorkInformationCreate = gql`
  mutation WorkInformationCreate($data: WorkInformationCreateInput!, $currentUserId: String) {
    WorkInformationCreate(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationCreateMany = gql`
  mutation WorkInformationCreateMany($data: [WorkInformationCreateInput!]!, $currentUserId: String) {
    WorkInformationCreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationUpdate = gql`
  mutation WorkInformationUpdate($id: String!, $data: WorkInformationUpdateInput!, $currentUserId: String) {
    WorkInformationUpdate(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationUpdateMany = gql`
  mutation WorkInformationUpdateMany($data: [WorkInformationUpdateInput!]!, $currentUserId: String) {
    WorkInformationUpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationArchive = gql`
  mutation WorkInformationArchive($id: String!, $currentUserId: String) {
    WorkInformationArchive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationArchiveMany = gql`
  mutation WorkInformationArchiveMany($ids: [String!]!, $currentUserId: String) {
    WorkInformationArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationRestore = gql`
  mutation WorkInformationRestore($id: String!, $currentUserId: String) {
    WorkInformationRestore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationRestoreMany = gql`
  mutation WorkInformationRestoreMany($ids: [String!]!, $currentUserId: String) {
    WorkInformationRestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...WorkInformationFragment }
    }
  }
  ${WorkInformationFragment}
`;

export const WorkInformationRemove = gql`
  mutation WorkInformationRemove($id: String!, $currentUserId: String) {
    WorkInformationRemove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const WorkInformationRemoveMany = gql`
  mutation WorkInformationRemoveMany($ids: [String!]!, $currentUserId: String) {
    WorkInformationRemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
`;

export const WorkInformationSubscription = gql`
  subscription WorkInformationSubscription {
    WorkInformationSubscription { ...WorkInformationFragment }
  }
  ${WorkInformationFragment}
`;