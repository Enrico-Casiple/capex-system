import React from 'react';
import { ActionType, PopupType } from '../../../_component/Row/Action';

type MethodWrapperProps = {
  rowId?: string | null;
  actionType?: ActionType;
  popupType?: PopupType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MethodWrapper = (props: MethodWrapperProps) => {
  console.log('MethodWrapper props:', props);
  return (
    <div>MethodWrapper</div>
  )
}

export default MethodWrapper
