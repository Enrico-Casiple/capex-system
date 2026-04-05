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
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { LoaderIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, {useState } from 'react';

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

const MAX_TAKE = 20;
// const MAX_PAGES_IN_MEMORY = 5;

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
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    props.initialColumnVisibility,
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(props.initialColumnFilters || []);
  const [searchItems, setSearchItems] = useState<string | null>(null);
  const [searchFields, setSearchFields] = useState<string[] | null>(props.initialSearchField || null);
  const [cursorStack, setCursorStack] = useState<(string | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);


  // const [accumulatedData, setAccumulatedData] = useState<TModel[]>([]);
  // const [hasNextPage, setHasNextPage] = useState(false);
  // const [nextCursor, setNextCursor] = useState<string | null>(null);
  // const seenCursors = useRef<Set<string | null>>(new Set([null]));

  const singleKey = `${props.modelName}FindUnique` as keyof Query;
  const cursorKey = `${props.modelName}FindAllWithCursor` as keyof Query;
  const subscriptionKey = `${props.modelName}Subscription` as keyof Subscription;
  const model = `${props.modelName}GQL` as keyof ModelGQLMap;

  const returnQuery = useQuery<TQuery, Record<string, OperationVariables>>(
    props.modelGQL[model].findAllWithCursor,
    {
      variables: { cursorInput: { cursor, isActive: active, take, filter, search: searchItems, searchFields } },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  // // ─── Append new page, window to MAX_PAGES_IN_MEMORY ───────────
  // useEffect(() => {
  //   if (returnQuery.loading || !returnQuery.data) return;
  //   const result = returnQuery.data?.[cursorKey as keyof TQuery] as
  //     | { data?: TModel[]; nextCursor?: string | null; hasNextPage?: boolean }
  //     | undefined;
    
  //   // Allow empty results to clear data
  //   if (!result?.data) return;

  //   setAccumulatedData((prev) => {
  //     const incoming = result.data ?? [];
      
  //     // If no incoming data, clear everything
  //     if (incoming.length === 0) {
  //       return [];
  //     }
      
  //     // If cursor is null, it's a fresh fetch/refetch - replace all data
  //     if (cursor === null) {
  //       return incoming;
  //     }

  //     // Otherwise, merge with existing data
  //     const existingMap = new Map(
  //       (prev as Array<{ id?: string }>).map((r) => [r.id, r])
  //     );

  //     // Update existing records or add new ones
  //     const updated: TModel[] = [];
  //     const newRecords: TModel[] = [];

  //     incoming.forEach((item) => {
  //       const id = (item as { id?: string }).id;
  //       if (id && existingMap.has(id)) {
  //         // Update existing record
  //         updated.push(item);
  //         existingMap.delete(id);
  //       } else {
  //         // New record
  //         newRecords.push(item);
  //       }
  //     });

  //     // Keep records that weren't in incoming (not updated)
  //     const unchanged = Array.from(existingMap.values()) as TModel[];

  //     // Combine: unchanged + updated + new
  //     const combined = [...unchanged, ...updated, ...newRecords];
  //     const maxRows = MAX_PAGES_IN_MEMORY * MAX_TAKE;
      
  //     // Drop oldest rows when over memory limit
  //     return combined.length > maxRows ? combined.slice(combined.length - maxRows) : combined;
  //   });

  //   setHasNextPage(result.hasNextPage ?? false);
  //   setNextCursor(result.nextCursor ?? null);
  // }, [returnQuery.data, returnQuery.loading, cursorKey, cursor]);


  // // ─── Reset on filter/active change ────────────────────────────
  // useEffect(() => {
  //   setAccumulatedData([]);
  //   seenCursors.current = new Set([null]);
  //   setCursor(null);
  // }, [filter, active]);

  useSubscription<TSubscription>(props.modelGQL[model].subscription, {
    onData(options) {
      const newData = options.data.data?.[subscriptionKey];
      if (!newData) return;
      returnQuery.refetch();
      // setAccumulatedData((prev) => [newData as TModel, ...prev]);
    },
  });

  // const allRecordData = React.useMemo<TModel[]>(
  //   () => [...newItems, ...accumulatedData],
  //   [newItems, accumulatedData],
  // );

  const allRecordData = React.useMemo<TModel[]>(() => {
    const currentData = returnQuery.data?.[cursorKey as keyof TQuery] as | { data?: TModel[] } | undefined;
    return currentData?.data ? [...newItems, ...currentData.data] : newItems;
  }, [newItems, returnQuery.data, cursorKey]);

  // const loadMore = useCallback(() => {
  //   if (!hasNextPage || returnQuery.loading || !nextCursor) return;
  //   if (seenCursors.current.has(nextCursor)) return;
  //   seenCursors.current.add(nextCursor);
  //   setCursor(nextCursor);
  // }, [hasNextPage, nextCursor, returnQuery.loading]);


  const table = useReactTable<TModel>({
    columns: props.columns as ColumnDef<TModel, unknown>[],
    data: allRecordData,
    state: { columnVisibility, columnFilters },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const value = {
    singleKey,
    cursorKey,
    subscriptionKey,
    modelGQL: props.modelGQL,
    model,
    modelName: props.modelName,
    session,
    returnQuery,
    cursor,
    setCursor,
    active,
    setActive,
    filter,
    setFilter,
    searchItems,
    setSearchItems,
    searchFields,
    setSearchFields,
    initialFilter: props.initialFilter,
    initialColumnVisibility: props.initialColumnVisibility,
    take,
    setTake,
    table,
    allRecordData,
    newItems,
    setNewItems,
    cursorStack,
    setCursorStack,
    currentPage,
    setCurrentPage,
    columnVisibility,
    setColumnVisibility,
    columnFilters,
    setColumnFilters,
    columns: props.columns,
    // hasNextPage,
    // nextCursor,
    // loadMore,
    paginationPageIndex: { pageIndex: 0, pageSize: MAX_TAKE },
    setPaginationPageIndex: () => {},
  };

  if (returnQuery.loading && !allRecordData.length) {
    return (
      <div className="grid place-items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <ListContext.Provider
      value={value as unknown as ListContextValue<Record<string, Query[keyof Query]>, unknown>}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListProvider;

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
