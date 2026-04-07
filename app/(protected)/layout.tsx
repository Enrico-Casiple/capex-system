'use client';

import AppSidebar from '../_component/SideBar/app-sidebar';
import React, { useState } from 'react';
import { LogOut, PanelLeft } from 'lucide-react';
import Breadcrumbs from '../_component/List/Breadcrumbs';
import { signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ProtectedAuthLayoutProps = {
  children: React.ReactNode;
};

const ProtectedAuthLayout = ({ children }: ProtectedAuthLayoutProps) => {
  const session = useSession();
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Column 1 - Sidebar */}
      <div
        style={{
          width: open ? '20rem' : '0',
          flexShrink: 0,
          overflow: 'hidden',
          transition: 'width 200ms ease-linear',
        }}
      >
        <AppSidebar width={open ? '20rem' : '0'} />
      </div>

      {/* Column 2 - Content */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Header bar */}
        <header className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-100 sticky top-0 z-10">
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <Breadcrumbs />

          {/* Push avatar to the right */}
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex aspect-square size-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold select-none hover:ring-2 hover:ring-indigo-300 transition-all outline-none">
                  {session.data?.user?.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase() ?? '?'}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm text-gray-900">
                      {session.data?.user?.name}
                    </span>
                    <span className="text-xs text-gray-500">{session.data?.user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default ProtectedAuthLayout;
