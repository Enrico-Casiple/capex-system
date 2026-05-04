import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';
import { useRef } from 'react';
import { FileSearchIcon } from 'lucide-react';

type TableBodyWrapperProps<Model> = { table: Table<Model> };

const TableBodyWrapper = <Model,>({ table }: TableBodyWrapperProps<Model>) => {
  const { returnQuery, allRecordData } = useListContext();
  const rows = table.getRowModel().rows;
  const isRefetching = returnQuery.loading && allRecordData.length > 0;
  const parentRef = useRef<HTMLTableSectionElement>(null);
  const isEmpty = !returnQuery.loading && rows.length === 0;
  const colSpan = table.getAllLeafColumns().length || 1;

  // const shouldScroll = rows.length > 10;

  return (
    <TableBody
      ref={parentRef}
      className={`transition-opacity duration-300 ${isRefetching ? 'opacity-60' : ''}`}
    >
      {isEmpty ? (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={colSpan} className="py-16 px-4 text-center border-0">
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <FileSearchIcon size={36} strokeWidth={1.2} className="text-muted-foreground/40" />
              <span className="text-sm font-medium text-foreground">No records found</span>
              <span className="text-xs text-muted-foreground">
                Try adjusting your filters or search criteria
              </span>
            </div>
          </TableCell>
        </TableRow>
      ) : rows.map((row) => {
        if (!row) return null;

        return (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() ? 'selected' : undefined}
            className="h-10 border-b border-border/50 transition-colors hover:bg-muted/40 data-[state=selected]:bg-primary/5"
          >
            {row.getVisibleCells().map((cell, cellIndex) => (
              <TableCell
                key={`${row.id}-${cellIndex}`}
                style={{ width: cell.column.getSize() }}
                className={`px-3 py-1 text-sm align-middle overflow-hidden whitespace-nowrap text-ellipsis ${cell.column.id === 'action' ? 'text-left' : ''}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyWrapper;
