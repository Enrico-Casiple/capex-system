import React, { useState, useMemo } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FileText, Table2, CheckCheck } from 'lucide-react'
import { useListContext } from '@/app/_context/ListContext/ListProvider'
import { useQuery } from '@apollo/client/react'
import { ExportResponse, ExportFormat, ColumnConfig } from '@/lib/types/export'
import { downloadFile } from '@/lib/util/download'
import useToast from '@/app/_hooks/useToast'

type ExportFormWrapperProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  /** Column configuration for this model */
  columns: ColumnConfig[]
  /** Default selected columns */
  defaultSelectedColumns: string[]
  /** Optional callback when export completes */
  onExportComplete?: (success: boolean, message?: string) => void
  /** Optional default export format */
  defaultFormat?: ExportFormat
}

const ExportFormWrapper = ({
  setOpen,
  columns,
  defaultSelectedColumns,
  onExportComplete,
  defaultFormat = 'csv',
}: ExportFormWrapperProps) => {
  const { modelGQL, model, initialFilter, active, searchItems, searchFields, modelName } = useListContext()
  const [format, setFormat] = useState<ExportFormat>(defaultFormat)
  const [selectedColumns, setSelectedColumns] = useState<string[]>(defaultSelectedColumns)
  const [isExporting, setIsExporting] = useState(false)
  const toast = useToast()

  const availableColumns = useMemo(() => columns, [columns])

  const handleSelectAll = () => {
    setSelectedColumns(availableColumns.map(col => col.id))
  }

  const handleClearAll = () => {
    setSelectedColumns([availableColumns[0].id])
  }

  const toggleColumn = (columnId: string) => {
    setSelectedColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    )
  }

  const { refetch: refetchExportData } = useQuery(
    modelGQL[model].exportData,
    {
      variables: {
        input: {
          columns: selectedColumns,
          filter: initialFilter,
          isActive: active,
          search: searchItems,
          searchFields: searchFields,
        }
      },
      skip: true, // Don't run query on mount
    }
  )

  const handleExport = async () => {
    setIsExporting(true)
    let success = false
    let message = ''

    try {
      const refetchResult = await refetchExportData()

      if (!refetchResult?.data) {
        message = 'No data returned from export query'
        console.error(message)
        onExportComplete?.(false, message)
        return
      }

      // Build dynamic export key based on format
      const exportKey = `${modelName}ExportCsv`

      const exportResult = (refetchResult.data as Record<string, ExportResponse>)?.[exportKey]

      if (!exportResult) {
        message = `No export data found for key: ${exportKey}`
        console.error(message)
        onExportComplete?.(false, message)
        toast.error({
          message: 'Export Failed',
          description: 'Unexpected response format from server. Please try again.',
        })
        return
      }

      if (exportResult?.isSuccess === false) {
        message = exportResult?.message || 'Export failed'
        console.error(message)
        onExportComplete?.(false, message)
          toast.error({
            message: 'Export Failed',
            description: message,
          })
        return
      }

      // Handle CSV format
      if (format === 'csv') {
        const csvData = exportResult?.data?.csv
        const mimeType = exportResult?.data?.mimeType || 'text/csv'
        const fileName = exportResult?.data?.fileName || `export_${modelName.toLowerCase()}.csv`

        if (!csvData) {
          console.warn('No CSV data in response:', Object.keys(exportResult?.data || {}))
          onExportComplete?.(false, 'No CSV data in response')
          toast.error({
            message: 'Export Failed',
            description: 'No CSV data received from server. Please try again.',
          })
          return
        }

        success = downloadFile(csvData, mimeType, fileName, false)
      }
      // Handle XLSX format
      else if (format === 'xlsx') {
        const excelData = exportResult?.data?.excelBase64
        const mimeType =  exportResult?.data?.excelMimeType || 'application/vnd.ms-excel'
        const fileName = (exportResult?.data?.excelFileName || `export_${modelName.toLowerCase()}`).replace(/\.xls$/i, '.xls')

        if (!excelData) {
          console.warn('No Excel data in response:', Object.keys(exportResult?.data || {}))
          onExportComplete?.(false, 'No Excel data in response')
          toast.error({
            message: 'Export Failed',
            description: 'No Excel data received from server. Please try again.',
          })
          return
        }

        success = downloadFile(excelData, mimeType, fileName, true)
      }

      if (success) {
        message = exportResult?.message || `Successfully exported ${selectedColumns.length} columns`
        console.log(message)
        onExportComplete?.(true, message)
        toast.success({
          message: 'Export Successful',
          description: message,
        })
      }
    } catch (error) {
      message = error instanceof Error ? error.message : 'Export error'
      console.error('Export error:', error)
      onExportComplete?.(false, message)
      toast.error({
        message: 'Export Failed',
        description: message,
      })
    } finally {
      setIsExporting(false)
      setOpen(false)
    }
  }

  return (
    <div className="space-y-6 py-2">
      {/* Format Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <Label className="text-sm font-semibold text-foreground">Export Format</Label>
          <span className="text-xs text-muted-foreground ml-auto">Choose your file type</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {(['csv', 'xlsx'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer group ${
                format === fmt
                  ? 'border-primary bg-primary/5'
                  : 'border-input bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-md transition-all ${
                  format === fmt
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/10'
                }`}>
                  <Table2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{fmt.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">
                    {fmt === 'csv' ? 'Spreadsheet' : 'Excel Format'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Column Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-primary" />
            <Label className="text-sm font-semibold text-foreground">Select Columns</Label>
          </div>
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            {selectedColumns.length}/{availableColumns.length} selected
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="text-xs h-8"
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-xs h-8"
            disabled={selectedColumns.length === 1}
          >
            Clear
          </Button>
        </div>

        {/* Column List */}
        <div className="border border-input rounded-lg bg-card overflow-hidden shadow-sm">
          <div className="flex flex-wrap gap-2 p-3">
            {availableColumns.map((column) => (
              <div
                key={column.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors group border ${
                  column.isRelation
                    ? 'bg-blue-500/10 border-blue-200 hover:bg-blue-500/15 dark:border-blue-800'
                    : 'bg-muted/40 border-input/50 hover:bg-muted/60'
                }`}
              >
                <Checkbox
                  id={column.id}
                  checked={selectedColumns.includes(column.id)}
                  onCheckedChange={() => toggleColumn(column.id)}
                  disabled={selectedColumns.length === 1 && selectedColumns.includes(column.id)}
                  className="h-3.5 w-3.5"
                />
                <Label
                  htmlFor={column.id}
                  className="text-xs font-medium cursor-pointer whitespace-nowrap flex items-center gap-1"
                >
                  {column.label}
                  {column.isRelation && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold">
                      relation
                    </span>
                  )}
                </Label>
                {selectedColumns.includes(column.id) && (
                  <CheckCheck className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg">
          <FileText className="w-3.5 h-3.5 text-primary" />
          <span>
            {selectedColumns.length === availableColumns.length
              ? 'All columns will be exported'
              : `${selectedColumns.length} column${selectedColumns.length !== 1 ? 's' : ''} ready to export`}
            {selectedColumns.some(col => col.includes('.')) && (
              <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">
                • Including nested relations
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-input">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          className="flex-1"
          disabled={isExporting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleExport}
          className="flex-1"
          disabled={isExporting || selectedColumns.length === 0}
        >
          {isExporting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Exporting...
            </span>
          ) : (
            `Export as ${format.toUpperCase()}`
          )}
        </Button>
      </div>
    </div>
  )
}

export default ExportFormWrapper
