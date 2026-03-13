import { Prisma } from '../../../generated/prisma/client';
import { builder } from '../../builder';
import { createInputRefs, pageInputRefs, updateInputRefs } from '../../Inputs';
import { getDatamodel } from '../../pothos-prisma-types';
import { checkRateLimit } from '../../rateLimiter';
import {
  deletedListResponseRef,
  paginationResponseRefs,
  responseListRefs,
  responseRefs,
} from '../../Response';
import { Context } from '../../subscription';
import services from '../Services';
import { ModelService } from '../Template/model.service';

// Helper to enforce rate limit and return error response if exceeded
const enforceRateLimit = async (ctx: Context, modelName: string) => {
  const consume = await checkRateLimit(ctx.session?.user?.email ?? 'anonymous');
  if (!consume.allowed) {
    return {
      isSuccess: false,
      message: `Rate limit exceeded. Please try again in ${consume.retryAfter} seconds.`,
      code: `${modelName.toUpperCase()}_RATE_LIMIT_EXCEEDED`,
      data: null,
      allCount: 0,
      active: 0,
      inActive: 0,
      pageinfo: null,
    };
  }
  console.log(
    `🚦 Rate limit check: ${consume.allowed ? 'Request allowed' : 'Rate limit exceeded'} for user email: ${ctx.session?.user?.email}`,
  );
  return null;
};

// Helper to check authentication and log, returns error response if not authenticated
const checkAuthentication = async (
  ctx: Context,
  modelName: string = 'User',
  service: ModelService<Prisma.ModelName>,
  skipForUserModel: boolean = false,
) => {
  console.log(
    `🛡️ ${modelName}: Checking user authentication by email: ${ctx.session?.user?.email}`,
  );
  const authWarning = await service.authenticate(ctx.session?.user?.id as string);
  if (modelName !== 'User' && !authWarning && !skipForUserModel) {
    return {
      isSuccess: false,
      message: `Authentication failed: ${'Unauthorized access'}`,
      code: `${modelName.toUpperCase()}_AUTHENTICATION_FAILED`,
      data: null,
      allCount: 0,
      active: 0,
      inActive: 0,
      pageinfo: null,
    };
  }
  if (modelName === 'User' && !authWarning && skipForUserModel) {
    return null;
  }
  if (!authWarning) {
    return {
      isSuccess: false,
      message: `Authentication failed: ${'Unauthorized access'}`,
      code: `${modelName.toUpperCase()}_AUTHENTICATION_FAILED`,
      data: null,
      allCount: 0,
      active: 0,
      inActive: 0,
      pageinfo: null,
    };
  }
  return null;
};

const prismaDataModel = getDatamodel();

// Auto-generate all queries and mutations for all models
Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  const model = modelName as Prisma.ModelName;
  const service = services[model];
  const subscriptionPublishName = `${modelName}Subscription`;

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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
        console.log(
          `🛡️ ${modelName}: FindUnique - Checking user authentication by email: ${ctx.session?.user?.email}`,
        );
        const authWarning = await service.authenticate(ctx.session?.user?.id as string);
        if (!authWarning) {
          return {
            isSuccess: false,
            message: `Authentication failed: ${'Unauthorized access'}`,
            code: `${modelName.toUpperCase()}_AUTHENTICATION_FAILED`,
            data: null,
          };
        }
        return await service.findUnique(args.id);
      },
    }),
  );

  // ─── MUTATION: create ─────────────────────────────────────────
  if (!createInputRefs[model]) return;

  builder.mutationField(`${modelName}Create`, (t) =>
    t.field({
      type: responseRefs[model],
      description: `Create a new ${modelName} record. Triggers a real-time subscription event on success.`,
      args: {
        data: t.arg({
          type: createInputRefs[model],
          required: true,
          description: `The input fields required to create a new ${modelName} record.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the create operation. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
        const result = await service.create({
          data: args.data,
          currentUserId: (ctx.session?.user?.id as string) ?? ctx.session?.user?.id,
        } as never);
        ctx.pubsub.publish(subscriptionPublishName, result.data);
        return result;
      },
    }),
  );

  // ─── MUTATION: createMany ─────────────────────────────────────
  if (!createInputRefs[model]) return;

  builder.mutationField(`${modelName}CreateMany`, (t) =>
    t.field({
      type: responseListRefs[model],
      description: `Create multiple ${modelName} records in a single operation. Each created record triggers an individual real-time subscription event.`,
      args: {
        data: t.arg({
          type: [createInputRefs[model]],
          required: true,
          description: `Array of input objects to create multiple ${modelName} records at once.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the bulk create. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
      description: `Update an existing ${modelName} record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success.`,
      args: {
        id: t.arg.string({
          required: true,
          description: `The unique identifier of the ${modelName} record to update.`,
        }),
        data: t.arg({
          type: updateInputRefs[model],
          required: true,
          description: `The fields to update on the ${modelName} record. Omitted fields remain unchanged.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the update. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
      description: `Update multiple ${modelName} records in a single operation. Each updated record triggers an individual real-time subscription event.`,
      args: {
        data: t.arg({
          type: [updateInputRefs[model]],
          required: true,
          description: `Array of update input objects. Each must include the record ID and the fields to change.`,
        }),
        currentUserId: t.arg.string({
          required: false,
          description: `(Optional) The ID of the user performing the bulk update. Defaults to 'system' if not provided.`,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        // Rate limit check
        const rateLimitError = await enforceRateLimit(ctx, modelName);
        if (rateLimitError) return rateLimitError;
        // Authentication check
        const authError = await checkAuthentication(ctx, modelName, service);
        if (authError) return authError;
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
        const authWarning = await service.authenticate(ctx.session?.user?.id as string);
        if (!authWarning) {
          throw new Error(`Authentication failed: ${'Unauthorized access'}`);
        }
        return ctx.pubsub.subscribe(subscriptionPublishName);
      },
      resolve: (query, payload) => payload,
    }),
  );
});
