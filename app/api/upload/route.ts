import { NextResponse } from 'next/server';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

// Configuration
const DO_REGION = process.env.NEXTAUTH_DO_REGION || 'sgp1'; 
const DO_BUCKET = process.env.NEXTAUTH_DO_BUCKET || 'purchase-system-files';
const DO_ENDPOINT = process.env.NEXTAUTH_DO_ENDPOINT || `https://${DO_REGION}.digitaloceanspaces.com`;

const s3 = new S3Client({
  region: DO_REGION,
  endpoint: DO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.NEXTAUTH_DO_ACCESSKEY!,
    secretAccessKey: process.env.NEXTAUTH_DO_SECRETKEY!,
  },
  forcePathStyle: false,
});

/**
 * Generates a clean, absolute URL for the file.
 */
function buildFileUrl(fileName: string): string {
  return `https://${DO_BUCKET}.${DO_REGION}.digitaloceanspaces.com/${fileName}`;
}

/**
 * Transforms "My File Name (Final)!.PDF" into "my-file-name-final.pdf"
 * This prevents 404s caused by special characters in URLs.
 */
function sanitizeFileName(name: string): string {
  const parts = name.split('.');
  const extension = parts.pop()?.toLowerCase() || '';
  const baseName = parts.join('.');

  const slug = baseName
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')     // Remove anything not alphanumeric or hyphen
    .replace(/-+/g, '-')            // Prevent double hyphens "--"
    .replace(/^-+|-+$/g, '');       // Trim hyphens from ends

  return `${slug}.${extension}`;
}

// ─────────────────────────────────────────────────────────────
// POST: Upload (or upsert if fileName is provided)
// ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const existingFileName = formData.get('fileName') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Clean the filename immediately
    let finalKey = '';
    if (existingFileName) {
      // If we are replacing an existing file, sanitize the existing name
      finalKey = sanitizeFileName(existingFileName);
    } else {
      // New file: Timestamp + Sanitized Original Name
      finalKey = `${Date.now()}-${sanitizeFileName(file.name)}`;
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: DO_BUCKET,
        Key: finalKey,
        Body: buffer,
        ContentType: file.type,
        ACL: 'public-read',
      }),
    );

    return NextResponse.json({ 
      url: buildFileUrl(finalKey),
      fileName: finalKey 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE: Remove a file by fileName
// ─────────────────────────────────────────────────────────────
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json({ error: 'fileName is required' }, { status: 400 });
    }

    // We use the key (fileName) directly as stored in S3
    await s3.send(
      new DeleteObjectCommand({
        Bucket: DO_BUCKET,
        Key: fileName,
      }),
    );

    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}