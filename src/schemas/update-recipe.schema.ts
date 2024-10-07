import { z } from "zod";

const updateRecipeValidationSchema = z.object({
  title: z.string().optional(),
  instructions: z.string().optional(),
  tags: z.string().optional(),
  contentType: z.string().optional(),
});

export default updateRecipeValidationSchema;
