import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput'
import { Button } from '@/components/ui/button'
import { modelGQL } from '@/lib/api/crud.gql'
import { WorkFlowTemplateFindUnique } from '@/lib/api/gql/WorkFlowTemplate.gql'
import { WorkFlowTemplateResponse } from '@/lib/generated/api/customHookAPI/graphql'
import { useQuery } from '@apollo/client/react'
import { RotateCcw } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

type WorkApprovalInstanceProps = {
  form: UseFormReturn<Record<string, unknown>>
}

const modelAPI = modelGQL;

const WorkApprovalInstance = ({ form }: WorkApprovalInstanceProps) => {
  // Find The workflowTemplate
  const workflowTemplateQuery = useQuery<
    { WorkFlowTemplateFindUnique: WorkFlowTemplateResponse },
    { id: string }
  >(WorkFlowTemplateFindUnique, {
    variables: {
      id: form.watch(`workflowTemplateId`) as string,
    },
    skip: !form.watch(`workflowTemplateId`),
  })

  // IF workflowTemplateQuery as having a data, we need set all the default Value for some Field
  useEffect(() => {
    const workflowTemplate = workflowTemplateQuery.data?.WorkFlowTemplateFindUnique.data;
    if (workflowTemplate) {
      form.setValue(`workFlowInstance.budgetId`, form.watch(`requestedCRF.budgetId`) as never);
      form.setValue(`workFlowInstance.templateId`, workflowTemplate.id as never);
      form.setValue(`workFlowInstance.title`, `Approval Workflow for ${form.watch(`title`) || 'Untitled Request'}` as never);
      form.setValue(`workFlowInstance.description`, `This workflow instance is created based on the selected workflow template: ${workflowTemplate.name}` as never);
      form.setValue(`workFlowInstance.statusId`, "WORKFLOW_INSTANCE_PENDING_APPROVAL" as never);

      // Set the steps based on the workflow template steps
      const steps = workflowTemplate.steps?.map((step, index) => ({
        stepTemplateId: step.id,
        stepNumber: index + 1,
        statusId: "69ef2115f681bdf7f3214d99",
        assignedToUserId: step.assignedToUserId || null,
        startedAt: new Date(),
        isEditable: step.assignedToUserId ? false : true,
        source: "REQUEST_APPROVAL_STEP",
      })) || [];
      form.setValue(`workFlowInstance.steps`, steps as never);
    }

    // Remove the steps if the workflow template is unselected
    if (!form.watch(`workflowTemplateId`)) {
      form.setValue(`workFlowInstance.steps`, [{
        stepTemplateId: null,
        stepNumber: 1,
        statusId: "69ef2115f681bdf7f3214d99",
        assignedToUserId: null,
        startedAt: new Date(),
        isEditable: false,
        source: "REQUEST_ITEM_APPROVAL"
      }] as never);
    }
  }, [form, workflowTemplateQuery.data])

  const stepFieldArray = useFieldArray({
    control: form.control as never,
    name: "workFlowInstance.steps",
  })

  return (
    <section className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-xs shrink-0">
            IV.
          </div>
          <div>
            <h3 className="text-base font-semibold leading-tight">Approval Steps</h3>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
              Define the approval workflow for this request, including approvers and conditions.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            type="button"
            size="sm"
            onClick={() => form.setValue(`workflowTemplateId`, '' as never)}
            className="text-muted-foreground hover:text-destructive gap-1.5"
            title="Reset all items"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

        </div>
      </div>
      {/* Form Input */}
      <div className='grid grid-cols-1 gap-4'>
        <CustomSingleSelectInput
          name={`workflowTemplateId`}
          control={form.control}
          label={`Workflow Template`}
          findAllWithCursorGQL={modelAPI.WorkFlowTemplateGQL.findAllWithCursor}
          findUniqueGQL={modelAPI.WorkFlowTemplateGQL.findUnique}
          defaultValueId={form.watch(`workflowTemplateId`) as string | undefined}
          placeholder={`Search workflow template...`}
          searchPlaceholder={`Search workflow template...`}
          emptySelectedMessage={`Workflow template already selected.`}
          emptyMessage={`No workflow template found.`}
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
            const d = data as { id?: string; name?: string; };
            return {
              label: d.name ?? '',
              value: d.id ?? '',
            };
          }}
          mapDefaultOption={(data: unknown) => {
            const d = data as {
              data?: { id?: string; name?: string; };
            };
            if (!d?.data) return null;
            return {
              label: d.data.name ?? '',
              value: d.data.id ?? '',
            };
          }}
        />
      </div>
      <div className={`grid grid-cols-${stepFieldArray.fields.length} gap-3`}>
        {
          stepFieldArray.fields.map((field, index) => (
            <div key={field.id} className={`grid grid-cols-1 gap-4`}>
              <CustomSingleSelectInput
                name={`workFlowInstance.steps.${index}.assignedToUserId`}
                control={form.control}
                label={`Assigned To`}
                disabled={!form.watch(`workFlowInstance.steps.${index}.isEditable`)}
                findAllWithCursorGQL={modelAPI.UserGQL.findAllWithCursor}
                findUniqueGQL={modelAPI.UserGQL.findUnique}
                defaultValueId={form.watch(`workFlowInstance.steps.${index}.assignedToUserId`) as string | undefined}
                placeholder={`Search users...`}
                searchPlaceholder={`Search users...`}
                emptySelectedMessage={`User already selected.`}
                emptyMessage={`No user found.`}
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
                  const d = data as { id?: string; name?: string; };
                  return {
                    label: d.name ?? '',
                    value: d.id ?? '',
                  };
                }}
                mapDefaultOption={(data: unknown) => {
                  const d = data as {
                    data?: { id?: string; name?: string; };
                  };
                  if (!d?.data) return null;
                  return {
                    label: d.data.name ?? '',
                    value: d.data.id ?? '',
                  };
                }}
              />
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default WorkApprovalInstance
