// app/(protected)/user/_form/ExportForm.tsx
/**
 * Model-specific Export Form for Users
 *
 * Thin wrapper that passes User-specific configuration to the generic ExportFormWrapper
 * Similar pattern to ImportForm
 */

import React from 'react'
import ExportFormWrapper from '@/app/_component/Form/ExportFormWrapper'
import { ColumnConfig } from '@/lib/types/export'

// User-specific column configuration
const EXPORT_COLUMNS: ColumnConfig[] = [
  // Basic Request Fields
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'isGlobal', label: 'Is Global' },
  { id: 'version', label: 'Version' },
  { id: 'isActive', label: 'Active' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
]

// Default columns to show on first load
const DEFAULT_USER_EXPORT_COLUMNS = [
  'id',
  'name',
  'description',
  'isGlobal',
  'version',
]

type ExportFormProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onExportComplete?: (success: boolean, message?: string) => void
}

const ExportForm = ({ open, setOpen, onExportComplete }: ExportFormProps) => {
  return (
    <ExportFormWrapper
      open={open}
      setOpen={setOpen}
      columns={EXPORT_COLUMNS}
      defaultSelectedColumns={DEFAULT_USER_EXPORT_COLUMNS}
      onExportComplete={onExportComplete}
      defaultFormat="csv"
    />
  )
}

export default ExportForm
