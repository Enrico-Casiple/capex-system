import React from 'react'
import { toast } from 'sonner';

type ToastProps = {
  message: string;
  description?: string;
  data?: unknown;
}

const sharedStyle = {
  '--border-radius': 'calc(var(--radius) + 4px)',
} as React.CSSProperties;

const sharedClassNames = {
  content: 'flex flex-col gap-2',
  title: 'font-medium text-sm',
  description: 'text-xs text-muted-foreground',
};


const useToast = () => {
  const success = ({ message, description, data }: ToastProps) =>
    toast.success(message, {
        description: (
        <div className="flex flex-col gap-2">
            {description && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400">{description}</span>
            )}
            {data !== undefined && (
            <pre className="w-full overflow-x-auto rounded-md bg-emerald-950/60 p-3 text-emerald-300 text-xs">
                <code>{typeof data === 'string' ? data : JSON.stringify(data, null, 2)}</code>
            </pre>
            )}
        </div>
        ),
        position: 'top-right',
        classNames: sharedClassNames,
        style: sharedStyle,
    });
  const error = ({ message, description, data }: ToastProps) =>
    toast.error(message, {
        description: (
        <div className="flex flex-col gap-2">
            {description && (
            <span className="text-xs text-red-600 dark:text-red-400">{description}</span>
            )}
            {data !== undefined && (
            <pre className="w-full overflow-x-auto rounded-md bg-red-950/60 p-3 text-red-300 text-xs">
                <code>{typeof data === 'string' ? data : JSON.stringify(data, null, 2)}</code>
            </pre>
            )}
        </div>
        ),
        position: 'top-right',
        classNames: sharedClassNames,
        style: sharedStyle,
    });

  return {success, error};
}

export default useToast