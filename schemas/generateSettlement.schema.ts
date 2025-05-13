import { z } from "zod";

export const generateSettlementSchema = z.object({
  size: z.string().min(1, "Size is required"),
  terrain: z.array(z.string()).min(1, "Terrain is required"),
  tags: z.array(z.string()).optional(),
  climate: z.string().optional(),
  magic: z.string().optional(),
  rulingStyle: z.string().optional(),
  wealth: z.string().optional(),
  crime: z.array(z.string()).optional(),
  createSights: z.boolean().optional()
});

export type GenerateSettlementInput = z.infer<typeof generateSettlementSchema>;
