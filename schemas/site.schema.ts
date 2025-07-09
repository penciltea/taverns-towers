import { z } from "zod";
import { SECRECY_LEVELS, SHOP_TYPE_CATEGORIES } from "@/constants/siteOptions";
import { SECURITY_LEVELS } from "@/constants/site/government.options";
import { GUILD_MEMBERSHIP_REQUIREMENTS, GUILD_TYPES } from "@/constants/site/guild.options";
import { environmentSchema } from "./environment.schema";
import { GOVERNMENT_FUNCTIONS } from "@/constants/site/government.options";

const securityEnumValues = SECURITY_LEVELS.map(opt => opt.value) as [string, ...string[]];;
const secrecyEnumValues = SECRECY_LEVELS.map(opt => opt.value);
const guildTypeEnumValues = GUILD_TYPES.flatMap(group =>
  group.options.map(option => option.value)
) as [string, ...string[]];
const guildMembershipEnumValues = GUILD_MEMBERSHIP_REQUIREMENTS.flatMap(group =>
  group.options.map(option => option.value)
) as [string, ...string[]];
const governmentFunctionEnumValues = GOVERNMENT_FUNCTIONS.flatMap(group =>
  group.options.map(option => option.value)
) as [string, ...string[]];
const shopTypeEnumValues = SHOP_TYPE_CATEGORIES.flatMap(group =>
  group.options.map(option => option.value)
) as [string, ...string[]];

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
}).merge(environmentSchema).partial();

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().optional(),
  rarity: z.string().optional(),
  quality: z.string().optional(),
  quantity: z.string().optional(),
  magic: z.string().optional(),
  description: z.string().optional(),
  price: z.string().or(z.number()).transform((val) => val.toString()),
});

export const tavernSchema = baseSiteSchema.extend({
  type: z.literal("tavern"),
  owner: z.string().optional(),
  clientele: z.string().optional(),
  cost: z.string().optional(),
  entertainment: z.array(z.string()),
  menu: z.array(menuItemSchema).optional(),
});

export const templeSchema = baseSiteSchema.extend({
  type: z.literal("temple"),
  leader: z.string().optional(),
  relics: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const shopSchema = baseSiteSchema.extend({
  type: z.literal("shop"),
  shopType: z.enum(shopTypeEnumValues),
  owner: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const guildSchema = baseSiteSchema.extend({
  type: z.literal("guild"),
  guildType: z.enum(guildTypeEnumValues),
  guildName: z.string().optional(),
  name: z.string().optional(),
  leader: z.string().optional(),
  membershipRequirements: z.array(z.enum(guildMembershipEnumValues)).optional().default([]),
  knownRivals: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const governmentSchema = baseSiteSchema.extend({
  type: z.literal("government"),
  function: z.enum(governmentFunctionEnumValues).optional(),
  officials: z.string().optional(),
  security: z.enum(securityEnumValues)
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
    entertainment: [],
    cost: "",
    menu: []
  },
  temple: {
    name: "",
    type: "temple",
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
    membershipRequirements: [],
    knownRivals: "",
    menu: []
  },
  government: {
    name: "",
    type: "government",
    function: "",
    officials: "",
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
