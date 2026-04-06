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
import React, { useMemo, useState } from 'react';

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

const MAX_TAKE = process.env.NODE_ENV === 'production'  ? Number(process.env.NEXTAUTH_MAX_TAKE) : Number(process.env.NEXT_PUBLIC_MAX_TAKE);

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

  const singleKey = `${props.modelName}FindUnique` as keyof Query;
  const cursorKey = `${props.modelName}FindAllWithCursor` as keyof Query;
  const subscriptionKey = `${props.modelName}Subscription` as keyof Subscription;
  const model = `${props.modelName}GQL` as keyof ModelGQLMap;

  const returnQuery = useQuery<TQuery, Record<string, OperationVariables>>(
    props.modelGQL[model].findAllWithCursor,
    {
      variables: {
        cursorInput: { cursor, isActive: active, take, filter, search: searchItems, searchFields },
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  useSubscription<TSubscription>(props.modelGQL[model].subscription, {
    onData(options) {
      const newData = options.data.data?.[subscriptionKey];
      if (!newData) return;
      returnQuery.refetch();
    },
  });

  const allRecordData = React.useMemo<TModel[]>(() => {
    const currentData = returnQuery.data?.[cursorKey as keyof TQuery] as
      | { data?: TModel[] }
      | undefined;
    return currentData?.data ? [...newItems, ...currentData.data] : newItems;
  }, [newItems, returnQuery.data, cursorKey]);

  const coreRowModel = useMemo(() => getCoreRowModel(), []);
  const filteredRowModel = useMemo(() => getFilteredRowModel(), []);
  const sortedRowModel = useMemo(() => getSortedRowModel(), []);

  const table = useReactTable<TModel>({
    columns: props.columns as ColumnDef<TModel, unknown>[],
    data: allRecordData,
    state: { columnVisibility, columnFilters, rowSelection },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => (row as { id: string }).id,
    getCoreRowModel: coreRowModel,
    getFilteredRowModel: filteredRowModel,
    getSortedRowModel: sortedRowModel,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const value = useMemo(
    () => ({
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
      paginationPageIndex: { pageIndex: 0, pageSize: MAX_TAKE },
      setPaginationPageIndex: () => {},
    }),
    [
      session,
      returnQuery,
      cursor,
      active,
      filter,
      take,
      newItems,
      columnVisibility,
      columnFilters,
      searchItems,
      searchFields,
      cursorStack,
      currentPage,
      allRecordData,
      cursorKey,
      model,
      props.columns,
      props.initialColumnVisibility,
      props.initialFilter,
      props.modelGQL,
      props.modelName,
      singleKey,
      subscriptionKey,
      table,
    ],
  );

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
