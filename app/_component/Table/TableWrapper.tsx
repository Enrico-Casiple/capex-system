import { Spinner, useListContext } from "@/app/_context/ListContext/ListProvider"
import { Table } from "@/components/ui/table";
import { Query } from "@/lib/generated/api/customHookAPI/graphql";
import { User } from "@/lib/generated/types/generated/types";
import TableHeaderWrapper from "./TableHeaderWrapper";


const TableWrapper = () => {
    // In UserData or any child component
    const { allRecordData, table, returnQuery } = useListContext<
        { UserFindAllWithCursor: Query['UserFindAllWithCursor'] },
        User
    >();
     const hasData = allRecordData?.length > 0;
  return (
     <div className="flex flex-col rounded-md border border-border overflow-hidden bg-background">
        <div className="relative flex-1 overflow-hidden">   
            {returnQuery.loading && !hasData && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-2">
                <Spinner />
                <span className="text-xs text-muted-foreground">Loading data...</span>
            </div>
            )}
            <div className="overflow-y-auto overflow-x-auto max-h-140">
              <Table className="w-full text-xs">
                <TableHeaderWrapper table={table} />  
              </Table>
            </div>
        </div>
     </div>
  )
}

export default TableWrapper