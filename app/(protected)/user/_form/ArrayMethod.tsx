/* eslint-disable @typescript-eslint/no-explicit-any */
import { modelGQL, ModelGQLMap } from '@/lib/api/crud.gql';
import {  FieldArrayWithId, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { RoleFormValues } from './Method';
import useToast from '@/app/_hooks/useToast';
import CustomStaticSelectInput from '@/components/Forms/Inputs/CustomStaticSelectInput';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import React, { useEffect } from 'react';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';

type ArrayMethodProps = {
  form: UseFormReturn<RoleFormValues, any, RoleFormValues>
 fieldArray: UseFieldArrayReturn<RoleFormValues, "conditions", "id">
 addField: () => string | number | undefined
 removeField: (index: number) => void
 
}
export const MODEL_NAME_OPTIONS = [
  { label: 'User', value: 'User' },
  { label: 'Group of Company', value: 'GroupOfCompany' },
   { label: 'Company', value: 'Company' },
  { label: 'Department', value: 'Department' },
  { label: 'Job Position', value: 'Position' },
  { label: 'Job Code', value: 'JobLevel' },
];
const CONDITION_NAME_OPTIONS = [
  { label: 'Greater than', value: 'GREATER_THAN' },
  { label: 'Less than', value: 'LESS_THAN' },
  { label: 'Equal to', value: 'EQUAL_TO' },
  { label: 'Not equal to', value: 'NOT_EQUAL_TO' },
  { label: 'Contains', value: 'CONTAINS' },
];
const modelAPI = modelGQL;

// ✅ Separate component for each row
type ConditionRowProps = {
  field: FieldArrayWithId<RoleFormValues, "conditions", "id">;
  index: number;
  form: UseFormReturn<RoleFormValues, any, RoleFormValues>;
  fieldArray: UseFieldArrayReturn<RoleFormValues, "conditions", "id">;
  removeField: (index: number) => void;
  watchedModelNames: string[];
};
const conditionalReturn = (codeLabel: string): { code: string; codeKey: string } => {
  switch (codeLabel) {
    case 'Greater than':
      return { code: '>', codeKey: 'greaterThan' };
    case 'Less than':
      return { code: '<', codeKey: 'lessThan' };
    case 'Equal to':
      return { code: '=', codeKey: 'equalTo' };
    case 'Not equal to':
      return { code: '!=', codeKey: 'notEqualTo' };
    case 'Contains':
      return { code: 'contains', codeKey: 'contains' };
    default:
      return { code: '', codeKey: '' };
  }
};

const ConditionRow = ({ field, index, form, removeField, watchedModelNames }: ConditionRowProps) => {
  const toast = useToast();

  const codeLabel = CONDITION_NAME_OPTIONS.find(opt => opt.value === form.watch(`conditions.${index}.codeLabel`))?.label || 'Greater than';
  const { code, codeKey } = conditionalReturn(codeLabel);
  const modelName = form.watch(`conditions.${index}.modelName`);

  if(!code || !codeKey) {
    toast.error({
      message: 'Unrecognized condition',
      description: `The selected condition "${codeLabel}" is not recognized.`,
    });
  }

  // ✅ Now useEffect can be called here (inside a component)
  useEffect(() => {
    form.setValue(`conditions.${index}.code`, code, { shouldValidate: true });
    form.setValue(`conditions.${index}.codeKey`, codeKey, { shouldValidate: true });
  }, [codeLabel, index, form, code, codeKey]);

  // ✅ Reset value when modelName changes
  useEffect(() => {
    form.setValue(`conditions.${index}.value.stringValue`, '', { shouldValidate: true });
  }, [modelName, index, form]);

  const availableModelOptions = MODEL_NAME_OPTIONS.filter(opt => {
    const selectedModelNames = watchedModelNames
      .filter((_, i) => i !== index)
      .filter(Boolean);
    return !selectedModelNames.includes(opt.value);
  });

  const model = `${form.watch(`conditions.${index}.modelName`)}GQL` as keyof ModelGQLMap;

  return (
    <div key={`${field.id}-${index}`} className='grid grid-cols-1'>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-4'>
          <CustomStaticSelectInput
            name={`conditions.${index}.modelName`}
            control={form.control}
            label="Model Name"
            options={availableModelOptions}
            placeholder="Select model name"
            
          />
        </div>
        <div className='col-span-3'>
          <CustomStaticSelectInput
            name={`conditions.${index}.codeLabel`}
            control={form.control}
            label="Condition"
            options={CONDITION_NAME_OPTIONS}
            placeholder="Select condition"
            disabled={!form.watch(`conditions.${index}.modelName`)}
          />
        </div>
        <div className='col-span-4'>
          {form.watch(`conditions.${index}.codeLabel`) === 'CONTAINS' ? (
            <div>
              {/* Show text input for CONTAINS condition */}
            </div>
          ) : !form.watch(`conditions.${index}.modelName`) ? (
            <div className='text-sm text-muted-foreground'>
              Select a model first
            </div>
          ) : (
            <>
              <CustomSingleSelectInput
                  name={`conditions.${index}.value.stringValue`}
                  control={form.control}
                  label={`Select ${form.watch(`conditions.${index}.modelName`)}`}
                  findAllWithCursorGQL={modelAPI[model].findAllWithCursor}
                  findUniqueGQL={modelAPI[model].findUnique}
                  defaultValueId={""}
                  placeholder={`Search ${form.watch(`conditions.${index}.modelName`)}...`}
                  searchPlaceholder={`Search ${form.watch(`conditions.${index}.modelName`)}...`}
                  emptySelectedMessage={` ${form.watch(`conditions.${index}.modelName`)} already selected.`}
                  emptyMessage={`No ${form.watch(`conditions.${index}.modelName`)} found.`}
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
            </>
          )}
        </div>
        <div className='col-span-1 flex items-end justify-center'>
          <Button variant={'destructive'} onClick={() => removeField(index)}>
            <Trash2Icon className='size-4' />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

const ArrayMethod = ({
  fieldArray,
  removeField,
  form
}: ArrayMethodProps) => {
  // Watch all condition modelNames once at component level
  const watchedModelNames = fieldArray.fields.map((_, i) => 
    form.watch(`conditions.${i}.modelName`)
  );

  return fieldArray.fields.length > 0 && fieldArray.fields.map((field, index) => (
    <ConditionRow
      key={`${field.id}-${index}`}
      field={field}
      index={index}
      form={form}
      fieldArray={fieldArray}
      removeField={removeField}
      watchedModelNames={watchedModelNames}
    />
  ));
};

export default ArrayMethod;