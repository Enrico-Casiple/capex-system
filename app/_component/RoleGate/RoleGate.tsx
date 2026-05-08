'use client';

import useUserRolePermission from '@/app/_hooks/useUserRolePermission';
import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { Spinner } from '../Spinner';

type UnauthorizedStyle = 'default' | 'compact' | 'minimal' | 'card';

interface RoleGateProps {
  module: string | string[];
  // resource: string | string[];
  action: string | string[];
  children: ReactNode;
  fallback?: ReactNode;
  style?: UnauthorizedStyle;
  redirectTo?: string;
  redirectDelay?: number;
  disableRedirect?: boolean;
}

const RoleGate = ({
  module,
  // resource,
  action,
  children,
  fallback,
  style = 'default',
  redirectTo = '/home',
  redirectDelay = 5,
  disableRedirect = false,
}: RoleGateProps) => {
  const modules = Array.isArray(module) ? module : [module];
  // const resources = Array.isArray(resource) ? resource : [resource];
  const actions = Array.isArray(action) ? action : [action];

  const { can, loading } = useUserRolePermission();
  const hasPermission = can(modules, actions);

  const [countdown, setCountdown] = useState(redirectDelay);
  const isInitialized = useRef(false);

  // Only show loading on initial mount
  useEffect(() => {
    if (!loading && !isInitialized.current) {
      isInitialized.current = true;
    }
  }, [loading]);

  // Reset countdown when redirectDelay changes
  useEffect(() => {
    setCountdown(redirectDelay);
  }, [redirectDelay]);

  // Handle countdown and redirect
  useEffect(() => {
    const isReadAction = Array.isArray(action)
      ? action.includes('read')
      : action === 'read';

    if (loading || hasPermission || disableRedirect || fallback || !isReadAction) {
      return;
    }

    if (countdown === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => {
        const next = prev - 1;
        return next <= 0 ? 0 : next;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading, hasPermission, disableRedirect, fallback, countdown, redirectTo, action]);

  // Return null on initial loading only
  if (loading && !isInitialized.current) {
    return <Spinner />;
  }

  if (!hasPermission) {
    if (fallback) return <>{fallback}</>;

    const isReadAction = Array.isArray(action)
      ? action.includes('read')
      : action === 'read';

    if (!isReadAction) {
      return null;
    }

    // ...existing switch statement for styles...
    switch (style) {
      case 'compact':
        return (
          <div className="rounded-xl bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border border-red-200 p-6 shadow-sm h-[80vh] w-screen">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Access Denied</h3>
                <p className="text-sm text-gray-600 mb-2">
                  You do not have permission to access this resource.
                </p>
                {!disableRedirect && (
                  <p className="text-xs text-gray-500">
                    Redirecting in <span className="font-semibold text-red-600">{countdown}</span> seconds...
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="flex items-center justify-center h-[80vh] w-screen p-4">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Access Restricted</p>
                <p className="text-xs text-gray-500 mt-1">
                  You do not have permission to access this resource.
                </p>
                {!disableRedirect && (
                  <p className="text-xs text-gray-400 mt-2">
                    Redirecting in <span className="font-semibold text-red-600">{countdown}s</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-[80vh] w-full p-4">
            <div className="max-w-md w-full">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg border border-red-100 p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h3>
                <p className="text-gray-600 mb-6">
                  You do not have permission to access this resource.
                </p>
                {!disableRedirect && (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-20 h-20">
                        <svg className="transform -rotate-90 w-20 h-20">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={226}
                            strokeDashoffset={226 - (226 * countdown) / redirectDelay}
                            className="text-red-500 transition-all duration-1000 ease-linear"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-red-600">{countdown}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Redirecting to home page...</p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
    }
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default RoleGate;