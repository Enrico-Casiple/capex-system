import { builder } from '../builder';
import PrismaTypes, { getDatamodel } from '../pothos-prisma-types';

const prismaDataModel = getDatamodel();

export interface RESPONSE {
  code: string;
  isSuccess: boolean;
  message: string;
  data: PrismaTypes[keyof PrismaTypes]['Shape'] | null;
}
export interface LIST_RESPONSE {
  code: string;
  isSuccess: boolean;
  message: string;
  data: PrismaTypes[keyof PrismaTypes]['Shape'][] | null;
}

export interface COUNT_RESPONSE {
  code: string;
  isSuccess: boolean;
  message: string;
  data: number;
}

export interface DELETED_ITEM_RESPONSE {
  id: string; // Assuming this will return the ID of the deleted record
}

export interface DELETED_LIST_RESPONSE {
  code: string;
  isSuccess: boolean;
  message: string;
  data: DELETED_ITEM_RESPONSE[]; // Assuming this will return an array of deleted record IDs
}
export interface PAGE_INFO {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
export interface PAGINATION_RESPONSE {
  isSuccess: boolean;
  code: string;
  message: string;
  allCount: number;
  data: PrismaTypes[keyof PrismaTypes]['Shape'][] | null;
  active: number;
  inActive: number;
  pageinfo: PAGE_INFO | null;
}

export interface CSV_EXPORT_DATA {
  fileName: string;
  mimeType: string;
  csv: string;
  rowCount: number;
  excelFileName?: string;
  excelMimeType?: string;
  excelBase64?: string;
}

export interface CSV_EXPORT_RESPONSE {
  code: string;
  isSuccess: boolean;
  message: string;
  data: CSV_EXPORT_DATA | null;
}

export interface CURSOR_PAGINATION_RESPONSE {
  isSuccess: boolean;
  code: string;
  message: string;
  data: PrismaTypes[keyof PrismaTypes]['Shape'][] | null;
  nextCursor: string | null;
  prevCursor: string | null; // ← add this
  hasNextPage: boolean;
  hasPrevPage: boolean; // ← add this
}
export const responseSuffix = 'Response';
export const responseListSuffix = 'ListResponse';
export const responsePaginationSuffix = 'PaginationResponse';
export const responseDeletedListSuffix = 'DeletedListResponse';
export const responseCursorPaginationListSuffix = 'CursorPaginationResponse';
export const responseCountSuffix = 'CountResponse';
export const responseCsvExportSuffix = 'CsvExportResponse';

export const responseRefs: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const responseListRefs: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const paginationResponseRefs: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const deletedListResponseRef: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const cursorPaginationResponseRef: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const countResponseRef: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const csvExportResponseRef: Record<string, ReturnType<typeof builder.objectRef>> = {};

const PageInfo = builder.objectRef<PAGE_INFO>('PageInfo').implement({
  fields: (t) => ({
    hasNextPage: t.exposeBoolean('hasNextPage'),
    hasPreviousPage: t.exposeBoolean('hasPreviousPage'),
    pageSize: t.exposeInt('pageSize'),
    currentPage: t.exposeInt('currentPage'),
    totalPages: t.exposeInt('totalPages'),
    totalCount: t.exposeInt('totalCount'),
  }),
});

const DeletedItem = builder.objectRef<DELETED_ITEM_RESPONSE>('DeletedItem').implement({
  fields: (t) => ({
    id: t.exposeString('id', {
      description: 'Unique identifier of the deleted record.',
    }),
  }),
});

const CsvExportData = builder.objectRef<CSV_EXPORT_DATA>('CsvExportData').implement({
  fields: (t) => ({
    fileName: t.exposeString('fileName', {
      description: 'The name of the exported CSV file.',
    }),
    mimeType: t.exposeString('mimeType', {
      description: 'The MIME type of the exported file, typically "text/csv".',
    }),
    csv: t.exposeString('csv', {
      description: 'The CSV content of the exported file.',
    }),
    rowCount: t.exposeInt('rowCount', {
      description: 'The number of rows in the exported CSV file.',
    }),
    excelFileName: t.exposeString('excelFileName', {
      nullable: true,
      description: 'The name of the Excel-compatible exported file.',
    }),
    excelMimeType: t.exposeString('excelMimeType', {
      nullable: true,
      description: 'The MIME type of the Excel-compatible export.',
    }),
    excelBase64: t.exposeString('excelBase64', {
      nullable: true,
      description: 'Base64 encoded Excel-compatible file content.',
    }),
  }),
});

// Possible on this we can make a default response for each model, with code, message, isSuccess and data,
// where data is the model with the suffix Response, so we can have a default response for each model,
// and we can use it in the resolvers to return the response with the data of the model,
// and we can also add some custom fields to the response if needed.

// RESPONSE STRUCTURE: We can have a default response structure for each model, where we return the created/updated/deleted record along with the operation status and a message. This is useful for the create, update and delete mutations, where we want to return the result of the operation along with the data of the affected record.
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.objectRef<RESPONSE>(`${modelName}${responseSuffix}`);
    responseRefs[modelName] = ref;
    ref.implement({
      description: `Single record response wrapper for ${modelName}. Returns the created/updated/deleted ${modelName} record along with operation status.`,
      fields: (t) => ({
        code: t.exposeString('code', {
          description: `Operation result code for ${modelName}. e.g. '${modelName.toUpperCase()}_CREATE_SUCCESS' or '${modelName.toUpperCase()}_NOT_FOUND'.`,
        }),
        isSuccess: t.exposeBoolean('isSuccess', {
          description: `Indicates whether the ${modelName} operation was successful.`,
        }),
        message: t.exposeString('message', {
          description: `Human-readable message describing the result of the ${modelName} operation.`,
        }),
        data: t.prismaField({
          type: modelName as keyof PrismaTypes,
          nullable: true,
          description: `The ${modelName} record returned from the operation. Null if the operation failed.`,
          resolve: (query, parent) => parent.data,
        }),
      }),
    });
  } catch (error) {
    return {
      code: 'ERROR',
      isSuccess: false,
      message: `Failed to implement ${modelName}${responseSuffix}: ${error}`,
    };
  }
});

