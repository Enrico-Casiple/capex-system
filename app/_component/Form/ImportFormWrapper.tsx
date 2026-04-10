import FormTemplate from '@/components/Forms/FormTemplate';
import CustomButton from '@/components/Forms/Inputs/CustomButton';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/kibo-ui/dropzone";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Papa from 'papaparse';
import useMutationActions from '@/app/_hooks/useBulkActions';
import { useListContext } from '@/app/_context/ListContext/ListProvider';
import { useSession } from 'next-auth/react';
import { FileSpreadsheet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentNode } from 'graphql';
import useToast from '@/app/_hooks/useToast';

type ImportFormWrapperProps<TRow extends Record<string, unknown>, TInput> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transformRow: (row: TRow) => TInput;
  previewColumns: { key: keyof TRow; label: string }[];
  mutationGQL?: DocumentNode;
  additionalVariables?: Record<string, unknown>;
}

const ImportFormWrapper = <TRow extends Record<string, unknown>, TInput>({ 
  setOpen, 
  transformRow,
  previewColumns,
  mutationGQL,
  additionalVariables = {}
}: ImportFormWrapperProps<TRow, TInput>) => {
  const session = useSession();
  const toast = useToast();
  const { modelGQL, model } = useListContext();
  const [fileName, setFileName] = useState<string | null>(null);
  const [schema, setSchema] = useState<TRow[]>([]);
  const form = useForm<{schema: TRow[]}>({
    defaultValues: {schema: []}
  })

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);
      Papa.parse<TRow>(acceptedFiles[0], {
        header: true,
        complete: (results) => {
          form.setValue('schema', results.data);
          toast.success({
            message: 'CSV file parsed successfully',
            description: `The file "${acceptedFiles[0].name}" has been parsed and is ready for import.`,
          })
          setSchema(results.data);
        },
        error: (error) => {
          console.error('CSV parse error:', error);
          toast.error({
            message: 'Failed to parse CSV file',
            description: 'An error occurred while parsing the CSV file. Please ensure it is properly formatted and try again.',
          })
          setFileName(null);
        }
      });
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setSchema([]);
    form.setValue('schema', []);
  };
// PerformanceImprovementPlan-WorkInfo
  const { execute, executing } = useMutationActions({
    mutationGQL: mutationGQL || modelGQL[model].createMany,
    successMessage: "Records created successfully",
    successDescription: `The selected records have been created.`,
    errorMessage: "Failed to create records",
    errorDescription: `An error occurred while creating the records.`,
  })

  const handleToSubmit = async () => {
    const rawData = form.getValues('schema');
    const payload = rawData.map(transformRow);
        
    await execute({
      variables: {
        data: payload,
        currentUserId: session.data?.user?.id || '',
        ...additionalVariables
      },
    });

    setOpen(false);
    return { isSuccess: true, message: 'Import successful', code: 'IMPORT_CLIENT', data: null };
  }

  return (
    <FormTemplate title='' description='' isHaveBorder={false} form={form} handleToSubmit={handleToSubmit} isFullWidth={true}>
      <div className='space-y-3 p-4 rounded -mt-10'>
        <Dropzone
          accept={{ "text/csv": [".csv"] }}
          maxFiles={1}
          maxSize={1024 * 1024 * 10}
          onDrop={handleDrop}
          onError={console.error}
          className='border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors'
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>

        {fileName && (
          <div className='flex items-center justify-between p-2 bg-muted/50 rounded border'>
            <div className='flex items-center gap-2'>
              <FileSpreadsheet className='size-4 text-primary' />
              <div className='flex flex-col'>
                <span className='text-xs font-medium'>{fileName}</span>
                {schema.length > 0 && (
                  <span className='text-[10px] text-muted-foreground'>{schema.length} records</span>
                )}
              </div>
            </div>
            {!executing && (
              <Button
                variant='ghost'
                size='icon'
                className='size-6'
                onClick={handleRemoveFile}
                type='button'
              >
                <X className='size-3' />
              </Button>
            )}
          </div>
        )}

        {schema && schema.length > 0 && (
          <div className='border rounded-lg overflow-hidden'>
            <div className='bg-muted/50 px-3 py-1.5 border-b flex items-center justify-between'>
              <span className='text-xs font-medium'>Preview</span>
              <span className='text-[10px] text-muted-foreground'>{schema.length} records</span>
            </div>
            <div className='max-h-48 overflow-auto'>
              <table className='w-full text-xs'>
                <thead className='bg-muted/30 sticky top-0'>
                  <tr>
                    {previewColumns.map(col => (
                      <th key={String(col.key)} className='px-2 py-1.5 text-left font-medium text-[10px] uppercase'>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {schema.slice(0, 5).map((row, idx) => (
                    <tr key={idx} className='hover:bg-muted/20'>
                      {previewColumns.map(col => (
                        <td key={String(col.key)} className='px-2 py-1.5'>
                          {String(row[col.key] ?? '-')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {schema.length > 5 && (
              <div className='bg-muted/30 px-3 py-1 border-t'>
                <p className='text-[10px] text-muted-foreground text-center'>
                  +{schema.length - 5} more records
                </p>
              </div>
            )}
          </div>
        )}

        <div className='flex justify-end pt-2'>
          <CustomButton
            name='Import' 
            loading={executing}
            type='submit'
            isSolo={false}
            inputPropsCancel={{
              onClick: () => setOpen(false)
            }}
          />
        </div>
      </div>
    </FormTemplate>
  )
}

export default ImportFormWrapper
