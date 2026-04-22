import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

type SpinnerProps = React.ComponentProps<'svg'> & { containerClassName?: string };

export const Spinner = ({ className, containerClassName, ...props }: SpinnerProps) => (
  <div
    className={cn('flex items-center justify-center w-full h-full', containerClassName)}
    style={{ minHeight: 80 }}
  >
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  </div>
);
