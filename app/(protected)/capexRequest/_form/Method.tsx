/* eslint-disable react-hooks/incompatible-library */
import { ActionType, PopupType } from '@/app/_component/Row/Action';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomDateInput from '@/components/Forms/Inputs/CustomDateInput';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { modelGQL } from '@/lib/api/crud.gql';
import { Request, RequestResponse } from '@/lib/generated/api/customHookAPI/graphql';
import { generate_code } from '@/lib/util/bcryptjs';
import { fail, ok } from '@/lib/util/reponseUtil';
import { useSession } from 'next-auth/react';
import { useForm, UseFormReturn } from 'react-hook-form';
import BudgetReferenceDetails from './Section/BudgetReferenceDetails';
import React from "react";
import RequestedItem, { RequestedItemFormValues } from './Section/RequestedItem';
import useToast from '@/app/_hooks/useToast';
import WorkApprovalInstance from './Section/WorkApprovalInstance';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { useQuery } from '@apollo/client/react';
import { RequestFindUnique } from '@/lib/api/gql/Request.gql';
import { DialogClose } from '@/components/ui/dialog';
import WorkApprovalInstanceProcess from './Section/WorkApprovalInstanceProcess';

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

  // Get Month and Year for request number generation
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear().toString().slice(-2);
  // const yearComplete = currentDate.getFullYear().toString()

  const requestQuery = useQuery<
    { RequestFindUnique: RequestResponse },
    { id: string }
  >(RequestFindUnique, {
    variables: { id: props.rowId || "" },
    skip: !props.rowId || props.actionType === "none",
  })

  const defaultValues = {
    id: '',
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
      id: '', // Unique identifier for the CRF, can be used for referencing the CRF in other parts of the system or for tracking purposes
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
      newBalanceAmmount: 0, // Remaining amount for the budget, which can be calculated as (approvedAmount - sum of committed and actual amounts from BudgetLedger) to give approvers an idea of how much budget is left after considering the approved amount and any amounts that have already been utilized or committed
      requestedAmount: 0, // Amount requested for the CRF, which can be more than the approved amount based on requester's input
      projectedBudget: 0, // Projected budget based on the requested amount and utilized budget, which can be calculated as (utilizedBudget + requestedAmount) to give approvers an idea of the total budget impact if the requested amount is approved
      requestId: session.data?.user?.id || '', // Connect back to request for easier retrieval of CRF based on request
      remark: {
        isForConstructionInProgress: false, // Checkbox or toggle to indicate if the CRF is for construction in progress, which may have different approval requirements or budget considerations
        notes: '', // General notes or remarks about the CRF that may not fit into other fields, can be used for approvers to provide feedback or for requesters to add additional context about the CRF request
        verificationNotes: '', // Notes specifically for the verification step, which can be used by verifiers to provide feedback or request additional information from the requester before the CRF can be verified and closed
      },
      budgetId: ''
    },
    requestItems: [{
      description: '',
      quantity: 1,
      unitOfMeasure: '',
      vatPercentage: 12,
      isInclusiveVat: false,
      unitPrice: 0,
      totalPrice: 0,
      amountGrossOfVat: 0,
      attachmentUrl: '',
      statusId: "",
      id: '', // Unique identifier for the request item, can be used for referencing the item in other parts of the system or for tracking purposes
    }],
    workflowTemplateId: "", // Connect to workflow template for easier retrieval of workflow template based on the request and to apply the correct approval workflow for the request
    workFlowInstance: {
      id: '', // Unique identifier for the workflow instance, can be used for referencing the workflow instance in other parts of the system or for tracking purposes
      budgetId: "", // Connect to budget for easier retrieval of workflow instance based on budget and to track the budget impact of the request throughout the approval process
      templateId: "", // Connect to workflow template for easier retrieval of workflow template based on the request and to apply the correct approval workflow for the request
      title: "",
      description: "",
      statusId: "69ef2115f681bdf7f3214d99", // DRAFT | FOR_APPROVAL | APPROVED | REJECTED | CLOSED | VERIFIED
      currentStep: 1,
      startedAt: new Date(),
      steps: [{
        stepTemplateId: "", // Connect to step template for easier retrieval of step template based on the workflow template and to apply the correct approval steps for the request
        stepNumber: 1,
        statusId: "69ef2110f681bdf7f3214d7d", // DRAFT | FOR_APPROVAL | APPROVED | REJECTED | CLOSED | VERIFIED
        assignedToUserId: "", // Connect to user for easier retrieval of workflow steps assigned to a user and to notify the user of their pending approval tasks
        startedAt: new Date(),
        isEditable: false, // Flag to indicate if the current step is editable by the assigned approver, which can be used to control the UI and prevent changes to the step once it's completed or if the approver doesn't have permission to edit it
        source: "REQUEST_ITEM_APPROVAL" // Enum or string to indicate the source of the workflow step, which can be used for tracking and reporting purposes to differentiate between different types of workflow steps (e.g., request item approval, budget approval, etc.)
      }]
    }
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
  }, [form]);

  React.useEffect(() => {
    const requestData = requestQuery.data?.RequestFindUnique.data;
    if (requestData) {
      form.reset({
        id: requestData.id || '',
        requestNumber: requestData.requestNumber || '',
        dateNeeded: new Date(requestData.dateNeeded),
        quotationUrl: requestData.quotationUrl || '',
        quotationAmount: requestData.quotationAmount || 0,
        currency: requestData.currency || 'PHP',
        companyId: requestData.companyId || '',
        departmentId: requestData.departmentId || '',
        responsibilityCenterId: requestData.responsibilityCenterId || '',
        requesterId: requestData.requesterId || session.data?.user?.id || '',
        workflowTemplateId: requestData.workflowTemplateId || '',
        requestedCRF: {
          id: requestData.requestedCRF?.id || '',
          name: requestData.requestedCRF?.name || '',
          description: requestData.requestedCRF?.description || '',
          crfReferenceNo: requestData.requestedCRF?.crfReferenceNo || '',
          statusId: requestData.requestedCRF?.status?.id || requestData.requestedCRF?.statusId || '',
          categoryId: requestData.requestedCRF?.categoryId || requestData.requestedCRF?.category?.id || '',
          departmentId: requestData.requestedCRF?.departmentId || requestData.requestedCRF?.department?.id || '',
          companyId: requestData.requestedCRF?.companyId || requestData.requestedCRF?.company?.id || '',
          budgetId: requestData.requestedCRF?.budgetId || requestData.requestedCRF?.budget?.id || '',
          utilizedBudget: requestData.requestedCRF?.utilizedBudget || 0,
          approvedAmount: requestData.requestedCRF?.approvedAmount || 0,
          remainingAmount: requestData.requestedCRF?.remainingAmount || 0,
          newBalanceAmmount: requestData.requestedCRF?.newBalanceAmmount || 0,
          requestedAmount: requestData.requestedCRF?.requestedAmount || 0,
          projectedBudget: requestData.requestedCRF?.projectedBudget || 0,
          requestId: requestData.requestedCRF?.requestId || '',
          remark: {
            isForConstructionInProgress: requestData.requestedCRF?.remark?.isForConstructionInProgress || false,
            notes: requestData.requestedCRF?.remark?.notes || '',
            verificationNotes: requestData.requestedCRF?.remark?.verificationNotes || '',
          }
        },
        requestItems: (requestData.requestItems && requestData.requestItems.length > 0) ? requestData.requestItems.map(item => ({
          description: item.description || '',
          quantity: item.quantity || 1,
          unitOfMeasure: item.unitOfMeasure || '',
          vatPercentage: item.vatPercentage || 12,
          isInclusiveVat: item.isInclusiveVat || false,
          unitPrice: item.unitPrice || 0,
          totalPrice: item.totalPrice || 0,
          amountGrossOfVat: item.amountGrossOfVat || 0,
          attachmentUrl: item.attachmentUrl || '',
          statusId: item.status?.id || '',
          id: item.id || '', // Unique identifier for the request item, can be used for referencing the item in other parts of the system or for tracking purposes
        })) : [{
          description: '',
          quantity: 1,
          unitOfMeasure: '',
          vatPercentage: 12,
          isInclusiveVat: false,
          unitPrice: 0,
          totalPrice: 0,
          amountGrossOfVat: 0,
          attachmentUrl: '',
          statusId: "",
          id: '', // Unique identifier for the request item, can be used for referencing the item in other parts of the system or for tracking purposes
        }],
        workFlowInstance: requestData.workFlowInstance ? {
          id: requestData.workFlowInstance.id || '', // Unique identifier for the workflow instance, can be used for referencing the workflow instance in other parts of the system or for tracking purpose
          budgetId: requestData.workFlowInstance?.budgetId ? requestData.workFlowInstance.budgetId : '',
          templateId: requestData.workFlowInstance?.templateId ? requestData.workFlowInstance.templateId : '',
          title: requestData.workFlowInstance?.title || '',
          description: requestData.workFlowInstance?.description || '',
          statusId: requestData.workFlowInstance?.statusId || '',
          currentStep: requestData.workFlowInstance?.currentStep || 1,
          startedAt: requestData.workFlowInstance?.startedAt ? new Date(requestData.workFlowInstance.startedAt) : new Date(),
          steps: (requestData.workFlowInstance?.steps && requestData.workFlowInstance.steps.length > 0) ? requestData.workFlowInstance.steps.map(step => ({
            stepTemplateId: step.stepTemplateId ?? undefined,
            stepNumber: step.stepNumber || 1,
            statusId: step.statusId || '',
            assignedToUserId: step.assignedToUserId ?? undefined,
            startedAt: step.startedAt ? new Date(step.startedAt) : new Date(),
            isEditable: step.isEditable || false,
            source: step.source || 'REQUEST_ITEM_APPROVAL',
            id: step.id || '', // Unique identifier for the workflow step, can be used for referencing the step in other parts of the system or for tracking purposes
          })) : []
        } : undefined
      }, { keepDirty: false })
    }
  }, [requestQuery.loading, requestQuery.data?.RequestFindUnique?.data?.id])



  const { execute: executeCreate, executing: executingCreate } = useMutationActions({
    mutationGQL: modelAPI.RequestGQL.create,
    setOpen: props.setOpen,
    successMessage: 'Create Capex Request Success',
    successDescription: `The capex request has been successfully created.`,
    errorMessage: 'Create Capex Request Failed',
    errorDescription: `There was an error creating the capex request. Please try again.`,
  });

  const { execute: executeUpdate, executing: executingUpdate } = useMutationActions({
    mutationGQL: modelAPI.RequestGQL.update,
    setOpen: props.setOpen,
    successMessage: 'Updated the capex request with the new budget reference.',
    successDescription: `The capex request has been successfully updated with the new budget reference. You can now proceed with the next steps in the capex request process.`,
    errorMessage: 'Failed to update capex request.',
    errorDescription: `An error occurred while updating the capex request. Please try again or contact support if the issue persists.`,
  });


  const handleToSubmit = async (data: unknown) => {
    const requestCreateInput = data as unknown as Request; // Cast to form input type first
    const requestNumberPrefix = `REQ-${month}${year}-${generate_code(5)}`;
    const crfNumberPrefix = `CRF-${month}${year}-${generate_code(5)}`;
    // const budgetNumberPrefix = `${yearComplete}AX-${"UNI"}-${generate_code(5)}`;


    //  If no Quotation Amount is provided, return error
    if (!requestCreateInput.quotationAmount || requestCreateInput.quotationAmount <= 0) {
      toast.error({
        message: "Invalid Quotation Amount",
        description: "Please provide a valid quotation amount greater than 0."
      })
      return fail("INVALID_QUOTATION_AMOUNT", "Please provide a valid quotation amount greater than 0.");
    }
    // TODO: Capex: Rule Conditon on thise.g. If the quotation amount is less than 200,000, return error and prevent submission, as we want to enforce that all capex requests must have a minimum amount of 200,000 to ensure that the system is used for its intended purpose of managing significant capital expenditures and to prevent cluttering the system with small requests that may not require the same level of oversight and approval as larger requests. This rule can be implemented in the handleToSubmit function before executing the create or update mutation, by checking the value of requestCreateInput.quotationAmount and returning an error response if it does not meet the minimum threshold.
    // If quotation amount is less than 200, return error
    if (requestCreateInput.quotationAmount < 200000) {
      toast.error({
        message: "Quotation Amount Too Low",
        description: "Please provide a quotation amount of at least 200,000."
      })
      return fail("QUOTATION_AMOUNT_TOO_LOW", "Quotation amount must be at least 200.");
    }

    //  Check the the Totoal of the requested items and compate it the requested amount in the CRF, if not match return error
    const totalRequestedItemsAmount = requestCreateInput.requestItems.reduce((total, item) => total + (item.totalPrice ?? 0), 0);
    if (totalRequestedItemsAmount !== (requestCreateInput.requestedCRF?.requestedAmount ?? 0)) {
      toast.error({
        message: "Requested amount mismatch",
        description: `The total amount of the requested items (${totalRequestedItemsAmount}) does not match the requested amount in the CRF (${requestCreateInput.requestedCRF?.requestedAmount}). Please review your request and try again.`
      })
      return fail("REQUESTED_AMOUNT_MISMATCH", `The total amount of the requested items (${totalRequestedItemsAmount}) does not match the requested amount in the CRF (${requestCreateInput.requestedCRF?.requestedAmount}). Please review your request and try again.`);
    }

    // alert(JSON.stringify(requestCreateInput.requestedCRF, null, 2));

    switch (props.actionType) {
      case 'duplicate':
        await executeCreate({
          variables: {
            data: {
              title: `${'Request for'} - ${requestNumberPrefix}`,
              description: 'This is a capex request created from the Capex Request Form.',
              requestNumber: requestNumberPrefix,
              requesterId: requestCreateInput.requesterId ? requestCreateInput.requesterId : null,
              companyId: requestCreateInput.companyId ? requestCreateInput.companyId : null,
              departmentId: requestCreateInput.departmentId ? requestCreateInput.departmentId : null,
              dateNeeded: requestCreateInput.dateNeeded ? requestCreateInput.dateNeeded.toISOString() : null,
              responsibilityCenterId: requestCreateInput.responsibilityCenterId ? requestCreateInput.responsibilityCenterId : null,
              quotationUrl: requestCreateInput.quotationUrl,
              quotationAmount: requestCreateInput.quotationAmount,
              currency: requestCreateInput.currency ? requestCreateInput.currency : 'PHP',
              workflowTemplateId: requestCreateInput.workflowTemplateId ? requestCreateInput.workflowTemplateId : null,
              statusId: form.watch("requestedCRF.budgetId") ? "69ef2112f681bdf7f3214d87" : "69ef2111f681bdf7f3214d83", // If budgetId is provided, set status to FOR_APPROVAL, otherwise set to DRAFT
              requestedCRF: {
                create: {
                  name: requestCreateInput.requestedCRF?.name || '',
                  description: requestCreateInput.requestedCRF?.description || '',
                  crfReferenceNo: crfNumberPrefix,
                  statusId: requestCreateInput.requestedCRF?.statusId || '',
                  companyId: requestCreateInput.requestedCRF?.companyId ? requestCreateInput.requestedCRF.companyId : null,
                  departmentId: requestCreateInput.requestedCRF?.departmentId ? requestCreateInput.requestedCRF.departmentId : null,
                  categoryId: requestCreateInput.requestedCRF?.categoryId ? requestCreateInput.requestedCRF.categoryId : null,
                  utilizedBudget: requestCreateInput.requestedCRF?.utilizedBudget || 0,
                  approvedAmount: requestCreateInput.requestedCRF?.approvedAmount || 0,
                  requestedAmount: requestCreateInput.requestedCRF?.requestedAmount || 0,
                  newBalanceAmmount: requestCreateInput.requestedCRF?.newBalanceAmmount || 0,
                  projectedBudget: requestCreateInput.requestedCRF?.projectedBudget || 0,
                  remark: requestCreateInput.requestedCRF?.remark || {},
                  budgetId: requestCreateInput.requestedCRF?.budgetId ? requestCreateInput.requestedCRF.budgetId : null,
                }
              },
              requestItems: requestCreateInput.requestItems.length > 0 ? {
                create: requestCreateInput.requestItems.map((item) => ({
                  description: item.description,
                  quantity: item.quantity,
                  unitOfMeasure: item.unitOfMeasure,
                  vatPercentage: item.vatPercentage,
                  isInclusiveVat: item.isInclusiveVat,
                  unitPrice: item.unitPrice,
                  totalPrice: item.totalPrice,
                  amountGrossOfVat: item.amountGrossOfVat,
                  attachmentUrl: item.attachmentUrl,
                  statusId: item.statusId ? item.statusId : "69ef2110f681bdf7f3214d7d",
                }))
              } : null,
              workFlowInstance: {
                create: {
                  templateId: requestCreateInput.workFlowInstance?.templateId ? requestCreateInput.workFlowInstance.templateId : null,
                  title: requestCreateInput.workFlowInstance?.title || '',
                  description: requestCreateInput.workFlowInstance?.description || '',
                  statusId: requestCreateInput.workFlowInstance?.statusId || '',
                  currentStep: requestCreateInput.workFlowInstance?.currentStep || 1,
                  referenceTypeId: requestCreateInput.workFlowInstance?.referenceTypeId ? requestCreateInput.workFlowInstance.referenceTypeId : null,
                  startedAt: requestCreateInput.workFlowInstance?.startedAt ? requestCreateInput.workFlowInstance.startedAt.toISOString() : new Date().toISOString(),
                  budgetId: requestCreateInput.workFlowInstance?.budgetId ? requestCreateInput.workFlowInstance.budgetId : null,
                  steps: requestCreateInput.workFlowInstance?.steps.length ? {
                    create: requestCreateInput.workFlowInstance.steps.map((step) => ({
                      stepTemplateId: step.stepTemplateId ? step.stepTemplateId : null,
                      stepNumber: step.stepNumber,
                      statusId: step.statusId ? step.statusId : null,
                      assignedToUserId: step.assignedToUserId ? step.assignedToUserId : null,
                      startedAt: step.startedAt ? step.startedAt.toISOString() : new Date().toISOString(),
                      source: step.source || '',
                      isEditable: step.isEditable,
                    }))
                  } : null,
                }
              }
            },
            currentUserId: session.data?.user?.id || "",
          }
        });
        return ok("SUCCESS_TO_DUPLICATE", `Successfully duplicated`, {
          ...requestCreateInput,
          requestNumber: requestNumberPrefix, // Reset the request number for duplication
          requestedCRF: {
            ...requestCreateInput.requestedCRF,
            crfReferenceNo: crfNumberPrefix, // Reset the CRF reference number for duplication
          }
        });
      case 'edit':
        await executeUpdate({
          variables: {
            id: props.rowId || "",
            data: {
              title: `${'Request for'} - ${requestNumberPrefix}`,
              description: 'This is a capex request created from the Capex Request Form.',
              requestNumber: requestNumberPrefix,
              requesterId: requestCreateInput.requesterId ? requestCreateInput.requesterId : null,
              companyId: requestCreateInput.companyId ? requestCreateInput.companyId : null,
              departmentId: requestCreateInput.departmentId ? requestCreateInput.departmentId : null,
              dateNeeded: requestCreateInput.dateNeeded ? requestCreateInput.dateNeeded.toISOString() : null,
              responsibilityCenterId: requestCreateInput.responsibilityCenterId ? requestCreateInput.responsibilityCenterId : null,
              quotationUrl: requestCreateInput.quotationUrl,
              quotationAmount: requestCreateInput.quotationAmount,
              currency: requestCreateInput.currency ? requestCreateInput.currency : 'PHP',
              workflowTemplateId: requestCreateInput.workflowTemplateId ? requestCreateInput.workflowTemplateId : null,
              statusId: form.watch("requestedCRF.budgetId") ? "69ef2112f681bdf7f3214d87" : "69ef2111f681bdf7f3214d83", // If budgetId is provided, set status to FOR_APPROVAL, otherwise set to DRAFT
              requestedCRF: {
                delete: true,
                create: {
                  name: requestCreateInput.requestedCRF?.name || '',
                  description: requestCreateInput.requestedCRF?.description || '',
                  crfReferenceNo: crfNumberPrefix,
                  statusId: requestCreateInput.requestedCRF?.statusId || '',
                  companyId: requestCreateInput.requestedCRF?.companyId ? requestCreateInput.requestedCRF.companyId : null,
                  departmentId: requestCreateInput.requestedCRF?.departmentId ? requestCreateInput.requestedCRF.departmentId : null,
                  categoryId: requestCreateInput.requestedCRF?.categoryId ? requestCreateInput.requestedCRF.categoryId : null,
                  utilizedBudget: requestCreateInput.requestedCRF?.utilizedBudget || 0,
                  approvedAmount: requestCreateInput.requestedCRF?.approvedAmount || 0,
                  requestedAmount: requestCreateInput.requestedCRF?.requestedAmount || 0,
                  newBalanceAmmount: requestCreateInput.requestedCRF?.newBalanceAmmount || 0,
                  projectedBudget: requestCreateInput.requestedCRF?.projectedBudget || 0,
                  remark: requestCreateInput.requestedCRF?.remark || {},
                  budgetId: requestCreateInput.requestedCRF?.budgetId ? requestCreateInput.requestedCRF.budgetId : null,
                }
              },
              requestItems: requestCreateInput.requestItems.length > 0 ? {
                deleteMany: {},
                create: requestCreateInput.requestItems.map((item) => ({
                  description: item.description,
                  quantity: item.quantity,
                  unitOfMeasure: item.unitOfMeasure,
                  vatPercentage: item.vatPercentage,
                  isInclusiveVat: item.isInclusiveVat,
                  unitPrice: item.unitPrice,
                  totalPrice: item.totalPrice,
                  amountGrossOfVat: item.amountGrossOfVat,
                  attachmentUrl: item.attachmentUrl,
                  statusId: item.statusId ? item.statusId : "69ef2110f681bdf7f3214d7d",
                }))
              } : null,
              workFlowInstance: {
                delete: true,
                create: {
                  templateId: requestCreateInput.workFlowInstance?.templateId ? requestCreateInput.workFlowInstance.templateId : null,
                  title: requestCreateInput.workFlowInstance?.title || '',
                  description: requestCreateInput.workFlowInstance?.description || '',
                  statusId: requestCreateInput.workFlowInstance?.statusId || '',
                  currentStep: requestCreateInput.workFlowInstance?.currentStep || 1,
                  referenceTypeId: requestCreateInput.workFlowInstance?.referenceTypeId ? requestCreateInput.workFlowInstance.referenceTypeId : null,
                  startedAt: requestCreateInput.workFlowInstance?.startedAt ? requestCreateInput.workFlowInstance.startedAt.toISOString() : new Date().toISOString(),
                  budgetId: requestCreateInput.workFlowInstance?.budgetId ? requestCreateInput.workFlowInstance.budgetId : null,
                  steps: requestCreateInput.workFlowInstance?.steps.length ? {
                    create: requestCreateInput.workFlowInstance.steps.map((step) => ({
                      stepTemplateId: step.stepTemplateId ? step.stepTemplateId : null,
                      stepNumber: step.stepNumber,
                      statusId: step.statusId ? step.statusId : null,
                      assignedToUserId: step.assignedToUserId ? step.assignedToUserId : null,
                      startedAt: step.startedAt ? step.startedAt.toISOString() : new Date().toISOString(),
                      source: step.source || '',
                      isEditable: step.isEditable,
                    }))
                  } : null,
                }
              }
            },
            currentUserId: session.data?.user?.id || "",
          }
        });
        return ok("SUCCESS_TO_UPDATE", `Successfully updated`, {
          variables: {
            id: props.rowId || "",
            data: {
              title: `${'Request for'} - ${requestNumberPrefix}`,
              description: 'This is a capex request created from the Capex Request Form.',
              requestNumber: requestNumberPrefix,
              requesterId: requestCreateInput.requesterId ? requestCreateInput.requesterId : null,
              companyId: requestCreateInput.companyId ? requestCreateInput.companyId : null,
              departmentId: requestCreateInput.departmentId ? requestCreateInput.departmentId : null,
              dateNeeded: requestCreateInput.dateNeeded ? requestCreateInput.dateNeeded.toISOString() : null,
              responsibilityCenterId: requestCreateInput.responsibilityCenterId ? requestCreateInput.responsibilityCenterId : null,
              quotationUrl: requestCreateInput.quotationUrl,
              quotationAmount: requestCreateInput.quotationAmount,
              currency: requestCreateInput.currency ? requestCreateInput.currency : 'PHP',
              workflowTemplateId: requestCreateInput.workflowTemplateId ? requestCreateInput.workflowTemplateId : null,
              statusId: form.watch("requestedCRF.budgetId") ? "69ef2112f681bdf7f3214d87" : "69ef2111f681bdf7f3214d83", // If budgetId is provided, set status to FOR_APPROVAL, otherwise set to DRAFT
              requestedCRF: {
                delete: true,
                create: {
                  name: requestCreateInput.requestedCRF?.name || '',
                  description: requestCreateInput.requestedCRF?.description || '',
                  crfReferenceNo: crfNumberPrefix,
                  statusId: requestCreateInput.requestedCRF?.statusId || '',
                  companyId: requestCreateInput.requestedCRF?.companyId ? requestCreateInput.requestedCRF.companyId : null,
                  departmentId: requestCreateInput.requestedCRF?.departmentId ? requestCreateInput.requestedCRF.departmentId : null,
                  categoryId: requestCreateInput.requestedCRF?.categoryId ? requestCreateInput.requestedCRF.categoryId : null,
                  utilizedBudget: requestCreateInput.requestedCRF?.utilizedBudget || 0,
                  approvedAmount: requestCreateInput.requestedCRF?.approvedAmount || 0,
                  requestedAmount: requestCreateInput.requestedCRF?.requestedAmount || 0,
                  newBalanceAmmount: requestCreateInput.requestedCRF?.newBalanceAmmount || 0,
                  projectedBudget: requestCreateInput.requestedCRF?.projectedBudget || 0,
                  remark: requestCreateInput.requestedCRF?.remark || {},
                  budgetId: requestCreateInput.requestedCRF?.budgetId ? requestCreateInput.requestedCRF.budgetId : null,
                }
              },
              requestItems: requestCreateInput.requestItems.length > 0 ? {
                deleteMany: {},
                create: requestCreateInput.requestItems.map((item) => ({
                  description: item.description,
                  quantity: item.quantity,
                  unitOfMeasure: item.unitOfMeasure,
                  vatPercentage: item.vatPercentage,
                  isInclusiveVat: item.isInclusiveVat,
                  unitPrice: item.unitPrice,
                  totalPrice: item.totalPrice,
                  amountGrossOfVat: item.amountGrossOfVat,
                  attachmentUrl: item.attachmentUrl,
                  statusId: item.statusId ? item.statusId : "69ef2110f681bdf7f3214d7d",
                }))
              } : null,
              workFlowInstance: {
                delete: true,
                create: {
                  templateId: requestCreateInput.workFlowInstance?.templateId ? requestCreateInput.workFlowInstance.templateId : null,
                  title: requestCreateInput.workFlowInstance?.title || '',
                  description: requestCreateInput.workFlowInstance?.description || '',
                  statusId: requestCreateInput.workFlowInstance?.statusId || '',
                  currentStep: requestCreateInput.workFlowInstance?.currentStep || 1,
                  referenceTypeId: requestCreateInput.workFlowInstance?.referenceTypeId ? requestCreateInput.workFlowInstance.referenceTypeId : null,
                  startedAt: requestCreateInput.workFlowInstance?.startedAt ? requestCreateInput.workFlowInstance.startedAt.toISOString() : new Date().toISOString(),
                  budgetId: requestCreateInput.workFlowInstance?.budgetId ? requestCreateInput.workFlowInstance.budgetId : null,
                  steps: requestCreateInput.workFlowInstance?.steps.length ? {
                    create: requestCreateInput.workFlowInstance.steps.map((step) => ({
                      stepTemplateId: step.stepTemplateId ? step.stepTemplateId : null,
                      stepNumber: step.stepNumber,
                      statusId: step.statusId ? step.statusId : null,
                      assignedToUserId: step.assignedToUserId ? step.assignedToUserId : null,
                      startedAt: step.startedAt ? step.startedAt.toISOString() : new Date().toISOString(),
                      source: step.source || '',
                      isEditable: step.isEditable,
                    }))
                  } : null,
                }
              }
            },
            currentUserId: session.data?.user?.id || "",
          }
        });
      default:
        await executeCreate({
          variables: {
            data: {
              title: `${'Request for'} - ${requestNumberPrefix}`,
              description: 'This is a capex request created from the Capex Request Form.',
              requestNumber: requestNumberPrefix,
              requesterId: requestCreateInput.requesterId ? requestCreateInput.requesterId : null,
              companyId: requestCreateInput.companyId ? requestCreateInput.companyId : null,
              departmentId: requestCreateInput.departmentId ? requestCreateInput.departmentId : null,
              dateNeeded: requestCreateInput.dateNeeded ? requestCreateInput.dateNeeded.toISOString() : null,
              responsibilityCenterId: requestCreateInput.responsibilityCenterId ? requestCreateInput.responsibilityCenterId : null,
              quotationUrl: requestCreateInput.quotationUrl,
              quotationAmount: requestCreateInput.quotationAmount,
              currency: requestCreateInput.currency ? requestCreateInput.currency : 'PHP',
              workflowTemplateId: requestCreateInput.workflowTemplateId ? requestCreateInput.workflowTemplateId : null,
              statusId: form.watch("requestedCRF.budgetId") ? "69ef2112f681bdf7f3214d87" : "69ef2111f681bdf7f3214d83", // If budgetId is provided, set status to FOR_APPROVAL, otherwise set to DRAFT
              requestedCRF: {
                create: {
                  name: requestCreateInput.requestedCRF?.name || '',
                  description: requestCreateInput.requestedCRF?.description || '',
                  crfReferenceNo: crfNumberPrefix,
                  statusId: requestCreateInput.requestedCRF?.statusId || '',
                  companyId: requestCreateInput.requestedCRF?.companyId ? requestCreateInput.requestedCRF.companyId : null,
                  departmentId: requestCreateInput.requestedCRF?.departmentId ? requestCreateInput.requestedCRF.departmentId : null,
                  categoryId: requestCreateInput.requestedCRF?.categoryId ? requestCreateInput.requestedCRF.categoryId : null,
                  utilizedBudget: requestCreateInput.requestedCRF?.utilizedBudget || 0,
                  approvedAmount: requestCreateInput.requestedCRF?.approvedAmount || 0,
                  requestedAmount: requestCreateInput.requestedCRF?.requestedAmount || 0,
                  newBalanceAmmount: requestCreateInput.requestedCRF?.newBalanceAmmount || 0,
                  projectedBudget: requestCreateInput.requestedCRF?.projectedBudget || 0,
                  remark: requestCreateInput.requestedCRF?.remark || {},
                  budgetId: requestCreateInput.requestedCRF?.budgetId ? requestCreateInput.requestedCRF.budgetId : null,
                }
              },
              requestItems: requestCreateInput.requestItems.length > 0 ? {
                create: requestCreateInput.requestItems.map((item) => ({
                  description: item.description,
                  quantity: item.quantity,
                  unitOfMeasure: item.unitOfMeasure,
                  vatPercentage: item.vatPercentage,
                  isInclusiveVat: item.isInclusiveVat,
                  unitPrice: item.unitPrice,
                  totalPrice: item.totalPrice,
                  amountGrossOfVat: item.amountGrossOfVat,
                  attachmentUrl: item.attachmentUrl,
                  statusId: item.statusId ? item.statusId : "69ef2110f681bdf7f3214d7d",
                }))
              } : null,
              workFlowInstance: {
                create: {
                  templateId: requestCreateInput.workFlowInstance?.templateId ? requestCreateInput.workFlowInstance.templateId : null,
                  title: requestCreateInput.workFlowInstance?.title || '',
                  description: requestCreateInput.workFlowInstance?.description || '',
                  statusId: requestCreateInput.workFlowInstance?.statusId || '',
                  currentStep: requestCreateInput.workFlowInstance?.currentStep || 1,
                  referenceTypeId: requestCreateInput.workFlowInstance?.referenceTypeId ? requestCreateInput.workFlowInstance.referenceTypeId : null,
                  startedAt: requestCreateInput.workFlowInstance?.startedAt ? requestCreateInput.workFlowInstance.startedAt.toISOString() : new Date().toISOString(),
                  budgetId: requestCreateInput.workFlowInstance?.budgetId ? requestCreateInput.workFlowInstance.budgetId : null,
                  steps: requestCreateInput.workFlowInstance?.steps.length ? {
                    create: requestCreateInput.workFlowInstance.steps.map((step) => ({
                      stepTemplateId: step.stepTemplateId ? step.stepTemplateId : null,
                      stepNumber: step.stepNumber,
                      statusId: step.statusId ? step.statusId : null,
                      assignedToUserId: step.assignedToUserId ? step.assignedToUserId : null,
                      startedAt: step.startedAt ? step.startedAt.toISOString() : new Date().toISOString(),
                      source: step.source || '',
                      isEditable: step.isEditable,
                    }))
                  } : null,
                }
              }
            },
            currentUserId: session.data?.user?.id || "",
          },
          onCompleted: (data) => {
            const dataType = data as unknown as { RequestCreate: RequestResponse }
            if (!dataType.RequestCreate.isSuccess) {
              toast.error({
                message: "Failed to create capex request",
                description: dataType.RequestCreate.message || "An error occurred while creating the capex request. Please try again."
              })
              return;
            }

            toast.success({
              message: "Successfully created capex request",
              description: dataType.RequestCreate.message || "The capex request has been successfully created."
            })
            props.setOpen?.(false);
            return;
          }
        });
        // Mutation to create a new request
        return ok("SUCCESS_TO_CREATE", `Successfully created`, {
          variables: {
            data: {
              title: `${'Request for'} - ${requestNumberPrefix}`,
              description: 'This is a capex request created from the Capex Request Form.',
              requestNumber: requestNumberPrefix,
              requesterId: requestCreateInput.requesterId ? requestCreateInput.requesterId : null,
              companyId: requestCreateInput.companyId ? requestCreateInput.companyId : null,
              departmentId: requestCreateInput.departmentId ? requestCreateInput.departmentId : null,
              dateNeeded: requestCreateInput.dateNeeded ? requestCreateInput.dateNeeded.toISOString() : null,
              responsibilityCenterId: requestCreateInput.responsibilityCenterId ? requestCreateInput.responsibilityCenterId : null,
              quotationUrl: requestCreateInput.quotationUrl,
              quotationAmount: requestCreateInput.quotationAmount,
              currency: requestCreateInput.currency ? requestCreateInput.currency : 'PHP',
              workflowTemplateId: requestCreateInput.workflowTemplateId ? requestCreateInput.workflowTemplateId : null,
              statusId: form.watch("requestedCRF.budgetId") ? "69ef2112f681bdf7f3214d87" : "69ef2111f681bdf7f3214d83", // If budgetId is provided, set status to FOR_APPROVAL, otherwise set to DRAFT
              requestedCRF: {
                create: {
                  name: requestCreateInput.requestedCRF?.name || '',
                  description: requestCreateInput.requestedCRF?.description || '',
                  crfReferenceNo: crfNumberPrefix,
                  statusId: requestCreateInput.requestedCRF?.statusId || '',
                  companyId: requestCreateInput.requestedCRF?.companyId ? requestCreateInput.requestedCRF.companyId : null,
                  departmentId: requestCreateInput.requestedCRF?.departmentId ? requestCreateInput.requestedCRF.departmentId : null,
                  categoryId: requestCreateInput.requestedCRF?.categoryId ? requestCreateInput.requestedCRF.categoryId : null,
                  utilizedBudget: requestCreateInput.requestedCRF?.utilizedBudget || 0,
                  remainingAmount: requestCreateInput.requestedCRF?.remainingAmount || 0,
                  approvedAmount: requestCreateInput.requestedCRF?.approvedAmount || 0,
                  requestedAmount: requestCreateInput.requestedCRF?.requestedAmount || 0,
                  newBalanceAmmount: requestCreateInput.requestedCRF?.newBalanceAmmount || 0,
                  projectedBudget: requestCreateInput.requestedCRF?.projectedBudget || 0,
                  remark: requestCreateInput.requestedCRF?.remark || {},
                  budgetId: requestCreateInput.requestedCRF?.budgetId ? requestCreateInput.requestedCRF.budgetId : null,
                }
              },
              requestItems: requestCreateInput.requestItems.length > 0 ? {
                create: requestCreateInput.requestItems.map((item) => ({
                  description: item.description,
                  quantity: item.quantity,
                  unitOfMeasure: item.unitOfMeasure,
                  vatPercentage: item.vatPercentage,
                  isInclusiveVat: item.isInclusiveVat,
                  unitPrice: item.unitPrice,
                  totalPrice: item.totalPrice,
                  amountGrossOfVat: item.amountGrossOfVat,
                  attachmentUrl: item.attachmentUrl,
                  statusId: item.statusId ? item.statusId : "69ef2110f681bdf7f3214d7d",
                }))
              } : null,
              workFlowInstance: {
                create: {
                  templateId: requestCreateInput.workFlowInstance?.templateId ? requestCreateInput.workFlowInstance.templateId : null,
                  title: requestCreateInput.workFlowInstance?.title || '',
                  description: requestCreateInput.workFlowInstance?.description || '',
                  statusId: requestCreateInput.workFlowInstance?.statusId || '',
                  currentStep: requestCreateInput.workFlowInstance?.currentStep || 1,
                  referenceTypeId: requestCreateInput.workFlowInstance?.referenceTypeId ? requestCreateInput.workFlowInstance.referenceTypeId : null,
                  startedAt: requestCreateInput.workFlowInstance?.startedAt ? requestCreateInput.workFlowInstance.startedAt.toISOString() : new Date().toISOString(),
                  budgetId: requestCreateInput.workFlowInstance?.budgetId ? requestCreateInput.workFlowInstance.budgetId : null,
                  steps: requestCreateInput.workFlowInstance?.steps.length ? {
                    create: requestCreateInput.workFlowInstance.steps.map((step) => ({
                      stepTemplateId: step.stepTemplateId ? step.stepTemplateId : null,
                      stepNumber: step.stepNumber,
                      statusId: step.statusId ? step.statusId : null,
                      assignedToUserId: step.assignedToUserId ? step.assignedToUserId : null,
                      startedAt: step.startedAt ? step.startedAt.toISOString() : new Date().toISOString(),
                      source: step.source || '',
                      isEditable: step.isEditable,
                    }))
                  } : null,
                }
              }
            }
          }
        });
    }
  }

  const forApproval = requestQuery.data?.RequestFindUnique.data?.status?.name === "For Approval";
  const pendingForApproval = requestQuery.data?.RequestFindUnique.data?.status?.name === "Pending For Approval";
  const approved = requestQuery.data?.RequestFindUnique.data?.status?.name === "Approved";
  const rejected = requestQuery.data?.RequestFindUnique.data?.status?.name === "Rejected";
  const returnFromFinance = requestQuery.data?.RequestFindUnique.data?.status?.name === "Return From Finance Review";
  const financeVerification = requestQuery.data?.RequestFindUnique.data?.status?.name === "For Finance Review";
  const isForFinance = returnFromFinance;
  const isViewMode = props.actionType === "view" || forApproval || pendingForApproval || approved || rejected

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
              <div className='flex items-center justify-between gap-3 pb-3 border-b'>
                <div className='flex items-center gap-3'>
                  <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold'>
                    I
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold'>Requester Details</h3>
                    <p className='text-xs text-muted-foreground mt-0.5'>Provide request and organizational information</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  {/* Status Badge */}
                  {requestQuery.data?.RequestFindUnique.data?.status && (
                    <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200'>
                      <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                      <span className='text-sm font-medium text-blue-700'>
                        {requestQuery.data.RequestFindUnique.data.status.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='col-span-2'>
                    <CustomSingleSelectInput
                      name={`requesterId`}
                      control={form.control}
                      label={`Requester`}
                      disabled={true}
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
                  </div>
                  <CustomDateInput
                    name="dateNeeded"
                    control={form.control}
                    label="Date Needed"
                    disabled={isViewMode}
                  />
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <CustomSingleSelectInput
                    name={`companyId`}
                    control={form.control}
                    label={`Company`}
                    disabled={isViewMode}
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
                    disabled={!form.watch('companyId') || isViewMode}
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
                    disabled={!form.watch('companyId') || isViewMode}
                    cursorVariables={(search, cursor, take) => {
                      return {
                        cursorInput: {
                          cursor,
                          isActive: true,
                          take,
                          filter: {
                            ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
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
                </div>
              </div>
            </section>

            {/* II. Budget Reference Details */}
            {
              form.watch("companyId") && <BudgetReferenceDetails form={form as unknown as UseFormReturn<Record<string, unknown>>} isViewMode={isViewMode} actionType={props.actionType} isForFinance={isForFinance} />
            }
            {/* III. Workflow Approval Step */}
            {
              form.watch("requestedCRF.categoryId") && <RequestedItem form={form as unknown as UseFormReturn<RequestedItemFormValues>} isViewMode={isViewMode} />
            }

            {/* IV. Workflow Approval Step */}
            {
              (forApproval || pendingForApproval || approved || rejected) ? <WorkApprovalInstanceProcess form={form as unknown as UseFormReturn<Record<string, unknown>>} isViewMode={props.actionType === "view"} /> : form.watch("requestItems").length > 0 && <WorkApprovalInstance form={form as unknown as UseFormReturn<Record<string, unknown>>} isViewMode={isViewMode} />
            }
          </div>
        </ScrollArea>
        {/* Action Buttons - Fixed at Bottom */}
        <div className={`flex gap-3 justify-end bg-background border-t pt-4 ${isViewMode ? "hidden" : ""}`}>
          <DialogClose asChild>
            <Button variant='outline' type="button" disabled={(executingCreate || executingUpdate)}>
              {
                (executingCreate || executingUpdate) ? 'Processing...' : 'Cancel'
              }
            </Button>
          </DialogClose>
          {
            (props.actionType === "none" || (props.actionType === "duplicate" && financeVerification)) && (
              <Button type='submit' className='px-8'>
                {
                  (executingCreate || executingUpdate) ? 'Submitting...' : 'Submit'
                }
              </Button>
            )
          }

          {
            props.actionType === "edit" && financeVerification && (
              <Button type='submit' className='px-8'>
                {
                  (executingCreate || executingUpdate) ? 'Submitting...' : 'Update'
                }
              </Button>
            )
          }
          {
            props.actionType === "edit" && returnFromFinance && (
              <Button type='submit' className='px-8'>
                {
                  (executingCreate || executingUpdate) ? 'Submitting...' : 'Update & Resubmit'
                }
              </Button>
            )
          }
        </div>
      </div>
    </FormTemplate>
  </div>
};

export default Method;
