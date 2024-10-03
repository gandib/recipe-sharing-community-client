import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string().trim().optional(),
  image: z.string().trim().optional(),
  bio: z.string().trim().optional(),
});

export default userValidationSchema;