// LIST RESPONSE STRUCTURE: We can also have a list response for each model, where we return an array of records instead of a single record, and we can also add some custom fields to the list response if needed. This is useful for the findAll queries, where we want to return multiple records along with the operation status.
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.objectRef<LIST_RESPONSE>(`${modelName}${responseListSuffix}`);
    responseListRefs[modelName] = ref;
    ref.implement({
      description: `List response wrapper for ${modelName}. Returns multiple ${modelName} records along with operation status.`,
      fields: (t) => ({
        code: t.exposeString('code', {
          description: `Operation result code for the ${modelName} list operation. e.g. '${modelName.toUpperCase()}_CREATE_MANY_SUCCESS'.`,
        }),
        isSuccess: t.exposeBoolean('isSuccess', {
          description: `Indicates whether the ${modelName} list operation was successful.`,
        }),
        message: t.exposeString('message', {
          description: `Human-readable message describing the result of the ${modelName} list operation.`,
        }),
        data: t.prismaField({
          type: [modelName as keyof PrismaTypes],
          nullable: true,
          description: `Array of ${modelName} records returned from the operation. Null if the operation failed.`,
          resolve: (query, parent) => parent.data,
        }),
      }),
    });
  } catch (error) {
    return {
      code: 'ERROR',
      isSuccess: false,
      message: `Failed to implement ${modelName}${responseListSuffix}: ${error}`,
    };
  }
});

