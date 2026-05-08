/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODEL_DISPLAY_NAMES } from "@/generated/model-names"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs"
import { getDatamodel } from "../pothos/pothos-prisma-types"

const prismaDataModel = getDatamodel()
const outputDir = "app/_config/model"
const force = process.argv.includes("--force") || process.argv.includes("-f")

mkdirSync(outputDir, { recursive: true })

const activeModels = Object.keys(prismaDataModel.datamodel.models)
const existingFiles = readdirSync(outputDir).filter((f) => f.endsWith(".config.ts"))

const toConfigName = (modelName: string) =>
  modelName.charAt(0).toLowerCase() + modelName.slice(1)

const defaultValueForField = (field: any) => {
  switch (field.type) {
    case "Boolean":
      return `false`
    case "String":
    case "DateTime":
    case "Bytes":
    case "Int":
    case "Float":
    case "Decimal":
    case "BigInt":
    case "Json":
    case "Enum":
    default:
      return `null`
  }
}

const shouldIncludeFieldInForm = (field: any) =>
  !["id", "createdAt", "updatedAt", "deletedAt"].includes(field.name)

export const getJSTypeFromPrisma = (prismaType: string): string => {
  const typeMap: Record<string, string> = {
    String: "string",
    Int: "number",
    Float: "number",
    Decimal: "number",
    Boolean: "boolean",
    DateTime: "date",
    Bytes: "bytes",
    BigInt: "bigint",
    Json: "object",
  }
  return typeMap[prismaType] || "string"
}

const transformValueForField = (field: any) => {
  const value = `row.${field.name}`
  const hasValue = `${value}`

  switch (field.type) {
    case "String":
    case "Enum":
      return `${hasValue} ? String(${value}) : null`
    case "Int":
    case "Float":
    case "Decimal":
      return `${hasValue} ? Number(${value}) : null`
    case "BigInt":
      return `${hasValue} ? BigInt(${value}) : null`
    case "Boolean":
      return `${value} != null ? Boolean(${value}) : null`
    case "DateTime":
      return `${hasValue} ? new Date(${value}) : null`
    case "Json":
      return `${hasValue} ? JSON.stringify(${value}) : null`
    case "Bytes":
      return `${hasValue} ? ${value} : null`
    default:
      return `${hasValue} ? ${value} : null`
  }
}

