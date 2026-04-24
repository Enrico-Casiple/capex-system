/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { modelGQL } from '@/lib/api/crud.gql';
import { useSession } from 'next-auth/react';
import React from "react";
import useToast from '@/app/_hooks/useToast';
import { useForm } from 'react-hook-form';
import { ok } from '@/lib/util/reponseUtil';
import { WorkFlowTemplate } from '@/lib/generated/api/customHookAPI/graphql';
import FormTemplate from '@/components/Forms/FormTemplate';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const modelAPI = modelGQL;

const Method = (props: MethodProps) => {
  const session = useSession();
  const toast = useToast();
  const defaultValues = {}; // Set default values for the form here
  const form = useForm({
    defaultValues,
  })
  const handleToSubmit = async (data: unknown) => {
    const modelData = data as unknown as WorkFlowTemplate
    return ok("SUCCESS_WORKFLOW_TEMPLATE", `Successfully performed ${props.actionType} action on Workflow Template`, data)
  }
  return (
    <div className='-mt-6 -ml-3'>
      <FormTemplate
        title=''
        description=''
        form={form}
        handleToSubmit={handleToSubmit}
        isHaveBorder={false}
        isFullWidth={true}
      >
        <div className='flex flex-col gap-6 -mt-9 overflow-hidden'>
          <ScrollArea className='h-[calc(100vh-200px)]'></ScrollArea>
          {/* Action Buttons - Fixed at Bottom */}
          <div className='flex gap-3 justify-end bg-background border-t pt-4'>
            <Button variant='outline'>Cancel</Button>
            <Button type='submit' className='px-8'>
              Submit
            </Button>
          </div>
        </div>
      </FormTemplate>
    </div>
  )
};

export default Method;
