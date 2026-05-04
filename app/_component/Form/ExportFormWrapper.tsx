import React, { useState, useMemo } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FileText, Table2, CheckCheck } from 'lucide-react'
import { useListContext } from '@/app/_context/ListContext/ListProvider'
import { useLazyQuery } from '@apollo/client/react'
import { ExportResponse, ExportFormat, ColumnConfig } from '@/lib/types/export'
import { downloadFile } from '@/lib/util/download'
import useToast from '@/app/_hooks/useToast'
import { ScrollArea } from '@/components/ui/scroll-area'

type ExportFormWrapperProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  columns: ColumnConfig[]
  defaultSelectedColumns: string[]
  onExportComplete?: (success: boolean, message?: string) => void
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
  const [uploadToSpaces, setUploadToSpaces] = useState(true)
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

  // ✅ FIXED: Removed onCompleted/onError from useLazyQuery options
  const [executeExport] = useLazyQuery(
    modelGQL[model].exportData
  )

  const handleExport = async () => {
    setIsExporting(true)
    let success = false
    let message = ''

    try {
      // ✅ Ensure parent fields are included when nested fields are selected
      const columnsWithParents = new Set(selectedColumns)
      const addedParents: string[] = []

      selectedColumns.forEach(col => {
        if (col.includes('.')) {
          // Extract parent field (e.g., "requestedCRF" from "requestedCRF.request.requestNumber")
          const parentField = col.split('.')[0]
          if (!columnsWithParents.has(parentField)) {
            columnsWithParents.add(parentField)
            addedParents.push(parentField)
          }
        }
      })

      const finalColumns = Array.from(columnsWithParents)

      // ✅ Build input with parent fields included (uploadToSpaces removed - not part of GraphQL schema)
      const exportInput = {
        columns: finalColumns,
        filter: initialFilter,
        isActive: active,
        search: searchItems,
        searchFields: searchFields,
      }

      console.log('📤 Export Input:', {
        requestedColumns: selectedColumns,
        columnsCount: finalColumns.length,
        finalColumns: finalColumns,
        addedParents: addedParents,
        filter: exportInput.filter,
      })

      // ✅ Execute with current variables
      const refetchResult = await executeExport({
        variables: {
          input: exportInput,
        },
      })

      if (!refetchResult?.data) {
        message = 'No data returned from export query'
        console.error(message)
        onExportComplete?.(false, message)
        toast.error({
          message: 'Export Failed',
          description: message,
        })
        return
      }

      // Build dynamic export key based on model name
      const exportKey = `${modelName}ExportCsv`
      const exportResult = (refetchResult.data as Record<string, ExportResponse>)?.[exportKey]

      if (!exportResult) {
        message = `No export data found for key: ${exportKey}`
        console.error('❌ Export result not found. Available keys:', Object.keys(refetchResult.data))
        onExportComplete?.(false, message)
        toast.error({
          message: 'Export Failed',
          description: 'Unexpected response format from server. Please try again.',
        })
        return
      }

      if (exportResult?.isSuccess === false) {
        message = exportResult?.message || 'Export failed on server'
        console.error('❌ Server export failed:', exportResult)
        onExportComplete?.(false, message)
        toast.error({
          message: 'Export Failed',
          description: message,
        })
        return
      }

      // ✅ Log export stats (with optional chaining for stats)
      console.log('📊 Export Stats:', {
        rowCount: exportResult?.data?.rowCount,
        requestedColumnCount: selectedColumns.length,
        finalColumnCount: finalColumns.length,
        stats: (exportResult?.data as Record<string, unknown>)?.stats,
      })

      const fileUrl = exportResult?.data?.fileUrl
      const fileName = exportResult?.data?.fileName || `export_${modelName.toLowerCase()}.csv`

      // If the server uploaded the file to Spaces, just open/download the link
      if (fileUrl) {
        window.open(fileUrl, '_blank', 'noopener,noreferrer')
        success = true
        message = `✅ Export ready: ${exportResult?.data?.rowCount || 0} rows uploaded to storage`
        console.log(message, { fileUrl, fileName })
      }

      // Handle CSV format
      else if (format === 'csv') {
        const csvData = exportResult?.data?.csv
        const mimeType = exportResult?.data?.mimeType || 'text/csv'

        if (!csvData) {
          console.warn('❌ No CSV data in response:', Object.keys(exportResult?.data || {}))
          onExportComplete?.(false, 'No CSV data in response')
          toast.error({
            message: 'Export Failed',
            description: 'No CSV data received from server.',
          })
          return
        }

        success = downloadFile(csvData, mimeType, fileName, false)
      }
      // Handle XLSX format
      else if (format === 'xlsx') {
        const excelData = exportResult?.data?.excelBase64
        const mimeType = exportResult?.data?.excelMimeType || 'application/vnd.ms-excel'
        const xlsxFileName = (exportResult?.data?.excelFileName || `export_${modelName.toLowerCase()}`).replace(/\.xls$/i, '.xlsx')

        if (!excelData) {
          console.warn('❌ No Excel data in response:', Object.keys(exportResult?.data || {}))
          onExportComplete?.(false, 'No Excel data in response')
          toast.error({
            message: 'Export Failed',
            description: 'No Excel data received from server.',
          })
          return
        }

        success = downloadFile(excelData, mimeType, xlsxFileName, true)
      }

      if (success) {
        message = `✅ Successfully exported ${exportResult?.data?.rowCount || 0} rows with ${selectedColumns.length} columns`
        console.log(message)
        onExportComplete?.(true, message)
        toast.success({
          message: 'Export Successful',
          description: message,
        })
      }
    } catch (error) {
      const apolloError = error instanceof Error && 'graphQLErrors' in error ? (error as Error & { graphQLErrors?: unknown[] }) : null
      message = apolloError?.message || (error instanceof Error ? error.message : 'Export error')
      console.error('❌ Export error:', error)
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

        <div className="flex items-center justify-between gap-3 rounded-lg border border-input bg-muted/30 px-3 py-2">
          <div className="min-w-0">
            <Label className="text-sm font-medium text-foreground">Upload to storage</Label>
            <p className="text-xs text-muted-foreground truncate">
              Save the export to DigitalOcean Spaces and open a link
            </p>
          </div>
          <Checkbox
            checked={uploadToSpaces}
            onCheckedChange={(checked) => setUploadToSpaces(Boolean(checked))}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(['csv', 'xlsx'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer group ${format === fmt
                ? 'border-primary bg-primary/5'
                : 'border-input bg-card hover:border-primary/50'
                }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-md transition-all ${format === fmt
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

        {/* Column List - Desktop Grid */}
        <div className="hidden md:block border border-input rounded-lg bg-card overflow-hidden shadow-sm">
          <ScrollArea className="h-64 w-full">
            <div className="flex flex-wrap gap-2 p-3">
              {availableColumns.map((column) => (
                <div
                  key={column.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all group border ${column.isRelation
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
          </ScrollArea>
        </div>

        {/* Column List - Mobile Stack */}
        <div className="md:hidden border border-input rounded-lg bg-card overflow-hidden shadow-sm">
          <ScrollArea className="h-80 w-full">
            <div className="space-y-2 p-3">
              {availableColumns.map((column) => (
                <div
                  key={column.id}
                  className={`flex items-center justify-between gap-2 px-3 py-3 rounded-md transition-all group border ${column.isRelation
                    ? 'bg-blue-500/10 border-blue-200 hover:bg-blue-500/15 dark:border-blue-800'
                    : 'bg-muted/40 border-input/50 hover:bg-muted/60'
                    }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Checkbox
                      id={column.id}
                      checked={selectedColumns.includes(column.id)}
                      onCheckedChange={() => toggleColumn(column.id)}
                      disabled={selectedColumns.length === 1 && selectedColumns.includes(column.id)}
                      className="h-4 w-4 shrink-0"
                    />
                    <Label
                      htmlFor={column.id}
                      className="text-sm font-medium cursor-pointer flex-1 min-w-0 flex items-center gap-2"
                    >
                      <span className="truncate">{column.label}</span>
                      {column.isRelation && (
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold shrink-0">
                          rel
                        </span>
                      )}
                    </Label>
                  </div>
                  {selectedColumns.includes(column.id) && (
                    <CheckCheck className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Info Text */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg">
          <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="line-clamp-2">
            {selectedColumns.length === availableColumns.length
              ? 'All columns will be exported'
              : `${selectedColumns.length} column${selectedColumns.length !== 1 ? 's' : ''} ready to export`}
            {selectedColumns.some(col => col.includes('.')) && (
              <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium block">
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
