import { number, z } from "zod";

export const movieSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(50),
  description: z.string().optional().nullable(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

// export const movieCreationRequestSchema = movieSchema.omit({id: true})
export const movieCreateSchema = movieSchema.omit({
  id: true,
});
// export const movieCreationResultSchema = movieSchema.omit({ password: true });
export const movieGetAllSchema = z.array(movieSchema)

export const movieUpdateSchema = movieCreateSchema.partial()
