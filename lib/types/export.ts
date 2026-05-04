// Type for column configuration supporting nested fields
export type ColumnConfig = {
  id: string;
  label: string;
  isRelation?: boolean;
}

// Type for export response structure
export type ExportResponse = {
  isSuccess: boolean;
  message?: string;
  data?: {
    csv?: string;
    excelBase64?: string;
    mimeType?: string;
    excelMimeType?: string;
    fileName?: string;
    excelFileName?: string;
    rowCount?: number;
    fileUrl?: string | null;
    fileKey?: string | null;
    wasTruncated?: boolean;
  };
}

export type ExportFormat = 'csv' | 'xlsx'
