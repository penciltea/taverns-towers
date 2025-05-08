import { z } from "zod";
import { SECURITY_LEVELS, SECRECY_LEVELS } from "@/constants/sightOptions";

const securityEnumValues = SECURITY_LEVELS.map(opt => opt.value);
const secrecyEnumValues = SECRECY_LEVELS.map(opt => opt.value);

export const baseSightSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  size: z.string().optional(),
  condition: z.string().optional(),
  publicNotes: z.string().optional(),
  gmNotes: z.string().optional(),
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

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(), // or .min(1) if required
  price: z.string().or(z.number()).transform((val) => val.toString()),
});

export const tavernSchema = baseSightSchema.extend({
  type: z.literal("tavern"),
  owner: z.string().optional(),
  clientele: z.string().optional(),
  cost: z.string().optional(),
  entertainment: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const templeSchema = baseSightSchema.extend({
  type: z.literal("temple"),
  deity: z.string().optional(),
  leader: z.string().optional(),
  relics: z.string().optional(),
  services: z.array(menuItemSchema).optional(),
});

export const shopSchema = baseSightSchema.extend({
  type: z.literal("shop"),
  shopType: z.string().optional(),
  owner: z.string().optional(),
  wares: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
  })).optional(),
});

export const guildSchema = baseSightSchema.extend({
  type: z.literal("guild"),
  guildName: z.string().optional(),
  guildType: z.string().optional(),
  leader: z.string().optional(),
  membershipRequirements: z.string().optional(),
  knownRivals: z.string().optional(),
  services: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
  })).optional(),
});

export const governmentSchema = baseSightSchema.extend({
  type: z.literal("government"),
  function: z.string().optional(),
  officials: z.string().optional(),
  jurisdiction: z.string().optional(),
  security: z.enum(securityEnumValues as [string, ...string[]]).optional()
});

export const entertainmentSchema = baseSightSchema.extend({
  type: z.literal("entertainment"),
  venueType: z.string().optional(),
  performances: z.string().optional(),
  owner: z.string().optional(),
  cost: z.string().optional(),
});

export const hiddenSchema = baseSightSchema.extend({
  type: z.literal("hidden"),
  secrecy: z
  .array(z.enum(secrecyEnumValues as [string, ...string[]]))
  .optional()
  .default([]),leader: z.string().optional(),
  knownTo: z.string().optional(),
  defenses: z.string().optional(),
  purpose: z.string().optional(),
});

export const residenceSchema = baseSightSchema.extend({
  type: z.literal("residence"),
  occupant: z.string().optional(),
  wealth: z.string().optional(),
  notableFeatures: z.string().optional(),
});

export const miscSchema = baseSightSchema.extend({
  type: z.literal("miscellaneous"),
  description: z.string().optional(),
  features: z.string().optional(),
  use: z.string().optional(),
});

export const sightSchema = z.discriminatedUnion("type", [
  tavernSchema,
  templeSchema,
  shopSchema,
  guildSchema,
  governmentSchema,
  entertainmentSchema,
  hiddenSchema,
  residenceSchema, 
  miscSchema
]);

export type SightFormData = z.infer<typeof sightSchema>;

export const defaultSightValues: Record<
  SightFormData["type"],
  Partial<SightFormData>
> = {
  tavern: {
    name: "",
    type: "tavern",
    clientele: "",
    owner: "",
    entertainment: "",
    cost: "",
    menu: []
  },
  temple: {
    name: "",
    type: "temple",
    deity: "",
    leader: "",
    relics: "",
    services: []
  },
  shop: {
    name: "",
    type: "shop",
    shopType: "",
    owner: "",
    wares: []
  },
  guild: {
    name: "",
    type: "guild",
    guildName: "",
    focus: "",
    leader: "",
    membershipRequirements: "",
    knownRivals: "",
    services: []
  },
  government: {
    name: "",
    type: "government",
    function: "",
    officials: "",
    jurisdiction: "",
    security: "",
  },
  entertainment: {
    name: "",
    type: "entertainment",
    venueType: "",
    owner: "",
    performances: "",
    cost: "",
  },
  hidden: {
    name: "",
    type: "hidden",
    secrecy: [],
    knownTo: "",
    defenses: "",
    purpose: "",
  }, 
  residence: {
    name: "",
    type: "residence",
    occupant: "",
    notableFeatures: ""
  },
  miscellaneous: {
    name: "",
    type: "miscellaneous",
    features: "",
    use: ""
  }
};
