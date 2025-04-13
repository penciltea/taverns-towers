import { z } from 'zod';

export const locationSchema = z.object({
  townId: z.string().optional(), // may be injected on backend
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().optional(),
  owner: z.string().optional(),
  services: z.array(z.string()).optional(),
  notes: z.string().optional(),
  map: z.union([z.string().url().optional(), z.any()]).optional(),
});

export type LocationFormData = z.infer<typeof locationSchema>;