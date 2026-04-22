import { ActionType, PopupType } from '@/app/_component/Row/Action';
import RoleMethodForm from '@/lib/components/RoleMethodForm';

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Method = (props: MethodProps) => {
  return <RoleMethodForm {...props} />;
};

export default Method;
