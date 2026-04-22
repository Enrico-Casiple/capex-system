import React from 'react'

type ExportFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExportForm = (props: ExportFormProps) => {
  console.log('ExportForm props:', props);
  return (
    <div>ExportForm</div>
  )
}

export default ExportForm