import { Prisma } from '../generated/prisma/client';

export interface PrismaErrorResponse {
  success: boolean;
  code: string;
  message: string;
  data: null;
}

export const getPrismaErrorMessage = (error: unknown): PrismaErrorResponse => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorMap: Record<string, { code: string; message: string }> = {
      P2002: {
        code: 'PRISMA_P2002_UNIQUE_CONSTRAINT',
        message: 'This value already exists. Please use a different value.',
      },
      P2025: {
        code: 'PRISMA_P2025_RECORD_NOT_FOUND',
        message: 'The requested record was not found.',
      },
      P2003: {
        code: 'PRISMA_P2003_FOREIGN_KEY_CONSTRAINT',
        message: 'Foreign key constraint failed. Related record does not exist.',
      },
      P2014: {
        code: 'PRISMA_P2014_RELATION_VIOLATION',
        message: 'Required relation violation. Cannot perform this operation.',
      },
      P2000: {
        code: 'PRISMA_P2000_VALUE_TOO_LONG',
        message: 'The provided value is too long for the field.',
      },
      P2010: {
        code: 'PRISMA_P2010_RAW_QUERY_FAILED',
        message: 'Raw query execution failed.',
      },
      P2011: {
        code: 'PRISMA_P2011_NULL_CONSTRAINT_VIOLATION',
        message: 'Null constraint violation. A required field is missing.',
      },
      P2012: {
        code: 'PRISMA_P2012_MISSING_REQUIRED_VALUE',
        message: 'Missing required value for field.',
      },
    };

    const prismaError = errorMap[error.code] || {
      code: `PRISMA_${error.code}_UNKNOWN`,
      message: `Database error: ${error.message}`,
    };

    return {
      success: false,
      code: prismaError.code,
      message: prismaError.message,
      data: null,
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      success: false,
      code: 'PRISMA_VALIDATION_ERROR',
      message: `Invalid query: ${error.message}`,
      data: null,
    };
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      success: false,
      code: 'PRISMA_RUST_PANIC',
      message: 'Critical database error occurred.',
      data: null,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      code: 'GENERAL_ERROR',
      message: error.message,
      data: null,
    };
  }

  return {
    success: false,
    code: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred.',
    data: null,
  };
};
