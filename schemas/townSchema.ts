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
  
  //ToDo: Fix image upload validation
  map: z.any()
  .optional()
  .refine(
    (files) =>
      files === undefined ||
      (files instanceof FileList && files.length === 1 && files[0] instanceof File),
    {
      message: "Must be a valid image file",
    }
  )
});

export type TownFormData = z.infer<typeof townSchema>;