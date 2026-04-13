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
const USER_EXPORT_COLUMNS: ColumnConfig[] = [
  // Basic User Fields
  { id: 'id', label: 'ID' },
  { id: 'email', label: 'Email' },
  { id: 'name', label: 'Name' },
  { id: 'userName', label: 'Username' },
  { id: 'image', label: 'Image' },
  { id: 'isActive', label: 'Active' },
  { id: 'isTwoFactorAuthEnabled', label: '2FA Enabled' },
  { id: 'emailVerified', label: 'Email Verified' },
  { id: 'otpCode', label: 'OTP Code' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },
  // BasicInformation Relation Fields
  { id: 'basicInformations.id', label: 'Basic Info ID', isRelation: true },
  { id: 'basicInformations.firstName', label: 'First Name', isRelation: true },
  { id: 'basicInformations.lastName', label: 'Last Name', isRelation: true },
  { id: 'basicInformations.middleName', label: 'Middle Name', isRelation: true },
  { id: 'basicInformations.fullName', label: 'Full Name', isRelation: true },
  { id: 'basicInformations.gender', label: 'Gender', isRelation: true },
  { id: 'basicInformations.birthDate', label: 'Birth Date', isRelation: true },
  { id: 'basicInformations.address', label: 'Address', isRelation: true },
  { id: 'basicInformations.phoneNumber', label: 'Phone Number', isRelation: true },
  { id: 'basicInformations.city', label: 'City', isRelation: true },
  { id: 'basicInformations.province', label: 'Province', isRelation: true },
  { id: 'basicInformations.country', label: 'Country', isRelation: true },
  // Array UserRoles Relations
  { id: 'userRoles', label: 'User Roles', isRelation: true },
]

// Default columns to show on first load
const DEFAULT_USER_EXPORT_COLUMNS = [
  'id',
  'email',
  'name',
  'basicInformations.firstName',
  'basicInformations.lastName',
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
      columns={USER_EXPORT_COLUMNS}
      defaultSelectedColumns={DEFAULT_USER_EXPORT_COLUMNS}
      onExportComplete={onExportComplete}
      defaultFormat="csv"
    />
  )
}

export default ExportForm
