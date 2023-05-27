import { z } from "zod";

export const idParamsValidationSchema = z.object({
  id: z.string().uuid(),
});
