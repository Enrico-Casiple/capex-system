import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type CardWrapperProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  isHaveBorder: boolean;
};

const CardWrapper = ({ title, description, children, isHaveBorder = true }: CardWrapperProps) => {
  return (
    <Card className={cn('rounded-sm', !isHaveBorder && 'ring-0 shadow-none border-none')}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {
        children && <CardContent>{children}</CardContent>
      }
    </Card>
  );
};

export default CardWrapper;
