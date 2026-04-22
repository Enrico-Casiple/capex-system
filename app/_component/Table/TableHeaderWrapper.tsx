import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

type TableHeaderWrapperProps<Model> = {
  table: Table<Model>;
};

const SortIcon = ({ sorted }: { sorted: string | false }) => {
  if (sorted === 'asc') return <ArrowUp className="ml-1 size-3 shrink-0" />;
  if (sorted === 'desc') return <ArrowDown className="ml-1 size-3 shrink-0" />;
  return <ArrowUpDown className="ml-1 size-3 shrink-0 text-muted-foreground opacity-50" />;
};

const TableHeaderWrapper = <Model,>({ table }: TableHeaderWrapperProps<Model>) => (
  <TableHeader className="bg-background shadow-sm">
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow
        key={headerGroup.id}
        style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}
      >
        {headerGroup.headers.map((header) => {
          const canSort = header.column.getCanSort();
          const sorted = header.column.getIsSorted();
          return (
            <TableHead
              key={header.id}
              className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground border-b select-none"
              style={{ width: header.getSize() }}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={`flex items-center gap-1 ${canSort ? 'cursor-pointer hover:text-foreground transition-colors' : ''}`}
                  onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                >
                  <span className="truncate">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                  {canSort && <SortIcon sorted={sorted as string | false} />}
                </div>
              )}
            </TableHead>
          )
        })}
      </TableRow>
    ))}
  </TableHeader>
);

export default TableHeaderWrapper;
