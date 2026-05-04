/* eslint-disable react-hooks/incompatible-library */
'use client';
import RoleGate from '@/app/_component/RoleGate/RoleGate';
import useToast from '@/app/_hooks/useToast';
import { ModelGQLMap } from '@/lib/api/crud.gql';
import { Query, Subscription } from '@/lib/generated/api/customHookAPI/graphql';
import { OperationVariables } from '@apollo/client';
import { useQuery, useSubscription } from '@apollo/client/react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import React, { useMemo, useState } from 'react';

// ⚡ PERF: Move static row models outside component to avoid recreation every render
const coreRowModel = getCoreRowModel();
const filteredRowModel = getFilteredRowModel();
const sortedRowModel = getSortedRowModel();

interface ListContextValue<TQuery extends Record<string, Query[keyof Query]>, TModel = unknown> {
  singleKey: keyof Query;
  cursorKey: keyof Query;
  subscriptionKey: keyof Subscription;
  modelGQL: ModelGQLMap;
  model: keyof ModelGQLMap;
  modelName: string;
  session: ReturnType<typeof useSession>;
  returnQuery: useQuery.Result<
    TQuery,
    Record<string, OperationVariables>,
    'empty' | 'complete' | 'streaming'
  >;
  cursor: string | null;
  setCursor: React.Dispatch<React.SetStateAction<string | null>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  filter: Record<string, unknown> | null;
  setFilter: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
  take: number;
  setTake: React.Dispatch<React.SetStateAction<number>>;
  searchItems: string | null;
  setSearchItems: React.Dispatch<React.SetStateAction<string | null>>;
  searchFields: string[] | null;
  setSearchFields: React.Dispatch<React.SetStateAction<string[] | null>>;
  cursorStack: (string | null)[];
  setCursorStack: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  initialFilter: Record<string, unknown>;
  initialColumnVisibility: Record<string, boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: ReturnType<typeof useReactTable<any>>;
  allRecordData: TModel[];
  newItems: TModel[];
  setNewItems: React.Dispatch<React.SetStateAction<TModel[]>>;
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  columnFilters: ColumnFiltersState;
  columns: ColumnDef<TModel, unknown>[];
  hasNextPage: boolean;
  nextCursor: string | null;
  loadMore: () => void;
}

const ListContext = React.createContext<ListContextValue<
  Record<string, Query[keyof Query]>,
  unknown
> | null>(null);

export const useListContext = <
  TQuery extends Record<string, Query[keyof Query]> = Record<string, Query[keyof Query]>,
  TModel = unknown,
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

interface ListProviderProps<
  TQuery extends Record<string, Query[keyof Query]>,
  TSubscription extends Record<string, Subscription[keyof Subscription]>,
  TModel,
> {
  children?: React.ReactNode;
  modelGQL: ModelGQLMap;
  queryResult?: TQuery;
  subscriptionResult?: TSubscription;
  initialFilter: Record<string, unknown>;
  initialColumnVisibility: Record<string, boolean>;
  initialColumnFilters: ColumnFiltersState;
  initialSearchField: string[];
  columns: ColumnDef<TModel, unknown>[];
  modelName: string;
}

const MAX_TAKE =
  process.env.NODE_ENV === 'production'
    ? Number(process.env.NEXTAUTH_MAX_TAKE)
    : Number(process.env.NEXT_PUBLIC_MAX_TAKE);

const ListProvider = <
  TQuery extends Record<string, Query[keyof Query]>,
  TSubscription extends Record<string, Subscription[keyof Subscription]>,
  TModel,
