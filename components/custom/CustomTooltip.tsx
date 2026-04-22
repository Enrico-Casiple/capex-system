// CustomTooltip.tsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CustomTooltipProps {
  children: React.ReactNode;
  actionText: string;
}

const CustomTooltip = ({ children, actionText }: CustomTooltipProps) => {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="bg-background text-foreground border border-border rounded-md p-2">
        <p className="text-xs">{actionText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
