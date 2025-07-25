import { z } from "zod";
import { defaultEnvironmentValues, environmentSchema } from "./environment.schema";
const fileSizeLimit = 5 * 1024 * 1024;

export const settlementSchema = z.object({
  name: z.string().min(1, "Settlement name is required"),
  size: z.string().optional(),
  magic: z.string().optional(),
  races: z.string().optional(),
  description: z.string().optional(),
  publicNotes: z.string().optional(),
  gmNotes: z.string().optional(),
  leader: z.string().optional(),
  rulingStyle: z.string().optional(),
  wealth: z.string().optional(),
  tradeNotes: z.string().optional(),
  guilds: z.string().optional(),
  domains: z.array(z.string()).optional(),
  holidays: z.string().optional(),
  folklore: z.string().optional(),
  crime: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
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
  size: z.string().optional(),
  magic: z.string().optional(),
  wealth: z.string().optional(),
})
.merge(environmentSchema); // added for climate, terrain, and tag fields

export const defaultSettlementValues =  {
  name: "",
  size: "",
  magic: "",
  races: "",
  publicNotes: "",
  gmNotes: "",
  leader: "",
  rulingStyle: "",
  wealth: "",
  tradeNotes: "",
  guilds: "",
  domains: [],
  holidays: "",
  folklore: "",
  crime: [],
  map: undefined,
  isPublic: false,
  ...defaultEnvironmentValues // added for defaults for climate, terrain, and tags
}

export type SettlementFormData = z.infer<typeof settlementSchema>;