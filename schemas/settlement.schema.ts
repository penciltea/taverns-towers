import { z } from "zod";
import { defaultEnvironmentValues, environmentSchema } from "./environment.schema";
import { optionalEnum } from "@/lib/util/zodHelpers";
import { MAGIC_LEVELS, RULING_TYPES, SIZE_TYPES, WEALTH_LEVELS } from "@/constants/settlementOptions";
import { npcConnectionItemSchema } from "./connection.schema";
const fileSizeLimit = 5 * 1024 * 1024;

export const settlementSchema = z.object({
  name: z.string().min(1, "Settlement name is required"),
  size: optionalEnum(SIZE_TYPES as [string, ...string[]], "Invalid size"),
  magic: optionalEnum(MAGIC_LEVELS as [string, ...string[]], "Invalid magic level"),
  races: z.string().optional(),
  description: z.string().optional(),
  publicNotes: z.string().optional(),
  gmNotes: z.string().optional(),
  rulingStyle: optionalEnum(RULING_TYPES as [string, ...string[]], "Invalid ruling style"),
  wealth: optionalEnum(WEALTH_LEVELS as [string, ...string[]], "Invalid wealth level"),
  tradeNotes: z.string().optional(),
  guilds: z.string().optional(),
  domains: z.array(z.string()).optional(),
  holidays: z.string().optional(),
  folklore: z.string().optional(),
  crime: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  editors: z.array(z.string()).optional(),
  connections: z.array(npcConnectionItemSchema).default([]),
  map: z
    .any()
    .refine(
      (val) =>
        val === undefined ||
        typeof val === "string" ||
        (typeof FileList !== "undefined" && val instanceof FileList),
      {
        message: "Map must be a URL or FileList",
      }
    )
    .optional(),
})
.merge(environmentSchema); // added for climate, terrain, and tags fields

export const settlementFilterSchema = z.object({
  tags: z.array(z.string()).optional(),
  terrain: z.array(z.string()).optional(),
  size: z.string().optional(),
  magic: z.string().optional(),
  wealth: z.string().optional(),
})
.merge(environmentSchema); // added for climate, terrain, and tag fields

export const defaultSettlementValues =  {
  name: "",
  size: undefined,
  magic: undefined,
  races: "",
  publicNotes: "",
  gmNotes: "",
  rulingStyle: undefined,
  wealth: undefined,
  tradeNotes: "",
  guilds: "",
  domains: [],
  holidays: "",
  folklore: "",
  crime: [],
  map: undefined,
  isPublic: false,
  editors: [],
  connections: [],
  ...defaultEnvironmentValues // added for defaults for climate, terrain, and tags
}

export type SettlementFormData = z.infer<typeof settlementSchema>;