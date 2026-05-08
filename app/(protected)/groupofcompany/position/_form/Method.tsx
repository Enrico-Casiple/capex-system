import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { PositionFindUnique } from '@/lib/api/gql/Position.gql';
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
import { PositionCreateInput } from '@/lib/generated/api/customHookAPI/graphql';

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
      acronym: '',
      description: '',
      companyId: '',
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
      findUniqueGQL: PositionFindUnique,
      defaultValues,
      findUniqueQueryKey: 'PositionFindUnique',
      createResponseKey: 'PositionCreate',
      updateResponseKey: 'PositionUpdate',
      transformData: (data: any) => ({
        name: data.name || null,
        acronym: data.acronym || null,
        description: data.description || null,
        companyId: data.companyId || null,
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

              <CustomTextInput
                name="name"
                control={form.control}
                label="Name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextInput
                name="acronym"
                control={form.control}
                label="Acronym / Short Name"
                inputProps={{ disabled: isViewMode }}
              />
              <CustomTextAreaInput
                name="description"
                control={form.control}
                label="Description"
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