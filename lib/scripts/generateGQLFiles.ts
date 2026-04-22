import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { print } from 'graphql';
import { generateFragment } from '../api/fragments.ts';
import { getDatamodel } from '../pothos/pothos-prisma-types';

const prismaDataModel = getDatamodel();
const outputDir = 'lib/api/gql';
const customDir = 'lib/api/custom';

mkdirSync(outputDir, { recursive: true });

const activeModels = Object.keys(prismaDataModel.datamodel.models);
const existingFiles = readdirSync(outputDir).filter((f) => f.endsWith('.gql.ts'));

const buildModelFile = (modelName: string, fragmentConst: string, fragmentBlock: string): string =>
  `
import { gql } from '@apollo/client';
${fragmentBlock}

export const ${modelName}FindAllWithCursor = gql\`
  query ${modelName}FindAllWithCursor($cursorInput: ${modelName}CursorPaginationInput!) {
    ${modelName}FindAllWithCursor(cursorInput: $cursorInput) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
      nextCursor
      prevCursor
      hasNextPage
      hasPrevPage
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}FindAll = gql\`
  query ${modelName}FindAll($paginationInput: ${modelName}PageInput!) {
    ${modelName}FindAll(paginationInput: $paginationInput) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
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
  \${${fragmentConst}}
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
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}FindBy = gql\`
  query ${modelName}FindBy($input: ${modelName}FindByInput!) {
    ${modelName}FindBy(input: $input) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}FindFirst = gql\`
  query ${modelName}FindFirst($input: ${modelName}FindFirstInput!) {
    ${modelName}FindFirst(input: $input) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}ExportCsv = gql\`
  query ${modelName}ExportCsv($input: ${modelName}CsvExportInput!) {
    ${modelName}ExportCsv(input: $input) {
      code
      data {
        csv
        excelBase64
        excelFileName
        excelMimeType
        fileName
        mimeType
        rowCount
      }
      isSuccess
      message
    }
  }
\`;


export const ${modelName}Create = gql\`
  mutation ${modelName}Create($data: Json!, $currentUserId: String) {
    ${modelName}Create(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}CreateMany = gql\`
  mutation ${modelName}CreateMany($data: [Json!]!, $currentUserId: String) {
    ${modelName}CreateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}Update = gql\`
  mutation ${modelName}Update($id: String!, $data: Json!, $currentUserId: String) {
    ${modelName}Update(id: $id, data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}UpdateMany = gql\`
  mutation ${modelName}UpdateMany($data: [Json!]!, $currentUserId: String) {
    ${modelName}UpdateMany(data: $data, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}Archive = gql\`
  mutation ${modelName}Archive($id: String!, $currentUserId: String) {
    ${modelName}Archive(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}ArchiveMany = gql\`
  mutation ${modelName}ArchiveMany($ids: [String!]!, $currentUserId: String) {
    ${modelName}ArchiveMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}Restore = gql\`
  mutation ${modelName}Restore($id: String!, $currentUserId: String) {
    ${modelName}Restore(id: $id, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
\`;

export const ${modelName}RestoreMany = gql\`
  mutation ${modelName}RestoreMany($ids: [String!]!, $currentUserId: String) {
    ${modelName}RestoreMany(ids: $ids, currentUserId: $currentUserId) {
      isSuccess
      message
      code
      data { ...${fragmentConst} }
    }
  }
  \${${fragmentConst}}
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
    ${modelName}Subscription { ...${fragmentConst} }
  }
  \${${fragmentConst}}
\`;
`.trim();

// Delete files for removed models
existingFiles.forEach((file) => {
  const modelName = file.replace('.gql.ts', '');
  if (!activeModels.includes(modelName)) {
    unlinkSync(`${outputDir}/${file}`);
    console.log(`Deleted ${file} (model removed)`);
  }
});

activeModels.forEach((modelName) => {
  const fragmentConst = `${modelName}Fragment`;
  const customFragmentPath = `${customDir}/${fragmentConst}.ts`;
  const hasCustomFragment = existsSync(customFragmentPath);

  const fragmentBlock = hasCustomFragment
    ? `import { ${fragmentConst} } from '../custom/${fragmentConst}';`
    : (() => {
        const generated = generateFragment(modelName);
        const generatedFragmentString = print(generated.fragment);
        return `export const ${fragmentConst} = gql\`
${generatedFragmentString}
\`;`;
      })();

  const content = buildModelFile(modelName, fragmentConst, fragmentBlock);
  const filePath = `${outputDir}/${modelName}.gql.ts`;
  const fileExists = existsSync(filePath);
  const prev = fileExists ? readFileSync(filePath, 'utf8') : '';

  if (prev === content) {
    console.log(`Skipped ${modelName}.gql.ts (no changes)`);
    return;
  }

  writeFileSync(filePath, content);
  console.log(`${fileExists ? 'Updated' : 'Generated'} ${modelName}.gql.ts`);
});

console.log(`Done - processed ${activeModels.length} models`);
