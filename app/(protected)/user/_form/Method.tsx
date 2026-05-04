import { ActionType, PopupType } from '@/app/_component/Row/Action';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import useMutationActions from '@/app/_hooks/useBulkActions';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomStaticSelectInput from '@/components/Forms/Inputs/CustomStaticSelectInput';
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { modelGQL } from '@/lib/api/crud.gql';
import { UserFindUnique } from '@/lib/api/gql/User.gql';
import { User, UserResponse } from '@/lib/generated/api/customHookAPI/graphql';
import { ok } from '@/lib/util/reponseUtil';
import { useQuery } from '@apollo/client/react';
import { Layers } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type UserFormValues = {
  id: string;
  name: string;
  email: string;
  password: string;
  userName: string;
  emailVerified: string;
  image: string;
  isTwoFactorAuthEnabled: boolean;
  userRoles: { userId: string; roleId: string }[];
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

const modelAPI = modelGQL;

const Method = (props: MethodProps) => {
  const { model } = useListContext();
  const session = useSession();

  const userFindUnique = useQuery<
    { UserFindUnique: UserResponse },
    { id: string }
  >(UserFindUnique, {
    variables: {
      id: props.rowId ?? "",
    },
    skip: !props.rowId || props.actionType === "none",
  })

  const normalizeUserRoles = (
    userRoles?: Array<{ userId?: string | null; roleId?: string | null } | null>,
  ): UserFormValues['userRoles'] =>
    userRoles?.map((userRole) => ({
      userId: userRole?.userId ?? '',
      roleId: userRole?.roleId ?? '',
    })) ?? [
      {
        userId: '',
        roleId: '',
      },
    ];

  const defaultValues = {
    id: "",
    name: "",
    email: "",
    password: "",
    userName: "",
    emailVerified: "",
    image: "",
    isTwoFactorAuthEnabled: true,
    userRoles: [{
      userId: "",
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

  const form = useForm<UserFormValues>({
    defaultValues,
  });

  useEffect(() => {
    if (props.actionType !== "none" && userFindUnique.data?.UserFindUnique.data) {
      const data = userFindUnique.data.UserFindUnique.data;
      form.reset({
        id: data.id ?? "",
        name: data.name ?? "",
        email: data.email ?? "",
        password: data.password ?? "",
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
    }
  }, [userFindUnique.data, props.actionType, form]);



  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: modelAPI[model].create,
    setOpen: props.setOpen,
    successMessage: 'Create Workflow Template Successfully',
    successDescription: `The workflow template has been created successfully.`,
    errorMessage: 'Create Workflow Template Failed',
    errorDescription: `There was an error creating the workflow template. Please try again.`,
  });


  const { execute: executeUpdate, executing: executingUpdate } = useMutationActions({
    mutationGQL: modelAPI[model].update,
    setOpen: props.setOpen,
    successMessage: 'Update Workflow Template Successfully',
    successDescription: `The workflow template has been updated successfully.`,
    errorMessage: 'Update Workflow Template Failed',
    errorDescription: `There was an error updating the workflow template. Please try again.`,
  });

  const handleToSubmit = async (data: unknown) => {
    const modelData = data as unknown as User;


    switch (props.actionType) {
      case 'edit':
        await executeUpdate({
          variables: {
            id: props.rowId ?? "",
            data: {},
            currentUserId: session?.data?.user?.id,
          }
        })
        return ok("SUCCESS_UPDATE_WORKFLOW_TEMPLATE",
          `Successfully updated workflow template: ${modelData.name}`,
          data
        );
      case "duplicate":
        await executeCreate({
          variables: {
            data: {},
            currentUserId: session?.data?.user?.id,
          }
        })
        return ok("SUCCESS_DUPLICATE_WORKFLOW_TEMPLATE",
          `Successfully duplicated workflow template: ${modelData.name}`,
          data
        );
      default:
        await executeCreate({
          variables: {
            data: {},
            currentUserId: session?.data?.user?.id,
          }
        })
        return ok("SUCCESS_CREATE_WORKFLOW_TEMPLATE",
          `Successfully created workflow template: ${modelData.name}`,
          data
        );
    }
  };

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
        {/* {JSON.stringify(userFindUnique.data?.UserFindUnique.data, null, 2)} */}
        <ScrollArea className='h-[calc(100vh-210px)]'>
          <div className="space-y-6">
            {/* Header section with Icon */}
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Basic Information Configuration</h3>
                <p className="text-xs text-muted-foreground">
                  Configure the basic information of the workflow template, including its name, description, and global applicability.
                </p>
              </div>
            </div>
            {/* Form section with Icon */}
            <div className='grid grid-cols-1 gap-4'>
              <div className='grid grid-cols-10 gap-4'>
                <div className='col-span-3'>
                  <CustomTextInput
                    name="basicInformations.firstName"
                    control={form.control}
                    label="First Name"
                    placeholder="Please enter first name"
                  />
                </div>
                <div className='col-span-3'>
                  <CustomTextInput
                    name="basicInformations.middleName"
                    control={form.control}
                    label="Middle Name"
                    placeholder="Please enter middle name"
                  />
                </div>
                <div className='col-span-3'>
                  <CustomTextInput
                    name="basicInformations.lastName"
                    control={form.control}
                    label="Last Name"
                    placeholder="Please enter last name"
                  />
                </div>
                <div className='col-span-1'>
                  <CustomStaticSelectInput
                    name={`basicInformations.suffix`}
                    control={form.control}
                    label="Suffix"
                    options={[
                      {
                        label: "Junior",
                        value: "Jr."
                      },
                      {
                        label: "Senior",
                        value: "Sr."
                      },
                      {
                        label: "The Second",
                        value: "II."
                      },
                      {
                        label: "The Third",
                        value: "III."
                      },
                    ]}
                    placeholder="Select suffix"
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1'>
                  <CustomTextInput
                    name="basicInformations.fullName"
                    control={form.control}
                    label="Full Name"
                    placeholder="Please enter full name"
                  />
                </div>
                <div className='col-span-1'>
                  <CustomStaticSelectInput
                    name={`basicInformations.gender`}
                    control={form.control}
                    label="Gender"
                    options={[
                      {
                        label: "Male",
                        value: "Male."
                      },
                      {
                        label: "Female",
                        value: "Female."
                      },
                      {
                        label: "Other",
                        value: "Other."
                      },
                    ]}
                    placeholder="Select gender"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {/* Header section with Icon */}
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Work Information Configuration</h3>
                <p className="text-xs text-muted-foreground">
                  Configure the work information of the workflow template, including its name, description, and global applicability.
                </p>
              </div>
            </div>
            {/* Form section with Icon */}
            <div className='grid grid-cols-1'></div>
          </div>
          <div className="space-y-6">
            {/* Header section with Icon */}
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">User Account Configuration</h3>
                <p className="text-xs text-muted-foreground">
                  Configure the user account of the workflow template, including its name, description, and global applicability.
                </p>
              </div>
            </div>

          </div>
          <div className="space-y-6">
            {/* Header section with Icon */}
            <div className="flex items-center gap-3 pb-2 border-b">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">User Role Configuration</h3>
                <p className="text-xs text-muted-foreground">
                  Configure the user role of the workflow template, including its name, description, and global applicability.
                </p>
              </div>
            </div>

          </div>
        </ScrollArea>
        {/* Action Buttons - Fixed at Bottom */}
        {
          props.actionType === "view" ? null : (

            <div className='flex gap-3 justify-end bg-background border-t pt-4'>
              <DrawerClose asChild>
                <Button
                  variant='outline'
                  disabled={executingCreate || executingUpdate}
                  className={`px-8 ${(executingCreate || executingUpdate) ? 'cursor-not-allowed' : ''}`}
                  type='button'
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button type='submit'
                className={`px-8 ${(executingCreate || executingUpdate) ? 'cursor-not-allowed' : ''}`}
                disabled={executingCreate || executingUpdate}

              >
                {
                  (executingCreate || executingUpdate) ? 'Submit...' : 'Submit'
                }
              </Button>
            </div>
          )
        }
      </div>
    </FormTemplate>
  );
};

export default Method;
