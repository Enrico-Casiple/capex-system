import ImportFormWrapper from '@/app/_component/Form/ImportFormWrapper';
import { PreviewColumn } from '@/app/_config/shared';
import useToast from '@/app/_hooks/useToast';

type ImportFormProps<TModel, TCreateInput> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transformRow?: (row: TModel) => TCreateInput | Promise<TCreateInput>;
  previewColumns?: PreviewColumn<TModel>[];
};

const ImportForm = <
  TModel extends Record<string, unknown>,
  TCreateInput extends Record<string, unknown>
>({
  open,
  setOpen,
  transformRow,
  previewColumns,
}: ImportFormProps<TModel, TCreateInput>) => {
  const toast = useToast();

  const handleTransformRow = async (row: TModel): Promise<TCreateInput> => {
    try {
      if (!transformRow) {
        throw new Error('Transform function not provided');
      }

      const result = await transformRow(row);
      return result as TCreateInput;
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
    <ImportFormWrapper<TModel, TCreateInput>
      open={open}
      setOpen={setOpen}
      transformRow={handleTransformRow}
      previewColumns={previewColumns || []}
      applyDefaults={false}
    />
  );
};

export default ImportForm;
