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
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'userName', label: 'Username' },
      ]}
    />
  )
}

export default ImportForm
