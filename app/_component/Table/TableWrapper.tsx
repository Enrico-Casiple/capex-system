import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { Spinner } from '@/app/_component/Spinner';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Query } from '@/lib/generated/api/customHookAPI/graphql';
import { flexRender } from '@tanstack/react-table';
import { FileSearchIcon } from 'lucide-react';
import TableBodyWrapper from './TableBodyWrapper';
import TableHeaderWrapper from './TableHeaderWrapper';
import TableFooterWrapper from './TableFooterWrapper';

const TableWrapper = <ModelShape, Response extends Record<string, Query[keyof Query]>>() => {
  const { allRecordData, returnQuery, table } = useListContext<Response, ModelShape>();
  const hasData = allRecordData.length > 0;
  const isEmpty = !returnQuery.loading && table.getRowModel().rows.length === 0;

  return (
    <div className="flex flex-col rounded-md border border-border overflow-hidden bg-background">


      <div className="relative flex flex-col">
        {returnQuery.loading && !hasData && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-2">
            <Spinner />
            <span className="text-xs text-muted-foreground">Loading data...</span>
          </div>
        )}

        {/* Desktop table */}
        <div className="hidden md:block">
          <Table className="w-full text-xs table-fixed">
            <TableHeaderWrapper table={table} />
              {isEmpty ? (
                <TableBody>
                  <TableRow style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}
                  >
                    <TableCell className="flex flex-col items-center justify-center text-center border-0 space-y-4 p-10">
                      <FileSearchIcon size={36} strokeWidth={1.2} className="text-muted-foreground/50 text-center" />
                      <span className="text-sm font-medium">No records found</span>
                      <span className="text-xs mt-0.5 opacity-70">
                        Try adjusting your filters or search criteria
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : <TableBodyWrapper table={table} />}
            <TableFooterWrapper />
          </Table>
        </div>

        {/* Mobile cards */}
        <div className="block md:hidden overflow-y-auto max-h-150 p-3 flex-col gap-3">
          {table.getRowModel().rows.map((row) => {
            const cells = row.getVisibleCells();
            const selectCell = cells.find((c) => c.column.id === 'select');
            const firstCell = cells.find(
              (c) => c.column.id !== 'select' && c.column.id !== 'action' && c.column.id !== 'id',
            );
            const contentCells = cells.filter(
              (c) => c.column.id !== 'select' && c.column.id !== 'action' && c !== firstCell,
            );
            const raw =
              row.original && typeof row.original === 'object'
                ? (row.original as Record<string, unknown>)
                : null;
            // const createdAt = raw?.createdAt ? new Date(raw.createdAt as string) : null;

            return (
              <Card key={row.id} className="w-full">
                <CardHeader>
                  {/* Select checkbox */}
                  {selectCell && (
                    <div className="flex items-center justify-start -ml-3 mb-2">
                      {flexRender(selectCell.column.columnDef.cell, selectCell.getContext())}
                    </div>
                  )}
                  <CardTitle className="text-sm flex-1 hidden">
                    {firstCell
                      ? flexRender(firstCell.column.columnDef.cell, firstCell.getContext())
                      : row.id}
                  </CardTitle>
                  <CardAction className="text-xs text-muted-foreground">
                    {raw?.id ? String(raw.id) : ''}
                  </CardAction>
                </CardHeader>

                <CardContent className="flex flex-col gap-1.5">
                  {contentCells.map((cell) => {
                    const headerDef = cell.column.columnDef.header;
                    const label = typeof headerDef === 'string' ? headerDef : cell.column.id;
                    return (
                      <div
                        key={cell.id}
                        className="flex justify-between items-center text-xs gap-2"
                      >
                        <span className="font-semibold uppercase tracking-wide text-muted-foreground shrink-0">
                          {label}
                        </span>
                        <span className="text-right truncate">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      </div>
                    );
                  })}
                </CardContent>

                {/* <CardFooter className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {createdAt && !isNaN(createdAt.getTime()) ? format(createdAt, 'PPP, p') : ''}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="View"
                    >
                      <EyeIcon size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="Edit"
                    >
                      <PencilIcon size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="Duplicate"
                    >
                      <CopyIcon size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="Archive"
                    >
                      <ArchiveIcon size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="Restore"
                    >
                      <RotateCcwIcon size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded hover:bg-muted transition-colors text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2Icon size={14} />
                    </button>
                  </div>
                </CardFooter> */}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableWrapper;
