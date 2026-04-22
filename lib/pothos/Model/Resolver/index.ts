import authenticate from '../../../../lib/util/authenticate';
import { checkAuthentication } from '../../../../lib/util/checkAuthentication';
import { enforceRateLimit } from '../../../../lib/util/enforceRateLimit';
import { Prisma } from '../../../generated/prisma/client';
import { builder } from '../../builder';
import {
  countInputRefs,
  createInputRefs,
  csvExportInputRefs,
  cursorPaginationInputRefs,
  findByInputRefs,
  findFirstInputRefs,
  pageInputRefs,
  updateInputRefs,
} from '../../Inputs';
import { getDatamodel } from '../../pothos-prisma-types';
import {
  countResponseRef,
  csvExportResponseRef,
  cursorPaginationResponseRef,
  deletedListResponseRef,
  paginationResponseRefs,
  responseListRefs,
  responseRefs,
} from '../../Response';
import { Context } from '../../subscription';
import services from '../Services';
import { FindManyArgs, FindUniqueArgs } from '../Template/Types/prismaArgs.type';

const prismaDataModel = getDatamodel();
const middlewareCheck = async (
  ctx: Context,
  modelName: string,
  skipForUserModel: boolean = false,
  isNeeded: boolean = true,
) => {
  if (!isNeeded) return;
  const rateLimitError = await enforceRateLimit(ctx, modelName);
  if (rateLimitError) return rateLimitError;
  const authError = await checkAuthentication(ctx, modelName, skipForUserModel);
  if (authError) return authError;
};

