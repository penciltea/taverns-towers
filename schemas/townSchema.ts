import { z } from "zod";

export const townSchema = z.object({
  name: z.string().min(1, "Town name is required"),
  size: z.string().optional(),
  population: z.string().optional(),
  leadership: z.string().optional(),
  wealth: z.string().optional(),
  description: z.string().optional(),
  terrain: z.array(z.string()).optional(),
  map: z
    .any()
    .refine((file) => file instanceof File || file === undefined, {
      message: "Must be a valid image file",
    })
    .optional(),
});

export type TownFormData = z.infer<typeof townSchema>;