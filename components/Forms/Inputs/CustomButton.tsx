import { Button } from '@/components/ui/button';

type CustomButtonProps = {
  name: string;
  loading: boolean;
  type: 'button' | 'submit' | 'reset';
  inputPropsCancel?: React.ComponentProps<typeof Button>;
  inputPropsSubmit?: React.ComponentProps<typeof Button>;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
  isSolo: boolean;
};

const CustomButton = (props: CustomButtonProps) => {
  return (
    <div>
      <div>
        {!props.loading && !props.isSolo && (
          <Button
            {...props.inputPropsCancel}
            disabled={props.loading}
            type={props.type}
            size={'sm'}
            variant={props.variant ? props.variant : 'outline'}
            className="rounded-sm"
          >
            {props.loading ? 'Loading...' : 'Cancel'}
          </Button>
        )}
        {!props.isSolo && (
          <Button
            {...props.inputPropsSubmit}
            disabled={props.loading}
            type={props.type}
            size={'sm'}
            variant={props.variant ? props.variant : 'default'}
            className="rounded-sm"
          >
            {props.loading ? 'Loading...' : props.name}
          </Button>
        )}
      </div>
      <div>
        {props.isSolo && (
          <Button
            {...props.inputPropsSubmit}
            disabled={props.loading}
            type={props.type}
            size={'sm'}
            variant={props.variant ? props.variant : 'default'}
            className="rounded-sm cursor-pointer"
          >
            {props.loading ? 'Loading...' : props.name}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomButton;
