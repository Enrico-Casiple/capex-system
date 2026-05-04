'use server';

import z from "zod";
import { fail, ok } from "../../../../../../lib/util/reponseUtil";
import { RequestCreateInputSchema } from "../../../../../lib/generated/zod/prisma-zod-types";

const handleToSubmitToCreate = async (data: z.infer<typeof RequestCreateInputSchema>) => {
  const validateInput = RequestCreateInputSchema.safeParse(data);
  if (!validateInput.success) {
    return fail("VALIDATION_ERROR", `Validation failed: ${validateInput.error.message}`);
  }
  return ok("SUCCESS_TO_CREATE", "Request created successfully", validateInput.data);
};
