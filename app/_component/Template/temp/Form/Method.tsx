import { ActionType, PopupType } from '@/app/_component/Row/Action';

type MethodProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Method = (props: MethodProps) => {
  return (
    <div>
      RowId: {props.rowId} - ActionType: {props.actionType} - PopupType: {props.popupType}
    </div>
  )
}

export default Method