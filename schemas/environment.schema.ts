import { z } from "zod";

export const environmentSchema = z.object({
  terrain: z.array(z.string()),
  climate: z.string(),
  tags: z.array(z.string()),
});

export const defaultEnvironmentValues = {
    climate: "",
    terrain: [],
    tags: []
}