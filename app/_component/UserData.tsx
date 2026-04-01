'use client';
import { Query } from '@/lib/generated/api/customHookAPI/graphql';
import { useListContext } from '../_context/ListContext/ListProvider';
import { User } from '@/lib/generated/types/generated/types';
import TableWrapper from './Table/TableWrapper';

const UserData = () => {
// In UserData or any child component
const { allRecordData, table } = useListContext<
  { UserFindAllWithCursor: Query['UserFindAllWithCursor'] },
  User
>();
 const hasData = allRecordData?.length > 0;


  return (
    <div>
       <div className="flex flex-col rounded-md border border-border overflow-hidden bg-background"> 
        <pre><code>{JSON.stringify(allRecordData.map((item) => item.isActive), null, 2)}</code></pre>
       </div>
       <TableWrapper/>
    </div>
  );
};

export default UserData;
