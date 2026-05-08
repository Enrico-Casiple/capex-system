import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { TypeFindUnique } from '@/lib/api/gql/Type.gql';
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
import { TypeCreateInput } from '@/lib/generated/api/customHookAPI/graphql';
import CustomStaticSelectInput from '@/components/Forms/Inputs/CustomStaticSelectInput';
import { MODEL_NAMES } from '@/generated/model-names';
import { StatusFindUnique } from '@/lib/api/gql/Status.gql';

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
      modelNameType: '',
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
      findUniqueGQL: StatusFindUnique,
      defaultValues,
      findUniqueQueryKey: 'StatusFindUnique',
      createResponseKey: 'StatusCreate',
      updateResponseKey: 'StatusUpdate',
      transformData: (data: any) => ({
        name: data.name ? data.name : null,
        modelNameType: data.modelNameType ? `${data.modelNameType}Type` : null,
        description: data.description ? data.description : null,
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
              <CustomStaticSelectInput
                name="modelNameType"
                control={form.control}
                label="Model Name"
                options={MODEL_NAMES.map((name) => ({ label: name, value: name }))}
                disabled={isViewMode}
              />

              <CustomTextInput
                name="name"
                control={form.control}
                label="Name"
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