import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs"
import { getDatamodel } from "../pothos/pothos-prisma-types"

const prismaDataModel = getDatamodel()
const outputFile = "app/_config/index.ts"
const force = process.argv.includes("--force") || process.argv.includes("--force") || process.argv.includes("-f")

const toCamel = (modelName: string) =>
  modelName.charAt(0).toLowerCase() + modelName.slice(1)

const configDir = "app/_config/model"
const existingConfigs = readdirSync(configDir)
  .filter((f) => f.endsWith(".config.ts"))
  .map((f) => f.replace(".config.ts", ""))

const activeModels = Object.keys(prismaDataModel.datamodel.models)

// Only include models that have a config file
const models = activeModels.filter((m) => existingConfigs.includes(toCamel(m)))

const imports = models
  .map((m) => `import { ${toCamel(m)} } from './model/${toCamel(m)}.config';`)
  .join("\n")

const graphqlImports = models.map((m) => m).join(", ")

const listConfigMapEntries = models
  .map((m) => `  ${toCamel(m)}: ListConfigItem<${m}>;`)
  .join("\n")

const listConfigEntries = models
  .map((m) => `  ${toCamel(m)}: ${toCamel(m)},`)
  .join("\n")

const tableConfigExports = models
  .map(
    (m) =>
      `export const ${toCamel(m)}TableConfig = createTableConfig<${m}>(listConfig.${toCamel(m)});`,
  )
  .join("\n")

const content = `import { ${graphqlImports} } from '@/lib/generated/api/customHookAPI/graphql';
import { createTableConfig, ListConfigItem } from './shared';
${imports}

type ListConfigMap = {
${listConfigMapEntries}
};

export const listConfig = {
${listConfigEntries}
} satisfies ListConfigMap;

${tableConfigExports}
`

const prev = existsSync(outputFile) ? readFileSync(outputFile, "utf8") : ""

if (!force && prev === content) {
  console.log("Skipped app/_config/index.ts (no changes)")
  process.exit(0)
}

writeFileSync(outputFile, content)
console.log(`${prev ? "Updated" : "Generated"} app/_config/index.ts (${models.length} models)`)
