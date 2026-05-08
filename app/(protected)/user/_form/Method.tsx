'use client';

import { ActionType, PopupType } from '@/app/_component/Row/Action';
import FormTemplate from '@/components/Forms/FormTemplate';

import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { modelGQL } from '@/lib/api/crud.gql';
import { UserFindUnique } from '@/lib/api/gql/User.gql';
import { UserResponse } from '@/lib/generated/api/customHookAPI/graphql';
import { fail, ok } from '@/lib/util/reponseUtil';
import { useQuery } from '@apollo/client/react';
import { useSession } from 'next-auth/react';
import React, { lazy, Suspense, useCallback, useEffect, useMemo } from "react";
import handleToSubmitToCreate from './action/handleToSubmitToCreate';
import useToast from '@/app/_hooks/useToast';
import { useForm } from 'react-hook-form';

// Lazy load components
const BasicInformationCreate = lazy(() => import('./components/BasicInformationCreate'));
const WorkInformationCreate = lazy(() => import('./components/WorkInformationCreate'));
const UserCreate = lazy(() => import('./components/UserCreate'));
const UserRoleCreate = lazy(() => import('./components/UserRoleCreate'));

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserFormValues = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  emailVerified: string;
  image: string;
  isTwoFactorAuthEnabled: boolean;
  userRoles: { roleId: string }[];
  basicInformations: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    fullName: string;
    birthDate: string;
    gender: string;
    workInformations: {
      id: string;
      employeeNumber: string;
      groupOfCompanyId: string;
      companyId: string;
      departmentId: string;
      positionId: string;
      jobLevelId: string;
      employmentTypeId: string;
      employmentStatusId: string;
      reportingManagerId: string;
    }[];
  };
};

const DEFAULT_VALUES: UserFormValues = {
  id: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
  emailVerified: "",
  image: "",
  isTwoFactorAuthEnabled: true,
  userRoles: [{
    roleId: "",
  }],
  basicInformations: {
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    fullName: "",
    birthDate: "",
    gender: "",
    workInformations: [{
      id: "",
      employeeNumber: "",
      groupOfCompanyId: "",
      companyId: "",
      departmentId: "",
      positionId: "",
      jobLevelId: "",
      employmentTypeId: "",
      employmentStatusId: "",
      reportingManagerId: "",
    }]
  }
};

// Loading skeleton component
const FormSectionLoader = () => (
  <div className='py-6 px-4'>
    <div className='space-y-4'>
      <div className='h-4 bg-muted rounded w-1/4'></div>
      <div className='h-10 bg-muted rounded'></div>
      <div className='h-10 bg-muted rounded'></div>
    </div>
  </div>
);



