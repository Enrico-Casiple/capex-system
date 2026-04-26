// app/(protected)/user/Form/ImportForm.tsx
import ImportUpdateFormWrapper from '@/app/_component/Form/ImportUpdateFormWrapper';
import useToast from '../../../_hooks/useToast';


type ImportUpdateFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImportUpdateForm = <
  TModel extends Record<string, unknown>,
  TUpdateInput extends Record<string, unknown>
>(props: ImportUpdateFormProps) => {
  const toast = useToast();
  return (
    <ImportUpdateFormWrapper<TModel, TUpdateInput>
      {...props}
      transformRow={async (row: TModel) => {
        const model = row as unknown as Record<string, unknown>

        try {
          return {
            id: model.id,
            name: model.name,
            description: model.description,
            isGlobal: Boolean(model.isGlobal),
            version: Number(model.version) + 1, // Increment version for updates
          } as unknown as TUpdateInput;
        } catch (error) {
          toast.error({
            message: 'Import Failed',
            description: `Failed to import row ${JSON.stringify(model)}. Please ensure all required fields are present and try again.`
          });
          throw error;
        }
      }}
      previewColumns={[
        { key: 'id', label: 'ID', default: '' },
        { key: 'name', label: 'Name', default: 'FullName' },
        { key: 'description', label: 'Description', default: '' },
        { key: 'isGlobal', label: 'Is Global', default: '' },
        { key: 'version', label: 'Version', default: '' },
      ]}
      applyDefaults={false}  // ← Don't fill in defaults during import
    />
  )
}

export default ImportUpdateForm
