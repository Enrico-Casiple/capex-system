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
export const responseSuffix = 'Response';
export const responseListSuffix = 'ListResponse';
export const responsePaginationSuffix = 'PaginationResponse';
export const responseDeletedListSuffix = 'DeletedListResponse';

export const responseRefs: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const responseListRefs: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const paginationResponseRefs: Record<string, ReturnType<typeof builder.objectRef>> = {};
export const deletedListResponseRef: Record<string, ReturnType<typeof builder.objectRef>> = {};

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

// Possible on this we can make a default response for each model, with code, message, isSuccess and data,
// where data is the model with the suffix Response, so we can have a default response for each model,
// and we can use it in the resolvers to return the response with the data of the model,
// and we can also add some custom fields to the response if needed.

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
