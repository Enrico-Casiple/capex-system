'use client';
import ListPage from '@/app/_context/ListWrapper';
import { User } from '@/lib/generated/api/customHookAPI/graphql';
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
import Method from './Form/Method';
import Import from '../../_component/List/Import';
import Export from '../../_component/List/Export';
import ExportForm from './Form/ExportForm';
import ImportForm from './Form/ImportForm';

const ModelPage = () => {
  return (
    <ListPage<User>
      modelName={MODEL_NAME}
      extraColumns={extraColumns as ColumnDef<User, unknown>[]}
      initialColumnVisibility={initialColumnVisibility}
      initialFilter={initialFilter}
      showActions={showActions}
      initialColumnFilters={initialColumnFilters}
      actionComponent={(row) => (
        <Action
          rowId={row.id}
          component={(rowId, actionType, popupType, drawerOpen, setDrawerOpen) => (
            <Method
              rowId={rowId}
              actionType={actionType}
              popupType={popupType}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          )}
        />
      )}
      initialSearchField={['name', 'email', 'userName']}
    >
      <ModelData
        title="Manage Users"
        description="Browse and manage all users in your system. Use the actions column to view details, edit profiles, duplicate entries, archive, restore, or permanently delete users."
        newBulkAction={
          [
            // <Button key="import" variant="outline" size="sm">
            //   New Bulk Action
            // </Button>
          ]
        }
        createAction={(rowId, actionType, popupType, drawerOpen, setDrawerOpen) => (
          <Method
            rowId={rowId}
            actionType={actionType}
            popupType={popupType}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
        )}
        importComponent={
          <Import
            importFormComponent={(open, setOpen) => <ImportForm open={open} setOpen={setOpen} />}
          />
        }
        exportComponent={
          <Export
            exportFormComponent={(open, setOpen) => <ExportForm open={open} setOpen={setOpen} />}
          />
        }
      />
    </ListPage>
  );
};

export default ModelPage;
