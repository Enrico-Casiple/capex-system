import { DocumentNode, gql } from '@apollo/client';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type CrudConfig = {
  entity: string;
  fragment: DocumentNode;
  fragmentName: string;
};

// ─────────────────────────────────────────────────────────────
// BUILDER
// ─────────────────────────────────────────────────────────────

export class CrudGQLBuilder {
  private readonly entityName: string;
  private readonly entityFragment: DocumentNode;
  private readonly entityFragmentName: string;

  constructor({ entity, fragment, fragmentName }: CrudConfig) {
    this.entityName = entity;
    this.entityFragment = fragment;
    this.entityFragmentName = fragmentName;
  }

  // ─── Queries ───────────────────────────────────────────────

  get findAll() {
    return gql`
      query ${this.entityName}FindAll($paginationInput: ${this.entityName}PageInput!) {
        ${this.entityName}FindAll(paginationInput: $paginationInput) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
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
      ${this.entityFragment}
    `;
  }

  get findAllWithCursor() {
    return gql`
      query ${this.entityName}FindAllWithCursor($cursorInput: ${this.entityName}CursorPaginationInput!) {
        ${this.entityName}FindAllWithCursor(cursorInput: $cursorInput) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
          nextCursor
          prevCursor
          hasNextPage
          hasPrevPage
        }
      }
      ${this.entityFragment}
    `;
  }

  get findUnique() {
    return gql`
      query ${this.entityName}FindUnique($id: String!) {
        ${this.entityName}FindUnique(id: $id) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get findBy() {
    return gql`
      query ${this.entityName}FindBy($input: ${this.entityName}FindByInput!) {
        ${this.entityName}FindBy(input: $input) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get findFirst() {
    return gql`
      query ${this.entityName}FindFirst($input: ${this.entityName}FindFirstInput!) {
        ${this.entityName}FindFirst(input: $input) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get count() {
    return gql`
      query ${this.entityName}Count($input: ${this.entityName}CountInput!) {
        ${this.entityName}Count(input: $input) {
          isSuccess
          message
          code
          data
        }
      }
    `;
  }

  // ─── Mutations ─────────────────────────────────────────────

  get create() {
    return gql`
      mutation ${this.entityName}Create($data: ${this.entityName}CreateInput!, $currentUserId: String) {
        ${this.entityName}Create(data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get createMany() {
    return gql`
      mutation ${this.entityName}CreateMany($data: [${this.entityName}CreateInput!]!, $currentUserId: String) {
        ${this.entityName}CreateMany(data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get update() {
    return gql`
      mutation ${this.entityName}Update($id: String!, $data: ${this.entityName}UpdateInput!, $currentUserId: String) {
        ${this.entityName}Update(id: $id, data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get updateMany() {
    return gql`
      mutation ${this.entityName}UpdateMany($data: [${this.entityName}UpdateInput!]!, $currentUserId: String) {
        ${this.entityName}UpdateMany(data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get archive() {
    return gql`
      mutation ${this.entityName}Archive($id: String!, $currentUserId: String) {
        ${this.entityName}Archive(id: $id, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get archiveMany() {
    return gql`
      mutation ${this.entityName}ArchiveMany($ids: [String!]!, $currentUserId: String) {
        ${this.entityName}ArchiveMany(ids: $ids, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get restore() {
    return gql`
      mutation ${this.entityName}Restore($id: String!, $currentUserId: String) {
        ${this.entityName}Restore(id: $id, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get restoreMany() {
    return gql`
      mutation ${this.entityName}RestoreMany($ids: [String!]!, $currentUserId: String) {
        ${this.entityName}RestoreMany(ids: $ids, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get remove() {
    return gql`
      mutation ${this.entityName}Remove($id: String!, $currentUserId: String) {
        ${this.entityName}Remove(id: $id, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.entityFragmentName} }
        }
      }
      ${this.entityFragment}
    `;
  }

  get removeMany() {
    return gql`
      mutation ${this.entityName}RemoveMany($ids: [String!]!, $currentUserId: String) {
        ${this.entityName}RemoveMany(ids: $ids, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { id }
        }
      }
    `;
  }

  // ─── Subscriptions ─────────────────────────────────────────

  get subscription() {
    return gql`
      subscription ${this.entityName}Subscription {
        ${this.entityName}Subscription { ...${this.entityFragmentName} }
      }
      ${this.entityFragment}
    `;
  }
}

// ─────────────────────────────────────────────────────────────
// FACTORY
// ─────────────────────────────────────────────────────────────

const createCrudGQL = (config: CrudConfig) => new CrudGQLBuilder(config);

export default createCrudGQL;
export type { CrudConfig };
