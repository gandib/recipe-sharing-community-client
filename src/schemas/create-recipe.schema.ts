import { z } from "zod";

const createRecipeValidationSchema = z.object({
  title: z.string({ required_error: "Please enter your title!" }),
  instructions: z
    .string({ required_error: "Please enter your instructions!" })
    .optional(),
  tags: z.string({ required_error: "Please enter your tags!" }),
  contentType: z.string({ required_error: "Please enter your content type!" }),
});

export default createRecipeValidationSchema;
