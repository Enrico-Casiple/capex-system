import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { RequestItemFindUnique } from '@/lib/api/gql/RequestItem.gql';
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
import { RequestItemCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
import CustomNumberInput from '@/components/Forms/Inputs/CustomNumberInput';
import CustomImportInput from '@/components/Forms/Inputs/CustomImportInput';

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
      requestId: '',
      statusId: '',
      description: '',
      quantity: '',
      unitOfMeasure: '',
      vatPercentage: 12,
      isInclusiveVat: false,
      unitPrice: 0,
      amountGrossOfVat: 0,
      totalPrice: 0,
      attachmentUrl: '',
    }),
    [],
  );


  // Compute the total price excluding VAT based on the unit price, quantity, and VAT percentage
  const computeTotalPrice = (unitPrice: number, quantity: number, vatPercentage: number, isInclusiveVat: boolean) => {
    if (isInclusiveVat) {
      const priceExcludingVat = unitPrice / (1 + vatPercentage / 100);
      return priceExcludingVat * quantity;
    } else {
      return unitPrice * quantity;
    }
  };

  // Compute VAT amount
  const computeVatAmount = (totalPrice: number, vatPercentage: number) => {
    return totalPrice * (vatPercentage / 100);
  };



  const { form, isViewMode, executingCreate, executingUpdate, handleToSubmit, tableName } =
    useFormMethod({
      rowId: props.rowId,
      actionType: props.actionType,
      setOpen: props.setOpen,
      model,
      modelName,
      findUniqueGQL: RequestItemFindUnique,
      defaultValues,
      findUniqueQueryKey: 'RequestItemFindUnique',
      createResponseKey: 'RequestItemCreate',
      updateResponseKey: 'RequestItemUpdate',
      transformData: (data: any) => ({
        requestId: data.requestId ? String(data.requestId) : null,
        statusId: data.statusId ? String(data.statusId) : null,
        description: data.description ? data.description : null,
        quantity: data.quantity ? Number(data.quantity) : null,
        unitOfMeasure: data.unitOfMeasure ? String(data.unitOfMeasure) : null,
        vatPercentage: data.vatPercentage ? Number(data.vatPercentage) : 0,
        isInclusiveVat: data.isInclusiveVat ? Boolean(data.isInclusiveVat) : false,
        unitPrice: data.unitPrice ? Number(data.unitPrice) : 0,
        amountGrossOfVat: data.amountGrossOfVat ? Number(data.amountGrossOfVat) : 0,
        amountVat: data.amountVat ? Number(data.amountVat) : 0,
        attachmentUrl: data.attachmentUrl ? data.attachmentUrl : null,
      }),
    });

  // Watch for changes and update prices
  useEffect(() => {
    const unitPrice = form.watch('unitPrice') || 0;
    const quantity = form.watch('quantity') || 0;
    const vatPercentage = form.watch('vatPercentage') || 0;
    const isInclusiveVat = form.watch('isInclusiveVat') || false;

    // Compute total price (excluding VAT)
    const totalPrice = computeTotalPrice(Number(unitPrice), Number(quantity), Number(vatPercentage), isInclusiveVat);

    // Compute VAT amount
    const vatAmount = computeVatAmount(totalPrice, Number(vatPercentage));

    // Compute gross price (including VAT)
    const grossPrice = totalPrice + vatAmount;

    form.setValue('totalPrice', totalPrice);
    form.setValue('amountVat', vatAmount);
    form.setValue('amountGrossOfVat', grossPrice);
  }, [
    form.watch('unitPrice'),
    form.watch('quantity'),
    form.watch('vatPercentage'),
    form.watch('isInclusiveVat'),
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
              <CustomImportInput<typeof defaultValues>
                name={`attachmentUrl`}
                label="Item Attachment (PDF only, max 10MB)"
                control={form.control}
                setError={form.setError}
                clearErrors={form.clearErrors}
                maxSizeMB={10}
                allowedExtensions={['pdf']}
              />
              <CustomSingleSelectInput
                name="requestId"
                control={form.control}
                label="Request Number"
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
              <CustomTextAreaInput
                name="description"
                control={form.control}
                label="Description"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="quantity"
                control={form.control}
                label="Quantity"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextInput
                name="unitOfMeasure"
                control={form.control}
                label="Unit of Measure"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="vatPercentage"
                control={form.control}
                label="VAT Percentage"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomNumberInput
                name="unitPrice"
                control={form.control}
                label="Unit Price"
                inputProps={{ disabled: isViewMode }}
              />
              {/* Net Price */}
              <CustomNumberInput
                name="totalPrice"
                control={form.control}
                label="Total Price (Excluding VAT)"
                inputProps={{ disabled: isViewMode }}
              />
              {/* Gross Price */}
              <CustomNumberInput
                name="amountGrossOfVat"
                control={form.control}
                label="Gross Price (Including VAT)"
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