const Method = (props: MethodProps) => {
  const session = useSession();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [hasInitialized, setHasInitialized] = React.useState(false);

  const userFindUnique = useQuery<
    { UserFindUnique: UserResponse },
    { id: string }
  >(UserFindUnique, {
    variables: {
      id: props.rowId ?? "",
    },
    skip: !props.rowId || props.actionType === "none",
  });

  const normalizeUserRoles = useCallback(
    (userRoles?: Array<{ roleId?: string | null } | null>): UserFormValues['userRoles'] =>
      userRoles?.map((userRole) => ({
        roleId: userRole?.roleId ?? '',
      })) ?? [{
        roleId: '',
      }],
    []
  );

  const form = useForm<UserFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  // Initialize form only once when data is fetched
  useEffect(() => {
    if (
      !hasInitialized &&
      props.actionType !== "none" &&
      userFindUnique.data?.UserFindUnique.data
    ) {
      const data = userFindUnique.data.UserFindUnique.data;

      form.reset({
        id: data.id ?? "",
        name: data.name ?? "",
        email: data.email ?? "",
        password: data.password ?? "",
        confirmPassword: "",
        userName: data.userName ?? "",
        emailVerified: data.emailVerified ?? "",
        image: data.image ?? "",
        isTwoFactorAuthEnabled: data.isTwoFactorAuthEnabled ?? true,
        userRoles: normalizeUserRoles(data.userRoles),
        basicInformations: {
          id: data?.basicInformations?.id ?? "",
          firstName: data?.basicInformations?.firstName ?? "",
          middleName: data?.basicInformations?.middleName ?? "",
          lastName: data?.basicInformations?.lastName ?? "",
          suffix: data?.basicInformations?.suffix ?? "",
          fullName: data?.basicInformations?.fullName ?? "",
          birthDate: data?.basicInformations?.birthDate ?? "",
          gender: data?.basicInformations?.gender ?? "",
          workInformations: data?.basicInformations?.workInformations?.map(workinfo => ({
            id: workinfo.id ?? "",
            employeeNumber: workinfo.employeeNumber ?? "",
            groupOfCompanyId: workinfo.groupOfCompanyId ?? "",
            companyId: workinfo.companyId ?? "",
            departmentId: workinfo.departmentId ?? "",
            positionId: workinfo.positionId ?? "",
            jobLevelId: workinfo.jobLevelId ?? "",
            employmentTypeId: workinfo.employmentTypeId ?? "",
            employmentStatusId: workinfo.employmentStatusId ?? "",
            reportingManagerId: workinfo.reportingManagerId ?? "",
          })) ?? [{
            id: "",
            employeeNumber: "",
            groupOfCompanyId: "",
            companyId: "",
            departmentId: "",
            positionId: "",
            jobLevelId: "",
            employmentTypeId: "",
            employmentStatusId: "",
            reportingManagerId: "",
          }]
        }
      });

      setHasInitialized(true);
    }
  }, [userFindUnique.data?.UserFindUnique.data?.id, props.actionType, hasInitialized, normalizeUserRoles, form]);

  // Reset initialization flag when rowId changes
  useEffect(() => {
    setHasInitialized(false);
  }, [props.rowId]);

  const handleToSubmit = async (data: unknown) => {
    try {
      setLoading(true);

      const result = await handleToSubmitToCreate(
        data,
        props.actionType!,
        session.data?.user?.id!,
        props.rowId ?? ""
      );

      if (!result.isSuccess) {
        toast.error({
          message: result.code,
          description: result.message
        });
        setLoading(false);
        return fail(result.code, result.message);
      }

      toast.success({
        message: result.code,
        description: result.message
      });

      // Reset form state when closing
      setHasInitialized(false);
      props.setOpen?.(false);

      setLoading(false);
      return ok(result.code, result.message, result.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error({
        message: 'ERROR',
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
      setLoading(false);
      return fail('ERROR', 'An unexpected error occurred');
    }
  };

  const isViewMode = useMemo(() => props.actionType === "view", [props.actionType]);

  // Memoized user data to prevent unnecessary re-renders
  const userData = useMemo(() => ({
    isActive: userFindUnique.data?.UserFindUnique.data?.isActive,
    isTwoFactorAuthEnabled: userFindUnique.data?.UserFindUnique.data?.isTwoFactorAuthEnabled,
  }), [userFindUnique.data?.UserFindUnique.data?.isActive, userFindUnique.data?.UserFindUnique.data?.isTwoFactorAuthEnabled]);

  const memoUserRoleCreate = useMemo(
    () => <UserRoleCreate isViewMode={isViewMode} form={form} />,
    // these should be the minimal stable deps
    [isViewMode, form]
  );
  return (
    <FormTemplate
      title=""
      description=""
      form={form}
      handleToSubmit={handleToSubmit}
      isHaveBorder={false}
      isFullWidth={true}
    >
      <div className='flex flex-col gap-6 -mt-5 overflow-hidden'>
        <ScrollArea className='h-[calc(100vh-210px)]'>
          {/* BASIC INFO */}
          <Suspense fallback={<FormSectionLoader />}>
            <BasicInformationCreate isViewMode={isViewMode} form={form} />
          </Suspense>

          {/* WORK INFO */}
          <Suspense fallback={<FormSectionLoader />}>
            <WorkInformationCreate isViewMode={isViewMode} form={form} />
          </Suspense>

          {/* USER ACCOUNT */}
          <Suspense fallback={<FormSectionLoader />}>
            <UserCreate
              isViewMode={isViewMode}
              form={form}
              actionType={props.actionType}
              id={props.rowId!}
              setOpen={props.setOpen!}
              isBlocked={userData.isActive!}
              isAuth={userData.isTwoFactorAuthEnabled!}
            />
          </Suspense>

          {/* ROLE */}
          <Suspense fallback={<FormSectionLoader />}>
            {memoUserRoleCreate}
          </Suspense>
        </ScrollArea>

        {/* Action Buttons - Fixed at Bottom */}
        {props.actionType === "view" ? null : (
          <div className='flex gap-3 justify-end bg-background border-t pt-4'>
            <DrawerClose asChild>
              <Button
                variant='outline'
                disabled={loading}
                className={`px-8 ${loading ? 'cursor-not-allowed' : ''}`}
                type='button'
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button
              type='submit'
              className={`px-8 ${loading ? 'cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submit...' : 'Submit'}
            </Button>
          </div>
        )}
      </div>
    </FormTemplate>
  );
};

export default Method;