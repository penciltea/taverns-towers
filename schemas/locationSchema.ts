import { z } from "zod";

export const baseLocationSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  size: z.string().optional(),
  condition: z.string().optional(),
  publicNotes: z.string().optional(),
  gmNotes: z.string().optional(),
  image: z.string().url().optional(),
});

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(), // or .min(1) if required
  price: z.string().or(z.number()).transform((val) => val.toString()),
});

export const tavernSchema = baseLocationSchema.extend({
  type: z.literal("tavern"),
  clientele: z.string().optional(),
  cost: z.string().optional(),
  entertainment: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
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
    menu: []
  },
  temple: {
    name: "",
    type: "temple",
    deity: "",
    rituals: "",
  },
  blacksmith: {
    name: "",
    type: "blacksmith",
    weaponsOffered: [],
    armorTypes: [],
  }
};