// COUNT RESPONSE STRUCTURE: We can also have a count response for each model, where we return a simple count of records instead of the records themselves. This is useful for queries that only need to know how many records match certain criteria.
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.objectRef<COUNT_RESPONSE>(`${modelName}${responseCountSuffix}`);
    countResponseRef[modelName] = ref;
    ref.implement({
      description: `Count response wrapper for ${modelName}. Returns the count of ${modelName} records matching the criteria.`,
      fields: (t) => ({
        code: t.exposeString('code', {
          description: `Operation result code for the ${modelName} count operation. e.g. '${modelName.toUpperCase()}_COUNT_SUCCESS'.`,
        }),
        isSuccess: t.exposeBoolean('isSuccess', {
          description: `Indicates whether the ${modelName} count operation was successful.`,
        }),
        message: t.exposeString('message', {
          description: `Human-readable message describing the result of the ${modelName} count operation.`,
        }),
        data: t.exposeInt('data', {
          description: `The count of ${modelName} records matching the criteria. Null if the operation failed.`,
        }),
      }),
    });
  } catch (error) {
    return {
      code: 'ERROR',
      isSuccess: false,
      message: `Failed to implement ${modelName}${responseCountSuffix}: ${error}`,
    };
  }
});

// PAGINATION RESPONSE STRUCTURE: We can also have a pagination response for each model, where we return an array of records along with pagination metadata and counts, and we can also add some custom fields to the pagination response if needed. This is useful for the findAll queries with pagination, where we want to return multiple records along with the operation status and pagination info.
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.objectRef<PAGINATION_RESPONSE>(`${modelName}${responsePaginationSuffix}`);
    paginationResponseRefs[modelName] = ref;
    ref.implement({
      description: `Paginated response wrapper for ${modelName}. Returns a paged list of ${modelName} records with pagination metadata and counts.`,
      fields: (t) => ({
        code: t.exposeString('code', {
          description: `Operation result code for the ${modelName} pagination query. e.g. '${modelName.toUpperCase()}_FETCH_SUCCESS'.`,
        }),
        isSuccess: t.exposeBoolean('isSuccess', {
          description: `Indicates whether the ${modelName} pagination query was successful.`,
        }),
        message: t.exposeString('message', {
          description: `Human-readable message describing the result of the ${modelName} pagination query.`,
        }),
        allCount: t.exposeInt('allCount', {
          description: `Total number of ${modelName} records in the database regardless of filters.`,
        }),
        active: t.exposeInt('active', {
          description: `Total number of active (isActive: true) ${modelName} records.`,
        }),
        inActive: t.exposeInt('inActive', {
          description: `Total number of inactive (isActive: false) ${modelName} records.`,
        }),
        data: t.prismaField({
          type: [modelName as keyof PrismaTypes],
          nullable: true,
          description: `The current page of ${modelName} records. Null if the query failed.`,
          resolve: (query, parent) => parent.data,
        }),
        pageinfo: t.field({
          type: PageInfo,
          nullable: true,
          description: `Pagination metadata including current page, total pages, and navigation flags for ${modelName}.`,
          resolve: (parent) => parent.pageinfo,
        }),
      }),
    });
  } catch (error) {
    return {
      code: 'ERROR',
      isSuccess: false,
      message: `Failed to implement ${modelName}${responsePaginationSuffix}: ${error}`,
    };
  }
});

// DELETED LIST RESPONSE STRUCTURE: We can also have a deleted list response for each model, where we return an array of deleted record IDs along with the operation status and a message. This is useful for the deleteMany mutations, where we want to return the IDs of the deleted records along with the operation status.
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.objectRef<DELETED_LIST_RESPONSE>(
      `${modelName}${responseDeletedListSuffix}`,
    );
    deletedListResponseRef[modelName] = ref;
    ref.implement({
      description: `Paginated response wrapper for ${modelName}. Returns a paged list of ${modelName} records with pagination metadata and counts.`,
      fields: (t) => ({
        code: t.exposeString('code', {
          description: `Operation result code for the ${modelName} pagination query. e.g. '${modelName.toUpperCase()}_FETCH_SUCCESS'.`,
        }),
        isSuccess: t.exposeBoolean('isSuccess', {
          description: `Indicates whether the ${modelName} pagination query was successful.`,
        }),
        message: t.exposeString('message', {
          description: `Human-readable message describing the result of the ${modelName} pagination query.`,
        }),
        data: t.field({
          type: [DeletedItem], // Assuming this will return an array of deleted record IDs
          nullable: true,
          description: `The current page of ${modelName} records. Null if the query failed.`,
          resolve: (parent) => parent.data,
        }),
      }),
    });
  } catch (error) {
    return {
      code: 'ERROR',
      isSuccess: false,
      message: `Failed to implement ${modelName}${responsePaginationSuffix}: ${error}`,
    };
  }
});

