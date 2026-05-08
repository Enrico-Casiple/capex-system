import ImportUpdateFormWrapper from '@/app/_component/Form/ImportUpdateFormWrapper';
import { PreviewColumn } from '@/app/_config/shared';
import useToast from '@/app/_hooks/useToast';

type ImportUpdateFormProps<TModel, TUpdateInput> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transformRow?: (row: TModel) => TUpdateInput | Promise<TUpdateInput>;
  previewColumns?: PreviewColumn<TModel>[];
};

const ImportUpdateForm = <
  TModel extends Record<string, unknown>,
  TUpdateInput extends Record<string, unknown>
>({
  open,
  setOpen,
  transformRow,
  previewColumns,
}: ImportUpdateFormProps<TModel, TUpdateInput>) => {
  const toast = useToast();

  const handleTransformRow = async (row: TModel): Promise<TUpdateInput> => {
    try {
      if (!transformRow) throw new Error('Transform function not provided');
      return (await transformRow(row)) as TUpdateInput;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error({
        message: 'Error processing row',
        description: `Row ID: ${(row as any).id || 'unknown'} - ${errorMessage}`,
      });
      throw error;
    }
  };

  return <ImportUpdateFormWrapper<TModel, TUpdateInput> open={open} setOpen={setOpen} transformRow={handleTransformRow} previewColumns={previewColumns || []} applyDefaults={false} />;
};

export default ImportUpdateForm;