const modelConfigContent = (modelName: string) => {
  const configName = toConfigName(modelName)
  const model = prismaDataModel.datamodel.models[modelName] as any
  const fields = (model?.fields ?? []).filter(
    (field: any) => field.kind === "scalar" || field.kind === "enum",
  )

  const formFields = fields.filter(shouldIncludeFieldInForm)

  const previewColumnsCreate = formFields
    .map(
      (field: any) => `      {
        key: "${field.name}",
        label: "${field.name.charAt(0).toUpperCase() + field.name.slice(1)}",
        default: ${defaultValueForField(field)},
      }`,
    )
    .join(",\n")

  const previewColumnsUpdate = [
    fields.some((f: any) => f.name === "id")
      ? `      { key: "id", label: "ID", default: null }`
      : null,
    ...formFields.map(
      (field: any) => `      {
        key: "${field.name}",
        label: "${field.name.charAt(0).toUpperCase() + field.name.slice(1)}",
        default: ${defaultValueForField(field)},
      }`,
    ),
  ]
    .filter((item): item is string => item !== null)
    .join(",\n")

  const transformCreate = formFields
    .map(
      (field: any) =>
        `            ${field.name}: ${transformValueForField(field)},`,
    )
    .join("\n")

  const transformUpdate = [
    fields.some((f: any) => f.name === "id")
      ? `            id: row.id != null && row.id !== "" ? String(row.id) : null,`
      : null,
    ...formFields.map(
      (field: any) =>
        `            ${field.name}: ${transformValueForField(field)},`,
    ),
  ]
    .filter((item): item is string => item !== null)
    .join("\n")

  const exportColumns = [
    fields.some((f: any) => f.name === "id")
      ? `      { id: "id", label: "ID" }`
      : null,
    ...formFields.map(
      (field: any) =>
        `      { id: "${field.name}", label: "${field.name.charAt(0).toUpperCase() + field.name.slice(1)}" }`,
    ),
    fields.some((f: any) => f.name === "createdAt")
      ? `      { id: "createdAt", label: "Created At" }`
      : null,
    fields.some((f: any) => f.name === "updatedAt")
      ? `      { id: "updatedAt", label: "Updated At" }`
      : null,
  ]
    .filter((item): item is string => item !== null)
    .join(",\n")

  return `
import { ${modelName} } from "@/lib/generated/api/customHookAPI/graphql";
import {
  ListConfigItem,
  PreviewColumn,
  SearchableColumnDef,
} from "../shared";

type Model = ${modelName};
const ModelName = "${modelName}";
const ListModelName = "Manage ${MODEL_DISPLAY_NAMES[modelName as keyof typeof MODEL_DISPLAY_NAMES]} List";
const ListDescription = "Manage your ${MODEL_DISPLAY_NAMES[modelName as keyof typeof MODEL_DISPLAY_NAMES]} effectively with our comprehensive management system.";

const ExtraColumns: SearchableColumnDef<Model>[] = [
${fields
  .map(
    (field: any) => `  {
    id: "${field.name}",
    header: "${field.name.charAt(0).toUpperCase() + field.name.slice(1)}",
    accessorKey: "${field.name}",
    meta: { searchable: false, type: "${getJSTypeFromPrisma(field.type)}" },
  }`,
  )
  .join(",\n")}
];

const previewColumnsCreate: PreviewColumn<Model>[] = [
${previewColumnsCreate}
];

const previewColumnsUpdate: PreviewColumn<Model>[] = [
${previewColumnsUpdate}
];

const exportColumns = [
${exportColumns}
];

const defaultExportColumns = exportColumns.map((col) => col.id);

export const ${configName} = {
  modelName: ModelName,
  listName: ListModelName,
  description: ListDescription,
  extraColumns: ExtraColumns,
  initialColumnVisibility: {
    id: false,
    createdAt: false,
    updatedAt: false,
  },
  initialFilter: {},
  showActions: true,
  initialSearchField: [],

  transformRowCreate: async (row: Model) => {
    return {
${transformCreate}
    };
  },

  transformRowUpdate: async (row: Model) => {
    return {
${transformUpdate}
    };
  },

  previewColumnsCreate,
  previewColumnsUpdate,
  exportColumns,
  defaultExportColumns,
} satisfies ListConfigItem<Model>;
`.trim()
}

existingFiles.forEach((file) => {
  const modelName = file.replace(".config.ts", "")
  const activeFileNames = activeModels.map(toConfigName)

  if (!activeFileNames.includes(modelName)) {
    if (!force) {
      console.log(`Skipped deleting ${file} (use --force to remove)`)
      return
    }

    unlinkSync(`${outputDir}/${file}`)
    console.log(`Deleted ${file} (model removed)`)
  }
})

activeModels.forEach((modelName) => {
  const filePath = `${outputDir}/${toConfigName(modelName)}.config.ts`
  const content = modelConfigContent(modelName)
  const prev = existsSync(filePath) ? readFileSync(filePath, "utf8") : ""
  const existedBefore = existsSync(filePath)

  if (existedBefore && !force) {
    console.log(`Skipped ${modelName}.config.ts (existing file preserved; use --force to overwrite)`)
    return
  }

  if (!force && prev === content) {
    console.log(`Skipped ${modelName}.config.ts (no changes)`)
    return
  }

  writeFileSync(filePath, content)
  console.log(`${existedBefore ? "Updated" : "Generated"} ${modelName}.config.ts`)
})

console.log(`Done - processed ${activeModels.length} models`)