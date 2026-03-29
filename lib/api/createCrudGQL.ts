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

class CrudGQLBuilder {
  private readonly e: string;
  private readonly f: DocumentNode;
  private readonly fn: string;

  constructor({ entity, fragment, fragmentName }: CrudConfig) {
    this.e = entity;
    this.f = fragment;
    this.fn = fragmentName;
  }

  // ─── Queries ───────────────────────────────────────────────

  get findAll() {
    return gql`
      query ${this.e}FindAll($paginationInput: ${this.e}PageInput!) {
        ${this.e}FindAll(paginationInput: $paginationInput) {
          isSuccess
          message
          code
          data { ...${this.fn} }
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
      ${this.f}
    `;
  }

  get findAllWithCursor() {
    return gql`
      query ${this.e}FindAllWithCursor($cursorInput: ${this.e}CursorPaginationInput!) {
        ${this.e}FindAllWithCursor(cursorInput: $cursorInput) {
          isSuccess
          message
          code
          data { ...${this.fn} }
          nextCursor
          prevCursor
          hasNextPage
          hasPrevPage
        }
      }
      ${this.f}
    `;
  }

  get findUnique() {
    return gql`
      query ${this.e}FindUnique($id: String!) {
        ${this.e}FindUnique(id: $id) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get findBy() {
    return gql`
      query ${this.e}FindBy($input: ${this.e}FindByInput!) {
        ${this.e}FindBy(input: $input) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get findFirst() {
    return gql`
      query ${this.e}FindFirst($input: ${this.e}FindFirstInput!) {
        ${this.e}FindFirst(input: $input) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  // ─── Mutations ─────────────────────────────────────────────

  get create() {
    return gql`
      mutation ${this.e}Create($data: ${this.e}CreateInput!, $currentUserId: String) {
        ${this.e}Create(data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get createMany() {
    return gql`
      mutation ${this.e}CreateMany($data: [${this.e}CreateInput!]!, $currentUserId: String) {
        ${this.e}CreateMany(data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get update() {
    return gql`
      mutation ${this.e}Update($id: String!, $data: ${this.e}UpdateInput!, $currentUserId: String) {
        ${this.e}Update(id: $id, data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get updateMany() {
    return gql`
      mutation ${this.e}UpdateMany($data: [${this.e}UpdateInput!]!, $currentUserId: String) {
        ${this.e}UpdateMany(data: $data, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get archive() {
    return gql`
      mutation ${this.e}Archive($id: String!, $currentUserId: String) {
        ${this.e}Archive(id: $id, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get archiveMany() {
    return gql`
      mutation ${this.e}ArchiveMany($ids: [String!]!, $currentUserId: String) {
        ${this.e}ArchiveMany(ids: $ids, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get restore() {
    return gql`
      mutation ${this.e}Restore($id: String!, $currentUserId: String) {
        ${this.e}Restore(id: $id, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get restoreMany() {
    return gql`
      mutation ${this.e}RestoreMany($ids: [String!]!, $currentUserId: String) {
        ${this.e}RestoreMany(ids: $ids, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get remove() {
    return gql`
      mutation ${this.e}Remove($id: String!, $currentUserId: String) {
        ${this.e}Remove(id: $id, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  get removeMany() {
    return gql`
      mutation ${this.e}RemoveMany($ids: [String!]!, $currentUserId: String) {
        ${this.e}RemoveMany(ids: $ids, currentUserId: $currentUserId) {
          isSuccess
          message
          code
          data { ...${this.fn} }
        }
      }
      ${this.f}
    `;
  }

  // ─── Subscription ──────────────────────────────────────────

  get subscription() {
    return gql`
      subscription ${this.e}Subscription {
        ${this.e}Subscription {
          id
        }
      }
    `;
  }
}

// ─────────────────────────────────────────────────────────────
// FACTORY
// ─────────────────────────────────────────────────────────────

const createCrudGQL = (config: CrudConfig) => new CrudGQLBuilder(config);

export default createCrudGQL;
export type { CrudConfig };
