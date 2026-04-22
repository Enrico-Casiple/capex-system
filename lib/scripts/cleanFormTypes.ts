import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'lib/generated/types/form-input.ts');

let content = fs.readFileSync(filePath, 'utf-8');

// Replace Scalars references with simple types (do this first)
content = content.replace(/Scalars\['String'\]\['output'\]/g, 'string');
content = content.replace(/Scalars\['String'\]\['input'\]/g, 'string');
content = content.replace(/Scalars\['DateTime'\]\['output'\]/g, 'string');
content = content.replace(/Scalars\['DateTime'\]\['input'\]/g, 'string');
content = content.replace(/Scalars\['Int'\]\['output'\]/g, 'number');
content = content.replace(/Scalars\['Int'\]\['input'\]/g, 'number');
content = content.replace(/Scalars\['Boolean'\]\['output'\]/g, 'boolean');
content = content.replace(/Scalars\['Boolean'\]\['input'\]/g, 'boolean');
content = content.replace(/Scalars\['Float'\]\['output'\]/g, 'number');
content = content.replace(/Scalars\['Float'\]\['input'\]/g, 'number');
content = content.replace(/Scalars\['ID'\]\['output'\]/g, 'string');
content = content.replace(/Scalars\['ID'\]\['input'\]/g, 'string');
content = content.replace(/Scalars\['Json'\]\['output'\]/g, 'Record<string, unknown>');
content = content.replace(/Scalars\['Json'\]\['input'\]/g, 'Record<string, unknown>');

// Replace Array<T> with T[]
content = content.replace(/Array<([^>]+)>/g, '$1[]');

// Remove Maybe and InputMaybe wrappers with nested content (handle multiple levels)
let prevContent = '';
let iterations = 0;
while (prevContent !== content && iterations < 10) {
  prevContent = content;
  // Match Maybe<anything> where anything doesn't have unmatched brackets
  content = content.replace(/Maybe<([^<>]+(?:<[^<>]*>)*[^<>]*)>/g, '$1');
  content = content.replace(/InputMaybe<([^<>]+(?:<[^<>]*>)*[^<>]*)>/g, '$1');
  iterations++;
}

// Remove the Scalars type definition
content = content.replace(
  /\/\*\* All built-in and custom scalars.*?\n\};[\s\n]*/s,
  ''
);

// Clean up leftover type definitions that got corrupted
content = content.replace(/^export type (Maybe|InputMaybe)<T>.*?;$/gm, '');
content = content.replace(/^export type MakeMaybe<T, K extends keyof T>.*?;$/s, '');

// Clean up leftover Input prefixes (from InputMaybe<T> that became Input + T)
content = content.replace(/:\s*Input(string|number|boolean|Record)/g, ': $1');
content = content.replace(/(Input)([A-Z][a-zA-Z0-9]*)/g, '$2');

// Clean up multiple blank lines
content = content.replace(/\n\n\n+/g, '\n\n');

// Remove corrupted utility type definitions at the top
content = content.replace(/export type T = T \| null;[\s\n]*/g, '');
content = content.replace(/export type T = T;[\s\n]*/g, '');
content = content.replace(/export type MakeT, K extends keyof T = .*?;[\s\n]*/g, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ Cleaned form types - converted to pure TypeScript');
