// types/sidebar.ts
import { LucideIcon } from 'lucide-react';

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
  items?: SidebarItem[]; // 👈 recursive
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

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

export interface SidebarData {
  user: SidebarUser;
  navMain: SidebarSection[];
  navSecondary?: SidebarSecondaryItem[];
  projects?: SidebarProject[];
}
