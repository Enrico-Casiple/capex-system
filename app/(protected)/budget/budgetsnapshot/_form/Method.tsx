import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { BudgetSnapshotFindUnique } from '@/lib/api/gql/BudgetSnapshot.gql';
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
import { useEffect, useMemo } from 'react';
import { BudgetSnapshotCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
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
      budgetId: '',
      approvedAmount: 0,
      committedAmount: 0,
      actualAmount: 0,
      availableAmount: 0,
      currency: 'PHP',
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
      findUniqueGQL: BudgetSnapshotFindUnique,
      defaultValues,
      findUniqueQueryKey: 'BudgetSnapshotFindUnique',
      createResponseKey: 'BudgetSnapshotCreate',
      updateResponseKey: 'BudgetSnapshotUpdate',
      transformData: (data: any) => ({
        budgetId: data.budgetId ? data.budgetId : null,
        approvedAmount: data.approvedAmount ? data.approvedAmount : null,
        committedAmount: data.committedAmount ? data.committedAmount : null,
        actualAmount: data.actualAmount ? data.actualAmount : null,
        availableAmount: data.availableAmount ? data.availableAmount : null,
        currency: data.currency ? data.currency : "PHP",
      }),
    });

  useEffect(() => {
    const approved = Number(form.watch('approvedAmount') ?? 0);
    const committed = Number(form.watch('committedAmount') ?? 0);
    const actual = Number(form.watch('actualAmount') ?? 0);

    const available = approved - committed - actual;

    form.setValue('availableAmount', available);
  }, [
    form.watch('approvedAmount'),
    form.watch('committedAmount'),
    form.watch('actualAmount'),
    form,
  ]);

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

              <CustomNumberInput
                name="approvedAmount"
                control={form.control}
                label="Approved Amount"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="committedAmount"
                control={form.control}
                label="Committed Amount"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="actualAmount"
                control={form.control}
                label="Actual Amount"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="availableAmount"
                control={form.control}
                label="Available Amount"
                inputProps={{ disabled: isViewMode }}
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