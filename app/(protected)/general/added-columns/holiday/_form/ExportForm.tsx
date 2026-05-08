import React from 'react';
import ExportFormWrapper from '@/app/_component/Form/ExportFormWrapper';
import { ColumnConfig } from '@/lib/types/export';

type ExportFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onExportComplete?: (success: boolean, message?: string) => void;
  exportColumns?: ColumnConfig[];
  defaultSelectedColumns?: string[];
};

const ExportForm = ({ open, setOpen, onExportComplete, exportColumns, defaultSelectedColumns }: ExportFormProps) => {
  return (
    <ExportFormWrapper
      open={open}
      setOpen={setOpen}
      columns={exportColumns || []}
      defaultSelectedColumns={defaultSelectedColumns || []}
      onExportComplete={onExportComplete}
      defaultFormat="csv"
    />
  );
};

export default ExportForm;
