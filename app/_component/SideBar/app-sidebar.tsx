'use client';
import { Command, LogOut, User } from 'lucide-react';
import { sidebarData } from './sidebar-data';
import React from 'react';
import { NavMain } from './nav-main';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import useUserRolePermission from '@/app/_hooks/useUserRolePermission';

interface AppSidebarProps {
  width: string;
}

const AppSidebar = ({ width }: AppSidebarProps) => {
  const { data: session } = useSession();
  const { can, loading } = useUserRolePermission();

  const filteredNav = React.useMemo(() => {
    if (loading) return sidebarData.navMain;
    return sidebarData.navMain
      .filter((section) =>
        section.permission
          ? can(section.permission.module, section.permission.resource, section.permission.action)
          : true,
      )
      .map((section) => ({
        ...section,
        items: section.items?.filter((item) =>
          item.permission
            ? can(item.permission.module, item.permission.resource, item.permission.action)
            : true,
        ),
      }));
  }, [can, loading]);

  const sidebarStyle: React.CSSProperties = {
    width,
    height: '100vh',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #e2e8f0',
    overflow: 'hidden',
  };

  return (
    <div style={sidebarStyle}>
      {/* Header */}
      <div style={{ padding: '0.5rem' }}>
        <a href="/home" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">EGOC</span>
            <span className="truncate text-xs text-gray-500">Educar Group of Company</span>
          </div>
        </a>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <NavMain items={filteredNav} />
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e2e8f0', padding: '0.5rem' }}>
        <p className="text-xs text-gray-400 text-center px-2 pb-1">
          <span>Version {process.env.NEXT_PUBLIC_VERSION! || process.env.NEXTAUTH_VERSION!}</span>
        </p>
        <div className="flex items-center justify-between p-2 rounded-md">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-gray-100 shrink-0">
              <User className="size-4 text-gray-600" />
            </div>
            <div className="grid text-left text-sm leading-tight overflow-hidden">
              <span className="truncate font-medium text-gray-900">
                {session?.user?.name ?? 'User'}
              </span>
              <span className="truncate text-xs text-gray-500">{session?.user?.email ?? ''}</span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="p-2 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 shrink-0"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
