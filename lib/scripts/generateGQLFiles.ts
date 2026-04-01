// lib/scripts/generateGQLFiles.ts
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { print } from 'graphql';
import { generateFragment } from '../api/fragments.ts';
import { getDatamodel } from '../pothos/pothos-prisma-types';

const prismaDataModel = getDatamodel();
const outputDir = 'lib/api/gql';
mkdirSync(outputDir, { recursive: true });
const force = process.argv.includes('--force');

const activeModels = Object.keys(prismaDataModel.datamodel.models);

// ─── Cleanup deleted models ─────────────────────────────
const existingFiles = readdirSync(outputDir).filter((f) => f.endsWith('.gql.ts'));

existingFiles.forEach((file) => {
  const modelName = file.replace('.gql.ts', '');
  if (!activeModels.includes(modelName)) {
    unlinkSync(`${outputDir}/${file}`);
    console.log(`🗑️  Deleted ${file} (model no longer exists in Prisma)`);
  }
});

// ─── Generate active models ─────────────────────────────
activeModels.forEach((modelName) => {
  const { fragment, fragmentName } = generateFragment(modelName);
  const fragmentString = print(fragment);

  const content = `
import { gql } from '@apollo/client';

export const ${fragmentName} = gql\`
${fragmentString}
\`;

export const ${modelName}FindAllWithCursor = gql\`
  query ${modelName}FindAllWithCursor($cursorInput: ${modelName}CursorPaginationInput!) {
    ${modelName}FindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}FindAll = gql\`
  query ${modelName}FindAll($paginationInput: ${modelName}PageInput!) {
    ${modelName}FindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
      allCount
      active
      inActive
      pageinfo {
        hasNextPage
        hasPreviousPage
        pageSize
        currentPage
        totalPages
        totalCount
      }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}Count = gql\`
  query ${modelName}Count($input: ${modelName}CountInput!) {
    ${modelName}Count(input: $input) {
      isSuccess
      message
      code
      data
    }
  }
\`;

export const ${modelName}FindUnique = gql\`
  query ${modelName}FindUnique($id: String!) {
    ${modelName}FindUnique(id: $id) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}FindBy = gql\`
  query ${modelName}FindBy($input: ${modelName}FindByInput!) {
    ${modelName}FindBy(input: $input) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}FindFirst = gql\`
  query ${modelName}FindFirst($input: ${modelName}FindFirstInput!) {
    ${modelName}FindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}Create = gql\`
  mutation ${modelName}Create($data: ${modelName}CreateInput!, $currentUserId: String) {
    ${modelName}Create(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}CreateMany = gql\`
  mutation ${modelName}CreateMany($data: [${modelName}CreateInput!]!, $currentUserId: String) {
    ${modelName}CreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}Update = gql\`
  mutation ${modelName}Update($id: String!, $data: ${modelName}UpdateInput!, $currentUserId: String) {
    ${modelName}Update(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}UpdateMany = gql\`
  mutation ${modelName}UpdateMany($data: [${modelName}UpdateInput!]!, $currentUserId: String) {
    ${modelName}UpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}Archive = gql\`
  mutation ${modelName}Archive($id: String!, $currentUserId: String) {
    ${modelName}Archive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}ArchiveMany = gql\`
  mutation ${modelName}ArchiveMany($ids: [String!]!, $currentUserId: String) {
    ${modelName}ArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}Restore = gql\`
  mutation ${modelName}Restore($id: String!, $currentUserId: String) {
    ${modelName}Restore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}RestoreMany = gql\`
  mutation ${modelName}RestoreMany($ids: [String!]!, $currentUserId: String) {
    ${modelName}RestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentName} }
    }
  }
  \${${fragmentName}}
\`;

export const ${modelName}Remove = gql\`
  mutation ${modelName}Remove($id: String!, $currentUserId: String) {
    ${modelName}Remove(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
\`;

export const ${modelName}RemoveMany = gql\`
  mutation ${modelName}RemoveMany($ids: [String!]!, $currentUserId: String) {
    ${modelName}RemoveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data {
        id
      }
    }
  }
\`;

export const ${modelName}Subscription = gql\`
  subscription ${modelName}Subscription {
    ${modelName}Subscription { id }
  }
\`;
`.trim();

  const filePath = `${outputDir}/${modelName}.gql.ts`;

  // ─── Skip if file exists and not forced ───────────────
  if (existsSync(filePath) && !force) {
    console.log(`⏭️  Skipped ${modelName}.gql.ts (already exists, use --force to overwrite)`);
    return;
  }

  writeFileSync(filePath, content);
  console.log(`✅ Generated ${modelName}.gql.ts`);
});

console.log(`\n🎉 Done — ${activeModels.length} files generated in ${outputDir}`);
