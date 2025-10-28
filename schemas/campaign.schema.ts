import { z } from "zod";

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
    description: z.string().optional(),
    tone: z.array(z.string()).optional(),
    isPublic: z.boolean().optional(),
    players: z.array(
        z.object({
            userId: z.string(),
            role: z.enum(["editor", "viewer"]),
        })
    ).optional(),
    idempotencyKey: z.string().optional(),
});