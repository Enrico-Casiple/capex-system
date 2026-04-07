// components/SideBar/app-sidebar.tsx
'use client';

import * as React from 'react';
import { Command } from 'lucide-react';
import { useSession } from 'next-auth/react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import useUserRolePermission from '@/app/_hooks/useUserRolePermission';
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { data: session } = useSession();
  const { can, loading } = useUserRolePermission({
    module: [],
    resource: [],
    action: [],
  });



  //   return sidebarData.projects.filter((project) => {
  //     if (project.permission) {
  //       return can(
  //         project.permission.module,
  //         project.permission.resource,
  //         project.permission.action
  //       );
  //     }
  //     return true;
  //   });
  // }, [can, loading, isGlobalAdmin]);

  // User data from session
  // const userData = React.useMemo(
  //   () => ({
  //     name: session?.user?.name || 'User',
  //     email: session?.user?.email || 'user@example.com',
  //     avatar: session?.user?.image || '/avatars/default.jpg',
  //   }),
  //   [session]
  // );

  if (loading) {
    return (
      <Sidebar variant="inset" {...props}>
        <SidebarContent>
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <div className="text-sm text-muted-foreground">Loading permissions...</div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/home">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <>test</>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
