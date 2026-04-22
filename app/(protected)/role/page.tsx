'use client';
import Export from '@/app/_component/List/Export';
import Import from '@/app/_component/List/Import';
import Action, { ActionType, PopupType } from '@/app/_component/Row/Action';
import ListPage from '@/app/_context/ListWrapper';
import { Role, RoleCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
import { useCallback } from 'react';
import ModelData from '../../_component/ModelData';
import { roleTableConfig } from '../_config';
import ExportForm from './_form/ExportForm';
import ImportForm from './_form/ImportForm';
import dynamic from 'next/dynamic';
import { Spinner } from '@/app/_component/Spinner';

const Method = dynamic(() => import('./_form/Method'), {
  loading: () => <Spinner />,
  ssr: false
});

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
    (row: Role) => <Action rowId={row.id ?? null} component={renderMethod} />,
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

  const BULK_ACTIONS: React.ReactNode[] = [

  ];

  const importForm = useCallback<(open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode>(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ImportForm<Role, RoleCreateInput> open={open} setOpen={setOpen} />
    ),
    [],
  );

  const exportForm = useCallback<(open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode>(
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
