/* eslint-disable react-hooks/incompatible-library */
'use client';
import useToast from '@/app/_hooks/useToast';
import { ModelGQLMap } from '@/lib/api/crud.gql';
import { Query, Subscription } from '@/lib/generated/api/customHookAPI/graphql';
import { cn } from '@/lib/utils';
import { OperationVariables } from '@apollo/client';
import { useQuery, useSubscription } from '@apollo/client/react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { LoaderIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

// ─── What the CONTEXT exposes to children ─────────────────────
interface ListContextValue<
  TQuery extends Record<string, Query[keyof Query]>,
  TModel = unknown
> {
  singleKey: keyof Query;
  cursorKey: keyof Query;
  subscriptionKey: keyof Subscription;
  modelGQL: ModelGQLMap;
  model: keyof ModelGQLMap;
  returnModel: TModel;
  session: ReturnType<typeof useSession>;
  returnQuery: useQuery.Result<TQuery, Record<string, OperationVariables>, 'empty' | 'complete' | 'streaming'>;
  cursor: string | null;
  setCursor: React.Dispatch<React.SetStateAction<string | null>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  filter: Record<string, unknown> | null;
  setFilter: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
  take: number;
  setTake: React.Dispatch<React.SetStateAction<number>>;
  initialFilter: Record<string, unknown>;
  initialColumnVisibility: Record<string, boolean>;
  // table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: ReturnType<typeof useReactTable<any>>;
  allRecordData: TModel[];
  newItems: TModel[];
  setNewItems: React.Dispatch<React.SetStateAction<TModel[]>>;
  paginationPageIndex: { pageIndex: number; pageSize: number };
  setPaginationPageIndex: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
   columns: ColumnDef<TModel, unknown>[];
}

// ─── Context ──────────────────────────────────────────────────
const ListContext = React.createContext<ListContextValue<
  Record<string, Query[keyof Query]>,
  unknown
> | null>(null);

export const useListContext = <
  TQuery extends Record<string, Query[keyof Query]> = Record<string, Query[keyof Query]>,
  TModel = unknown
>() => {
  const toast = useToast();
  const context = React.useContext(ListContext) as ListContextValue<TQuery, TModel> | null;
  if (!context) {
    toast.error({
      message: 'ListContext Error',
      description: 'Your component is not wrapped with ListProvider.',
    });
    throw new Error('useListContext must be used within a ListProvider');
  }
  return context;
};

// ─── What the CONSUMER passes in ──────────────────────────────
interface ListProviderProps<
  TQuery extends Record<string, Query[keyof Query]>,
  TSubscription extends Record<string, Subscription[keyof Subscription]>,
  TModel
> {
  children?: React.ReactNode;
  singleKey: keyof Query;
  cursorKey: keyof Query;
  subscriptionKey: keyof Subscription;
  modelGQL: ModelGQLMap;
  model: keyof ModelGQLMap;
  returnModel: TModel;
  queryResult?: TQuery;
  subscriptionResult?: TSubscription;
  initialFilter: Record<string, unknown>;
  initialColumnVisibility: Record<string, boolean>;
  columns: ColumnDef<TModel, unknown>[];
}

const MAX_TAKE = 20;
// ─── Provider ─────────────────────────────────────────────────
const ListProvider = <
  TQuery extends Record<string, Query[keyof Query]>,
  TSubscription extends Record<string, Subscription[keyof Subscription]>,
  TModel
>(props: ListProviderProps<TQuery, TSubscription, TModel>) => {
  const session = useSession();
  const [cursor, setCursor] = useState<string | null>(null);
  const [active, setActive] = useState<boolean>(true);
  const [filter, setFilter] = useState<Record<string, unknown> | null>(props.initialFilter);
  const [take, setTake] = useState<number>(MAX_TAKE);
  const [newItems, setNewItems] = useState<TModel[]>([]);
  const [paginationPageIndex, setPaginationPageIndex] = useState({ pageIndex: 0, pageSize: MAX_TAKE });
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    props.initialColumnVisibility
  );

  const returnQuery = useQuery<TQuery, Record<string, OperationVariables>>(
    props.modelGQL[props.model].findAllWithCursor,
    {
      variables: { cursorInput: { cursor, isActive: active, take, filter } },
    }
  );

  useSubscription<TSubscription>(props.modelGQL[props.model].subscription, {
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

  const allRecordData = React.useMemo<TModel[]>(() => {
    const result = returnQuery.data?.[props.cursorKey as keyof TQuery];
    const pageData = (result && typeof result === 'object' && 'data' in result)
      ? (result.data as TModel[]) ?? []  // ← cast directly to TModel[]
      : [];
    return [...newItems, ...pageData];
  }, [newItems, returnQuery.data, props.cursorKey]);

  const table = useReactTable<TModel>({
    columns: props.columns as ColumnDef<TModel, unknown>[],
    data: allRecordData,
    state: {
      pagination: paginationPageIndex,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPaginationPageIndex,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // Open Debugging
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const value = {
    singleKey: props.singleKey,
    cursorKey: props.cursorKey,
    subscriptionKey: props.subscriptionKey,
    modelGQL: props.modelGQL,
    model: props.model,
    returnModel: props.returnModel,
    session,
    returnQuery,
    cursor,
    setCursor,
    active,
    setActive,
    filter,
    setFilter,
    initialFilter: props.initialFilter,
    initialColumnVisibility: props.initialColumnVisibility,
    take,
    setTake,
    table,
    allRecordData,
    newItems,
    setNewItems,
    paginationPageIndex,
    setPaginationPageIndex,
    columnVisibility,
    setColumnVisibility,
    columns: props.columns,
  };

  if (returnQuery.loading) {
    return <div className='grid place-items-center h-screen'><Spinner /></div>;
  }

  return (
    <ListContext.Provider value={value as unknown as ListContextValue<Record<string, Query[keyof Query]>, unknown>}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListProvider;

type SpinnerProps = React.ComponentProps<'svg'> & {
  containerClassName?: string;
};

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
