'use client';
import FormTemplate from '@/components/Forms/FormTemplate';
import CustomMultipleSelectInput from '@/components/Forms/Inputs/CustomMultipleSelectInput';
import CustomSingleSelectInput from '@/components/Forms/Inputs/CustomSingleSelectInput';
import { Button } from '@/components/ui/button';
import { modelGQL } from '@/lib/api/crud.gql';
import { fail, ok } from '@/lib/util/reponseUtil';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const DEFAULT_USER_ID = '';
const DEFAULT_USER_IDS: string[] = [];

export const Schema = z.object({
  userId: z.string().min(1, 'User is required'),
  userIds: z.array(z.string()).optional(),
});

export type SchemaType = z.infer<typeof Schema>;

const HomePage = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: { userId: DEFAULT_USER_ID || '', userIds: DEFAULT_USER_IDS || [] },
  });

  const onSubmit = async (
    values: SchemaType,
  ): Promise<ReturnType<typeof ok> | ReturnType<typeof fail>> => {
    if (!values.userId) return fail('VALIDATION_ERROR', 'User is required');
    alert(`Submitted User ID: ${values.userId}\nSubmitted User IDs: ${values.userIds?.join(', ')}`);
    return ok('SUCCESS', `User ID: ${values.userId}`, values.userId);
  };

  return (
    <div>
      <FormTemplate
        title="User Form"
        isHaveBorder={true}
        form={form}
        description="This is a user form"
        handleToSubmit={onSubmit}
        isFullWidth={true}
      >
        <div className="flex flex-col gap-4">
          {/* ─── Single Select ───────────────────────────────── */}
          <CustomSingleSelectInput
            name="userId"
            control={form.control}
            label="User"
            findAllWithCursorGQL={modelGQL.UserGQL.findAllWithCursor}
            findUniqueGQL={modelGQL.UserGQL.findUnique}
            defaultValueId={DEFAULT_USER_ID}
            placeholder="Select a user"
            searchPlaceholder="Search by name..."
            emptySelectedMessage="User already selected."
            emptyMessage="No users found."
            cursorVariables={(search, cursor, take) => ({
              cursorInput: {
                cursor,
                isActive: true,
                take,
                filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
              },
            })}
            uniqueVariables={(id) => ({ id })}
            mapOption={(user: unknown) => {
              const u = user as { id?: string; name?: string; userName?: string; email?: string };
              return {
                label: u.name ?? u.userName ?? u.email ?? '',
                value: u.id ?? '',
              };
            }}
            mapDefaultOption={(data: unknown) => {
              const d = data as {
                data?: { id?: string; name?: string; userName?: string; email?: string };
              };
              if (!d?.data) return null;
              return {
                label: d.data.name ?? d.data.userName ?? d.data.email ?? '',
                value: d.data.id ?? '',
              };
            }}
          />

          {/* ─── Multiple Select ─────────────────────────────── */}
          <CustomMultipleSelectInput
            name="userIds"
            control={form.control}
            label="Users (Multiple)"
            findAllWithCursorGQL={modelGQL.UserGQL.findAllWithCursor}
            findAllGQL={modelGQL.UserGQL.findAll}
            placeholder="Select users..."
            searchPlaceholder="Search by name..."
            emptyAllSelectedMessage="All users selected."
            emptyMessage="No users found."
            maxVisible={1}
            cursorVariables={(search, cursor, take) => ({
              cursorInput: {
                cursor,
                isActive: true,
                take,
                filter: search ? { name: { contains: search, mode: 'insensitive' } } : undefined,
              },
            })}
            countVariables={() => ({
              paginationInput: { currentPage: 1, pageSize: 1, isActive: true },
            })}
            allIdsVariables={(take) => ({
              cursorInput: { cursor: null, isActive: true, take },
            })}
            mapOption={(user: unknown) => {
              const u = user as { id?: string; name?: string; userName?: string; email?: string };
              return {
                label: u.name ?? u.userName ?? u.email ?? '',
                value: u.id ?? '',
              };
            }}
          />
        </div>
        <Button type="submit">Submit</Button>
      </FormTemplate>
    </div>
  );
};

export default HomePage;
