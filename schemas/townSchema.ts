import { z } from "zod";
const fileSizeLimit = 5 * 1024 * 1024;

export const townSchema = z.object({
  name: z.string().min(1, "Town name is required"),
  size: z.string().optional(),
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
  /*
  map: z.instanceof(File)
  .refine(
    (file) =>
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
      ].includes(file.type),
    { message: "Invalid image file type" }
  )
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5MB",
  })
  .optional(),
  */
});

export type TownFormData = z.infer<typeof townSchema>;