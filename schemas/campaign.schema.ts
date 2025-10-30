import { GENRES } from "@/constants/campaign.options";
import { z } from "zod";

const GenreTypes = GENRES.flatMap(group =>
  group.options.map(option => option.value)
) as [string, ...string[]];

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
    description: z.string().optional(),
    genre: z.array
        (z.string().refine(val => GenreTypes.includes(val), {
            message: "Invalid genre type",
        })
    ),
    tone: z.array(z.string()).optional(),
    rules: z.string().optional(),
    links: z.array(z.string().url("Invalid URL format")).optional(),
    highlights: z.array(z.string()).optional(),
    players: z.array(
        z.object({
            userId: z.string().min(24, { message: "Invalid user ID" }),
            roles: z.array(z.string()),
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