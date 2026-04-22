import { useListContext } from '@/app/_context/ListContext/ListProvider';
import useMutationActions from '@/app/_hooks/useBulkActions';
import useToast from '@/app/_hooks/useToast';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomButton from '@/components/Forms/Inputs/CustomButton';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/kibo-ui/dropzone";
import { Button } from '@/components/ui/button';
import { DocumentNode } from 'graphql';
import { FileSpreadsheet, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Papa from 'papaparse';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RoleGate from '../RoleGate/RoleGate';

export type PreviewColumn<TRow extends Record<string, unknown>> = {
  key: keyof TRow;
  label: string;
  default?: string | number | boolean;
};

type ImportFormWrapperProps<TRow extends Record<string, unknown>, TInput> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transformRow: (row: TRow) => Promise<TInput> | TInput;
  previewColumns: PreviewColumn<TRow>[];
  mutationGQL?: DocumentNode;
  additionalVariables?: Record<string, unknown>;
  applyDefaults?: boolean; // If true: apply defaults to missing values
}

const ImportFormWrapper = <TRow extends Record<string, unknown>, TInput>({
  setOpen,
  transformRow,
  previewColumns,
  mutationGQL,
  additionalVariables = {},
  applyDefaults = false,
}: ImportFormWrapperProps<TRow, TInput>) => {
  const session = useSession();
  const toast = useToast();
  const { modelGQL, model, modelName } = useListContext();
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
          // Only use provided columns - no auto-generation

          // Filter out completely empty rows and don't apply defaults
          const enrichedData = results.data
            .filter((row: Record<string, unknown>) => {
              // Keep row if it has at least one non-empty value
              return Object.values(row).some(value => value !== '' && value !== null && value !== undefined);
            })
            .map((row: Record<string, unknown>) => row as TRow);

          form.setValue('schema', enrichedData);
          setSchema(enrichedData);

          toast.success({
            message: 'CSV file parsed successfully',
            description: `The file "${acceptedFiles[0].name}" has been parsed and is ready for import.`,
          })
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

  const handleDownloadTemplate = () => {
    if (!previewColumns || previewColumns.length === 0) {
      toast.error({
        message: 'No columns configured',
        description: 'Please provide column definitions via previewColumns prop to enable template download.',
      });
      return;
    }

    // Create Excel HTML table with headers showing default values
    const headers = previewColumns.map(col => {
      // const defaultText = col.default !== undefined ? ` (default: ${col.default})` : '';
      return `<th style="background-color: #f2f2f2; border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">${String(col.key)}</th>`;
    }).join('');

    // Create rows with default values populated (only show if applyDefaults is true)
    const exampleRows = Array(3).fill(null).map(() =>
      `<tr>${previewColumns.map(col => {
        const cellValue = applyDefaults && col.default !== undefined ? String(col.default) : '';
        const bgColor = applyDefaults && col.default !== undefined ? 'background-color: #f0f0f0;' : '';
        return `<td style="border: 1px solid #000; padding: 8px; ${bgColor}">${cellValue}</td>`;
      }).join('')}</tr>`
    ).join('');

    const htmlContent = `
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <table>
            <thead><tr>${headers}</tr></thead>
            <tbody>${exampleRows}</tbody>
          </table>
        </body>
      </html>
    `;

    // Create blob and download as Excel
    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `template-${model || 'import'}.xls`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success({
      message: 'Template downloaded',
      description: 'Excel template has been downloaded.',
    });
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
    const rawData =  form.getValues('schema');
    const payload = await Promise.all(rawData.map(transformRow));
    console.log('Transformed payload for import:', payload);

    await execute({
      variables: {
        data: payload,
        currentUserId: session.data?.user?.id || '',
        ...additionalVariables
      },
      onError(error) {
        console.error('Error during import mutation:', error);
        toast.error({
          message: 'Import failed',
          description: `An error occurred during import. Please check the data and try again. Error details: ${error.message}`,
        });
      },
    });

    setOpen(false);
    return { isSuccess: true, message: 'Import successful', code: 'IMPORT_CLIENT', data: null };
  }

  return (
    <FormTemplate title='' description='' isHaveBorder={false} form={form} handleToSubmit={handleToSubmit} isFullWidth={true}>
      <div className='space-y-3 p-4 rounded -mt-10'>
        <div className='flex justify-end mb-2'>
         <RoleGate
            module={[`${modelName.toUpperCase()}_MANAGEMENT`, 'SYSTEM']}
            resource={[`${modelName.toLowerCase()}`, '*']}
            action={['download_template', '*']}
          >
            <Button
              variant='outline'
              size='sm'
              onClick={handleDownloadTemplate}
              type='button'
              className='text-xs gap-2'
            >
              <FileSpreadsheet className='size-3' />
              Download Template
            </Button>
          </RoleGate>
        </div>

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