// CURSOR PAGINATION RESPONSE STRUCTURE: We can also have a cursor pagination response for each model, where we return an array of records along with cursor-based pagination metadata, and we can also add some custom fields to the cursor pagination response if needed. This is useful for the findAll queries with cursor pagination, where we want to return multiple records along with the operation status and cursor pagination info.
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.objectRef<CURSOR_PAGINATION_RESPONSE>(
      `${modelName}${responseCursorPaginationListSuffix}`,
    );
    cursorPaginationResponseRef[modelName] = ref;
    ref.implement({
      description: `Paginated response wrapper for ${modelName}. Returns a paged list of ${modelName} records with pagination metadata and counts.`,
      fields: (t) => ({
        code: t.exposeString('code', {
          description: `Operation result code for the ${modelName} pagination query. e.g. '${modelName.toUpperCase()}_FETCH_SUCCESS'.`,
        }),
        isSuccess: t.exposeBoolean('isSuccess', {
          description: `Indicates whether the ${modelName} pagination query was successful.`,
        }),
        message: t.exposeString('message', {
          description: `Human-readable message describing the result of the ${modelName} pagination query.`,
        }),
        data: t.prismaField({
          type: [modelName as keyof PrismaTypes],
          nullable: true,
          description: `The current page of ${modelName} records. Null if the query failed.`,
          resolve: (query, parent) => parent.data,
        }),
        nextCursor: t.exposeString('nextCursor', {
          description: `Cursor for fetching the next page of ${modelName} records. Null if there are no more pages.`,
        }),
        prevCursor: t.exposeString('prevCursor', {
          description: `Cursor for fetching the previous page of ${modelName} records. Null if there are no previous pages.`,
        }),
        hasNextPage: t.exposeBoolean('hasNextPage', {
          description: `Indicates if there is a next page of ${modelName} records available.`,
        }),
        hasPrevPage: t.exposeBoolean('hasPrevPage', {
          description: `Indicates if there is a previous page of ${modelName} records available.`,
        }),
      }),
    });
  } catch (error) {
    return {
      code: 'ERROR',
      isSuccess: false,
      message: `Failed to implement ${modelName}${responseCursorPaginationListSuffix}: ${error}`,
    };
  }
});

Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  try {
    const ref = builder.objectRef<CSV_EXPORT_RESPONSE>(`${modelName}${responseCsvExportSuffix}`);
    csvExportResponseRef[modelName] = ref;
    ref.implement({
      fields: (t) => ({
        code: t.exposeString('code', {
          description: `Operation result code for the ${modelName} CSV export operation. e.g. '${modelName.toUpperCase()}_CSV_EXPORT_SUCCESS'.`,
        }),
        isSuccess: t.exposeBoolean('isSuccess', {
          description: `Indicates whether the ${modelName} CSV export operation was successful.`,
        }),
        message: t.exposeString('message', {
          description: `Human-readable message describing the result of the ${modelName} CSV export operation.`,
        }),
        data: t.field({
          type: CsvExportData,
          nullable: true,
          description: `The result of the CSV export operation, including the file name, MIME type, CSV content, and row count. Null if the operation failed.`,
          resolve: (parent) => parent.data,
        }),
      }),
    });
  } catch (error) {
    return {
      code: 'ERROR',
      isSuccess: false,
      message: `Failed to implement ${modelName}${responseCsvExportSuffix}: ${error}`,
    };
  }
});
