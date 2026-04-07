// components/SideBar/sidebar-data.ts
import {
  Users,
  Shield,
  BookOpen,
  Settings2,
  LifeBuoy,
  Send,
  Frame,
  PieChart,
  Map,
  LucideIcon,
} from 'lucide-react';

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

export const sidebarData = {
  navMain: [
    {
      title: 'User Management',
      url: '/user',
      icon: Users,
      permission: {
        module: 'USER_MANAGEMENT',
        resource: 'user',
        action: 'read',
      },
      items: [
        {
          title: 'All Users',
          url: '/user',
          permission: {
            module: 'USER_MANAGEMENT',
            resource: 'user',
            action: 'read',
          },
        },
        {
          title: 'Create User',
          url: '/user/create',
          permission: {
            module: 'USER_MANAGEMENT',
            resource: 'user',
            action: 'create',
          },
        },
      ],
    },
    {
      title: 'Role Management',
      url: '/role',
      icon: Shield,
      permission: {
        module: 'ROLE_MANAGEMENT',
        resource: 'role',
        action: 'read',
      },
      items: [
        {
          title: 'All Roles',
          url: '/role',
          permission: {
            module: 'ROLE_MANAGEMENT',
            resource: 'role',
            action: 'read',
          },
        },
        {
          title: 'Create Role',
          url: '/role/create',
          permission: {
            module: 'ROLE_MANAGEMENT',
            resource: 'role',
            action: 'create',
          },
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};
