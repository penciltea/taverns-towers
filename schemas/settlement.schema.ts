import { z } from "zod";
const fileSizeLimit = 5 * 1024 * 1024;

export const settlementSchema = z.object({
  name: z.string().min(1, "Settlement name is required"),
  size: z.string().optional(),
  tags: z.array(z.string()).optional(),
  terrain: z.array(z.string()).optional(),
  climate: z.string().optional(),
  magic: z.string().optional(),
  races: z.string().optional(),
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
});

export const settlementFilterSchema = z.object({
  climate: z.string().optional(),
  size: z.string().optional(),
  tags: z.array(z.string()).optional(),
  terrain: z.array(z.string()).optional(),
  magic: z.string().optional(),
  wealth: z.string().optional(),
});

export const defaultSettlementValues =  {
  name: "",
  size: "",
  tags: [],
  terrain: [],
  climate: "",
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
}

export type SettlementFormData = z.infer<typeof settlementSchema>;