import CustomNumberInput from '@/components/Forms/Inputs/CustomNumberInput'
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput'
import { Button } from '@/components/ui/button'
import { modelGQL } from '@/lib/api/crud.gql'
import { Layers, PackagePlus, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Control, useFieldArray, UseFormReturn } from 'react-hook-form'

type WorkFlowTemplateStepFormProps = {
  form: UseFormReturn<Record<string, unknown>>
}
const modelAPI = modelGQL;

const Static_Entry = {
  id: "69ee17c8471de33f370cc36a",
  name: "Static Entry"
}
const Dynamic_Entry = {
  id: "69ee17c8471de33f370cc36c", name: "Dynamic Entry"
}


const WorkFlowTemplateStepForm = ({ form }: WorkFlowTemplateStepFormProps) => {
  const stepFieldArray = useFieldArray({
    control: form.control as unknown as Control<{ step: Array<Record<string, unknown>> }>,
    name: "step"
  })


  const handleToAddStep = () => {
    return stepFieldArray.append({
      stepNumber: stepFieldArray.fields.length + 1,
      assignmentTypeId: null,
      assignedToUserId: null,
      conditions: [{
        modelName: "WorkFlowTemplateConfig",
        group: "WorkFlowTemplateConfig",
        codeKey: "workflow_template_config_conditions",
        code: "workflow_template_config_conditions",
        codeLabel: "Conditions",
        value: {
          nodeType: "RULE",
          logicalOperator: "",
          field: "",
          operator: "",
          value: ""
        }
      }]
    })
  }

  const handleToRemoveStep = (index: number) => {
    if (stepFieldArray.fields.length === 1) return;

    stepFieldArray.remove(index);

    const updatedSteps = stepFieldArray.fields
      .filter((_, i) => i !== index)
      .map((step, i) => ({
        ...step,
        stepNumber: i + 1,
      }));

    form.setValue("steps", updatedSteps);
  };
  return (
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b">
        <div className="flex items-center gap-3 pb-2 border-b">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-slate-700">Workflow Step</h3>
            <p className="text-xs text-muted-foreground">Define the properties for this system template.</p>
          </div>
        </div>
        <div>
          <Button
            variant="default"
            type="button"
            size="sm"
            onClick={handleToAddStep}
            className="gap-1.5"
            title="Add new item"
          >
            <PackagePlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Step</span>
          </Button>
        </div>
      </div>
      <div className={`grid grid-cols-1`}>
        {stepFieldArray.fields.map((field, index) => (
          <div key={`step-${index}`} className='grid grid-cols-1'>
            <div className='grid grid-cols-1 gap-4'>
              <div className='grid grid-cols-4 gap-4 items-end'>
                <CustomNumberInput
                  name={`step.${index}.stepNumber`}
                  control={form.control}
                  inputProps={{ min: 1 }}
                  label=""
                  placeholder="Step Number"
                />
                <CustomSingleSelectInput
                  name={`step.${index}.assignmentTypeId`}
                  control={form.control}
                  label="Assignment Type"
                  findAllWithCursorGQL={
                    modelAPI.TypeGQL.findAllWithCursor
                  }
                  findUniqueGQL={modelAPI.TypeGQL.findUnique}
                  defaultValueId={""}
                  placeholder="Search type..."
                  searchPlaceholder="Search type..."
                  emptySelectedMessage="Type already selected."
                  emptyMessage="No type found."
                  cursorVariables={(search, cursor, take) => ({
                    cursorInput: {
                      cursor,
                      isActive: true,
                      take,
                      filter: search
                        ? {
                          name: {
                            contains: search,
                            mode: "insensitive",
                          },
                          modelNameType: "WorkFlowApprovalType"
                        }
                        : {
                          modelNameType: "WorkFlowApprovalType"
                        },
                    },
                  })}
                  uniqueVariables={(id) => ({ id })}
                  mapOption={(data: unknown) => {
                    const d = data as { name?: string; id?: string };
                    return {
                      label: d.name ?? "",
                      value: d.id ?? "",
                    };
                  }}
                  mapDefaultOption={(data: unknown) => {
                    const d = data as {
                      data?: { name?: string; id?: string };
                    };
                    if (!d?.data) return null;
                    return {
                      label: d.data.name ?? "",
                      value: d.data.id ?? "",
                    };
                  }}
                />
                {
                  form.watch(`step.${index}.assignmentTypeId`) === Static_Entry.id && (
                    <CustomSingleSelectInput
                      name={`step.${index}.assignedToUserId`}
                      control={form.control}
                      label="Assignment To"
                      findAllWithCursorGQL={
                        modelAPI.UserGQL.findAllWithCursor
                      }
                      findUniqueGQL={modelAPI.UserGQL.findUnique}
                      defaultValueId={""}
                      placeholder="Search user..."
                      searchPlaceholder="Search user..."
                      emptySelectedMessage="User already selected."
                      emptyMessage="No user found."
                      cursorVariables={(search, cursor, take) => {
                        return {
                          cursorInput: {
                            cursor,
                            isActive: true,
                            take,
                            filter: search
                              ? {
                                name: {
                                  contains: search,
                                  mode: "insensitive",
                                },
                              }
                              : undefined,
                          },
                        }
                      }}
                      uniqueVariables={(id) => ({ id })}
                      mapOption={(data: unknown) => {
                        const d = data as { name?: string; id?: string };
                        return {
                          label: d.name ?? "",
                          value: d.id ?? "",
                        };
                      }}
                      mapDefaultOption={(data: unknown) => {
                        const d = data as {
                          data?: { name?: string; id?: string };
                        };
                        if (!d?.data) return null;
                        return {
                          label: d.data.name ?? "",
                          value: d.data.id ?? "",
                        };
                      }}
                    />
                  )
                }
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={field.length === 1}
                  onClick={() => handleToRemoveStep(index)}
                  title="Remove item"
                  type='button'
                  className='mt-1'
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className='flex justify-center items-center '>
                <CustomNumberInput
                  name={`step.${index}.stepNumber`}
                  control={form.control}
                  inputProps={{ min: 1 }}
                  label=""
                  placeholder="Step Number"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section >
  )
}

export default WorkFlowTemplateStepForm
