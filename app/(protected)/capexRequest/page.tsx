'use client';
import Export from '@/app/_component/List/Export';
import Import from '@/app/_component/List/Import';
import Action, { ActionType, PopupType } from '@/app/_component/Row/Action';
import { Spinner } from '@/app/_component/Spinner';
import ListPage from '@/app/_context/ListWrapper';
import { Request, RequestCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import ModelData from '../../_component/ModelData';
import { capexRequestTableConfig } from '../_config';
import ExportForm from './_form/ExportForm';
import ImportForm from './_form/ImportForm';

const Method = dynamic(() => import('./_form/Method'), {
  loading: () => <Spinner />,
  ssr: false
});

const ModelPage = () => {

  type ModelRequest = Request
  type ModelCreateInput = RequestCreateInput
  const {
    modelName,
    extraColumns,
    initialColumnVisibility,
    initialFilter,
    showActions,
    initialColumnFilters,
    listName,
    description,
    initialSearchField
  } = capexRequestTableConfig

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
    (row: ModelRequest) => <Action rowId={row.id} component={renderMethod} />,
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

  const importForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ImportForm<ModelRequest, ModelCreateInput> open={open} setOpen={setOpen} />
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
    <ListPage<ModelRequest>
      modelName={modelName}
      extraColumns={extraColumns}
      initialColumnVisibility={initialColumnVisibility}
      initialFilter={initialFilter}
      showActions={showActions}
      initialColumnFilters={initialColumnFilters}
      actionComponent={actionComponent}
      initialSearchField={initialSearchField as Extract<keyof ModelRequest, string>[]}
    >
      <ModelData
        title={listName}
        description={description}
        newBulkAction={BULK_ACTIONS}
        createAction={createAction}
        importComponent={<Import importFormComponent={importForm} />}
        exportComponent={<Export exportFormComponent={exportForm} />}
      />
    </ListPage>
  );
};

export default ModelPage;
