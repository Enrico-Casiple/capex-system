'use client';
import TableWrapper from '@/app/_component/Table/TableWrapper';
import { Query, User } from '@/lib/generated/api/customHookAPI/graphql';

const ModelData = <ModelShape extends User, Response extends Record<string, Query[keyof Query]>>() => {
  return (
    <div className="p-5">
      <div className="flex flex-col rounded-md border border-border overflow-hidden bg-background mb-2">
        <div className="flex flex-col border border-border overflow-hidden bg-background p-4 mb-1">Hello</div>
      </div>
      <TableWrapper<ModelShape,Response> />
    </div>
  );
};

export default ModelData;
 