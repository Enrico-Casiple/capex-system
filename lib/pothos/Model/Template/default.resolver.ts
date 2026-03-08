import { builder } from '../../builder';

builder.queryType({
  fields: (t) => ({
    _dummy: t.string({
      resolve: () =>
        `This a dummy query to avoid the error "Type Query must define one or more fields."`,
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    _dummy: t.string({
      resolve: () =>
        'This a dummy mutation to avoid the error "Type Mutation must define one or more fields."',
    }),
  }),
});

builder.subscriptionType({
  fields: (t) => ({
    // This will return the timestamp every 1 sec continuously
    countdown: t.field({
      type: 'String',
      subscribe: async function* () {
        while (true) {
          const timestamp = new Date().toISOString();
          yield JSON.stringify({
            timeclock: timestamp,
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      },
      resolve: (value) => value,
    }),
  }),
});
