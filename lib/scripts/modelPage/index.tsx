import { getDatamodel } from "@/lib/pothos/pothos-prisma-types";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const prismaDataModel = getDatamodel();
const force = process.argv.includes("--force") || process.argv.includes("-f");

const toConfigName = (modelName: string) =>
  modelName.charAt(0).toLowerCase() + modelName.slice(1);

const pageTemplate = (modelName: string) => {
  const configName = toConfigName(modelName) + "TableConfig";
  return `'use client';
import Export from '@/app/_component/List/Export';
import Import from '@/app/_component/List/Import';
import ImportUpdate from '@/app/_component/List/ImportUpdate';
import ModelData from '@/app/_component/ModelData';
import Action, { ActionType, PopupType } from '@/app/_component/Row/Action';
import { Spinner } from '@/app/_component/Spinner';
import ListPage from '@/app/_context/ListWrapper';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import ExportForm from './_form/ExportForm';
import ImportForm from './_form/ImportForm';
import ImportUpdateForm from './_form/ImportUpdateForm';
import { ${configName} } from '@/app/_config';
import { ${modelName}, ${modelName}CreateInput, ${modelName}UpdateInput } from '@/lib/generated/api/customHookAPI/graphql';


const Method = dynamic(() => import('./_form/Method'), {
  loading: () => <Spinner />,
  ssr: false,
});

const ModelPage = () => {
  type ModelRequest = ${modelName};
  type ModelCreateInput = ${modelName}CreateInput;
  type ModelUpdateInput = ${modelName}UpdateInput;

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
  } = ${configName};

  const renderMethod = useCallback(
    (rowId: string | null, actionType: ActionType, popupType: PopupType, open?: boolean, setOpen?: React.Dispatch<React.SetStateAction<boolean>>) => (
      <Method rowId={rowId} actionType={actionType} popupType={popupType} open={open} setOpen={setOpen} />
    ),
    []
  );

  const actionComponent = useCallback(
    (row: ModelRequest) => <Action rowId={row.id} component={renderMethod} />,
    [renderMethod]
  );

  const createAction = useCallback(
    (rowId: string | null, actionType: ActionType, popupType: PopupType, open?: boolean, setOpen?: React.Dispatch<React.SetStateAction<boolean>>) => (
      <Method rowId={rowId} actionType={actionType} popupType={popupType} open={open} setOpen={setOpen} />
    ),
    []
  );

  const importForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ImportForm<ModelRequest, ModelCreateInput> open={open} setOpen={setOpen} transformRow={transformRowCreate} previewColumns={previewColumnsCreate} />
    ),
    [transformRowCreate, previewColumnsCreate]
  );

  const updateForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ImportUpdateForm<ModelRequest, ModelUpdateInput> open={open} setOpen={setOpen} transformRow={transformRowUpdate} previewColumns={previewColumnsUpdate} />
    ),
    [transformRowUpdate, previewColumnsUpdate]
  );

  const exportForm = useCallback(
    (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <ExportForm open={open} setOpen={setOpen} exportColumns={exportColumns} defaultSelectedColumns={defaultExportColumns} />
    ),
    [defaultExportColumns, exportColumns]
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
`;
};

const exportFormTemplate = () => `import React from 'react';
import ExportFormWrapper from '@/app/_component/Form/ExportFormWrapper';
import { ColumnConfig } from '@/lib/types/export';

type ExportFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onExportComplete?: (success: boolean, message?: string) => void;
  exportColumns?: ColumnConfig[];
  defaultSelectedColumns?: string[];
};

const ExportForm = ({ open, setOpen, onExportComplete, exportColumns, defaultSelectedColumns }: ExportFormProps) => {
  return (
    <ExportFormWrapper
      open={open}
      setOpen={setOpen}
      columns={exportColumns || []}
      defaultSelectedColumns={defaultSelectedColumns || []}
      onExportComplete={onExportComplete}
      defaultFormat="csv"
    />
  );
};

export default ExportForm;
`;

