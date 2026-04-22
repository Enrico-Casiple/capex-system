import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Post-process codegen output to remove Maybe<T> types
 * Converts: Maybe<string> → string | null
 * Converts: Maybe<Array<...>> → Array<...> | null
 */
function stripMaybeTypes(filePath: string) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace Maybe<T> with T | null
  content = content.replace(/Maybe<([^>]+)>/g, '$1 | null');

  // Clean up double null unions
  content = content.replace(/(\s\|\s*null)+/g, ' | null');

  // Remove unnecessary ? for union types with null
  content = content.replace(/(\w+)\?\s*:\s*(\w+\s*\|\s*null)/g, '$1: $2');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Stripped Maybe types from ${path.basename(filePath)}`);
}

// Run on generated file
const formInputPath = path.join(__dirname, '../generated/types/form-input.ts');
stripMaybeTypes(formInputPath);
