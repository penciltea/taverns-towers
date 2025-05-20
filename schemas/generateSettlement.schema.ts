import { z } from "zod";

export const generateSettlementSchema = z.object({
  size: z.string().min(1, "Size is required"),
  terrain: z.array(z.string()).min(1, "Terrain is required"),
  tags: z.array(z.string()).min(1, "One Tag selection is required"),
  climate: z.string().min(1, "Climate is required"),
  magic: z.string().min(1, "Magic Use/Level is required"),
  rulingStyle: z.string().min(1, "Ruling Style is required"),
  wealth: z.string().min(1, "Wealth is required"),
  crime: z.array(z.string()).min(1, "One Crime selection is required"),
  createSites: z.boolean().optional()
});

export type GenerateSettlementInput = z.infer<typeof generateSettlementSchema>;
