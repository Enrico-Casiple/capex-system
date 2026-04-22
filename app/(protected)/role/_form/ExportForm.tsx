// app/(protected)/role/_form/ExportForm.tsx
/**
 * Model-specific Export Form for Roles
 * 
 * Thin wrapper that passes Role-specific configuration to the generic ExportFormWrapper
 * Similar pattern to ImportForm
 */

import React from 'react'
import ExportFormWrapper from '@/app/_component/Form/ExportFormWrapper'
import { ColumnConfig } from '@/lib/types/export'

// Role-specific column configuration
const ROLE_EXPORT_COLUMNS: ColumnConfig[] = [
  // Basic Role Fields
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'roleType', label: 'Role Type' },
  { id: 'isDefault', label: 'Is Default' },
  { id: 'isActive', label: 'Active' },
  { id: 'parentRoleId', label: 'Parent Role ID' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
  // Relations
  { id: 'rolePermissions.permission.id', label: 'Role Permissions', isRelation: true },
  { id: 'rolePermissions.permission.name', label: 'Role Permissions Name', isRelation: true },
   { id: 'rolePermissions.permission.action', label: 'Role Permissions Action', isRelation: true },
]

// Default columns to show on first load
const DEFAULT_ROLE_EXPORT_COLUMNS = [
  'id',
  'name',
  'description',
  'roleType',
  'isDefault',
  'isActive',
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
      columns={ROLE_EXPORT_COLUMNS}
      defaultSelectedColumns={DEFAULT_ROLE_EXPORT_COLUMNS}
      onExportComplete={onExportComplete}
      defaultFormat="csv"
    />
  )
}

export default ExportForm
