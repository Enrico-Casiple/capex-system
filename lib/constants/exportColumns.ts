import { ColumnConfig } from '@/lib/types/export'

export const COLUMN_CONFIGS: Record<string, ColumnConfig[]> = {
  User: [
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
    // Array Relations
    { id: 'actions', label: 'Actions', isRelation: true },
    { id: 'auditLogs', label: 'Audit Logs', isRelation: true },
    { id: 'userRoles', label: 'User Roles', isRelation: true },
    { id: 'userAssignedBy', label: 'Assigned By', isRelation: true },
  ],
  // Add more models here
  Role: [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'updatedAt', label: 'Updated At' },
  ],
}

export const getColumnsForModel = (modelName: string): ColumnConfig[] => {
  return COLUMN_CONFIGS[modelName] || []
}

export const DEFAULT_SELECTED_COLUMNS: Record<string, string[]> = {
  User: ['id', 'email', 'name', 'basicInformations.firstName', 'basicInformations.lastName'],
  Role: ['id', 'name', 'description'],
}

export const getDefaultColumns = (modelName: string): string[] => {
  return DEFAULT_SELECTED_COLUMNS[modelName] || []
}
