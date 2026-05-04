'use client';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import ColumnFilterCell from './ColumnFilterCell';

interface ColumnFilterConfig {
  columnId: string;
  filterType?: 'text' | 'select' | 'date';
  options?: { label: string; value: string }[];
  placeholder?: string;
}

type TableHeaderWrapperProps<Model> = {
  table: Table<Model>;
  enableColumnFilters?: boolean;
  columnFilters?: ColumnFilterConfig[];
};

const SortIcon = ({ sorted }: { sorted: string | false }) => {
  if (sorted === 'asc') return <ArrowUp className="ml-1 size-3 shrink-0" />;
  if (sorted === 'desc') return <ArrowDown className="ml-1 size-3 shrink-0" />;
  return <ArrowUpDown className="ml-1 size-3 shrink-0 text-muted-foreground opacity-50" />;
};



const TableHeaderWrapper = <Model,>({
  table,
  enableColumnFilters = true,
  columnFilters = [],
}: TableHeaderWrapperProps<Model>) => {
  const headerGroups = table.getHeaderGroups();


  return (
    <TableHeader className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      {/* Column headers row */}
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id} className="border-b border-border/60 hover:bg-transparent">
          {headerGroup.headers.map((header, idx) => {
            const canSort = header.column.getCanSort();
            const sorted = header.column.getIsSorted();
            const isActionColumn = header.column.id === 'action';
            console.log(table.getRowModel().rows.map(row => row.original))
            return (
              <TableHead
                key={`${headerGroup.id}-${idx}`}
                style={{ width: header.getSize() }}
                className={`h-9 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground select-none whitespace-nowrap text-ellipsis overflow-hidden ${isActionColumn ? 'text-left' : ''}`}
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`flex items-center gap-1.5 ${isActionColumn ? 'justify-start' : ''} ${canSort ? 'cursor-pointer hover:text-foreground transition-colors' : ''}`}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <span className="whitespace-nowrap">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                    {canSort && <SortIcon sorted={sorted as string | false} />}
                  </div>
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}

      {/* Inline filters row (optional) */}
      {enableColumnFilters && columnFilters.length > 0 && (
        <TableRow className="border-b border-border/40 bg-muted/30 hover:bg-transparent">
          {headerGroups[0]?.headers.map((header, idx) => {
            const filterConfig = columnFilters.find((f) => f.columnId === header.column.id);
            const isActionColumn = header.column.id === 'action';
            const isSelectColumn = header.column.id === 'select';

            return (
              <TableHead
                key={`${header.id}-filter-${idx}`}
                style={{ width: header.getSize() }}
                className={`h-10 px-2 py-2${isActionColumn || isSelectColumn ? ' bg-background/50' : ''}`}
              >
                {!isActionColumn && !isSelectColumn && filterConfig && (
                  <ColumnFilterCell
                    column={header.column}
                    filterType={filterConfig.filterType || 'text'}
                    options={filterConfig.options}
                    placeholder={filterConfig.placeholder}
                  />
                )}
              </TableHead>
            );
          })}
        </TableRow>
      )}
    </TableHeader>
  );
};

export default TableHeaderWrapper;
export type { TableHeaderWrapperProps, ColumnFilterConfig };
