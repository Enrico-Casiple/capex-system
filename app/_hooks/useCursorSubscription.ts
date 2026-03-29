import { useSubscription } from '@apollo/client/react';
import { DocumentNode } from 'graphql';

type UseCursorSubscriptionProps<T> = {
  subscriptionDoc: DocumentNode;
  subscriptionKey: string;
  queryField: string;
  onNewData?: (newData: T) => void;
};

const useCursorSubscription = <T>({
  subscriptionDoc,
  subscriptionKey,
  queryField,
  onNewData,
}: UseCursorSubscriptionProps<T>) => {
  useSubscription<Record<string, T>>(subscriptionDoc, {
    onData({ client, data }) {
      const newData = data.data?.[subscriptionKey] as T | undefined;
      if (!newData) return;

      onNewData?.(newData);

      // Apollo's cache.modify with dynamic field names [queryField]
      // → TypeScript can't infer the exact cache shape at compile time
      // → Apollo's own docs use `any` for this pattern
      // → It's isolated in one place, not spreading through your codebase
      client.cache.modify({
        fields: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [queryField](existing: any = { data: [] }) {
            if (existing?.__ref) return existing;
            const existingData = Array.isArray(existing?.data) ? existing.data : [];
            return {
              ...existing,
              data: [newData, ...existingData],
            };
          },
        },
      });
    },
  });
};

export default useCursorSubscription;
