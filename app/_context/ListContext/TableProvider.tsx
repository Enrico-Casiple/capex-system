'use client';
import useToast from '@/app/_hooks/useToast';
import {
  ColumnDef, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, Table, useReactTable
} from '@tanstack/react-table';
import React, { useState } from 'react';

// ─── Context shape ─────────────────────────────────────────────
interface TableContextValue<TableModel> {
  columns: ColumnDef<TableModel, unknown>[];
  data: TableModel[];
  table: Table<TableModel>;
  filter: Record<string, unknown> | null;
  setFilter: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
  paginationPageIndex: { pageIndex: number; pageSize: number };
  setPaginationPageIndex: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const TableContext = React.createContext<TableContextValue<unknown> | null>(null);

export const useTableContext = <TableModel,>() => {
  const toast = useToast();
  const context = React.useContext(TableContext) as TableContextValue<TableModel> | null;
  if (!context) {
    toast.error({
      message: 'TableContext Error',
      description: 'Your component is not wrapped with TableProvider.',
    });
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

// ─── Props ─────────────────────────────────────────────────────
interface TableProviderProps<TableModel> {
  children: React.ReactNode;
  columns: ColumnDef<TableModel, unknown>[];
  data: TableModel[];
  initialFilter?: Record<string, unknown> | null;
  initialColumnVisibility?: Record<string, boolean>;
  pageSize?: number;
}

// ─── Provider ──────────────────────────────────────────────────
const TableProvider = <TableModel,>({
  children,
  columns,
  data,
  initialFilter = null,
  initialColumnVisibility = {},
  pageSize = 18,
}: TableProviderProps<TableModel>) => {
  const [filter, setFilter] = useState<Record<string, unknown> | null>(initialFilter);
  const [paginationPageIndex, setPaginationPageIndex] = useState({
    pageIndex: 0,
    pageSize,
  });
  const [columnVisibility, setColumnVisibility] =
    useState<Record<string, boolean>>(initialColumnVisibility);
   

//   Memoize the columns and data to prevent unnecessary re-renders
  const memoizedColumns = React.useMemo(() => columns, [columns]);
  const memoizedData = React.useMemo(() => data, [data]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<TableModel>({
    columns: memoizedColumns,
    data: memoizedData,
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
  });

  const value = {
    columns,
    data,
    table,
    filter,
    setFilter,
    paginationPageIndex,
    setPaginationPageIndex,
    columnVisibility,
    setColumnVisibility,
  };

  return (
    <TableContext.Provider value={value as unknown as TableContextValue<unknown>}>
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