>(
  props: ListProviderProps<TQuery, TSubscription, TModel>,
) => {
  const session = useSession();
  const [cursor, setCursor] = useState<string | null>(null);
  const [active, setActive] = useState<boolean>(true);
  const [filter, setFilter] = useState<Record<string, unknown> | null>(props.initialFilter);
  const [take, setTake] = useState<number>(MAX_TAKE);
  const [newItems, setNewItems] = useState<TModel[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    props.initialColumnVisibility,
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    props.initialColumnFilters || [],
  );
  const [searchItems, setSearchItems] = useState<string | null>(null);
  const [searchFields, setSearchFields] = useState<string[] | null>(
    props.initialSearchField || null,
  );
  const [cursorStack, setCursorStack] = useState<(string | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ⚡ PERF: Memoize derived keys to avoid string concatenation on every render
  const { singleKey, cursorKey, subscriptionKey, model, gqlDocument } = useMemo(() => {
    const modelKey = `${props.modelName}GQL` as keyof ModelGQLMap;
    const gqlModel = props.modelGQL[modelKey];

    return {
      singleKey: `${props.modelName}FindUnique` as keyof Query,
      cursorKey: `${props.modelName}FindAllWithCursor` as keyof Query,
      subscriptionKey: `${props.modelName}Subscription` as keyof Subscription,
      model: modelKey,
      gqlDocument: gqlModel,
    };
  }, [props.modelName, props.modelGQL]);

  // ⚡ PERF: Memoize query variables object to prevent unnecessary GraphQL queries
  const cursorInput = useMemo(() => ({
    cursor,
    isActive: active,
    take,
    filter,
    search: searchItems,
    searchFields,
  }), [cursor, active, take, filter, searchItems, searchFields]);

  const returnQuery = useQuery<TQuery, Record<string, OperationVariables>>(
    gqlDocument.findAllWithCursor,
    {
      variables: { cursorInput },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      skip: !gqlDocument, // Skip query if document not ready
    },
  );

  useSubscription<TSubscription>(gqlDocument.subscription, {
    skip: !gqlDocument,
    onData(options) {
      const newData = options.data.data?.[subscriptionKey];
      if (!newData) return;
      returnQuery.refetch();
    },
  });

  // ⚡ PERF: Optimize allRecordData - only spread when data actually changes
  const allRecordData = useMemo<TModel[]>(() => {
    const currentData = returnQuery.data?.[cursorKey as keyof TQuery] as
      | { data?: TModel[] }
      | undefined;
    const queryData = currentData?.data || [];

    // ⚡ Only create new array if both newItems and queryData have content
    return newItems.length > 0 && queryData.length > 0
      ? [...newItems, ...queryData]
      : newItems.length > 0 ? newItems : queryData;
  }, [newItems, returnQuery.data, cursorKey]);

  // ⚡ PERF: Use useReactTable only when data or column config changes
  const table = useReactTable<TModel>({
    columns: props.columns as ColumnDef<TModel, unknown>[],
    data: allRecordData,
    state: { columnVisibility, columnFilters, rowSelection },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    autoResetAll: false,
    getRowId: (row, index) => {
      const id = (row as { id?: unknown }).id;
      return typeof id === 'string' && id.length > 0 ? id : `row-${index}`;
    },
    getCoreRowModel: coreRowModel,
    getFilteredRowModel: filteredRowModel,
    getSortedRowModel: sortedRowModel,
    // ⚡ PERF: Disable debug in production
    ...(process.env.NODE_ENV !== 'production' && {
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    }),
  });

  // ⚡ PERF: Split context value into stable parts to optimize memoization
  const contextValue = useMemo(() => ({
    // Model metadata (stable per modelName)
    singleKey,
    cursorKey,
    subscriptionKey,
    modelGQL: props.modelGQL,
    model,
    modelName: props.modelName,

    // Session & Query (changes infrequently)
    session,
    returnQuery,

    // Pagination state (grouped)
    cursor,
    setCursor,
    cursorStack,
    setCursorStack,
    currentPage,
    setCurrentPage,

    // Filter & Search (grouped)
    active,
    setActive,
    filter,
    setFilter,
    searchItems,
    setSearchItems,
    searchFields,
    setSearchFields,

    // Table config (stable from props)
    initialFilter: props.initialFilter,
    initialColumnVisibility: props.initialColumnVisibility,
    columns: props.columns,
    take,
    setTake,

    // Data & UI state (grouped)
    table,
    allRecordData,
    columnVisibility,
    setColumnVisibility,
    columnFilters,
    setColumnFilters,
    rowSelection,
    setRowSelection,

    // Item management
    newItems,
    setNewItems,

    // Pagination (unused but required by interface)
    hasNextPage: false,
    nextCursor: null,
    loadMore: () => { },
  }), [
    singleKey, cursorKey, subscriptionKey,
    props.modelGQL, model, props.modelName,
    session, returnQuery,
    cursor, cursorStack, currentPage,
    active, filter, searchItems, searchFields,
    props.initialFilter, props.initialColumnVisibility, props.columns, take,
    table, allRecordData, columnVisibility, columnFilters, rowSelection, newItems,
  ]);

  return (
    <ListContext.Provider
      value={contextValue as unknown as ListContextValue<Record<string, Query[keyof Query]>, unknown>}
    >
      <RoleGate
        module={[`${props.modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
        resource={[`${props.modelName.toLowerCase()}`, '*']}
        action={['read', '*']}
      >
        {props.children}
      </RoleGate>
    </ListContext.Provider>
  );
};

export default ListProvider;
