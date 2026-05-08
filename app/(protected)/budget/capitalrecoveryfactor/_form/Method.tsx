import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { CapitalRecoveryFactorFindUnique } from '@/lib/api/gql/CapitalRecoveryFactor.gql';
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
import { useEffect, useMemo, useState } from 'react';
import { CapitalRecoveryFactorCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
import { generateCRFNumberForWork } from '@/lib/util/generateOtpCode';
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
      name: '',
      description: '',
      crfReferenceNo: '',
      statusId: '',
      companyId: '',
      departmentId: '',
      categoryId: '',
      utilizedBudget: 0,
      approvedAmount: 0,
      requestedAmount: 0,
      newBalanceAmmount: 0,
      projectedBudget: 0,
      remark: {
        notes: '',
        verificationNotes: '',
      },
      requestId: '',
      budgetId: '',
    }),
    [],
  );

  const [crfNumberPrefix, setCrfNumberPrefix] = useState('');


  const { form, isViewMode, executingCreate, executingUpdate, handleToSubmit, tableName } =
    useFormMethod({
      rowId: props.rowId,
      actionType: props.actionType,
      setOpen: props.setOpen,
      model,
      modelName,
      findUniqueGQL: CapitalRecoveryFactorFindUnique,
      defaultValues,
      findUniqueQueryKey: 'CapitalRecoveryFactorFindUnique',
      createResponseKey: 'CapitalRecoveryFactorCreate',
      updateResponseKey: 'CapitalRecoveryFactorUpdate',
      transformData: (data: any) => ({
        name: data.name ? data.name : `${crfNumberPrefix}`,
        description: '',
        crfReferenceNo: crfNumberPrefix,
        statusId: '',
        companyId: '',
        departmentId: '',
        categoryId: '',
        utilizedBudget: 0,
        approvedAmount: 0,
        requestedAmount: 0,
        newBalanceAmmount: 0,
        projectedBudget: 0,
        remark: {
          notes: '',
          verificationNotes: '',
        },
        requestId: '',
        budgetId: '',
      }),
    });

  const crfNumber = form.watch('crfReferenceNo');

  useEffect(() => {
    const generateCrfNumber = async () => {
      const newCrfNumber = await generateCRFNumberForWork();
      setCrfNumberPrefix(newCrfNumber);
      if (!crfNumber) {
        form.setValue('crfReferenceNo', newCrfNumber);
      }
    }

    if (props.actionType === 'none') {
      generateCrfNumber();
    }

  }, [props.actionType, form, crfNumber]);

  {/*approvedAmount - utilizedBudget =  newBalanceAmmount */ }
  {/* newBalanceAmmount - requestedAmount = projectedBudget */ }
  // Calculate balances:
  useEffect(() => {
    const approved = Number(form.watch('approvedAmount') ?? 0);
    const utilized = Number(form.watch('utilizedBudget') ?? 0);
    const requested = Number(form.watch('requestedAmount') ?? 0);

    const newBalance = approved - utilized;
    const projected = newBalance - requested;

    form.setValue('newBalanceAmmount', newBalance);
    form.setValue('projectedBudget', projected);
  }, [
    form.watch('approvedAmount'),
    form.watch('utilizedBudget'),
    form.watch('requestedAmount'),
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
              <div className='grid grid-cols-2 gap-4'>
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
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <CustomSingleSelectInput
                  name="categoryId"
                  control={form.control}
                  label="Category"
                  findAllWithCursorGQL={modelGQL.CategoryGQL.findAllWithCursor}
                  findUniqueGQL={modelGQL.CategoryGQL.findUnique}
                  defaultValueId={form.watch('categoryId') ?? undefined}
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
                <CustomSingleSelectInput
                  name="companyId"
                  control={form.control}
                  label="Company"
                  findAllWithCursorGQL={modelGQL.CompanyGQL.findAllWithCursor}
                  findUniqueGQL={modelGQL.CompanyGQL.findUnique}
                  defaultValueId={form.watch('companyId') ?? undefined}
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
                <CustomSingleSelectInput
                  name="departmentId"
                  control={form.control}
                  label="Department"
                  findAllWithCursorGQL={modelGQL.DepartmentGQL.findAllWithCursor}
                  findUniqueGQL={modelGQL.DepartmentGQL.findUnique}
                  defaultValueId={form.watch('departmentId') ?? undefined}
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
              <div className='grid grid-cols-5 gap-4'>
                <CustomNumberInput
                  name="approvedAmount"
                  control={form.control}
                  label="Approved Amount"
                  inputProps={{ disabled: isViewMode }}
                />
                <CustomNumberInput
                  name="utilizedBudget"
                  control={form.control}
                  label="Utilized Budget"
                  inputProps={{ disabled: isViewMode }}
                />
                {/*approvedAmount - utilizedBudget =  newBalanceAmmount */}
                <CustomNumberInput
                  name="newBalanceAmmount"
                  control={form.control}
                  label="New Balance Amount"
                  inputProps={{ disabled: isViewMode }}
                />
                <CustomNumberInput
                  name="requestedAmount"
                  control={form.control}
                  label="Requested Amount"
                  inputProps={{ disabled: isViewMode }}
                />
                {/* newBalanceAmmount - requestedAmount = projectedBudget */}
                <CustomNumberInput
                  name="projectedBudget"
                  control={form.control}
                  label="Projected Budget / Remaining Budget"
                  inputProps={{ disabled: isViewMode }}
                />
              </div>

              <CustomTextAreaInput
                name="remark.notes"
                control={form.control}
                label="Notes"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextAreaInput
                name="remark.verificationNotes"
                control={form.control}
                label="Verification Notes"
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