const importFormTemplate = `import ImportFormWrapper from '@/app/_component/Form/ImportFormWrapper';
import { PreviewColumn } from '@/app/_config/shared';
import useToast from '@/app/_hooks/useToast';

type ImportFormProps<TModel, TCreateInput> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transformRow?: (row: TModel) => TCreateInput | Promise<TCreateInput>;
  previewColumns?: PreviewColumn<TModel>[];
};

const ImportForm = <
  TModel extends Record<string, unknown>,
  TCreateInput extends Record<string, unknown>
>({
  open,
  setOpen,
  transformRow,
  previewColumns,
}: ImportFormProps<TModel, TCreateInput>) => {
  const toast = useToast();

  const handleTransformRow = async (row: TModel): Promise<TCreateInput> => {
    try {
      if (!transformRow) throw new Error('Transform function not provided');
      return (await transformRow(row)) as TCreateInput;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error({
        message: 'Error processing row',
        description: \`Row ID: \${(row as any).id || 'unknown'} - \${errorMessage}\`,
      });
      throw error;
    }
  };

  return <ImportFormWrapper<TModel, TCreateInput> open={open} setOpen={setOpen} transformRow={handleTransformRow} previewColumns={previewColumns || []} applyDefaults={false} />;
};

export default ImportForm;
`;

const importUpdateFormTemplate = `import ImportUpdateFormWrapper from '@/app/_component/Form/ImportUpdateFormWrapper';
import { PreviewColumn } from '@/app/_config/shared';
import useToast from '@/app/_hooks/useToast';

type ImportUpdateFormProps<TModel, TUpdateInput> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transformRow?: (row: TModel) => TUpdateInput | Promise<TUpdateInput>;
  previewColumns?: PreviewColumn<TModel>[];
};

const ImportUpdateForm = <
  TModel extends Record<string, unknown>,
  TUpdateInput extends Record<string, unknown>
>({
  open,
  setOpen,
  transformRow,
  previewColumns,
}: ImportUpdateFormProps<TModel, TUpdateInput>) => {
  const toast = useToast();

  const handleTransformRow = async (row: TModel): Promise<TUpdateInput> => {
    try {
      if (!transformRow) throw new Error('Transform function not provided');
      return (await transformRow(row)) as TUpdateInput;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error({
        message: 'Error processing row',
        description: \`Row ID: \${(row as any).id || 'unknown'} - \${errorMessage}\`,
      });
      throw error;
    }
  };

  return <ImportUpdateFormWrapper<TModel, TUpdateInput> open={open} setOpen={setOpen} transformRow={handleTransformRow} previewColumns={previewColumns || []} applyDefaults={false} />;
};

export default ImportUpdateForm;
`;

