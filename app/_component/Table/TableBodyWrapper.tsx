import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

type TableBodyWrapperProps<Model> = { table: Table<Model> };

const TableBodyWrapper = <Model,>({ table }: TableBodyWrapperProps<Model>) => {
  const { returnQuery, allRecordData, hasNextPage, loadMore } = useListContext();
  const rows = table.getRowModel().rows;
  const isRefetching = returnQuery.loading && allRecordData.length > 0;
  const parentRef = useRef<HTMLTableSectionElement>(null);

  const shouldScroll = rows.length > 10;

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 37,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    if (!shouldScroll) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;
    if (lastItem.index >= rows.length - 3 && hasNextPage && !returnQuery.loading) {
      loadMore();
    }
  }, [virtualItems, hasNextPage, returnQuery.loading, loadMore, rows.length, shouldScroll]);

  const paddingTop = virtualItems.length > 0 ? (virtualItems[0]?.start ?? 0) : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? virtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end ?? 0)
      : 0;

  return (
    <TableBody
      ref={parentRef}
      style={{
        display: 'block',
        height: shouldScroll ? '500px' : 'auto',
        overflow: shouldScroll ? 'auto' : 'visible',
      }}
      className={`transition-opacity duration-300 ${isRefetching ? 'opacity-60 pointer-events-none' : ''}`}
    >
      {paddingTop > 0 && (
        <TableRow style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
          <TableCell style={{ height: paddingTop, padding: 0, border: 0 }} />
        </TableRow>
      )}

      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index];
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

      {paddingBottom > 0 && (
        <TableRow style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
          <TableCell style={{ height: paddingBottom, padding: 0, border: 0 }} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyWrapper;