// Auto-generate all queries and mutations for all models
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  const model = modelName as Prisma.ModelName;
  const service = services[model];
  const subscriptionPublishName = `${modelName}Subscription`;
  const createInputRef = createInputRefs[model];
  const updateInputRef = updateInputRefs[model];
  const csvExportInputRef = csvExportInputRefs[model];
  const csvExportResponseType = csvExportResponseRef[model];

  if (!paginationResponseRefs[model] || !pageInputRefs[model]) return;

  // ─── QUERY: findAll ───────────────────────────────────────────
  builder.queryField(`${modelName}FindAll`, (t) =>
    t.field({
      type: paginationResponseRefs[model],
      description: `Retrieve a paginated list of ${modelName} records. Supports filtering by active status, keyword search, and advanced JSON filters.`,
      args: {
        paginationInput: t.arg({
          type: pageInputRefs[model],
          required: true,
          description: `Pagination and filter options for the ${modelName} list query.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(
          `🔍 ${modelName}: FindAll - Received pagination request with input:`,
          args.paginationInput,
        );
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        try {
          return await service.findAll(args.paginationInput as never);
        } catch (error) {
          return {
            isSuccess: false,
            message: `Failed to retrieve ${modelName} records: ${error}`,
            code: `${modelName.toUpperCase()}_RETRIEVE_ALL_FAILED`,
            data: null,
            allCount: 0,
            active: 0,
            inActive: 0,
            pageinfo: null,
          };
        }
      },
    }),
  );

  // ─── QUERY: findAllWithCursor ───────────────────────────────────────────
  builder.queryField(`${modelName}FindAllWithCursor`, (t) =>
    t.field({
      type: cursorPaginationResponseRef[model],
      description: `Retrieve a paginated list of ${modelName} records using cursor-based pagination. Supports filtering by active status, keyword search, and advanced JSON filters.`,
      args: {
        cursorInput: t.arg({
          type: cursorPaginationInputRefs[model],
          required: true,
          description: `Cursor pagination and filter options for the ${modelName} list query.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(
          `🔍 ${modelName}: FindAllWithCursor - Received cursor pagination request with input:`,
          args.cursorInput,
        );
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        try {
          return await service.findAllWithCursor(args.cursorInput as never);
        } catch (error) {
          return {
            isSuccess: false,
            message: `Failed to retrieve ${modelName} records: ${error}`,
            code: `${modelName.toUpperCase()}_RETRIEVE_ALL_FAILED`,
            data: null,
            nextCursor: null,
            prevCursor: null,
            hasNextPage: false,
            hasPrevPage: false,
          };
        }
      },
    }),
  );

  // ─── QUERY: findUnique ────────────────────────────────────────
  if (!responseRefs[model]) return;
  builder.queryField(`${modelName}FindUnique`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Retrieve a single ${modelName} record by its unique ID.`,
      args: {
        id: t.arg.string({
          required: true,
          description: `The unique identifier of the ${modelName} record to retrieve.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(`🔍 ${modelName}: FindUnique - Received request for id:`, args.id);
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        return await service.findUnique(args.id);
      },
    }),
  );

  // ─── QUERY: findBy ───────────────────────────────────────────
  builder.queryField(`${modelName}FindBy`, (t) =>
    t.field({
      type: responseRefs[model],
      args: {
        input: t.arg({ type: findByInputRefs[model], required: true }),
      },
      resolve: async (_root, { input }, ctx) => {
        console.log(
          `🔍 ${modelName}: FindBy - Received with dynamic key and value request with input:`,
          input,
        );
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        return services[model].findBy(
          input.key as keyof FindUniqueArgs<typeof model>['where'],
          input.value,
        );
      },
    }),
  );

  // ─── QUERY: findFirst ───────────────────────────────────────────
  builder.queryField(`${modelName}FindFirst`, (t) =>
    t.field({
      type: responseRefs[model],
      args: {
        input: t.arg({ type: findFirstInputRefs[model], required: true }),
      },
      resolve: async (_root, { input }, ctx) => {
        console.log(
          `🔍 ${modelName}: FindFirst - Received where clause request with input:`,
          input,
        );
        const middlewareError = await middlewareCheck(ctx, modelName, true);
        if (middlewareError) return middlewareError;
        return services[model].findFirst(input.where as FindManyArgs<typeof model>['where']);
      },
    }),
  );

  // ─── QUERY: count ───────────────────────────────────────────
  builder.queryField(`${modelName}Count`, (t) =>
    t.field({
      type: countResponseRef[model],
      args: {
        input: t.arg({ type: countInputRefs[model], required: true }),
      },
      resolve: async (_root, { input }, ctx) => {
        console.log(`🔍 ${modelName}: Count - Received count request with input:`, input);
        const middlewareError = await middlewareCheck(ctx, modelName, true);
        if (middlewareError) return middlewareError;
        return services[model].count(input.where as FindManyArgs<typeof model>['where']);
      },
    }),
  );

  // ───  QUERY: export  ─────────────────────────────────
  if (csvExportInputRef && csvExportResponseType) {
    builder.queryField(`${modelName}ExportCsv`, (t) =>
      t.field({
        type: csvExportResponseType,
        args: {
          input: t.arg({ type: csvExportInputRef, required: true }),
        },
        resolve: async (_parent, args, ctx) => {
          const middlewareError = await middlewareCheck(ctx, modelName);
          if (middlewareError) return middlewareError;
          return await service.exportCsv(args.input as never);
        },
      }),
    );

    // Also expose as ExportExcel for Excel format exports
    builder.queryField(`${modelName}ExportExcel`, (t) =>
      t.field({
        type: csvExportResponseType,
        args: {
          input: t.arg({ type: csvExportInputRef, required: true }),
        },
        resolve: async (_parent, args, ctx) => {
          const middlewareError = await middlewareCheck(ctx, modelName);
          if (middlewareError) return middlewareError;
          return await service.exportCsv(args.input as never);
        },
      }),
    );
  }

  // ─── MUTATION: create ─────────────────────────────────────────
  if (!updateInputRef) return;

  builder.mutationField(`${modelName}Create`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Create a new ${modelName} record using Prisma ${modelName}CreateInput format. Triggers a real-time subscription event on success.`,
      args: {
        data: t.arg({
          type: 'Json',
          required: true,
          description: `JSON object matching Prisma.${modelName}CreateInput structure. Accepts: scalars, nested create/connect/connectOrCreate, and list operations.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the create operation. Defaults to current session user.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(`✏️ ${modelName}: Create - Received create request with data:`, args.data);
        const middlewareError = await middlewareCheck(ctx, modelName, true);
        if (middlewareError) return middlewareError;
        const result = await service.create({
          data: args.data,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        ctx.pubsub.publish(subscriptionPublishName, result.data);
        return result;
      },
    }),
  );

  // ─── MUTATION: createMany ─────────────────────────────────────
  builder.mutationField(`${modelName}CreateMany`, (t) =>
    t.field({
      type: responseListRefs[model],
      description: `Create multiple ${modelName} records in a single operation. Each record must match Prisma ${modelName}CreateInput. Each created record triggers an individual real-time subscription event.`,
      args: {
        data: t.arg({
          type: ['Json'],
          required: true,
          description: `Array of JSON objects, each matching Prisma.${modelName}CreateInput structure.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the bulk create. Defaults to current session user.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(
          `✏️ ${modelName}: CreateMany - Received bulk create request with data:`,
          args.data,
        );
        const middlewareError = await middlewareCheck(ctx, modelName, true);
        if (middlewareError) return middlewareError;
        const result = await service.createMany({
          data: args.data,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);

        if (result.isSuccess && Array.isArray(result.data)) {
          result.data.forEach((record) => {
            ctx.pubsub.publish(subscriptionPublishName, record);
          });
        }

        return result;
      },
    }),
  );

  // ─── MUTATION: update ─────────────────────────────────────────
  builder.mutationField(`${modelName}Update`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Update an existing ${modelName} record by ID. Data must match Prisma ${modelName}UpdateInput structure. Triggers a real-time subscription event on success.`,
      args: {
        id: t.arg.string({
          required: true,
          description: `The unique identifier of the ${modelName} record to update.`,
        }),
        data: t.arg({
          type: 'Json',
          required: true,
          description: `JSON object matching Prisma.${modelName}UpdateInput structure. All fields are optional. Supports nested update/connect/connectOrCreate/upsert.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the update. Defaults to current session user.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(`✏️ ${modelName}: Update - Received update request for id:`, args.id);
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;

        // removing the deleteMany and delete
        if(args.data.deleteMany || args.data.delete) {
          return {
            isSuccess: false,
            message: `Direct delete operations are not allowed in update. Please use the dedicated archive or remove mutations.`,
            code: `${modelName.toUpperCase()}_UPDATE_FAILED`,
            data: null,
          };
        }

        const result = await service.update({
          data: { ...args.data, id: args.id },
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        ctx.pubsub.publish(subscriptionPublishName, result.data);
        return result;
      },
    }),
  );

  // ─── MUTATION: updateMany ─────────────────────────────────────
  builder.mutationField(`${modelName}UpdateMany`, (t) =>
    t.field({
      type: responseListRefs[model],
      description: `Update multiple ${modelName} records in a single operation. Each record must include the ID and fields to update. Each updated record triggers an individual real-time subscription event.`,
      args: {
        data: t.arg({
          type: ['Json'],
          required: true,
          description: `Array of JSON objects matching Prisma.${modelName}UpdateInput. Each must include 'id' field.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the bulk update. Defaults to current session user.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(
          `✏️ ${modelName}: UpdateMany - Received bulk update request with data:`,
          args.data,
        );
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;

        if(args.data.some((item: any) => item.deleteMany || item.delete)) {
          return {
            isSuccess: false,
            message: `Direct delete operations are not allowed in update. Please use the dedicated archive or remove mutations.`,
            code: `${modelName.toUpperCase()}_BULK_UPDATE_FAILED`,
            data: null,
          };
        }

        const result = await service.updateMany({
          data: args.data,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        if (result.isSuccess && Array.isArray(result.data)) {
          result.data.forEach((record) => {
            ctx.pubsub.publish(subscriptionPublishName, record);
          });
        }
        return result;
      },
    }),
  );

  // ─── MUTATION: archive ────────────────────────────────────────
  builder.mutationField(`${modelName}Archive`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Soft-delete a ${modelName} record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success.`,
      args: {
        id: t.arg.string({
          required: true,
          description: `The unique identifier of the ${modelName} record to archive.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the archive. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(`🗄️ ${modelName}: Archive - Received archive request for id:`, args.id);
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        const result = await service.archive({
          id: args.id,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        ctx.pubsub.publish(subscriptionPublishName, result.data);
        return result;
      },
    }),
  );

  // ─── MUTATION: archiveMany ────────────────────────────────────
  builder.mutationField(`${modelName}ArchiveMany`, (t) =>
    t.field({
      type: responseListRefs[model],
      description: `Soft-delete multiple ${modelName} records by setting them as inactive. Each archived record triggers an individual real-time subscription event.`,
      args: {
        ids: t.arg.stringList({
          required: true,
          description: `Array of unique identifiers of the ${modelName} records to archive.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the bulk archive. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(
          `🗄️ ${modelName}: ArchiveMany - Received bulk archive request for ids:`,
          args.ids,
        );
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        const result = await service.archiveMany({
          ids: args.ids,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        if (result.isSuccess && Array.isArray(result.data)) {
          result.data.forEach((record) => {
            ctx.pubsub.publish(subscriptionPublishName, record);
          });
        }
        return result;
      },
    }),
  );

  // ─── MUTATION: restore ────────────────────────────────────────
  builder.mutationField(`${modelName}Restore`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Restore a previously archived ${modelName} record by setting it back to active. Triggers a real-time subscription event on success.`,
      args: {
        id: t.arg.string({
          required: true,
          description: `The unique identifier of the ${modelName} record to restore.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the restore. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(`🗄️ ${modelName}: Restore - Received restore request for id:`, args.id);
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        const result = await service.restore({
          id: args.id,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        ctx.pubsub.publish(subscriptionPublishName, result.data);
        return result;
      },
    }),
  );

  // ─── MUTATION: restoreMany ────────────────────────────────────
  builder.mutationField(`${modelName}RestoreMany`, (t) =>
    t.field({
      type: responseListRefs[model],
      description: `Restore multiple previously archived ${modelName} records back to active. Each restored record triggers an individual real-time subscription event.`,
      args: {
        ids: t.arg.stringList({
          required: true,
          description: `Array of unique identifiers of the ${modelName} records to restore.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the bulk restore. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(
          `🗄️ ${modelName}: RestoreMany - Received bulk restore request for ids:`,
          args.ids,
        );
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        const result = await service.restoreMany({
          ids: args.ids,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        if (result.isSuccess && Array.isArray(result.data)) {
          result.data.forEach((record) => {
            ctx.pubsub.publish(subscriptionPublishName, record);
          });
        }
        return result;
      },
    }),
  );

  // ─── MUTATION: remove ─────────────────────────────────────────
  builder.mutationField(`${modelName}Remove`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Permanently delete a ${modelName} record by ID. This action is irreversible. Triggers a real-time subscription event on success.`,
      args: {
        id: t.arg.string({
          required: true,
          description: `The unique identifier of the ${modelName} record to permanently delete.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the delete. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(`🗄️ ${modelName}: Remove - Received delete request for id:`, args.id);
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        const result = await service.remove({
          id: args.id,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        ctx.pubsub.publish(subscriptionPublishName, result.data);
        return result;
      },
    }),
  );

  // ─── MUTATION: removeMany ─────────────────────────────────────
  builder.mutationField(`${modelName}RemoveMany`, (t) =>
    t.field({
      type: deletedListResponseRef[model],
      description: `Permanently delete multiple ${modelName} records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event.`,
      args: {
        ids: t.arg.stringList({
          required: true,
          description: `Comma-separated or array of unique identifiers of the ${modelName} records to permanently delete.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the bulk delete. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        console.log(
          `🗄️ ${modelName}: RemoveMany - Received bulk delete request for ids:`,
          args.ids,
        );
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        const result = await service.removeMany({
          ids: args.ids,
          currentUserId: (ctx.session?.user?.id as string) ?? 'system',
        } as never);
        if (result.isSuccess && Array.isArray(result.data)) {
          result.data.forEach((record) => {
            ctx.pubsub.publish(subscriptionPublishName, record);
          });
        }
        return result;
      },
    }),
  );

  // ─── MUTATION: removeAll ─────────────────────────────────────
  builder.mutationField(`${modelName}RemoveAll`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Permanently delete all ${modelName} records. This action is irreversible. Triggers a real-time subscription event on success.`,
      resolve: async (_parent, args, ctx) => {
        console.log(`🗄️ ${modelName}: RemoveAll - Received remove all request`);
        const middlewareError = await middlewareCheck(ctx, modelName);
        if (middlewareError) return middlewareError;
        const result = await service.removeAll();
        ctx.pubsub.publish(subscriptionPublishName, result.data);
        return result;
      },
    }),
  );

  // ─── SUBSCRIPTION: onChange ─────────────────────────────────
  builder.subscriptionField(subscriptionPublishName, (t) =>
    t.prismaField({
      type: model,
      description: `Real-time subscription for ${modelName} changes. Emits an event whenever a ${modelName} record is created, updated, archived, restored, or deleted.`,
      subscribe: async (root, args, ctx) => {
        console.log(
          `🔔 ${modelName}: Subscribing to ${subscriptionPublishName} with user email:`,
          ctx.session?.user?.email,
        );
        const authWarning = await authenticate(ctx.session?.user?.id as string);
        if (!authWarning) {
          throw new Error(`Authentication failed: ${'Unauthorized access'}`);
        }
        return ctx.pubsub.subscribe(subscriptionPublishName);
      },
      resolve: (query, payload) => payload,
    }),
  );
});
