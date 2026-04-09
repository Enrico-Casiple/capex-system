'use client';
import ListPage from '@/app/_context/ListWrapper';
import { Role } from '@/lib/generated/api/customHookAPI/graphql';
import ModelData from '../../_component/ModelData';
import Action from '@/app/_component/Row/Action';
import Method from './_form/Method';
import { useCallback } from 'react';
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { roleTableConfig } from '../_config';
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
    <ListPage<Role>
      modelName={roleTableConfig.modelName}
      extraColumns={roleTableConfig.extraColumns}
      initialColumnVisibility={roleTableConfig.initialColumnVisibility}
      initialFilter={roleTableConfig.initialFilter}
      showActions={roleTableConfig.showActions}
      initialColumnFilters={roleTableConfig.initialColumnFilters}
      actionComponent={actionComponent}
      initialSearchField={roleTableConfig.initialSearchField as Extract<keyof Role, string>[]}
    >
      <ModelData
        title={roleTableConfig.listName}
        description={roleTableConfig.description}
        newBulkAction={BULK_ACTIONS}
        createAction={createAction}
        importComponent={<Import importFormComponent={importForm} />}
        exportComponent={<Export exportFormComponent={exportForm} />}
      />
    </ListPage>
  );
};

export default ModelPage;
