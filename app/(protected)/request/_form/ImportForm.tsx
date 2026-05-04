// app/(protected)/user/Form/ImportForm.tsx
import ImportFormWrapper from '@/app/_component/Form/ImportFormWrapper';
import { hashPassword } from '../../../../lib/util/bcryptjs';
import useToast from '../../../_hooks/useToast';


type ImportFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImportForm =  <
  TModel extends Record<string, unknown>,
  TCreateInput extends Record<string, unknown>
>(props: ImportFormProps) => {
  const toast = useToast();
  return (
    <ImportFormWrapper<TModel, TCreateInput>
      {...props}
      transformRow={async (row: TModel) => {
        const model = row as unknown as Record<string, unknown>

        // Validate password exists
        if (!model.password) {
          throw new Error(`Password is required for user ${model.email || 'unknown'}`);
        }

        try {
          const hashedPassword = await hashPassword(model.password as string);
          return {
            name: model.name,
            email: model.email,
            password: hashedPassword,
            userName: model.userName,
            isTwoFactorAuthEnabled: Boolean(model.isTwoFactorAuthEnabled),
            isActive: Boolean(model.isActive),
          } as unknown as TCreateInput;
        } catch (error) {
          toast.error({
            message: 'Error hashing password',
            description: `Failed to hash password for user ${model.email}. Please ensure all required fields are present and try again.`
          });
          throw error;
        }
      }}
      previewColumns={[
        { key: 'name', label: 'Name', default: 'FullName' },
        { key: 'email', label: 'Email', default: 'WorkEmail@email.com' },
        { key: 'userName', label: 'Username', default: 'WorkEmail' },
        {key: 'password', label: 'Password', default: 'password123'},
        { key: 'isTwoFactorAuthEnabled', label: 'Two-Factor Authentication', default: false },
        { key: 'isActive', label: 'Active', default: false }
      ]}
      applyDefaults={false}  // ← Don't fill in defaults during import
    />
  )
}

export default ImportForm
