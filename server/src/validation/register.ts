import { z } from "zod";

export const registerValidationSchema = z.object({
  code: z.string(),
});
