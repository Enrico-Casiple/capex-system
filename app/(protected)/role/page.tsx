'use client';
import ListPage from '@/app/_context/ListWrapper';
import { Role } from '@/lib/generated/api/customHookAPI/graphql';
import { ColumnDef } from '@tanstack/react-table';
import ModelData from '../../_component/ModelData';
import {
  extraColumns,
  initialColumnFilters,
  initialColumnVisibility,
  initialFilter,
  MODEL_NAME,
  showActions,
} from './variables';
import Action from '@/app/_component/Row/Action';
import Method from './_form/Method';
import { useCallback } from 'react';
import { ActionType, PopupType } from '@/app/_component/Row/Action';

const BULK_ACTIONS: React.ReactNode[] = [];
const SEARCH_FIELDS = ['name', 'description', 'roleType'];

const ModelPage = () => {
  const renderMethod = useCallback(
    (
      rowId: string | null,
      actionType: ActionType,
      popupType: PopupType,
      open?: boolean,
      setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => (
      <Method
        rowId={rowId}
        actionType={actionType}
        popupType={popupType}
        open={open}
        setOpen={setOpen}
      />
    ),
    [],
  );

  const actionComponent = useCallback(
    (row: Role) => <Action rowId={row.id} component={renderMethod} />,
    [renderMethod],
  );

  const createAction = useCallback(
    (
      rowId: string | null,
      actionType: ActionType,
      popupType: PopupType,
      open?: boolean,
      setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => (
      <Method
        rowId={rowId}
        actionType={actionType}
        popupType={popupType}
        open={open}
        setOpen={setOpen}
      />
    ),
    [],
  );

  return (
    <ListPage<Role>
      modelName={MODEL_NAME}
      extraColumns={extraColumns as ColumnDef<Role, unknown>[]}
      initialColumnVisibility={initialColumnVisibility}
      initialFilter={initialFilter}
      showActions={showActions}
      initialColumnFilters={initialColumnFilters}
      actionComponent={actionComponent}
      initialSearchField={SEARCH_FIELDS}
    >
      <ModelData
        title="Manage Roles"
        description="Browse and manage all roles in your system. Use the actions column to view details, edit profiles, duplicate entries, archive, restore, or permanently delete roles."
        newBulkAction={BULK_ACTIONS}
        createAction={createAction}
      />
    </ListPage>
  );
};

export default ModelPage;
