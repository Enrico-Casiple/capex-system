/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomDateInput from '@/components/Forms/Inputs/CustomDateInput';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { modelGQL } from '@/lib/api/crud.gql';
import { Request } from '@/lib/generated/api/customHookAPI/graphql';
import { generate_code } from '@/lib/util/bcryptjs';
import { ok } from '@/lib/util/reponseUtil';
import { useSession } from 'next-auth/react';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import BudgetReferenceDetails from './Section/BudgetReferenceDetails';
import React from "react";

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

  // Get Month and Year for request number generation
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear().toString().slice(-2);
  const yearComplete = currentDate.getFullYear().toString()

  // const defaultValues = {
  //   // requestNumber => "REQ-(MMYYYY)-(Generated Random 5-digit number)"
  //   requestNumber: '',
  //   dateNeeded: new Date(),
  //   quotationUrl: '',
  //   quotaionAmount: 0,
  //   currency: 'PHP',
  //   companyId: '', // Connect to company for easier filtering and retrieval of CRF based on company
  //   departmentId: '', // Connect to department for easier filtering and retrieval of CRF based on department
  //   responsibilityCenterId: '', // Connect to responsibility center for easier filtering and retrieval of CRF based on responsibility center
  //   requesterId: session.data?.user?.id || '', // Connect to requester for easier filtering and retrieval of CRF based on requester
  //   requestedCRF: {
  //     create: {
  //       name: '',
  //       description: '',
  //       // "CRF-2025-00001"
  //       crfReferenceNo: '',
  //       statusId: '', // DRAFT | FOR_APPROVAL | APPROVED | REJECTED | CLOSED | VERIFIED
  //       companyId: '', // Connect to company for easier filtering and retrieval of CRF based on company
  //       departmentId: '', // Connect to department for easier filtering and retrieval of CRF based on department
  //       categoryId: '', // Connect to category for easier filtering and retrieval of CRF based on category
  //       utilizedBudget: 0,
  //       approvedAmmount: 0,
  //       requestedAmount: 0,
  //       projectedBudget: 0,
  //       requestId: session.data?.user?.id || '', // Connect back to request for easier retrieval of CRF based on request 
  //       budget: {
  //         connectOrCreate: {
  //           where: {
  //             budgetRefNo: '', // e.g. "2025AB-UNI-001"
  //           },
  //           create: {
  //             fiscalYear: '', // e.g. 2025
  //             statusId: '', // DRAFT | FOR_APPROVAL | APPROVED | REJECTED | CLOSED | VERIFIED
  //             budgetRefNo: '', // e.g. "2025AB-UNI-001 or "2025AX-UNI-001-CRF"
  //             companyId: '', // Connect to company for easier filtering and retrieval of budget based on company
  //             departmentId: '', // Connect to department for easier filtering and retrieval of budget based on department
  //             categoryId: '', // Connect to category for easier filtering and retrieval of budget based on category
  //             requesterId: session.data?.user?.id || '', // Connect to requester for easier filtering and retrieval of budget based on requester
  //             purpose: '', // Purpose of the budget
  //             specs: '', // Specifications or details about the budget
  //             quantity: 0, // Quantity for the budget
  //             remark: {
  //               aopPurpose: '', // Additional remarks or notes about the purpose
  //               aopSpecs: '', // Additional remarks or notes about the specifications
  //               notes: '',
  //             }, // Additional remarks or notes about the budget
  //             workflowTemplateId: '', // Connect to workflow template for easier retrieval of budget based on workflow template
  //             submittedAt: new Date(), // Date when the budget is submitted
  //             requestedAmount: 0, // Amount requested for the budget
  //             approvedAmount: 0, // Amount approved for the budget
  //             currency: 'PHP', // Currency for the budget
  //           }
  //         }
  //       }
  //     }
  //   },
  //   requestItems: {
  //     create: [{
  //       description: '',
  //       quantity: 0,
  //       unitPrice: 0,
  //       totalPrice: 0,
  //       attachmentUrl: '',
  //       status: {
  //         connect: {
  //           id: '',
  //         },
  //       }
  //     }]
  //   },
  // };

  const defaultValues = {
    // requestNumber => "REQ-(MMYYYY)-(Generated Random 5-digit number)"
    requestNumber: '',
    dateNeeded: new Date(), // Default to current date, can be changed by user input
    quotationUrl: '', // URL for the quotation document, can be used for reference or record-keeping
    quotationAmount: 0, // Amount specified in the quotation, can be used for budget comparison or approval reference
    currency: 'PHP', // Default currency set to PHP, can be changed by user input based on the currency of the request or company standards
    companyId: '', // Connect to company for easier filtering and retrieval of CRF based on company
    departmentId: '', // Connect to department for easier filtering and retrieval of CRF based on department
    responsibilityCenterId: '', // Connect to responsibility center for easier filtering and retrieval of CRF based on responsibility center
    requesterId: session.data?.user?.id || '', // Connect to requester for easier filtering and retrieval of CRF based on requester
    requestedCRF: {
      name: '',
      description: '',
      // "CRF-2025-00001"
      crfReferenceNo: '',
      statusId: '', // DRAFT | FOR_APPROVAL | APPROVED | REJECTED | CLOSED | VERIFIED
      companyId: '', // Connect to company for easier filtering and retrieval of CRF based on company
      departmentId: '', // Connect to department for easier filtering and retrieval of CRF based on department
      categoryId: '', // Connect to category for easier filtering and retrieval of CRF based on category
      utilizedBudget: 0, // Amount of budget utilized from the approved budget
      approvedAmount: 0, // Amount approved for the CRF, which can be less than or equal to the requested amount based on approver's discretion
      remainingAmount: 0, // Remaining amount for the budget, which can be calculated as (approvedAmount - sum of committed and actual amounts from BudgetLedger) to give approvers an idea of how much budget is left after considering the approved amount and any amounts that have already been utilized or committed
      requestedAmount: 0, // Amount requested for the CRF, which can be more than the approved amount based on requester's input
      projectedBudget: 0, // Projected budget based on the requested amount and utilized budget, which can be calculated as (utilizedBudget + requestedAmount) to give approvers an idea of the total budget impact if the requested amount is approved
      requestId: session.data?.user?.id || '', // Connect back to request for easier retrieval of CRF based on request 
      remarks: {
        isForConstructionInProgress: false, // Checkbox or toggle to indicate if the CRF is for construction in progress, which may have different approval requirements or budget considerations
        notes: '', // General notes or remarks about the CRF that may not fit into other fields, can be used for approvers to provide feedback or for requesters to add additional context about the CRF request
      },
      budget: {
        fiscalYear: '', // e.g. 2025
        statusId: '', // DRAFT | FOR_APPROVAL | APPROVED | REJECTED | CLOSED | VERIFIED
        budgetRefNo: '', // e.g. "2025AB-UNI-001 or "2025AX-UNI-001-CRF"
        companyId: '', // Connect to company for easier filtering and retrieval of budget based on company
        departmentId: '', // Connect to department for easier filtering and retrieval of budget based on department
        categoryId: '', // Connect to category for easier filtering and retrieval of budget based on category
        requesterId: session.data?.user?.id || '', // Connect to requester for easier filtering and retrieval of budget based on requester
        purpose: '', // Purpose of the budget
        specs: '', // Specifications or details about the budget
        quantity: 0, // Quantity for the budget
        remark: {
          isForConstructionInProgress: false, // Checkbox or toggle to indicate if the budget is for construction in progress, which may have different approval requirements or budget considerations
          aopPurpose: '', // Additional remarks or notes about the purpose
          aopSpecs: '', // Additional remarks or notes about the specifications
          notes: '', // General notes or remarks about the budget that may not fit into purpose or specifications, can be used for approvers to provide feedback or for requesters to add additional context about the budget request
        }, // Additional remarks or notes about the budget
        workflowTemplateId: '', // Connect to workflow template for easier retrieval of budget based on workflow template
        submittedAt: new Date(), // Date when the budget is submitted
        requestedAmount: 0, // Amount requested for the budget
        approvedAmount: 0, // Amount approved for the budget
        remainingAmount: 0, // Remaining amount for the budget, which can be calculated as (approvedAmount - sum of committed and actual amounts from BudgetLedger) to give approvers an idea of how much budget is left after considering the approved amount and any amounts that have already been utilized or committed
        currency: 'PHP', // Currency for the budget
      }
    },
    requestItems: [{
      description: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
      attachmentUrl: '',
      statusId: "", // Connect to status for easier retrieval of request items based on status
    }],
  };


  const form = useForm({
    defaultValues: defaultValues, // Type assertion to match form input type
  });

  // Fixed: Use useEffect with companyId dependency
  React.useEffect(() => {
    const companyId = form.getValues('companyId');
    if (!companyId) {
      form.setValue('responsibilityCenterId', '');
      form.setValue('departmentId', '');
    }
  }, [form.watch('companyId')]);


  const requestedItemFieldArray = useFieldArray({
    control: form.control,
    name: "requestItems", // Type assertion to ensure correct typing for nested field array
  });

  console.log('Method props:', requestedItemFieldArray, 'Method props:', props);


  const handleToSubmit = async (data: unknown) => {
    const requestCreateInput = data as unknown as Request; // Cast to form input type first
    const requestNumberPrefix = `REQ-${month}${year}-${generate_code(5)}`;
    const crfNumberPrefix = `CRF-${month}${year}-${generate_code(5)}`;
    const budgetNumberPrefix = `${yearComplete}AX-${"UNI"}-${generate_code(5)}`;

    alert(JSON.stringify({ ...requestCreateInput, requestNumber: requestNumberPrefix }, null, 2));
    switch (props.actionType) {
      case 'duplicate':
        // Mutation to create a new request
        return ok("SUCCESS_TO_DUPLICATE", `Successfully duplicated`, {
          ...requestCreateInput,
          requestNumber: requestNumberPrefix, // Reset the request number for duplication
          requestedCRF: {
            ...requestCreateInput.requestedCRF,
            crfReferenceNo: crfNumberPrefix, // Reset the CRF reference number for duplication
            budget: {
              ...requestCreateInput.requestedCRF?.budget,
              budgetRefNo: requestCreateInput.requestedCRF?.budget?.budgetRefNo ?? budgetNumberPrefix, // Reset the budget reference number for duplication
            }, // Clear the budget information for duplication, as it may not be relevant to duplicate the budget along with the request, and it can be created separately if needed
          }
        });
      case 'edit':
        // Mutation to update the request
        return ok("SUCCESS_TO_UPDATE", `Successfully updated`, requestCreateInput);
      default:
        // Mutation to create a new request
        return ok("SUCCESS_TO_CREATE", `Successfully created`, {
          ...requestCreateInput,
          requestNumber: requestNumberPrefix, // Reset the request number for duplication
          requestedCRF: {
            ...requestCreateInput.requestedCRF,
            crfReferenceNo: crfNumberPrefix, // Reset the CRF reference number for duplication
            budget: {
              ...requestCreateInput.requestedCRF?.budget,
              budgetRefNo: requestCreateInput.requestedCRF?.budget?.budgetRefNo ?? budgetNumberPrefix, // Reset the budget reference number for duplication
            }, // Clear the budget information for duplication, as it may not be relevant to duplicate the budget along with the request, and it can be created separately if needed
          }
        });
    }
  }

  return <div>
    <FormTemplate
      title=''
      description=''
      isHaveBorder={false}
      form={form}
      handleToSubmit={handleToSubmit}
      isFullWidth={true}
    >
      <div className='flex flex-col gap-6 -mt-9 overflow-hidden'>
        {/* Form Sections Container */}
        <ScrollArea className='h-[calc(100vh-200px)]'>
          <div className='space-y-8 pr-4'>
            {/* I. Requester Details */}
            <section className='space-y-4'>
              <div className='flex items-center gap-3 pb-3 border-b'>
                <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold'>
                  I
                </div>
                <div>
                  <h3 className='text-lg font-semibold'>Requester Details</h3>
                  <p className='text-xs text-muted-foreground mt-0.5'>Provide request and organizational information</p>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <CustomSingleSelectInput
                  name={`requesterId`}
                  control={form.control}
                  label={`Requester`}
                  findAllWithCursorGQL={modelAPI.UserGQL.findAllWithCursor}
                  findUniqueGQL={modelAPI.UserGQL.findUnique}
                  defaultValueId={session.data?.user?.id || ""}
                  placeholder={`Search requester...`}
                  searchPlaceholder={`Search requester...`}
                  emptySelectedMessage={`Requester already selected.`}
                  emptyMessage={`No requester found.`}
                  cursorVariables={(search, cursor, take) => ({
                    cursorInput: {
                      cursor,
                      isActive: true,
                      take,
                      filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
                    },
                  })}
                  uniqueVariables={(id) => ({ id })}
                  mapOption={(data: unknown) => {
                    const d = data as { id?: string; name?: string; userName?: string; email?: string };
                    return {
                      label: d.name ?? d.userName ?? d.email ?? '',
                      value: d.id ?? '',
                    };
                  }}
                  mapDefaultOption={(data: unknown) => {
                    const d = data as {
                      data?: { id?: string; name?: string; userName?: string; email?: string };
                    };
                    if (!d?.data) return null;
                    return {
                      label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                      value: d.data.id ?? '',
                    };
                  }}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <CustomDateInput
                    name="dateNeeded"
                    control={form.control}
                    label="Date Needed"
                  />
                  <CustomSingleSelectInput
                    name={`companyId`}
                    control={form.control}
                    label={`Company`}
                    findAllWithCursorGQL={modelAPI.CompanyGQL.findAllWithCursor}
                    findUniqueGQL={modelAPI.CompanyGQL.findUnique}
                    defaultValueId={""}
                    placeholder={`Search company...`}
                    searchPlaceholder={`Search company...`}
                    emptySelectedMessage={`Company already selected.`}
                    emptyMessage={`No company found.`}
                    cursorVariables={(search, cursor, take) => ({
                      cursorInput: {
                        cursor,
                        isActive: true,
                        take,
                        filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
                      },
                    })}
                    uniqueVariables={(id) => ({ id })}
                    mapOption={(data: unknown) => {
                      const d = data as { id?: string; name?: string; userName?: string; email?: string };
                      return {
                        label: d.name ?? d.userName ?? d.email ?? '',
                        value: d.id ?? '',
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: { id?: string; name?: string; userName?: string; email?: string };
                      };
                      if (!d?.data) return null;
                      return {
                        label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                        value: d.data.id ?? '',
                      };
                    }}
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <CustomSingleSelectInput
                    name={`responsibilityCenterId`}
                    control={form.control}
                    label={`Responsibility Center`}
                    findAllWithCursorGQL={modelAPI.DepartmentGQL.findAllWithCursor}
                    findUniqueGQL={modelAPI.DepartmentGQL.findUnique}
                    defaultValueId={""}
                    placeholder={`Search responsibility center...`}
                    searchPlaceholder={`Search responsibility center...`}
                    emptySelectedMessage={`Responsibility center already selected.`}
                    emptyMessage={`No responsibility center found.`}
                    disabled={!form.watch('companyId')}
                    cursorVariables={(search, cursor, take) => {
                      const selectedCompanyId = form.watch('companyId');
                      return {
                        cursorInput: {
                          cursor,
                          isActive: true,
                          take,
                          filter: {
                            ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
                            ...(selectedCompanyId && { companyId: selectedCompanyId }),
                          },
                        },
                      };
                    }}
                    uniqueVariables={(id) => ({ id })}
                    mapOption={(data: unknown) => {
                      const d = data as { id?: string; name?: string; userName?: string; email?: string };
                      return {
                        label: d.name ?? d.userName ?? d.email ?? '',
                        value: d.id ?? '',
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: { id?: string; name?: string; userName?: string; email?: string };
                      };
                      if (!d?.data) return null;
                      return {
                        label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                        value: d.data.id ?? '',
                      };
                    }}
                  />
                  <CustomSingleSelectInput
                    name={`departmentId`}
                    control={form.control}
                    label={`Department`}
                    findAllWithCursorGQL={modelAPI.DepartmentGQL.findAllWithCursor}
                    findUniqueGQL={modelAPI.DepartmentGQL.findUnique}
                    defaultValueId={""}
                    placeholder={`Search department...`}
                    searchPlaceholder={`Search department...`}
                    emptySelectedMessage={`Department already selected.`}
                    emptyMessage={`No department found.`}
                    disabled={!form.watch('companyId')}
                    cursorVariables={(search, cursor, take) => {
                      const selectedCompanyId = form.watch('companyId');
                      return {
                        cursorInput: {
                          cursor,
                          isActive: true,
                          take,
                          filter: {
                            ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
                            ...(selectedCompanyId && { companyId: selectedCompanyId }),
                          },
                        },
                      };
                    }}
                    uniqueVariables={(id) => ({ id })}
                    mapOption={(data: unknown) => {
                      const d = data as { id?: string; name?: string };
                      return {
                        label: d.name ?? '',
                        value: d.id ?? '',
                      };
                    }}
                    mapDefaultOption={(data: unknown) => {
                      const d = data as {
                        data?: { id?: string; name?: string; userName?: string; email?: string };
                      };
                      if (!d?.data) return null;
                      return {
                        label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                        value: d.data.id ?? '',
                      };
                    }}
                  />
                </div>
              </div>
            </section>

            {/* II. Budget Reference Details */}
            <BudgetReferenceDetails form={form as unknown as UseFormReturn<Request>} />

            {/* III. Workflow Approval Step */}
            <section className='space-y-4'>
              <div className='text-lg font-semibold border-b pb-3'>
                IV. Requested Items
              </div>
              <div className='text-sm text-muted-foreground'>
                {/* Form fields here */}
              </div>
            </section>

            {/* IV. Workflow Approval Step */}
            <section className='space-y-4'>
              <div className='text-lg font-semibold border-b pb-3'>
                IV. Workflow Approval Step
              </div>
              <div className='text-sm text-muted-foreground'>
                {/* Form fields here */}
              </div>
            </section>
          </div>
        </ScrollArea>
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
};

export default Method;
