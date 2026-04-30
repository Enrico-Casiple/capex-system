import { mkdirSync, writeFileSync } from 'fs';
import { getDatamodel } from '../pothos/pothos-prisma-types';

const modelNames = Object.keys(getDatamodel().datamodel.models).sort();

// ✅ Helper function to convert camelCase to proper case
const toProperCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// ✅ Helper function to convert to lowercase
const toLowerCase = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// ✅ Helper function to convert to all lowercase (no camelCase)
const toLower = (str: string): string => {
  return str.toLowerCase();
};

// ✅ Helper function to convert to UPPER_SNAKE_CASE
const toUpperSnakeCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase()
    .replace(/^_/, '');
};

// ✅ Helper function to convert to lowercase with dashes
const toLowerKebabCase = (str: string): string => {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
};

// ✅ Helper function to convert to UPPERCASE
const toUpperCase = (str: string): string => {
  return str.toUpperCase();
};

// ✅ Generate enum with proper case and descriptions
const enumEntries = modelNames
  .map((name) => ({
    original: name,
    properCase: toProperCase(name),
    lowerCase: toLowerCase(name),
    toLower: toLower(name),
    uppercase: toUpperCase(name),
    upperSnakeCase: toUpperSnakeCase(name),
    lowerKebabCase: toLowerKebabCase(name),
  }))
  .sort((a, b) => a.original.localeCompare(b.original));

const enumContent = enumEntries
  .map(
    (entry) => `  /** ${entry.properCase} */
  ${entry.original} = "${entry.original}",`
  )
  .join('\n');

// ✅ Build enum with formatted cases
const modelCaseEnumContent = enumEntries
  .map(
    (entry) =>
      `  /** toProperCase: ${entry.properCase}, toLowerCase: ${entry.lowerCase}, toLower: ${entry.toLower}, toUpperCase: ${entry.uppercase}, lowerKebabCase: ${entry.lowerKebabCase} */
  ${entry.original}: {
    original: "${entry.original}",
    properCase: "${entry.properCase}",
    lowerCase: "${entry.lowerCase}",
    toLower: "${entry.toLower}",
    uppercase: "${entry.uppercase}",
    upperSnakeCase: "${entry.upperSnakeCase}",
    lowerKebabCase: "${entry.lowerKebabCase}",
  },`
  )
  .join('\n');

// ✅ Build content sections
const modelDisplayNamesContent = enumEntries
  .map((entry) => `  ${entry.original}: "${entry.properCase}"`)
  .join(',\n');

const modelLowerCaseNamesContent = enumEntries
  .map((entry) => `  ${entry.original}: "${entry.lowerCase}"`)
  .join(',\n');

const modelToLowerNamesContent = enumEntries
  .map((entry) => `  ${entry.original}: "${entry.toLower}"`)
  .join(',\n');

const modelUpperCaseNamesContent = enumEntries
  .map((entry) => `  ${entry.original}: "${entry.uppercase}"`)
  .join(',\n');

const modelUpperSnakeCaseNamesContent = enumEntries
  .map((entry) => `  ${entry.original}: "${entry.upperSnakeCase}"`)
  .join(',\n');

const modelLowerKebabCaseNamesContent = enumEntries
  .map((entry) => `  ${entry.original}: "${entry.lowerKebabCase}"`)
  .join(',\n');

const modelCaseMapContent = enumEntries
  .map(
    (entry) =>
      `  ${entry.original}: { original: "${entry.original}", properCase: "${entry.properCase}", lowerCase: "${entry.lowerCase}", toLower: "${entry.toLower}", uppercase: "${entry.uppercase}", upperSnakeCase: "${entry.upperSnakeCase}", lowerKebabCase: "${entry.lowerKebabCase}" }`
  )
  .join(',\n');

const modelCaseArrayContent = JSON.stringify(enumEntries, null, 2);

