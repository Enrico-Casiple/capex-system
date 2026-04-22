import PrismaTypes, { getDatamodel } from '../pothos-prisma-types';

const prismaDataModel = getDatamodel();
export const scalarResponseSuffix = 'Response';

export type ResponseScalarType<T> = {
  code: string;
  isSuccess: boolean;
  message: string;
  data: T extends keyof PrismaTypes ? PrismaTypes[T]['Shape'] | null : null;
};

// Generate scalar type definitions for each model
export const createScalarResponseTypes = () => {
  const scalars: Record<
    string,
    {
      Input: ResponseScalarType<string>;
      Output: ResponseScalarType<string>;
    }
  > = {};

  Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
    // Use modelName directly (it's already a string)
    const scalarName = `${modelName}${scalarResponseSuffix}`;

    scalars[scalarName] = {
      Input: {
        code: '',
        isSuccess: true,
        message: '',
        data: null,
      } as ResponseScalarType<string>,
      Output: {
        code: '',
        isSuccess: true,
        message: '',
        data: null,
      } as ResponseScalarType<string>,
    };
  });

  return scalars;
};

export const scalarResponseTypes = createScalarResponseTypes();

// Create Scalars object dynamically
export const createScalars = () => {
  const baseScalars = {
    DateTime: {
      Input: Date,
      Output: Date,
    },
    Json: {
      Input: {} as Record<string, unknown>,
      Output: {} as Record<string, unknown>,
    },
  };

  return baseScalars;
};

// const prismaDataModel = getDatamodel();

// Create extended scalars type
// type ExtendedScalars = ReturnType<typeof createScalars> & {
//   [key: string]: {
//     Input: {
//       code: string;
//       isSuccess: boolean;
//       message: string;
//       data: PrismaTypes[keyof PrismaTypes]['Shape'] | null;
//     };
//     Output: {
//       code: string;
//       isSuccess: boolean;
//       message: string;
//       data: PrismaTypes[keyof PrismaTypes]['Shape'] | null;
//     };
//   };
// };

// // Add model-specific response scalars
// Object.keys(prismaDataModel.datamodel.models).forEach((modelName) => {
//   const scalarName = `${modelName}${scalarResponseSuffix}`;
//   const responseScalar = new GraphQLScalarType({
//     name: scalarName,
//     description: `Response scalar for ${modelName}`,
//     serialize: (value: unknown) => {
//       const v = value as Record<string, unknown>;
//       return {
//         code: v?.code || 'SUCCESS',
//         isSuccess: v?.isSuccess ?? true,
//         message: v?.message || '',
//         data: v?.data || null,
//       };
//     },
//     parseValue: (value: unknown) => {
//       const v = value as Record<string, unknown>;
//       return {
//         code: v?.code,
//         isSuccess: v?.isSuccess,
//         message: v?.message,
//         data: v?.data,
//       };
//     },
//   });

//   builder.addScalarType(scalarName as never, responseScalar);
// });
