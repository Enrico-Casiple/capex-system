// app/(protected)/role/_form/ImportForm.tsx
import ImportFormWrapper from '@/app/_component/Form/ImportFormWrapper'

type ImportFormProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ImportForm = <
  TModel extends Record<string, unknown>,
  TCreateInput extends Record<string, unknown>
>(props: ImportFormProps) => {
  return (
    <ImportFormWrapper<TModel, TCreateInput>
      {...props}
      transformRow={(row: TModel) => {
        const model = row as unknown as Record<string, unknown>
        return {
          name: model.name,
          description: model.description,
          roleType: model.roleType,
          isDefault: Boolean(model.isDefault),
          isActive: Boolean(model.isActive),
        } as unknown as TCreateInput
      }}
      previewColumns={[
        { key: 'name', label: 'Name', default: 'Custom Role' },
        { key: 'description', label: 'Description', default: 'Role description here' },
        { key: 'roleType', label: 'Type', default: 'CUSTOM' },
        { key: 'isDefault', label: 'Is Default', default: false },
        { key: 'isActive', label: 'Active', default: true },
      ]}
      applyDefaults={true}
    />
  )
}

export default ImportForm