const methodTemplate = (modelName: string) => {
  // treat model as any to avoid mismatched DMMF shapes across versions
  const model: any = (prismaDataModel.datamodel.models?.[modelName] ?? {});

  const rawFields =
    model.fields ||
    model.properties ||
    model.columns ||
    (model.fieldsMap ? Object.values(model.fieldsMap) : null) ||
    [];

  const fieldsArray = Array.isArray(rawFields)
    ? rawFields
    : Object.values(rawFields || {});

  // keep only scalar/enum-like fields (skip relations / object kinds)
  const scalarFieldObjects = fieldsArray
    .filter((f: any) => {
      if (!f) return false;
      if (f.relationName) return false;
      if (f.kind === "object") return false;
      if (f.isList) return false; // skip lists (relations/arrays)
      return !!f.name;
    })
    .map((f: any) => ({
      name: f.name,
      // prefer explicit type, fall back to common properties seen in various datamodel shapes
      type: f.type || f.fieldType || f.tpe || f.kind || "String",
    }));

  const defaultValuesLines = scalarFieldObjects.length
    ? scalarFieldObjects.map((f) => `      ${f.name}: null,`).join("\n")
    : "      id: '',";

  const transformValueForField = (field: { name: string; type: string }) => {
    const value = `data.${field.name}`;
    const hasValue = `${value}`;

    switch (field.type) {
      case "String":
      case "Enum":
      case "enum":
        return `${hasValue} ? String(${value}) : null`;
      case "Int":
      case "Float":
      case "Decimal":
      case "int":
      case "float":
      case "decimal":
        return `${hasValue} ? Number(${value}) : null`;
      case "BigInt":
      case "bigint":
        return `${hasValue} ? BigInt(${value}) : null`;
      case "Boolean":
      case "bool":
      case "boolean":
        return `${value} != null ? Boolean(${value}) : null`;
      case "DateTime":
      case "datetime":
      case "Date":
        return `${hasValue} ? new Date(${value}) : null`;
      case "Json":
      case "json":
        return `${hasValue} ? JSON.stringify(${value}) : null`;
      case "Bytes":
      case "bytes":
        return `${hasValue} ? ${value} : null`;
      default:
        return `${hasValue} ? ${value} : null`;
    }
  };

  const transformDataLines = scalarFieldObjects.length
    ? scalarFieldObjects
      .map((f) => `        ${f.name}: ${transformValueForField(f)},`)
      .join("\n")
    : `        id: data.id ?? null,`;

  return `import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { useFormMethod } from '@/app/_hooks/useFormMethod';
import FormTemplate from '@/components/Forms/FormTemplate';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMemo } from 'react';
import { ${modelName}FindUnique } from '@/lib/api/gql/${modelName}.gql';

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Method = (props: MethodProps) => {
  const { model, modelName } = useListContext();

  const defaultValues = useMemo(
    () => ({
${defaultValuesLines}
    }),
    [],
  );

  const { form, isViewMode, executingCreate, executingUpdate, handleToSubmit, tableName } =
    useFormMethod({
      rowId: props.rowId,
      actionType: props.actionType,
      setOpen: props.setOpen,
      model,
      modelName,
      findUniqueGQL: ${modelName}FindUnique,
      defaultValues,
      findUniqueQueryKey: '${modelName}FindUnique',
      createResponseKey: '${modelName}Create',
      updateResponseKey: '${modelName}Update',
      transformData: (data: any) => ({
${transformDataLines}
      }),
    });

  return (
    <FormTemplate title="" description="" form={form} handleToSubmit={handleToSubmit} isHaveBorder={false} isFullWidth={true}>
      <div className="flex flex-col gap-6 -mt-5 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-210px)]">
          <div className="space-y-6">
            {/* Generated form fields intentionally omitted — use config to add inputs.
                defaultValues include all scalar fields set to null and transformData
                maps submitted values to the same keys with type-safe conversions (falls back to null). */}
          </div>
        </ScrollArea>

        {props.actionType !== 'view' && (
          <div className="flex justify-end gap-3 border-t bg-background pt-4">
            <DrawerClose asChild>
              <Button variant="outline" disabled={executingCreate || executingUpdate} type="button">Cancel</Button>
            </DrawerClose>
            <Button type="submit" disabled={executingCreate || executingUpdate}>{executingCreate || executingUpdate ? 'Submit...' : 'Submit'}</Button>
          </div>
        )}
      </div>
    </FormTemplate>
  );
};

export default Method;
`;
};

const root = process.cwd();
const outBase = join(root, "app", "_config", "tablePages");

Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
  const modelDir = join(outBase, modelName.toLowerCase());
  const formDir = join(modelDir, "_form");
  if (!existsSync(modelDir)) mkdirSync(modelDir, { recursive: true });
  if (!existsSync(formDir)) mkdirSync(formDir, { recursive: true });

  const files = [
    { name: "page.tsx", content: pageTemplate(modelName) },
    { name: join("_form", "ExportForm.tsx"), content: exportFormTemplate() },
    { name: join("_form", "ImportForm.tsx"), content: importFormTemplate },
    { name: join("_form", "ImportUpdateForm.tsx"), content: importUpdateFormTemplate },
    { name: join("_form", "Method.tsx"), content: methodTemplate(modelName) },
  ];

  files.forEach((f) => {
    const filePath = join(modelDir, f.name);
    const content = typeof f.content === "function" ? (f.content as any)(modelName) : f.content;
    const exists = existsSync(filePath);
    if (exists && !force) {
      console.log(`Skipped ${filePath} (exists)`);
      return;
    }
    writeFileSync(filePath, content, "utf8");
    console.log(`${exists ? "Updated" : "Created"} ${filePath}`);
  });
});

console.log("Model pages generation complete.");