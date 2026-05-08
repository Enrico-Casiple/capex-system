import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { useFormMethod } from '@/app/_hooks/useFormMethod';
import FormTemplate from '@/components/Forms/FormTemplate';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMemo } from 'react';
import { ShiftingScheduleFindUnique } from '@/lib/api/gql/ShiftingSchedule.gql';

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
      id: null,
      name: null,
      description: null,
      startTime: null,
      endTime: null,
      lunchStart: null,
      lunchEnd: null,
      breakStart: null,
      breakEnd: null,
      workInformationId: null,
      createdAt: null,
      updatedAt: null,
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
      findUniqueGQL: ShiftingScheduleFindUnique,
      defaultValues,
      findUniqueQueryKey: 'ShiftingScheduleFindUnique',
      createResponseKey: 'ShiftingScheduleCreate',
      updateResponseKey: 'ShiftingScheduleUpdate',
      transformData: (data: any) => ({
        id: data.id ? String(data.id) : null,
        name: data.name ? String(data.name) : null,
        description: data.description ? String(data.description) : null,
        startTime: data.startTime ? new Date(data.startTime) : null,
        endTime: data.endTime ? new Date(data.endTime) : null,
        lunchStart: data.lunchStart ? new Date(data.lunchStart) : null,
        lunchEnd: data.lunchEnd ? new Date(data.lunchEnd) : null,
        breakStart: data.breakStart ? new Date(data.breakStart) : null,
        breakEnd: data.breakEnd ? new Date(data.breakEnd) : null,
        workInformationId: data.workInformationId ? String(data.workInformationId) : null,
        createdAt: data.createdAt ? new Date(data.createdAt) : null,
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
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
