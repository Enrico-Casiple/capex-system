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
  { id: 'title', label: 'Request Title' },
  { id: 'description', label: 'Description' },
  { id: 'requestNumber', label: 'Request Number' },
  { id: 'requester.name', label: 'Requestor' },
  { id: 'company.name', label: 'Company' },
  { id: 'department.name', label: 'Department' },
  { id: 'responsibilityCenter.name', label: 'Responsibility Center' },
  { id: 'quotationUrl', label: 'Quotation URL' },
  { id: 'quotationAmount', label: 'Quotation Amount' },
  { id: 'approvedAt', label: 'Approved At' },
  { id: 'status.name', label: 'Status' },
  { id: 'isActive', label: 'Active' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'updatedAt', label: 'Updated At' },

  // CapitalRecoveryFactor Relation Fields
  { id: 'requestedCRF.name', label: 'CRF Name', isRelation: true },
  { id: 'requestedCRF.description', label: 'CRF Description', isRelation: true },
  { id: 'requestedCRF.crfReferenceNo', label: 'CRF Reference Number', isRelation: true },
  { id: 'requestedCRF.status.name', label: 'CRF Status', isRelation: true },
  { id: 'requestedCRF.company.name', label: 'CRF Company', isRelation: true },
  { id: 'requestedCRF.department.name', label: 'CRF Department', isRelation: true },
  { id: 'requestedCRF.category.name', label: 'CRF Category', isRelation: true },
  { id: 'requestedCRF.utilizedBudget', label: 'Utilized Budget', isRelation: true },
  { id: 'requestedCRF.approvedAmount', label: 'Approved Amount', isRelation: true },
  { id: 'requestedCRF.requestedAmount', label: 'Requested Amount', isRelation: true },
  { id: 'requestedCRF.newBalanceAmmount', label: 'New Balance Amount', isRelation: true },
  { id: 'requestedCRF.projectedBudget', label: 'Projected Budget', isRelation: true },
  { id: 'requestedCRF.remark', label: 'Remarks', isRelation: true },
  { id: 'requestedCRF.request.requestNumber', label: 'Linked Request Number', isRelation: true },
  { id: 'requestedCRF.budget.budgetRefNo', label: 'Budget Reference Number', isRelation: true },
  { id: 'requestedCRF.createdAt', label: 'CRF Created At', isRelation: true },
  { id: 'requestedCRF.updatedAt', label: 'CRF Updated At', isRelation: true },

  // WorkFlowTemplate Relations
  { id: 'workflowTemplate.name', label: 'Work Flow Template Name', isRelation: true },
  { id: 'workflowTemplate.description', label: 'Work Flow Template Description', isRelation: true },

  // Array RequestItem Relations
  { id: 'requestItems.id', label: 'Item ID', isRelation: true },
  { id: 'requestItems.request.requestNumber', label: 'Request Number', isRelation: true },
  { id: 'requestItems.status.name', label: 'Item Status', isRelation: true },
  { id: 'requestItems.description', label: 'Item Description', isRelation: true },
  { id: 'requestItems.quantity', label: 'Quantity', isRelation: true },
  { id: 'requestItems.unitOfMeasure', label: 'Unit of Measure', isRelation: true },
  { id: 'requestItems.isInclusiveVat', label: 'Inclusive of VAT', isRelation: true },
  { id: 'requestItems.unitPrice', label: 'Unit Price', isRelation: true },
  { id: 'requestItems.amountGrossOfVat', label: 'Gross Amount (with VAT)', isRelation: true },
  { id: 'requestItems.totalPrice', label: 'Total Price', isRelation: true },
  { id: 'requestItems.attachmentUrl', label: 'Attachment URL', isRelation: true },
  { id: 'requestItems.isActive', label: 'Active', isRelation: true },
  { id: 'requestItems.createdAt', label: 'Created At', isRelation: true },
  { id: 'requestItems.updatedAt', label: 'Updated At', isRelation: true },


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
      columns={EXPORT_COLUMNS}
      defaultSelectedColumns={DEFAULT_USER_EXPORT_COLUMNS}
      onExportComplete={onExportComplete}
      defaultFormat="csv"
    />
  )
}

export default ExportForm
