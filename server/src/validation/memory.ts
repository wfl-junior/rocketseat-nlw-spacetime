import { z } from "zod";

export const memoryValidationSchema = z.object({
  content: z.string(),
  coverUrl: z.string(),
  isPublic: z.coerce.boolean().default(false),
});
