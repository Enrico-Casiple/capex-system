'use client';
import { Query } from '@/lib/generated/api/customHookAPI/graphql';
import { User } from '@/lib/generated/types/generated/types';
import TableWrapper from './Table/TableWrapper';

const UserData = () => {
  return (
    <div>
      <div className="flex flex-col rounded-md border border-border overflow-hidden bg-background">
        {/* <pre>
          <code>
            {JSON.stringify(
              allRecordData.map((item) => item),
              null,
              2,
            )}
          </code>
        </pre> */}
      </div>
      <TableWrapper<User, Pick<Query, 'UserFindAllWithCursor'>> />
    </div>
  );
};

export default UserData;
