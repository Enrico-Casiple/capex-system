import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';
import { useRef } from 'react';

type TableBodyWrapperProps<Model> = { table: Table<Model> };

const TableBodyWrapper = <Model,>({ table }: TableBodyWrapperProps<Model>) => {
  const { returnQuery, allRecordData } = useListContext();
  const rows = table.getRowModel().rows;
  const isRefetching = returnQuery.loading && allRecordData.length > 0;
  const parentRef = useRef<HTMLTableSectionElement>(null);

  const shouldScroll = rows.length > 10;

  return (
    <TableBody
      ref={parentRef}
      style={{
        display: 'block',
        height: '500px',
        overflow: shouldScroll ? 'auto' : 'visible',
      }}
      className={`transition-opacity duration-300 ${isRefetching ? 'opacity-60' : ''}`}
    >
      {rows.map((row) => {
        if (!row) return null;

        return (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() ? 'selected' : undefined}
            style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}
            className="hover:bg-muted/50 even:bg-muted/20 data-[state=selected]:bg-primary/10 border-b-2 border-border/50"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="px-3 py-1.5 h-9 border border-border last:border-r-0 align-middle overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ width: cell.column.getSize() }}
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
