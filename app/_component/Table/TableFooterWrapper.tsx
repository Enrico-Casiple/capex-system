import { Spinner, useListContext } from '@/app/_context/ListContext/ListProvider';
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'


const TableFooterWrapper = () => {
    const { returnQuery, allRecordData, hasNextPage, table } = useListContext();
  
  return (
    <TableFooter>
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
              All {table.getRowCount()} records loaded
            </span>
          )}
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}

export default TableFooterWrapper