import { NPC_CONNECTION_TYPE, NPC_TRAITS } from "@/constants/npc.options";
import { z } from "zod";

const allTraitValues = NPC_TRAITS.flatMap((group) => group.options.map((opt) => opt.value));

export const npcSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().optional(),
  pronouns: z.string().optional(),
  alignment: z.string().optional(),
  status: z.string().optional(),
  race: z.string().optional(),
  description: z.string().optional(),
  gmNotes: z.string().optional(),
  publicNotes: z.string().optional(),

  traits: z
    .array(z.enum(allTraitValues as [string, ...string[]]))
    .optional(), // or `.min(1)` if at least one is required

  connections: z
    .array(
      z.object({
        type: z.enum(NPC_CONNECTION_TYPE),
        id: z.string(), // Use Zod's `z.string().uuid()` if you're working with UUIDs
        label: z.string().optional(),
      })
    )
    .optional(),
});

export const defaultNpcValues = {
  name: "",
  age: "",             // Use "" for unselected dropdowns in form
  pronouns: "",
  alignment: "",
  status: "",
  race: "",
  traits: [],          // Optional multi-select
  connections: [],     // Optional array of linked entities  
  description: "",
  publicNotes: "",
  gmNotes: "",
  isPublic: false,
  editors: [],
};

export type NpcFormData = z.infer<typeof npcSchema>;