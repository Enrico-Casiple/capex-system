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