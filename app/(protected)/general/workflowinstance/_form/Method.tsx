import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { WorkFlowInstanceFindUnique } from '@/lib/api/gql/WorkFlowInstance.gql';
import { useFormMethod } from '@/app/_hooks/useFormMethod';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import CustomTextAreaInput from '@/components/Forms/Inputs/CustomTextAreaInput';
import FormTemplate from '@/components/Forms/FormTemplate';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { Layers } from 'lucide-react';
import { modelGQL } from '@/lib/api/crud.gql';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMemo } from 'react';
import { WorkFlowInstanceCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
import CustomNumberInput from '@/components/Forms/Inputs/CustomNumberInput';

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
      id: '',
      templateId: '',
      title: '',
      description: '',
      statusId: '',
      referenceTypeId: '',
      requestId: '',
      budgetId: '',
      startedAt: new Date(),
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
      findUniqueGQL: WorkFlowInstanceFindUnique,
      defaultValues,
      findUniqueQueryKey: 'WorkFlowInstanceFindUnique',
      createResponseKey: 'WorkFlowInstanceCreate',
      updateResponseKey: 'WorkFlowInstanceUpdate',
      transformData: (data: any) => ({
        templateId: data.templateId ? String(data.templateId) : null,
        title: data.title ? data.title : `${modelName} - ${new Date().toLocaleDateString()}`,
        description: data.description ? data.description : null,
        statusId: data.statusId ? String(data.statusId) : null,
        referenceTypeId: data.referenceTypeId ? String(data.referenceTypeId) : null,
        requestId: data.requestId ? String(data.requestId) : null,
        budgetId: data.budgetId ? String(data.budgetId) : null,
        startedAt: data.startedAt ? new Date(data.startedAt) : new Date(),
      }),
    });

  return (
    <FormTemplate
      title=""
      description=""
      form={form}
      handleToSubmit={handleToSubmit}
      isHaveBorder={false}
      isFullWidth={true}
    >
      <div className="flex flex-col gap-6 -mt-5 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-210px)]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-2">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">
                  {tableName} Configuration
                </h3>
                <p className="text-xs text-muted-foreground">
                  Configure the {tableName} details and settings here.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <CustomSingleSelectInput
                name="templateId"
                control={form.control}
                label="WorkFlowTemplate"
                findAllWithCursorGQL={modelGQL.WorkFlowTemplateGQL.findAllWithCursor}
                findUniqueGQL={modelGQL.WorkFlowTemplateGQL.findUnique}
                defaultValueId={form.watch('templateId') ?? undefined}
                disabled={isViewMode}
                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? { name: { contains: search, mode: 'insensitive' } }
                      : undefined,
                  },
                })}
                uniqueVariables={(id) => ({ id })}
                mapOption={(data: any) => ({ label: data?.name ?? '', value: data?.id ?? '' })}
                mapDefaultOption={(data: any) =>
                  data?.data ? { label: data.data.name ?? '', value: data.data.id ?? '' } : null
                }
              />

              <CustomTextInput
                name="title"
                control={form.control}
                label="Name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="currentStep"
                control={form.control}
                label="Current Step"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextAreaInput
                name="description"
                control={form.control}
                label="Description"
                inputProps={{ disabled: isViewMode }}
              />

              <CustomSingleSelectInput
                name="requestId"
                control={form.control}
                label="Request"
                findAllWithCursorGQL={modelGQL.RequestGQL.findAllWithCursor}
                findUniqueGQL={modelGQL.RequestGQL.findUnique}
                defaultValueId={form.watch('requestId') ?? undefined}
                disabled={isViewMode}
                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? { requestNumber: { contains: search, mode: 'insensitive' } }
                      : undefined,
                  },
                })}
                uniqueVariables={(id) => ({ id })}
                mapOption={(data: any) => ({ label: data?.requestNumber ?? '', value: data?.id ?? '' })}
                mapDefaultOption={(data: any) =>
                  data?.data ? { label: data.data.requestNumber ?? '', value: data.data.id ?? '' } : null
                }
              />
              <CustomSingleSelectInput
                name="budgetId"
                control={form.control}
                label="Budget"
                findAllWithCursorGQL={modelGQL.BudgetGQL.findAllWithCursor}
                findUniqueGQL={modelGQL.BudgetGQL.findUnique}
                defaultValueId={form.watch('budgetId') ?? undefined}
                disabled={isViewMode}
                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? { budgetRefNo: { contains: search, mode: 'insensitive' } }
                      : undefined,
                  },
                })}
                uniqueVariables={(id) => ({ id })}
                mapOption={(data: any) => ({ label: data?.budgetRefNo ?? '', value: data?.id ?? '' })}
                mapDefaultOption={(data: any) =>
                  data?.data ? { label: data.data.budgetRefNo ?? '', value: data.data.id ?? '' } : null
                }
              />
              <CustomSingleSelectInput
                name="statusId"
                control={form.control}
                label="Status"
                findAllWithCursorGQL={modelGQL.StatusGQL.findAllWithCursor}
                findUniqueGQL={modelGQL.StatusGQL.findUnique}
                defaultValueId={form.watch('statusId') ?? undefined}
                disabled={isViewMode}
                cursorVariables={(search, cursor, take) => ({
                  cursorInput: {
                    cursor,
                    isActive: true,
                    take,
                    filter: search
                      ? { name: { contains: search, mode: 'insensitive' } }
                      : undefined,
                  },
                })}
                uniqueVariables={(id) => ({ id })}
                mapOption={(data: any) => ({ label: data?.name ?? '', value: data?.id ?? '' })}
                mapDefaultOption={(data: any) =>
                  data?.data ? { label: data.data.name ?? '', value: data.data.id ?? '' } : null
                }
              />
            </div>
          </div>
        </ScrollArea>

        {props.actionType !== 'view' && (
          <div className="flex justify-end gap-3 border-t bg-background pt-4">
            <DrawerClose asChild>
              <Button variant="outline" disabled={executingCreate || executingUpdate} type="button">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" disabled={executingCreate || executingUpdate}>
              {executingCreate || executingUpdate ? 'Submit...' : 'Submit'}
            </Button>
          </div>
        )}
      </div>
    </FormTemplate>
  );
};

export default Method;