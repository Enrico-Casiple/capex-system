'use client';
import ListPage from '@/app/_context/ListWrapper';
import { User } from '@/lib/generated/api/customHookAPI/graphql';
import { ColumnDef } from '@tanstack/react-table';
import ModelData from './ModelData';
import { extraColumns, initialColumnFilters, initialColumnVisibility, initialFilter, MODEL_NAME, showActions } from './variables';
import Action from '@/app/_component/Row/Action';


const ModelPage = () => {
  return(
  <ListPage<User> modelName={MODEL_NAME}
    extraColumns={extraColumns as ColumnDef<User, unknown>[]} 
    initialColumnVisibility={initialColumnVisibility} 
    initialFilter={initialFilter}
    showActions={showActions}
    initialColumnFilters={initialColumnFilters}
    actionComponent={(row) => <Action rowId={row.id} />}
  >
    <ModelData />
  </ListPage>
)};

export default ModelPage;
