import { GENRES } from "@/constants/campaign.options";
import { z } from "zod";

const GenreTypes = GENRES.flatMap(group =>
  group.options.map(option => option.value)
) as [string, ...string[]];

export const playerInputSchema = z.object({
  identifier: z.string().min(1, "Identifier is required").optional(),
  userId: z.string().min(24, { message: "Invalid user ID" }).optional(),
  roles: z.array(z.enum(["player", "editor"])).nonempty(),
}).refine(
  (data) => data.identifier || data.userId,
  "Either identifier or userId is required"
);

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
    description: z.string().optional(),
    genre: z.array
        (z.string().refine(val => GenreTypes.includes(val), {
            message: "Invalid genre type",
        })
    ).optional(),
    tone: z.array(z.string()).optional(),
    rules: z.string().optional(),
    links: z.array(z.string().url("Invalid URL format")).optional(),
    highlights: z.array(z.string()).optional(),
    players: z.array(
        z.object({
            identifier: z.string().min(1),  // for form input
            userId: z.string().optional(),   // optional, filled in transform
            roles: z.array(z.string())
        })
    ).optional(),
    isPublic: z.boolean().optional(),
    idempotencyKey: z.string().optional(),
});

export const defaultCampaignValues = {
    name: "",
    description: "",
    genre: [],
    tone: [],
    rules: "",
    links: [],
    isPublic: false,
    players: [],
    highlights: [],
};

export type CampaignFormData = z.infer<typeof campaignSchema>;