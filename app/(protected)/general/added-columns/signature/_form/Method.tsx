import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { useFormMethod } from '@/app/_hooks/useFormMethod';
import FormTemplate from '@/components/Forms/FormTemplate';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMemo } from 'react';
import { SignatureFindUnique } from '@/lib/api/gql/Signature.gql';

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
      instanceId: null,
      stepId: null,
      attachmentUrl: null,
      userId: null,
      signatureHash: null,
      payload: null,
      ipAddress: null,
      userAgent: null,
      isActive: null,
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
      findUniqueGQL: SignatureFindUnique,
      defaultValues,
      findUniqueQueryKey: 'SignatureFindUnique',
      createResponseKey: 'SignatureCreate',
      updateResponseKey: 'SignatureUpdate',
      transformData: (data: any) => ({
        id: data.id ? String(data.id) : null,
        instanceId: data.instanceId ? String(data.instanceId) : null,
        stepId: data.stepId ? String(data.stepId) : null,
        attachmentUrl: data.attachmentUrl ? String(data.attachmentUrl) : null,
        userId: data.userId ? String(data.userId) : null,
        signatureHash: data.signatureHash ? String(data.signatureHash) : null,
        payload: data.payload ? JSON.stringify(data.payload) : null,
        ipAddress: data.ipAddress ? String(data.ipAddress) : null,
        userAgent: data.userAgent ? String(data.userAgent) : null,
        isActive: data.isActive != null ? Boolean(data.isActive) : null,
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
