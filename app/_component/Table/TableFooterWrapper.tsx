import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { Spinner } from '@/app/_component/Spinner';
import { Button } from '@/components/ui/button';
import { TableCell, TableFooter, TableRow } from '@/components/ui/table';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useEffect, useRef } from 'react';

type TableFooterWrapperProps<Model> = {
  table: Table<Model>;
};

const TableFooterWrapper = <Model,>({ table: tableInstance }: TableFooterWrapperProps<Model>) => {
  const { returnQuery, allRecordData, cursorKey, cursor, setCursor, active, filter, searchItems, cursorStack, setCursorStack, currentPage, setCurrentPage } = useListContext();

  const filterKey = useMemo(() =>
    JSON.stringify({ active, filter, searchItems }),
    [active, filter, searchItems]
  );

  const prevFilterKeyRef = useRef(filterKey);

  useEffect(() => {
    if (prevFilterKeyRef.current !== filterKey) {
      console.log('🔄 Filter changed, resetting');
      prevFilterKeyRef.current = filterKey;
      setCursorStack([]);
      setCurrentPage(1);
      setCursor(null);
    }
  }, [filterKey, setCursor, setCursorStack, setCurrentPage]);

  // Safely extract pagination data with type guards
  const queryResult = returnQuery.data?.[cursorKey];
  const hasNextPage = queryResult && typeof queryResult === 'object' && 'hasNextPage' in queryResult
    ? Boolean(queryResult.hasNextPage)
    : false;
  const nextCursor = queryResult && typeof queryResult === 'object' && 'nextCursor' in queryResult
    ? (queryResult.nextCursor as string | null)
    : null;

  const hasPreviousPage = cursorStack.length > 0;

  const handleNext = () => {
    if (!hasNextPage || !nextCursor || returnQuery.loading) return;

    setCursorStack(prev => [...prev, cursor ?? '']);
    setCurrentPage(prev => prev + 1);
    setCursor(nextCursor);
  };

  const handlePrevious = () => {
    if (!hasPreviousPage || returnQuery.loading) return;

    const prevCursor = cursorStack[cursorStack.length - 1] ?? null;
    setCursorStack(prev => {
      const newStack = [...prev];
      newStack.pop();
      return newStack;
    });
    setCurrentPage(prev => prev - 1);
    setCursor(prevCursor);
  };

  return (
    <TableFooter className="bg-background/95 backdrop-blur shadow-[0_-1px_0_theme(colors.border/60)]">
      <TableRow className="h-10 border-0 bg-background/95 hover:bg-transparent">
        <TableCell colSpan={tableInstance.getAllLeafColumns().length || 1} className="border-0 px-4 py-2">
          {returnQuery.loading && allRecordData.length > 0 && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Spinner className="size-3" />
              <span>Loading...</span>
            </div>
          )}

          {allRecordData.length > 0 && !returnQuery.loading && (
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="text-xs text-muted-foreground">
                Page {currentPage}
              </span>
              <span className="text-xs text-muted-foreground">
                {hasNextPage
                  ? `Showing ${tableInstance.getRowCount()} records`
                  : `All ${tableInstance.getRowCount()} records loaded`
                }
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!hasPreviousPage || returnQuery.loading}
                  onClick={handlePrevious}
                  title="Previous page"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="min-w-8 text-center">{currentPage}</span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!hasNextPage || returnQuery.loading}
                  onClick={handleNext}
                  title="Next page"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </span>
            </div>
          )}
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}

export default TableFooterWrapper
