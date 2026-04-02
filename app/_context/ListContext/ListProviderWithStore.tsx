// components/ListProvider.tsx
/* eslint-disable react-hooks/incompatible-library */
'use client';
import { createListStore, ListStoreApi } from '@/app/_store/list.store';
import { ModelGQLMap } from '@/lib/api/crud.gql';
import { Subscription } from '@/lib/generated/api/customHookAPI/graphql';
import { cn } from '@/lib/utils';
import { OperationVariables } from '@apollo/client';
import { useQuery, useSubscription } from '@apollo/client/react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { LoaderIcon } from 'lucide-react';
import { createContext, useContext, useMemo, useRef } from 'react';
import { useStore } from 'zustand';

// ─── Helper ────────────────────────────────────────────────────
const resolveUpdater = <T,>(updater: T | ((old: T) => T), current: T): T =>
  typeof updater === 'function' ? (updater as (old: T) => T)(current) : updater;

// ─── Cursor Response Shape ─────────────────────────────────────
export type CursorResponse<TModel> = {
  __typename?: string;
  isSuccess: boolean;
  message: string;
  code: string;
  data: TModel[];
};

export type CursorQuery<TModel, TCursorKey extends string> = {
  [K in TCursorKey]: CursorResponse<TModel>;
};

// ─── Store Context ─────────────────────────────────────────────
const ListStoreContext = createContext<ListStoreApi | null>(null);

export const useListStore = <T,>(selector: (state: ReturnType<ListStoreApi['getState']>) => T) => {
  const store = useContext(ListStoreContext);
  if (!store) throw new Error('useListStore must be used within ListProvider');
  return useStore(store, selector);
};

// ─── Table Context ─────────────────────────────────────────────
type ListTableContextValue<TModel = unknown, TCursorKey extends string = string> = {
  table: ReturnType<typeof useReactTable<TModel>>;
  allRecordData: TModel[];
  returnQuery: ReturnType<typeof useQuery<CursorQuery<TModel, TCursorKey>>>;
  cursorKey: TCursorKey; // ← expose cursorKey so children can use typeof
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListTableContext = createContext<ListTableContextValue<any, any> | null>(null);

export const useListTable = <TModel = unknown, TCursorKey extends string = string>() => {
  const ctx = useContext(ListTableContext) as ListTableContextValue<TModel, TCursorKey> | null;
  if (!ctx) throw new Error('useListTable must be used within ListProvider');
  return ctx;
};

// ─── Props ─────────────────────────────────────────────────────
interface ListProviderWithStoreProps<TModel, TCursorKey extends string> {
  children?: React.ReactNode;
  singleKey: string;
  cursorKey: TCursorKey;
  subscriptionKey: keyof Subscription;
  modelGQL: ModelGQLMap;
  model: keyof ModelGQLMap;
  initialFilter: Record<string, unknown>;
  initialColumnVisibility: Record<string, boolean>;
  columns: ColumnDef<TModel, unknown>[];
}

// ─── Provider ──────────────────────────────────────────────────
const ListProviderWithStore = <TModel, TCursorKey extends string>(
  props: ListProviderWithStoreProps<TModel, TCursorKey>,
) => {
  const storeRef = useRef<ListStoreApi<TModel>>(null);
  if (!storeRef.current) {
    storeRef.current = createListStore<TModel>({
      singleKey: props.singleKey,
      cursorKey: props.cursorKey,
      subscriptionKey: props.subscriptionKey,
      modelGQL: props.modelGQL,
      model: props.model,
      columns: props.columns,
      initialFilter: props.initialFilter,
      initialColumnVisibility: props.initialColumnVisibility,
    });
  }

  const state = storeRef.current.getState();
  const { setColumnVisibility, setPaginationPageIndex } = storeRef.current.getState();

  const returnQuery = useQuery<CursorQuery<TModel, TCursorKey>, Record<string, OperationVariables>>(
    props.modelGQL[props.model].findAllWithCursor,
    {
      variables: {
        cursorInput: {
          cursor: state.cursor,
          isActive: state.active,
          take: state.take,
          filter: state.filter,
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSubscription<any>(props.modelGQL[props.model].subscription, {
    onData(options) {
      const newData = options.data.data?.[props.subscriptionKey];
      if (!newData) return;
      options.client.cache.modify({
        fields: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [props.cursorKey](existing: any = { data: [] }) {
            if (existing?.__ref) return existing;
            const existingData = Array.isArray(existing?.data) ? existing.data : [];
            return { ...existing, data: [newData, ...existingData] };
          },
        },
      });
    },
  });

  const allRecordData = useMemo<TModel[]>(() => {
    const result = returnQuery.data?.[props.cursorKey];
    return [...state.newItems, ...(result?.data ?? [])];
  }, [state.newItems, returnQuery.data, props.cursorKey]);

  const table = useReactTable<TModel>({
    columns: props.columns as ColumnDef<TModel, unknown>[],
    data: allRecordData,
    state: {
      pagination: state.paginationPageIndex,
      columnVisibility: state.columnVisibility,
    },
    onColumnVisibilityChange: (updater) => {
      setColumnVisibility(resolveUpdater(updater, state.columnVisibility) as VisibilityState);
    },
    onPaginationChange: (updater) => {
      setPaginationPageIndex(resolveUpdater(updater, state.paginationPageIndex) as PaginationState);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  if (returnQuery.loading) {
    return (
      <div className="grid place-items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <ListStoreContext.Provider value={storeRef.current as unknown as ListStoreApi}>
      <ListTableContext.Provider
        value={
          {
            table,
            allRecordData,
            returnQuery,
            cursorKey: props.cursorKey,
          } as ListTableContextValue<TModel, TCursorKey>
        }
      >
        {props.children}
      </ListTableContext.Provider>
    </ListStoreContext.Provider>
  );
};

export default ListProviderWithStore;

// ─── Spinner ───────────────────────────────────────────────────
type SpinnerProps = React.ComponentProps<'svg'> & { containerClassName?: string };

export const Spinner = ({ className, containerClassName, ...props }: SpinnerProps) => (
  <div
    className={cn('flex items-center justify-center w-full h-full', containerClassName)}
    style={{ minHeight: 80 }}
  >
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  </div>
);
