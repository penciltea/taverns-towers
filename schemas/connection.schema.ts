import { z } from "zod";

export const npcConnectionItemSchema = z.object({
  id: z.string(),
  type: z.enum(["settlement", "site", "npc"]),
  role: z.string(),
});
