import ImportUpdateFormWrapper from '@/app/_component/Form/ImportUpdateFormWrapper';
import useToast from '@/app/_hooks/useToast';
import { PreviewColumn } from '../../_config/shared';

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
      if (!transformRow) {
        throw new Error('Transform function not provided');
      }

      const result = await transformRow(row);
      return result as TUpdateInput;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error({
        message: `Error processing row`,
        description: `Row ID: ${row['id'] || 'unknown'} - ${errorMessage}`,
      });
      throw error;
    }
  };

  return (
    <ImportUpdateFormWrapper<TModel, TUpdateInput>
      open={open}
      setOpen={setOpen}
      transformRow={handleTransformRow}
      previewColumns={previewColumns || []}
      applyDefaults={false}
    />
  );
};

export default ImportUpdateForm;