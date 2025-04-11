import { z } from "zod";
const fileSizeLimit = 5 * 1024 * 1024;

export const townSchema = z.object({
  name: z.string().min(1, "Town name is required"),
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
  religion: z.string().optional(),
  holidays: z.string().optional(),
  folklore: z.string().optional(),
  crime: z.string().optional(),
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

export type TownFormData = z.infer<typeof townSchema>;