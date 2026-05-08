import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { BudgetLedgerFindUnique } from '@/lib/api/gql/BudgetLedger.gql';
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
import React, { useMemo } from 'react';
import { BudgetLedgerCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
import { generateRefNumberForWork } from '@/lib/util/generateOtpCode';
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
      typeId: '',
      amount: '',
      currency: 'PHP',
      sourceTypeId: '',
      referenceNo: '',
    }),
    [],
  );
  const [refNo, setRefNo] = React.useState('');

  const { form, isViewMode, executingCreate, executingUpdate, handleToSubmit, tableName } =
    useFormMethod({
      rowId: props.rowId,
      actionType: props.actionType,
      setOpen: props.setOpen,
      model,
      modelName,
      findUniqueGQL: BudgetLedgerFindUnique,
      defaultValues,
      findUniqueQueryKey: 'BudgetLedgerFindUnique',
      createResponseKey: 'BudgetLedgerCreate',
      updateResponseKey: 'BudgetLedgerUpdate',
      transformData: (data: any) => ({
        budgetId: data.budgetId ? data.budgetId : null,
        typeId: data.typeId ? data.typeId : null,
        amount: data.amount ? data.amount : null,
        currency: data.currency ? data.currency : null,
        sourceTypeId: data.sourceTypeId ? data.sourceTypeId : null,
        referenceNo: data.referenceNo ? data.referenceNo : refNo,
      }),
    });


  const referenceNo = form.watch('referenceNo');

  React.useEffect(() => {
    if (props.actionType === 'none' && !referenceNo) {
      const generateRefNo = async () => {
        const newRefNo = await generateRefNumberForWork();
        setRefNo(newRefNo);
        form.setValue('referenceNo', newRefNo);
      };
      generateRefNo();
    }
  })


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
              <CustomTextInput
                name="referenceNo"
                control={form.control}
                label="Reference No."
                inputProps={{ disabled: true }}
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
                name="typeId"
                control={form.control}
                label="Type"
                findAllWithCursorGQL={modelGQL.TypeGQL.findAllWithCursor}
                findUniqueGQL={modelGQL.TypeGQL.findUnique}
                defaultValueId={form.watch('typeId') ?? undefined}
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


              <CustomNumberInput
                name="amount"
                control={form.control}
                label="Amount"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomSingleSelectInput
                name="sourceTypeId"
                control={form.control}
                label="Source Type"
                findAllWithCursorGQL={modelGQL.TypeGQL.findAllWithCursor}
                findUniqueGQL={modelGQL.TypeGQL.findUnique}
                defaultValueId={form.watch('sourceTypeId') ?? undefined}
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