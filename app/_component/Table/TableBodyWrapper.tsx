import { Spinner, useListContext } from '@/app/_context/ListContext/ListProvider';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

type TableBodyWrapperProps<Model> = { table: Table<Model> };

const TableBodyWrapper = <Model,>({ table }: TableBodyWrapperProps<Model>) => {
  const { returnQuery, allRecordData, hasNextPage, loadMore } = useListContext();
  const rows = table.getRowModel().rows;
  const isRefetching = returnQuery.loading && allRecordData.length > 0;
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;
    if (lastItem.index >= rows.length - 3 && hasNextPage && !returnQuery.loading) {
      loadMore();
    }
  }, [virtualItems, hasNextPage, returnQuery.loading, loadMore, rows.length]);

  return (
    <TableBody
      style={{ display: 'block', position: 'relative' }}
      className={`transition-opacity duration-300 ${isRefetching ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <tr style={{ display: 'block' }}>
        <td style={{ display: 'block', padding: 0 }}>
          <div ref={parentRef} style={{ height: '384px', overflow: 'auto' }}>
            <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
              {virtualItems.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    style={{
                      display: 'table',
                      width: '100%',
                      tableLayout: 'fixed',
                      position: 'absolute',
                      top: virtualRow.start,
                      height: `${virtualRow.size}px`,
                    }}
                    className="border-b border-border hover:bg-muted/50 transition-colors even:bg-muted/20 data-[state=selected]:bg-primary/10"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-3 py-1.5 h-9 border-r border-border last:border-r-0 align-middle"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </div>
          </div>
        </td>
      </tr>

      <TableRow style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <TableCell colSpan={100} className="py-3 text-center border-0">
          {returnQuery.loading && allRecordData.length > 0 && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Spinner className="size-3" />
              <span>Loading more...</span>
            </div>
          )}
          {!hasNextPage && allRecordData.length > 0 && (
            <span className="text-xs text-muted-foreground">
              All {allRecordData.length} records loaded
            </span>
          )}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableBodyWrapper;
