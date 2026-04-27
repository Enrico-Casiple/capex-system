import CustomCheckbox from '@/components/Forms/Inputs/CustomCheckbox'
import CustomNumberInput from '@/components/Forms/Inputs/CustomNumberInput'
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput'
import CustomStaticSelectInput from '@/components/Forms/Inputs/CustomStaticSelectInput'
import CustomTextInput from '@/components/Forms/Inputs/CustomTextInput'
import { Button } from '@/components/ui/button'
import { modelGQL, ModelGQLMap } from '@/lib/api/crud.gql'
import { Layers, PackagePlus, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'


type StepFormData = {
  steps: Array<{
    stepNumber: number;
    assignmentTypeId: string;
    assignedToUserId: string;
    isHaveCondition: boolean;
    conditions: Array<Record<string, unknown>>;
  }>;
}

type WorkFlowTemplateStepFormProps = {
  form: UseFormReturn<StepFormData>
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
    control: form.control,
    name: "steps"
  })

  // Initialize with default step if empty
  useEffect(() => {
    if (stepFieldArray.fields.length === 0) {
      stepFieldArray.append({
        stepNumber: 1,
        assignmentTypeId: "",
        assignedToUserId: "",
        isHaveCondition: false,
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
      });
    }
  }, [stepFieldArray]);

  const handleToAddStep = () => {
    return stepFieldArray.append({
      stepNumber: stepFieldArray.fields.length + 1,
      assignmentTypeId: "",
      assignedToUserId: "",
      isHaveCondition: false,
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

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.includes("assignmentTypeId")) {
        const index = parseInt(name.split(".")[1], 10);
        const steps = value.steps;
        const assignmentTypeId = steps?.[index]?.assignmentTypeId;

        if (assignmentTypeId === Dynamic_Entry.id) {
          form.setValue(`steps.${index}.assignedToUserId`, "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

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
      <div className="grid grid-cols-1 gap-4">
        {stepFieldArray.fields.map((field, index) => (
          <StepItem
            key={field.id}
            form={form}
            stepIndex={index}
            handleToRemoveStep={handleToRemoveStep}
            canRemove={stepFieldArray.fields.length > 1}
          />
        ))}
      </div>
    </section>
  )
}

const StepItem = ({
  form,
  stepIndex,
  handleToRemoveStep,
  canRemove
}: {
  form: UseFormReturn<StepFormData>;
  stepIndex: number;
  handleToRemoveStep: (index: number) => void;
  canRemove: boolean;
}) => {
  const conditionFieldArray = useFieldArray({
    control: form.control,
    name: `steps.${stepIndex}.conditions`
  });

  const handleToAddCondition = () => {
    conditionFieldArray.append({
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
    });
  };

  const handleToRemoveCondition = (conditionIndex: number) => {
    if (conditionFieldArray.fields.length === 1) {
      form.setValue(`steps.${stepIndex}.conditions.${conditionIndex}.value` as never, {
        nodeType: "RULE",
        logicalOperator: "",
        field: "",
        operator: "",
        value: ""
      } as never);
      return;
    }
    conditionFieldArray.remove(conditionIndex);
  };

  const isHaveCondition = form.watch(`steps.${stepIndex}.isHaveCondition`);

  useEffect(() => {
    if (!isHaveCondition) {
      const currentConditions = form.getValues(`steps.${stepIndex}.conditions`);
      const hasNonDefaultValues = currentConditions?.some((cond: Record<string, unknown>) => {
        const val = cond.value as Record<string, unknown>;
        return val?.field || val?.operator || val?.value || (val?.nodeType !== "RULE");
      });

      if (hasNonDefaultValues) {
        conditionFieldArray.replace([{
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
        }]);
      }
    }
  }, [conditionFieldArray, form, isHaveCondition, stepIndex]);


  return (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b">
        <h4 className="text-sm font-semibold">Step {stepIndex + 1}</h4>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="w-64">Has Condition</span>
            <CustomCheckbox
              name={`steps.${stepIndex}.isHaveCondition`}
              control={form.control}
              label=""
              placeholder=''
              inputProps={{
                className: "border-2 border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary",
                style: {
                  width: "20px",
                  height: "20px"
                }
              }}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            disabled={!canRemove}
            onClick={() => handleToRemoveStep(stepIndex)}
            title="Remove step"
            type="button"
            className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            <span>Remove</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomNumberInput
          name={`steps.${stepIndex}.stepNumber`}
          control={form.control}
          inputProps={{ min: 1, disabled: true }}
          label="Step Number"
          placeholder="Step Number"
        />
        <CustomSingleSelectInput
          name={`steps.${stepIndex}.assignmentTypeId`}
          control={form.control}
          label="Assignment Type"
          findAllWithCursorGQL={modelAPI.TypeGQL.findAllWithCursor}
          findUniqueGQL={modelAPI.TypeGQL.findUnique}
          defaultValueId=""
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
        {form.watch(`steps.${stepIndex}.assignmentTypeId`) === Static_Entry.id && (
          <CustomSingleSelectInput
            name={`steps.${stepIndex}.assignedToUserId`}
            control={form.control}
            label="Assignment To"
            findAllWithCursorGQL={modelAPI.UserGQL.findAllWithCursor}
            findUniqueGQL={modelAPI.UserGQL.findUnique}
            defaultValueId=""
            placeholder="Search user..."
            searchPlaceholder="Search user..."
            emptySelectedMessage="User already selected."
            emptyMessage="No user found."
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
                  }
                  : undefined,
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
        )}
      </div>
      {
        form.watch(`steps.${stepIndex}.isHaveCondition`) && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-semibold uppercase text-muted-foreground">Conditions</h5>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleToAddCondition}
                className="h-7 text-xs gap-1"
              >
                <PackagePlus className="h-3 w-3" />
                Add Condition
              </Button>
            </div>

            <div className="space-y-2">
              {conditionFieldArray.fields.map((condition, conditionIndex) => (
                <ConditionBuilder
                  key={condition.id}
                  form={form}
                  stepIndex={stepIndex}
                  conditionIndex={conditionIndex}
                  condition={condition as Record<string, unknown>}
                  onRemove={() => handleToRemoveCondition(conditionIndex)}
                  canRemove={conditionFieldArray.fields.length > 1}
                />
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

const ConditionBuilder = ({
  form,
  stepIndex,
  conditionIndex,
  onRemove,
  canRemove
}: {
  form: UseFormReturn<StepFormData>;
  stepIndex: number;
  conditionIndex: number;
  condition: Record<string, unknown>;
  onRemove: () => void;
  canRemove: boolean;
}) => {
  const basePath = `steps.${stepIndex}.conditions.${conditionIndex}`;
  const nodeType = form.watch(`${basePath}.value.nodeType` as never) as unknown as string || "RULE";

  useEffect(() => {
    if (nodeType === "GROUP") {
      form.setValue(`${basePath}.value.logicalOperator` as never, "AND" as never);
      form.setValue(`${basePath}.value.field` as never, "" as never);
      form.setValue(`${basePath}.value.operator` as never, "" as never);
      form.setValue(`${basePath}.value.value` as never, "" as never);
    } else if (nodeType === "RULE") {
      form.setValue(`${basePath}.value.logicalOperator` as never, "" as never);
    }
  }, [nodeType, basePath, form]);

  const fieldValue = form.watch(`${basePath}.value.field` as never) as unknown as string;
  const model = fieldValue ? `${fieldValue}GQL` as keyof ModelGQLMap : null;
  const hasValidModel = model && modelAPI[model];





  return (
    <div className="bg-background p-3 rounded border space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium">Condition {conditionIndex + 1}</p>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          disabled={!canRemove}
          onClick={onRemove}
          className="h-6 w-6"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className={`grid grid-cols-${nodeType === "GROUP" ? "2" : "1"} gap-2`}>
          <CustomStaticSelectInput
            name={`${basePath}.value.nodeType` as never}
            control={form.control}
            label="Node Type"
            options={[
              {
                label: "RULE",
                value: "RULE"
              },
              {
                label: "GROUP",
                value: "GROUP"
              }
            ]}
            placeholder="Select node type"
          />

          {nodeType === "GROUP" && (
            <CustomStaticSelectInput
              name={`${basePath}.value.logicalOperator` as never}
              control={form.control}
              label="Logical Operator"
              options={[
                {
                  label: "AND",
                  value: "AND"
                },
                {
                  label: "OR",
                  value: "OR"
                }
              ]}
              placeholder="Select operator"
            />
          )}
        </div>

        {nodeType === "RULE" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <CustomStaticSelectInput
              name={`${basePath}.value.field` as never}
              control={form.control}
              label="Field"
              options={[
                {
                  label: "Category",
                  value: "Category"
                },
                {
                  label: "Amount",
                  value: "Amount"
                }
              ]}
              placeholder="Select field"
            />
            <CustomStaticSelectInput
              name={`${basePath}.value.operator` as never}
              control={form.control}
              label="Operator"
              options={[
                {
                  label: "Equals",
                  value: "==="
                },
                {
                  label: "Not Equals",
                  value: "!=="
                },
                {
                  label: "Greater Than",
                  value: ">"
                },
                {
                  label: "Greater Than or Equal To",
                  value: ">="
                },
                {
                  label: "Less Than",
                  value: "<"
                },
                {
                  label: "Less Than or Equal To",
                  value: "<="
                },
                {
                  label: "Contains",
                  value: "contains"
                }
              ]}
              placeholder="Select operator"
            />
            {
              fieldValue === "Amount" ? (
                <CustomNumberInput
                  name={`${basePath}.value.value` as never}
                  control={form.control}
                  label="Value"
                  placeholder="e.g., 1000"
                  inputProps={{ className: "h-8 text-xs" }}
                />
              ) : hasValidModel ? (
                <CustomSingleSelectInput
                  name={`${basePath}.value.value` as never}
                  control={form.control}
                  label={`Select ${fieldValue}`}
                  findAllWithCursorGQL={modelAPI[model!].findAllWithCursor}
                  findUniqueGQL={modelAPI[model!].findUnique}
                  defaultValueId={""}
                  placeholder={`Search ${fieldValue}...`}
                  searchPlaceholder={`Search ${fieldValue}...`}
                  emptySelectedMessage={`${fieldValue} already selected.`}
                  emptyMessage={`No ${fieldValue} found.`}
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
                      value: d.name ?? '',
                    };
                  }}
                  mapDefaultOption={(data: unknown) => {
                    const d = data as {
                      data?: { id?: string; name?: string; userName?: string; email?: string };
                    };
                    if (!d?.data) return null;
                    return {
                      label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                      value: d.data.name ?? '',
                    };
                  }}
                />
              ) : (
                <CustomTextInput
                  name={`${basePath}.value.value` as never}
                  control={form.control}
                  label="Value"
                  placeholder="Enter value"
                  inputProps={{ className: "h-8 text-xs" }}
                />
              )
            }

          </div>
        )}
      </div>
    </div>
  );
};

export default WorkFlowTemplateStepForm
