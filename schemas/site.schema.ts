import { z } from "zod";
import { SECURITY_LEVELS, SECRECY_LEVELS } from "@/constants/siteOptions";

const securityEnumValues = SECURITY_LEVELS.map(opt => opt.value);
const secrecyEnumValues = SECRECY_LEVELS.map(opt => opt.value);

export const baseSiteSchema = z.object({
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
  category: z.string().optional(),
  description: z.string().optional(),
  price: z.string().or(z.number()).transform((val) => val.toString()),
});

export const tavernSchema = baseSiteSchema.extend({
  type: z.literal("tavern"),
  owner: z.string().optional(),
  clientele: z.string().optional(),
  cost: z.string().optional(),
  entertainment: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const templeSchema = baseSiteSchema.extend({
  type: z.literal("temple"),
  deity: z.string().optional(),
  leader: z.string().optional(),
  relics: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const shopSchema = baseSiteSchema.extend({
  type: z.literal("shop"),
  shopType: z.string(),
  owner: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const guildSchema = baseSiteSchema.extend({
  type: z.literal("guild"),
  guildName: z.string().optional(),
  guildType: z.string(),
  leader: z.string().optional(),
  membershipRequirements: z.string().optional(),
  knownRivals: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const governmentSchema = baseSiteSchema.extend({
  type: z.literal("government"),
  function: z.string().optional(),
  officials: z.string().optional(),
  jurisdiction: z.string().optional(),
  security: z.enum(securityEnumValues as [string, ...string[]]).optional()
});

export const entertainmentSchema = baseSiteSchema.extend({
  type: z.literal("entertainment"),
  venueType: z.string().optional(),
  performances: z.string().optional(),
  owner: z.string().optional(),
  cost: z.string().optional(),
});

export const hiddenSchema = baseSiteSchema.extend({
  type: z.literal("hidden"),
  secrecy: z
  .array(z.enum(secrecyEnumValues as [string, ...string[]]))
  .optional()
  .default([]),
  leader: z.string().optional(),
  knownTo: z.string().optional(),
  defenses: z.string().optional(),
  purpose: z.string().optional(),
});

export const residenceSchema = baseSiteSchema.extend({
  type: z.literal("residence"),
  occupant: z.string().optional(),
  wealth: z.string().optional(),
  notableFeatures: z.string().optional(),
});

export const miscellaneousSchema = baseSiteSchema.extend({
  type: z.literal("miscellaneous"),
  description: z.string().optional(),
  features: z.string().optional(),
  use: z.string().optional(),
});

export const siteSchema = z.discriminatedUnion("type", [
  tavernSchema,
  templeSchema,
  shopSchema,
  guildSchema,
  governmentSchema,
  entertainmentSchema,
  hiddenSchema,
  residenceSchema, 
  miscellaneousSchema
]);

export type SiteFormData = z.infer<typeof siteSchema>;

export const defaultSiteValues: Record<
  SiteFormData["type"],
  Partial<SiteFormData>
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
    menu: []
  },
  shop: {
    name: "",
    type: "shop",
    shopType: "",
    owner: "",
    menu: []
  },
  guild: {
    name: "",
    type: "guild",
    guildType: "",
    guildName: "",
    leader: "",
    membershipRequirements: "",
    knownRivals: "",
    menu: []
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
