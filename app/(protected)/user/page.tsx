'use client';
import ListPage from '@/app/_context/ListWrapper';
import { User } from '@/lib/generated/api/customHookAPI/graphql';
import ModelData from '../../_component/ModelData';
import Action from '@/app/_component/Row/Action';
import Method from './_form/Method';
import { useCallback } from 'react';
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { userTableConfig } from '../_config';
import Import from '@/app/_component/List/Import';
import Export from '@/app/_component/List/Export';
import ImportForm from './_form/ImportForm';
import ExportForm from './_form/ExportForm';

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
    (row: User) => <Action rowId={row.id} component={renderMethod} />,
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

  const BULK_ACTIONS: React.ReactNode[] = [];

  const importForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ImportForm open={open} setOpen={setOpen} />
    ),
    [],
  );

  const exportForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ExportForm open={open} setOpen={setOpen} />
    ),
    [],
  );

  return (
    <ListPage<User>
      modelName={userTableConfig.modelName}
      extraColumns={userTableConfig.extraColumns}
      initialColumnVisibility={userTableConfig.initialColumnVisibility}
      initialFilter={userTableConfig.initialFilter}
      showActions={userTableConfig.showActions}
      initialColumnFilters={userTableConfig.initialColumnFilters}
      actionComponent={actionComponent}
      initialSearchField={userTableConfig.initialSearchField as Extract<keyof User, string>[]}
    >
      <ModelData
        title={userTableConfig.listName}
        description={userTableConfig.description}
        newBulkAction={BULK_ACTIONS}
        createAction={createAction}
        importComponent={<Import importFormComponent={importForm} />}
        exportComponent={<Export exportFormComponent={exportForm} />}
      />
    </ListPage>
  );
};

export default ModelPage;
