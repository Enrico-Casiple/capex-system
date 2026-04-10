// app/(protected)/user/Form/ImportForm.tsx
import ImportFormWrapper from '@/app/_component/Form/ImportFormWrapper';
import { UserCreateInput } from '@/lib/generated/api/customHookAPI/graphql';

type UserCSVRow = {
  name: string;
  email: string;
  password: string;
  userName: string;
  isTwoFactorAuthEnabled: string | boolean;
  isActive: string | boolean;
}

type ImportFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImportForm = (props: ImportFormProps) => {
  return (
    <ImportFormWrapper<UserCSVRow, UserCreateInput>
      {...props}
      transformRow={(row: UserCSVRow) => ({
        name: row.name,
        email: row.email,
        password: row.password,
        userName: row.userName,
        isTwoFactorAuthEnabled: Boolean(row.isTwoFactorAuthEnabled),
        isActive: Boolean(row.isActive),
      })}
      previewColumns={[
        { key: 'name', label: 'Name', default: 'FullName' },
        { key: 'email', label: 'Email', default: 'WorkEmail@email.com' },
        { key: 'userName', label: 'Username', default: 'WorkEmail' },
        {key: 'password', label: 'Password', default: 'password123'},
        { key: 'isTwoFactorAuthEnabled', label: 'Two-Factor Authentication', default: false },
        { key: 'isActive', label: 'Active', default: false }
      ]}
       autoGenerateColumns={true}
    />
  )
}

export default ImportForm
