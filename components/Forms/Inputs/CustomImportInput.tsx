'use client';

import { useState } from 'react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Dropzone, DropzoneEmptyState } from '@/components/kibo-ui/dropzone';
import { Control, Controller, FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { DropzoneProps } from '@/components/kibo-ui/dropzone';
import { Loader2, X, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AllowedFileTypes = 'pdf' | 'csv' | 'xlsx' | 'png' | 'jpg' | 'jpeg';

type CustomImportInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  setError: UseFormSetError<TFormValues>;
  clearErrors: (name: Path<TFormValues>) => void;
  maxSizeMB?: 5 | 10 | 50;
  allowedExtensions?: AllowedFileTypes[];
  dropzoneProps?: Omit<DropzoneProps, 'onDrop' | 'src'>;
};

const MIME_TYPE_MAP: Record<AllowedFileTypes, string> = {
  pdf: 'application/pdf',
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

const CustomImportInput = <TFormValues extends FieldValues>({
  maxSizeMB = 5,
  allowedExtensions = ['png', 'jpg', 'jpeg'],
  ...props
}: CustomImportInputProps<TFormValues>) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const parseS3Url = (url: any) => {
    // Ensure we are working with a string
    const stringUrl = typeof url === 'string' ? url : '';
    if (!stringUrl) return { rawUrl: '', fileName: '' };

    // 1. Clean the URL (removes Markdown formatting if present)
    let cleanUrl = stringUrl.replace(/[\[\]]/g, '').split('](').pop()?.replace(')', '') || stringUrl;

    // 2. Fix potential protocol issues
    if (cleanUrl.includes('digitaloceanspaces.com')) {
      if (!cleanUrl.startsWith('http')) cleanUrl = `https://${cleanUrl}`;
      else cleanUrl = cleanUrl.replace(/^https?:\/+(?!\/)/, 'https://');
    }

    // 3. Extract filename and remove timestamp prefix (e.g., 1713963382-)
    const fullFileName = cleanUrl.split('/').pop() || 'View File';
    const fileName = fullFileName.replace(/^\d+-/, '');

    return { rawUrl: cleanUrl, fileName };
  };

  const validateFile = (file: File): string | null => {
    const sizeInBytes = maxSizeMB * 1024 * 1024;
    if (file.size > sizeInBytes) return `File too large. Max ${maxSizeMB}MB.`;

    const ext = file.name.split('.').pop()?.toLowerCase() as AllowedFileTypes;
    if (!allowedExtensions.includes(ext)) {
      return `Invalid file type. Allowed: ${allowedExtensions.join(', ')}`;
    }

    const expectedMime = MIME_TYPE_MAP[ext];
    if (ext !== 'csv' && file.type !== expectedMime) {
      return "Security Error: File content does not match its extension.";
    }

    return null;
  };

  const handleUpload = async (file: File, onChange: (value: string) => void) => {
    const error = validateFile(file);
    if (error) {
      props.setError(props.name, { type: 'manual', message: error });
      return;
    }

    props.clearErrors(props.name);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();

      // Update React Hook Form state
      onChange(url);
    } catch (err) {
      props.setError(props.name, { type: 'manual', message: 'Upload failed. Please try again.' });
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async (currentUrl: string, onChange: (value: string | null) => void) => {
    setIsProcessing(true);
    try {
      const { fileName } = parseS3Url(currentUrl);
      // Optional: Delete from S3. Using currentUrl as fallback if filename fails.
      await fetch(`/api/upload?fileName=${fileName}`, { method: 'DELETE' });
      onChange(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => {
        // Correct check for default values
        const hasFile = typeof field.value === 'string' && field.value.trim().length > 0;
        const { rawUrl, fileName } = parseS3Url(field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
            <div className="flex flex-col gap-2">
              {!hasFile ? (
                <Dropzone
                  {...props.dropzoneProps}
                  onDrop={(files) => files[0] && handleUpload(files[0], field.onChange)}
                  disabled={isProcessing}
                  className="h-8 min-h-0 border-dashed flex items-center justify-center py-0"
                >
                  <DropzoneEmptyState>
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground text-center uppercase">
                        {allowedExtensions.join(' / ')} • MAX {maxSizeMB}MB
                      </span>
                    )}
                  </DropzoneEmptyState>
                </Dropzone>
              ) : (
                <div className="flex h-8 items-center justify-between gap-2 p-2 border rounded-md bg-muted/30">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={rawUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-600 hover:underline truncate"
                    >
                      {fileName}
                    </a>
                    <ExternalLink className="h-3 w-3 text-blue-600 flex-shrink-0" />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemove(field.value, field.onChange)}
                    disabled={isProcessing}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default CustomImportInput;