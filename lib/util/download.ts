/**
 * Download file utility function
 * Handles both base64 encoded files (Excel) and plain text files (CSV)
 */
export const downloadFile = (
  data: string | null,
  mimeType: string | null,
  fileName: string | null,
  isBase64 = false
): boolean => {
  if (!data) {
    console.error('Missing export data', { data, mimeType, fileName })
    return false
  }
  if (!fileName) {
    console.error('Missing file name', { data, mimeType, fileName })
    return false
  }
  if (!mimeType) {
    console.error('Missing MIME type', { data, mimeType, fileName })
    return false
  }

  try {
    let blob: Blob

    if (isBase64) {
      // For base64 (Excel files)
      const bytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0))
      blob = new Blob([bytes], { type: mimeType })
    } else {
      // For plain text (CSV files)
      blob = new Blob([data], { type: mimeType })
    }

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return true
  } catch (error) {
    console.error('Error downloading file:', error)
    return false
  }
}
