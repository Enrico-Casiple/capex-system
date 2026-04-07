'use client';
import TableWrapper from '@/app/_component/Table/TableWrapper';
import { Query } from '@/lib/generated/api/customHookAPI/graphql';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Breadcrumbs from '@/app/_component/List/Breadcrumbs';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import ListAction from '@/app/_component/List/ListAction';
import ListSearch from '@/app/_component/List/ListSearch';
import ListBulkAction from '@/app/_component/List/ListBulkAction';
import React from 'react';
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import CustomDrawer from '@/components/custom/CusotmDrawer';
import RoleGate from './RoleGate/RoleGate';

interface ModelDataProps {
  title: string;
  description: string;
  newBulkAction: React.ReactNode[];
  createAction: (
    rowid: string | null,
    actionType: ActionType,
    popupType: PopupType,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => React.ReactNode;
  importComponent?: React.ReactNode;
  exportComponent?: React.ReactNode;
}

const ModelData = <ModelShape, Response extends Record<string, Query[keyof Query]>>({
  title,
  description,
  newBulkAction,
  importComponent,
  exportComponent,
  createAction,
}: ModelDataProps) => {
  const { active, table, modelName } = useListContext();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {/* Primary Action */}
            {active && (
               <RoleGate 
                  module={[`${modelName.toUpperCase()}_MANAGEMENT`, "SYSTEM"]}
                  resource={[`${modelName.toLowerCase()}`, "*"]}
                  action={['create', '*']}
                >

                  <Button
                    size="sm"
                    variant={'default'}
                    className="px-4 rounded-sm"
                    onClick={() => setOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Create New
                  </Button>
                </RoleGate>
            )}
          </div>

          {/* Action Bar & Search */}
          <Card className="p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Action Buttons */}
              <ListAction importComponent={importComponent} exportComponent={exportComponent} />
              {/* Search Bar */}
              <ListSearch />
            </div>
          </Card>

          {/* Bulk Actions Bar */}
          {table.getSelectedRowModel().flatRows.length > 0 && (
            <ListBulkAction newBulkAction={newBulkAction} />
          )}

          {/* Table */}
          <TableWrapper<ModelShape, Response> />
        </div>
      </div>
      <CustomDrawer
        open={open}
        setOpen={setOpen}
        title={`Create New Record`}
        description={`This is a drawer for creating a new record.`}
      >
        {open && createAction(null, 'none', 'drawer', open, setOpen)}
      </CustomDrawer>
    </div>
  );
};

export default ModelData;
