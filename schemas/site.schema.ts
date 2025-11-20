import { z } from "zod";
import { ENTERTAINMENT_VENUE_TYPES, SHOP_TYPE_CATEGORIES, SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { DEFENSE, KNOWN_TO, PURPOSE, SECRECY_LEVELS } from "@/constants/site/hidden.options";
import { SECURITY_LEVELS } from "@/constants/site/government.options";
import { GUILD_MEMBERSHIP_REQUIREMENTS, GUILD_TYPES } from "@/constants/site/guild.options";
import { environmentSchema } from "./environment.schema";
import { GOVERNMENT_FUNCTIONS } from "@/constants/site/government.options";
import { extractValues, optionalEnum } from "@/lib/util/zodHelpers";
import { npcConnectionItemSchema } from "./connection.schema";

const securityEnumValues = SECURITY_LEVELS.map(opt => opt.value) as [string, ...string[]];
const entertainmentEnumValues = ENTERTAINMENT_VENUE_TYPES.map(opt => opt.value) as [string, ...string[]];
const secrecyEnumValues = SECRECY_LEVELS.map(opt => opt.value);
const knownToEnumValues = KNOWN_TO.map(opt => opt.value);
const defenseEnumValues = DEFENSE.map(opt => opt.value);
const purposeEnumValue = PURPOSE.map(opt => opt.value);
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
  name: z.string().min(1, "Site name is required"),
  type: z.string(),
  size: optionalEnum(extractValues(SITE_SIZE), "Invalid site size"),
  condition: optionalEnum(extractValues(SITE_CONDITION), "Invalid condition"),
  publicNotes: z.string().optional(),
  gmNotes: z.string().optional(),
  tone: z.array(z.string()).optional(),
  siteTheme: z.array(z.string()).optional(),
  connections: z.array(npcConnectionItemSchema),
  favorite: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  userId: z.string().optional(),
  editors: z.array(z.string()).optional(),
  idempotencyKey: z.string().optional(),
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
}).merge(environmentSchema).partial()
  .extend({
    connections: z.array(npcConnectionItemSchema), // explicitly setting connections back to required after merging
  });

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
  clientele: z.string().optional(),
  cost: z.string().optional(),
  entertainment: z.array(z.string()).optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const templeSchema = baseSiteSchema.extend({
  type: z.literal("temple"),
  domains: z.array(z.string()),
  relics: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const shopSchema = baseSiteSchema.extend({
  type: z.literal("shop"),
  shopType: z.string().refine(val => val !== "", {
    message: "Shop type is required",
  }).refine(val => shopTypeEnumValues.includes(val), {
    message: "Invalid shop type",
  }),
  menu: z.array(menuItemSchema).optional(),
});

export const guildSchema = baseSiteSchema.extend({
  type: z.literal("guild"),
  guildType: z.string().refine(val => val !== "", {
    message: "Guild type is required",
  }).refine(val => guildTypeEnumValues.includes(val), {
    message: "Invalid guild type",
  }),
  guildName: z.string().optional(),
  name: z.string().optional(),
  membershipRequirements: z.array(z.enum(guildMembershipEnumValues)).optional().default([]),
  knownRivals: z.string().optional(),
  menu: z.array(menuItemSchema).optional(),
});

export const governmentSchema = baseSiteSchema.extend({
  type: z.literal("government"),
  function: z.enum(governmentFunctionEnumValues).optional(),
  security: z.enum(securityEnumValues)
});

export const entertainmentSchema = baseSiteSchema.extend({
  type: z.literal("entertainment"),
  venueType: z.enum(entertainmentEnumValues).optional(),
  performances: z.string().optional(),
  cost: z.string().optional(),
});

export const hiddenSchema = baseSiteSchema.extend({
  type: z.literal("hidden"),
  secrecy: z
  .array(z.enum(secrecyEnumValues as [string, ...string[]]))
  .optional()
  .default([]),
  knownTo: z
  .array(z.enum(knownToEnumValues as [string, ...string[]]))
  .optional()
  .default([]),
  defenses: z
  .array(z.enum(defenseEnumValues as [string, ...string[]]))
  .optional()
  .default([]),
  purpose: z
  .array(z.enum(purposeEnumValue as [string, ...string[]]))
  .optional()
  .default([]),
});

export const residenceSchema = baseSiteSchema.extend({
  type: z.literal("residence"),
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
    size: "",
    condition: "",
    clientele: "",
    entertainment: [],
    cost: "",
    siteTheme: [],
    menu: [],
    connections: []
  },
  temple: {
    name: "",
    type: "temple",
    size: "",
    condition: "",
    domains: [],
    relics: "",
    siteTheme: [],
    menu: [],
    connections: []
  },
  shop: {
    name: "",
    type: "shop",
    size: "",
    condition: "",
    shopType: "",
    siteTheme: [],
    menu: [],
    connections: []
  },
  guild: {
    name: "",
    type: "guild",
    size: "",
    condition: "",
    guildType: "",
    guildName: "",
    membershipRequirements: [],
    knownRivals: "",
    siteTheme: [],
    menu: [],
    connections: []
  },
  government: {
    name: "",
    type: "government",
    size: "",
    condition: "",
    function: "",
    security: "",
    siteTheme: [],
    connections: []
  },
  entertainment: {
    name: "",
    type: "entertainment",
    size: "",
    condition: "",
    venueType: "",
    cost: "",
    siteTheme: [],
    connections: []
  },
  hidden: {
    name: "",
    type: "hidden",
    size: "",
    condition: "",
    secrecy: [],
    knownTo: [],
    defenses: [],
    purpose: [],
    siteTheme: [],
    connections: []
  }, 
  residence: {
    name: "",
    type: "residence",
    size: "",
    condition: "",
    notableFeatures: "",
    siteTheme: [],
    connections: []
  },
  miscellaneous: {
    name: "",
    type: "miscellaneous",
    size: "",
    condition: "",
    features: "",
    use: "",
    siteTheme: [],
    connections: []
  }
};