const content = `/* auto-generated */
export const MODEL_NAMES = ${JSON.stringify(modelNames, null, 2)} as const;

export type ModelName = (typeof MODEL_NAMES)[number];

export const MODEL_NAME_ENUM: Record<ModelName, ModelName> = Object.freeze(
  Object.fromEntries(MODEL_NAMES.map((name) => [name, name])) as Record<ModelName, ModelName>
);

/**
 * Model name enum with proper casing
 * @example
 * MODEL_ENUM.WorkFlowTemplate // "WorkFlowTemplate"
 * toProperCase(MODEL_ENUM.WorkFlowTemplate) // "Work Flow Template"
 */
export enum MODEL_ENUM {
${enumContent}
}

/**
 * Model case transformations
 */
export interface ModelCaseTransforms {
  original: ModelName;
  properCase: string;
  lowerCase: string;
  toLower: string;
  uppercase: string;
  upperSnakeCase: string;
  lowerKebabCase: string;
}

/**
 * Model case enum - contains all case formats
 * @example
 * MODEL_CASE_ENUM.AuditLog.properCase // "Audit Log"
 * MODEL_CASE_ENUM.AuditLog.lowerCase // "auditLog"
 * MODEL_CASE_ENUM.AuditLog.toLower // "auditlog"
 * MODEL_CASE_ENUM.AuditLog.uppercase // "AUDITLOG"
 * MODEL_CASE_ENUM.AuditLog.upperSnakeCase // "AUDIT_LOG"
 * MODEL_CASE_ENUM.AuditLog.lowerKebabCase // "audit-log"
 */
export const MODEL_CASE_ENUM = {
${modelCaseEnumContent}
} as const;

/**
 * Type for MODEL_CASE_ENUM
 */
export type ModelCaseEnum = typeof MODEL_CASE_ENUM;
export type ModelCaseEnumKey = keyof ModelCaseEnum;

/**
 * Convert model name to proper case for display
 * @example
 * toProperCase("WorkFlowTemplate") // "Work Flow Template"
 * toProperCase("BudgetLedger") // "Budget Ledger"
 */
export const toProperCase = (modelName: ModelName): string => {
  return modelName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/\\b\\w/g, (char) => char.toUpperCase());
};

/**
 * Convert model name to lowercase (camelCase)
 * @example
 * toLowerCase("WorkFlowTemplate") // "workFlowTemplate"
 * toLowerCase("BudgetLedger") // "budgetLedger"
 */
export const toLowerCase = (modelName: ModelName): string => {
  return modelName.charAt(0).toLowerCase() + modelName.slice(1);
};

/**
 * Convert model name to all lowercase (no camelCase)
 * @example
 * toLower("WorkFlowTemplate") // "workflowtemplate"
 * toLower("BudgetLedger") // "budgetledger"
 */
export const toLower = (modelName: ModelName): string => {
  return modelName.toLowerCase();
};

/**
 * Convert model name to UPPERCASE
 * @example
 * toUpperCase("WorkFlowTemplate") // "WORKFLOWTEMPLATE"
 * toUpperCase("BudgetLedger") // "BUDGETLEDGER"
 */
export const toUpperCase = (modelName: ModelName): string => {
  return modelName.toUpperCase();
};

/**
 * Convert model name to UPPER_SNAKE_CASE
 * @example
 * toUpperSnakeCase("WorkFlowTemplate") // "WORK_FLOW_TEMPLATE"
 * toUpperSnakeCase("BudgetLedger") // "BUDGET_LEDGER"
 */
export const toUpperSnakeCase = (modelName: ModelName): string => {
  return modelName
    .replace(/([A-Z])/g, '_$1')
    .toUpperCase()
    .replace(/^_/, '');
};

/**
 * Convert model name to lowercase kebab-case
 * @example
 * toLowerKebabCase("WorkFlowTemplate") // "work-flow-template"
 * toLowerKebabCase("BudgetLedger") // "budget-ledger"
 */
export const toLowerKebabCase = (modelName: ModelName): string => {
  return modelName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
};

/**
 * Get all case transformations for a model name
 * @example
 * getModelCases("WorkFlowTemplate") 
 * // { original: "WorkFlowTemplate", properCase: "Work Flow Template", lowerCase: "workFlowTemplate", toLower: "workflowtemplate", uppercase: "WORKFLOWTEMPLATE", upperSnakeCase: "WORK_FLOW_TEMPLATE", lowerKebabCase: "work-flow-template" }
 */
export const getModelCases = (modelName: ModelName): ModelCaseTransforms => {
  return {
    original: modelName,
    properCase: toProperCase(modelName),
    lowerCase: toLowerCase(modelName),
    toLower: toLower(modelName),
    uppercase: toUpperCase(modelName),
    upperSnakeCase: toUpperSnakeCase(modelName),
    lowerKebabCase: toLowerKebabCase(modelName),
  };
};

/**
 * Model display names mapping (Proper Case)
 */
export const MODEL_DISPLAY_NAMES: Record<ModelName, string> = Object.freeze({
${modelDisplayNamesContent}
});

/**
 * Model lowercase names mapping (camelCase)
 */
export const MODEL_LOWERCASE_NAMES: Record<ModelName, string> = Object.freeze({
${modelLowerCaseNamesContent}
});

/**
 * Model all lowercase names mapping
 */
export const MODEL_TO_LOWER_NAMES: Record<ModelName, string> = Object.freeze({
${modelToLowerNamesContent}
});

/**
 * Model uppercase names mapping
 */
export const MODEL_UPPERCASE_NAMES: Record<ModelName, string> = Object.freeze({
${modelUpperCaseNamesContent}
});

/**
 * Model uppercase snake case names mapping
 */
export const MODEL_UPPERCASE_SNAKE_NAMES: Record<ModelName, string> = Object.freeze({
${modelUpperSnakeCaseNamesContent}
});

/**
 * Model lowercase kebab case names mapping
 */
export const MODEL_LOWERCASE_KEBAB_NAMES: Record<ModelName, string> = Object.freeze({
${modelLowerKebabCaseNamesContent}
});

/**
 * All model case transformations
 */
export const MODEL_CASE_MAP: Record<ModelName, ModelCaseTransforms> = Object.freeze({
${modelCaseMapContent}
});

/**
 * Array of all model case transformations
 * @example
 * MODEL_CASE_ARRAY[0] // { original: "AuditLog", properCase: "Audit Log", lowerCase: "auditLog", toLower: "auditlog", uppercase: "AUDITLOG", upperSnakeCase: "AUDIT_LOG", lowerKebabCase: "audit-log" }
 */
export const MODEL_CASE_ARRAY: ModelCaseTransforms[] = ${modelCaseArrayContent};
`;

mkdirSync('generated', { recursive: true });
writeFileSync('generated/model-names.ts', content);

console.log('✅ Generated generated/model-names.ts');