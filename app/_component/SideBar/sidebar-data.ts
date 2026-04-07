// components/SideBar/sidebar-data.ts
import { Users, Shield, LucideIcon } from 'lucide-react';

export interface SidebarItem {
  title: string;
  url: string;
  isActive?: boolean;
  badge?: string | number;
  permission?: {
    module: string;
    resource: string;
    action: string;
  };
  items?: SidebarItem[]; // 👈 recursive — this was missing
}

export interface SidebarSection {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: SidebarItem[];
  permission?: {
    module: string;
    resource: string;
    action: string;
  };
  // 👈 removed duplicate `item` field
}

export interface SidebarProject {
  name: string;
  url: string;
  icon: LucideIcon;
  permission?: {
    module: string;
    resource: string;
    action: string;
  };
}

export interface SidebarSecondaryItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const sidebarData: {
  navMain: SidebarSection[];
} = {
  navMain: [
    {
      title: 'User Management',
      url: '/user',
      icon: Users,
      permission: { module: 'USER_MANAGEMENT', resource: 'user', action: 'read' },
      items: [
        // {
        //   title: 'All Users',
        //   url: '/user',
        //   permission: { module: 'USER_MANAGEMENT', resource: 'user', action: 'read' },
        //   items: [
        //     {
        //       title: 'Active Users',
        //       url: '/user?status=active',
        //       permission: { module: 'USER_MANAGEMENT', resource: 'user', action: 'read' },
        //     },
        //     {
        //       title: 'Inactive Users',
        //       url: '/user?status=inactive',
        //       permission: { module: 'USER_MANAGEMENT', resource: 'user', action: 'read' },
        //     },
        //   ],
        // },
        {
          title: 'All Users',
          url: '/user',
          permission: { module: 'USER_MANAGEMENT', resource: 'user', action: 'read' },
        },
      ],
    },
    {
      title: 'Role Management',
      url: '/role',
      icon: Shield,
      permission: { module: 'ROLE_MANAGEMENT', resource: 'role', action: 'read' },
      items: [
        {
          title: 'All Roles',
          url: '/role',
          permission: { module: 'ROLE_MANAGEMENT', resource: 'role', action: 'read' },
        },
      ],
    },
  ],
};
