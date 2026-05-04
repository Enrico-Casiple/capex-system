import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { Spinner } from '@/app/_component/Spinner';
import { Table } from '@/components/ui/table';
import { Query } from '@/lib/generated/api/customHookAPI/graphql';
import TableBodyWrapper from './TableBodyWrapper';
import TableHeaderWrapper from './TableHeaderWrapper';
import TableFooterWrapper from './TableFooterWrapper';

const TableWrapper = <ModelShape, Response extends Record<string, Query[keyof Query]>>() => {
  const { allRecordData, returnQuery, table } = useListContext<Response, ModelShape>();
  const hasData = allRecordData.length > 0;
  // const isEmpty = !returnQuery.loading && table.getRowModel().rows.length === 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm ring-1 ring-border/60">
      <div className="relative flex flex-col">
        {returnQuery.loading && !hasData && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-2">
            <Spinner />
            <span className="text-xs text-muted-foreground">Loading data...</span>
          </div>
        )}

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="max-h-[calc(100vh-340px)] overflow-auto">
            <Table className="w-full table-auto border-collapse">
              <TableHeaderWrapper table={table} />
              <TableBodyWrapper table={table} />
              <TableFooterWrapper table={table} />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableWrapper;
