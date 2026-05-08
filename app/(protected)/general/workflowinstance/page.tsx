'use client';
import Export from '@/app/_component/List/Export';
import Import from '@/app/_component/List/Import';
import ImportUpdate from '@/app/_component/List/ImportUpdate';
import ModelData from '@/app/_component/ModelData';
import Action, { ActionType, PopupType } from '@/app/_component/Row/Action';
import { Spinner } from '@/app/_component/Spinner';
import { positionTableConfig, workFlowInstanceTableConfig } from '@/app/_config';
import ListPage from '@/app/_context/ListWrapper';
import { Position, PositionCreateInput, PositionUpdateInput, WorkFlowInstance, WorkFlowInstanceCreateInput, WorkFlowInstanceUpdateInput } from '@/lib/generated/api/customHookAPI/graphql';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import ExportForm from './_form/ExportForm';
import ImportForm from './_form/ImportForm';
import ImportUpdateForm from './_form/ImportUpdateForm';

const Method = dynamic(() => import('./_form/Method'), {
  loading: () => <Spinner />,
  ssr: false
});

const ModelPage = () => {
  type ModelRequest = WorkFlowInstance;
  type ModelCreateInput = WorkFlowInstanceCreateInput;
  type ModelUpdateInput = WorkFlowInstanceUpdateInput;


  const {
    modelName,
    extraColumns,
    initialColumnVisibility,
    initialFilter,
    showActions,
    initialColumnFilters,
    listName,
    description,
    initialSearchField,
    transformRowCreate,
    previewColumnsCreate,
    transformRowUpdate,
    previewColumnsUpdate,
    exportColumns,
    defaultExportColumns,
  } = workFlowInstanceTableConfig;

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

  const importForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ImportForm<ModelRequest, ModelCreateInput>
        open={open}
        setOpen={setOpen}
        transformRow={transformRowCreate}
        previewColumns={previewColumnsCreate}
      />
    ),
    [transformRowCreate, previewColumnsCreate],
  );

  const updateForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ImportUpdateForm<ModelRequest, ModelUpdateInput>
        open={open}
        setOpen={setOpen}
        transformRow={transformRowUpdate}
        previewColumns={previewColumnsUpdate}
      />
    ),
    [transformRowUpdate, previewColumnsUpdate],
  );

  const exportForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ExportForm open={open} setOpen={setOpen} exportColumns={exportColumns} defaultSelectedColumns={defaultExportColumns} />
    ),
    [defaultExportColumns, exportColumns],
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
        newBulkAction={[]}
        createAction={createAction}
        importComponent={<Import importFormComponent={importForm} />}
        exportComponent={<Export exportFormComponent={exportForm} />}
        updateComponent={<ImportUpdate importUpdateFormComponent={updateForm} />}
      />
    </ListPage>
  );
};

export default ModelPage;
