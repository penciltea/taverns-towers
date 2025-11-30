import { z } from "zod";
import { NPC_AGE, NPC_ALIGNMENT, NPC_PRONOUNS, NPC_RACES, NPC_STATUS, NPC_TRAITS } from "@/constants/npc.options";
import { optionalEnum, optionalEnumArray } from "@/lib/util/zodHelpers";
import { npcConnectionItemSchema } from "./connection.schema";

const allTraitValues = NPC_TRAITS.flatMap((group) => group.options.map((opt) => opt.value));
const raceValues = NPC_RACES.map(opt => opt.value);


export const npcSchema = z.object({
  name: z.string().min(1, "NPC name is required"),
  age: optionalEnum(NPC_AGE as [string, ...string[]], "Invalid age"),
  pronouns: optionalEnum(NPC_PRONOUNS as [string, ...string[]], "Invalid pronouns"),
  alignment: optionalEnum(NPC_ALIGNMENT as [string, ...string[]], "Invalid alignment"),
  status: optionalEnum(NPC_STATUS as [string, ...string[]], "Invalid status"),
  race: optionalEnum(raceValues as [string, ...string[]], "Invalid race"),
  height: z.string().optional(),
  build: z.string().optional(),
  eyeColor: z.string().optional(),
  hairColor: z.string().optional(),
  hairStyle: z.string().optional(),
  description: z.string().optional(),
  gmNotes: z.string().optional(),
  publicNotes: z.string().optional(),
  reputation: z.string().optional(),
  archetype: z.string().optional(),
  occupation: z.array(z.string()).optional(),
  persuasion: z.array(z.string()).optional(),
  likes: z.string().optional(),
  dislikes: z.string().optional(),
  favorite: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  traits: optionalEnumArray(allTraitValues, "Invalid trait"),
  connections: z.array(npcConnectionItemSchema),
  idempotencyKey: z.string().optional(),
  image: z
    .any()
    .refine(
      (val) =>
        val === undefined ||
        typeof val === "string" ||
        (typeof FileList !== "undefined" && val instanceof FileList),
      {
        message: "Image must be a URL or FileList",
      }
    )
    .optional(),
});

export const npcFilterSchema = z.object({
  age: z.string().optional(),
  race: z.string().optional(),
  status: z.string().optional(),
  alignment: z.string().optional(),
  pronouns: z.string().optional(),
  
})

export const defaultNpcValues = {
  name: "",
  age: "",             // Use "" for unselected dropdowns in form
  pronouns: "",
  alignment: "",
  status: "",
  race: "",
  height: "",
  build: "",
  eyeColor: "",
  hairColor: "",
  hairStyle: "",
  traits: [],          // Optional multi-select
  reputation: "",
  archetype: "",
  occupation: [],
  persuasion: [],
  likes: "",
  dislikes: "",
  connections: [], 
  description: "",
  publicNotes: "",
  gmNotes: "",
  image: undefined,
  isPublic: false,
  editors: [],
};

export type NpcFormData = z.infer<typeof npcSchema>;