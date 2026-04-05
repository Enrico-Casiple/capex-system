import { ActionType, PopupType } from '@/app/_component/Row/Action';
import FormTemplate from '@/components/Forms/FormTemplate';
import { RoleCreateInputSchema } from '@/lib/generated/zod/prisma-zod-types';
import { useForm } from 'react-hook-form';
import z from 'zod';


type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Method = (props: MethodProps) => {
  // const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  // const { data: permissionsData, loading } = useQuery(GET_ALL_PERMISSIONS);

  const form = useForm<z.infer<typeof RoleCreateInputSchema>>({
    defaultValues: {
      name: '',
      description: '',
      roleType: 'CUSTOM',
      isDefault: false,
    }
  });

  // Group permissions by module
  // const groupedPermissions = useMemo(() => {
  //   if (!permissionsData?.permissionFindAllWithCursor?.data) return {};
    
  //   const permissions = permissionsData.permissionFindAllWithCursor.data as Permission[];
  //   const grouped: Record<string, Permission[]> = {};
    
  //   permissions.forEach((perm) => {
  //     const moduleName = perm.module || 'OTHER';
  //     if (!grouped[moduleName]) {
  //       grouped[moduleName] = [];
  //     }
  //     grouped[moduleName].push(perm);
  //   });
    
  //   // Sort permissions within each module by displayOrder
  //   Object.keys(grouped).forEach(moduleName => {
  //     grouped[moduleName].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  //   });
    
  //   return grouped;
  // }, [permissionsData]);

  // const handlePermissionToggle = (permissionId: string) => {
  //   setSelectedPermissions(prev => 
  //     prev.includes(permissionId)
  //       ? prev.filter(id => id !== permissionId)
  //       : [...prev, permissionId]
  //   );
  // };

  // const handleSelectAllModule = (moduleName: string, checked: boolean) => {
  //   const modulePermissions = groupedPermissions[moduleName].map((p) => p.id);
    
  //   if (checked) {
  //     setSelectedPermissions(prev => [...new Set([...prev, ...modulePermissions])]);
  //   } else {
  //     setSelectedPermissions(prev => prev.filter(id => !modulePermissions.includes(id)));
  //   }
  // };

  // const isModuleFullySelected = (moduleName: string) => {
  //   const modulePermissions = groupedPermissions[moduleName].map((p) => p.id);
  //   return modulePermissions.every(id => selectedPermissions.includes(id));
  // };

  const handleToSubmit = async (data: z.infer<typeof RoleCreateInputSchema>) => {
    // const payload = {
    //   ...data,
    //   rolePermissions: {
    //     create: selectedPermissions.map(permId => ({
    //       permissionId: permId,
    //       isActive: true,
    //     }))
    //   }
    // };
    
    // console.log('Payload:', payload);
    
    // TODO: Call your mutation here
    
    return {
      isSuccess: true,
      message: 'Role created successfully',
      code: `ROLE_${props.actionType?.toUpperCase() || 'CREATE'}`,
      data: null
    };
  };

  // if (loading) {
  //   return <div className="p-4 text-sm text-muted-foreground">Loading permissions...</div>;
  // }

  return (
    <FormTemplate 
      title=""
      description=""
      isHaveBorder={false}
      form={form}
      handleToSubmit={handleToSubmit}
      isFullWidth={true}
    >
      <div className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-3">
          {/* <CustomTextInput
            control={form.control}
            name="name"
            label="Role Name"
            placeholder="Enter role name"
            required
          />  */}
        </div>

        {/* <CustomTextInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter role description"
        /> */}

        {/* <div className="flex items-center gap-2">
          <Checkbox
            id="isDefault"
            checked={form.watch('isDefault')}
            onCheckedChange={(checked) => form.setValue('isDefault', !!checked)}
          />
          <Label htmlFor="isDefault" className="text-sm cursor-pointer">
            Auto-assign to new users
          </Label>
        </div> */}

        {/* Permissions */}
        {/* <div className="border-t pt-4">
          <h3 className="text-sm font-semibold mb-3">Permissions</h3>
          
          <div className="space-y-3">
            {Object.entries(groupedPermissions).map(([moduleName, permissions]) => (
              <div key={moduleName} className="border rounded-lg">
                <div className="bg-muted/50 px-3 py-2 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`module-${moduleName}`}
                      checked={isModuleFullySelected(moduleName)}
                      onCheckedChange={(checked) => handleSelectAllModule(moduleName, !!checked)}
                    />
                    <Label 
                      htmlFor={`module-${moduleName}`}
                      className="text-xs font-semibold uppercase cursor-pointer"
                    >
                      {moduleName.replace(/_/g, ' ')}
                    </Label>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {permissions.filter((p) => selectedPermissions.includes(p.id)).length} / {permissions.length}
                  </span>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-start gap-2">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor={permission.id}
                          className="text-xs font-medium cursor-pointer leading-tight"
                        >
                          {permission.name}
                        </Label>
                        {permission.description && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {permission.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(groupedPermissions).length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No permissions available. Please run the seed script first.
            </p>
          )}
        </div> */}

        {/* Summary */}
        {/* <div className="bg-muted/30 rounded p-2 text-xs text-muted-foreground">
          Selected {selectedPermissions.length} permission(s)
        </div> */}
      </div>
    </FormTemplate>
  );
};

export default Method;
