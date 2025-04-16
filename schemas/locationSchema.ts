import { z } from "zod";

export const baseLocationSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  description: z.string().optional(),
  owner: z.string().optional(),
  publicNotes: z.string().optional(),
  gmNotes: z.string().optional(),
  image: z.string().url().optional(),
});

export const tavernSchema = baseLocationSchema.extend({
  type: z.literal("tavern"),
  menu: z.array(z.string()).optional(),
  roomsAvailable: z.number().int().nonnegative().optional(),
});

export const templeSchema = baseLocationSchema.extend({
  type: z.literal("temple"),
  deity: z.string().optional(),
  rituals: z.string().optional(),
});

export const blacksmithSchema = baseLocationSchema.extend({
  type: z.literal("blacksmith"),
  weaponsOffered: z.array(z.string()).optional(),
  armorTypes: z.array(z.string()).optional(),
});

export const locationSchema = z.discriminatedUnion("type", [
  tavernSchema,
  templeSchema,
  blacksmithSchema
]);

export type LocationFormData = z.infer<typeof locationSchema>;

export const defaultLocationValues: Record<
  LocationFormData["type"],
  Partial<LocationFormData>
> = {
  tavern: {
    name: "",
    type: "tavern",
    description: "",
    menu: [],
    roomsAvailable: 0,
  },
  temple: {
    name: "",
    type: "temple",
    description: "",
    deity: "",
    rituals: "",
  },
  blacksmith: {
    name: "",
    type: "blacksmith",
    description: "",
    weaponsOffered: [],
    armorTypes: [],
  }
};
