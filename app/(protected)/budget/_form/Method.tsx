import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { BudgetFindUnique } from '@/lib/api/gql/Budget.gql';
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
import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { buildRefCode } from '@/lib/util/generateOtpCode';
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
      fiscalYear: '',
      statusId: '',
      budgetRefNo: '',
      companyId: '',
      departmentId: '',
      categoryId: '',
      requesterId: '',
      purpose: '',
      specs: '',
      quantity: 0,
      remark: {
        general: '',
      },
      workflowTemplateId: '',
      submittedAt: new Date(),
      requestedAmount: 0,
      approvedAmount: 0,
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
      findUniqueGQL: BudgetFindUnique,
      defaultValues,
      findUniqueQueryKey: 'BudgetFindUnique',
      createResponseKey: 'BudgetCreate',
      updateResponseKey: 'BudgetUpdate',
      transformData: (data: any) => ({
        fiscalYear: data.fiscalYear ? String(data.fiscalYear) : null,
        statusId: data.statusId ? String(data.statusId) : null,
        budgetRefNo: data.budgetRefNo ? String(data.budgetRefNo) : null,
        companyId: data.companyId ? String(data.companyId) : null,
        departmentId: data.departmentId ? String(data.departmentId) : null,
        categoryId: data.categoryId ? String(data.categoryId) : null,
        requesterId: data.requesterId ? String(data.requesterId) : null,
        purpose: data.purpose ? String(data.purpose) : null,
        specs: data.specs ? String(data.specs) : null,
        quantity: data.quantity ? Number(data.quantity) : 0,
        remark: {
          general: data.remark?.general ? String(data.remark.general) : null,
        },
        workflowTemplateId: data.workflowTemplateId ? String(data.workflowTemplateId) : null,
        submittedAt: data.submittedAt ? new Date(data.submittedAt) : new Date(),
        requestedAmount: data.requestedAmount ? Number(data.requestedAmount) : 0,
        approvedAmount: data.approvedAmount ? Number(data.approvedAmount) : 0,
        currency: data.currency ? String(data.currency) : 'PHP',
      }),
    });


  const FISCAL_START_MONTH = 7; // July
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  useEffect(() => {
    const fiscalStartYear = month >= FISCAL_START_MONTH ? year : year - 1;
    const monthName = new Date(fiscalStartYear, FISCAL_START_MONTH - 1).toLocaleString('en-US', {
      month: 'long',
    }).toUpperCase(); // e.g. "JULY"
    const defaultFiscal = `${monthName} - ${fiscalStartYear}`;
    if (!form.getValues('fiscalYear')) {
      form.setValue('fiscalYear', defaultFiscal);
    }
  }, [form, month, year]);
  const companyId = form.watch('companyId');
  const statusId = form.watch('statusId');

  const companyQuery = useQuery(modelGQL.CompanyGQL.findUnique, {
    variables: { id: companyId ?? '' },
    skip: !companyId,
  });
  useEffect(() => {
    const fiscalStartYear = month >= FISCAL_START_MONTH ? year : year - 1;
    const yearCode = fiscalStartYear.toString();

    const statusCode =
      statusId === '69ef2114f681bdf7f3214d95'
        ? 'AB'
        : statusId === '69ef2113f681bdf7f3214d8f'
          ? 'AX'
          : 'XX';

    const company = (companyQuery.data as any)?.CompanyFindUnique?.data;

    void buildRefCode({
      yearCode,
      statusCode,
      companyAcronym: company?.acronym,
      fallbackName: company?.name,
    }).then((generatedRef) => {
      form.setValue('budgetRefNo', generatedRef);
    });
  }, [companyId, statusId, companyQuery.data, month, year, form]);
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
                name="fiscalYear"
                control={form.control}
                label="Fiscal Year"
                inputProps={{ disabled: true }}
              />

              <CustomSingleSelectInput
                name="requesterId"
                control={form.control}
                label="Requester"
                findAllWithCursorGQL={modelGQL.UserGQL.findAllWithCursor}
                findUniqueGQL={modelGQL.UserGQL.findUnique}
                defaultValueId={form.watch('requesterId') ?? undefined}
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
              <div className='grid grid-cols-3 gap-4'>
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
                      filter: {
                        ...(search && { name: { contains: search, mode: 'insensitive' } }),
                        modelNameType: 'BudgetStatus',
                      }
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
              <CustomTextInput
                name="budgetRefNo"
                control={form.control}
                label="Budget Reference Number"
                inputProps={{ disabled: true }}
              />


              <CustomTextAreaInput
                name="purpose"
                control={form.control}
                label="Purpose"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextAreaInput
                name="specs"
                control={form.control}
                label="Specifications / Details"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextAreaInput
                name="remark.general"
                control={form.control}
                label="General Remarks"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="quantity"
                control={form.control}
                label="Quantity"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="requestedAmount"
                control={form.control}
                label="Requested Amount"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="approvedAmount"
                control={form.control}
                label="Approved Amount"
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