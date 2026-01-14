import { Box, Typography, Stack, Paper, Chip } from "@mui/material";
import { Npc } from "@/interfaces/npc.interface";
import InfoListItem from "@/components/Common/InfoListItem";
import { NPC_PERSUASION, NPC_REPUTATION, NPC_TRAITS } from "@/constants/npc.options";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { getDropdownLabel } from "@/lib/util/getDropdownLabel";


export default function NpcPersonality({ npc }: { npc: Npc }) {
    const fields = [
        {
            label: "Trait(s)",
            type: "text",
            value: npc.traits?.length
                ? npc.traits.map((trait) => getDropdownLabel(NPC_TRAITS, trait)).join(", ")
                : "N/A"
        },
        { label: "Reputation", type: "text", value: getLabelFromValue(NPC_REPUTATION, npc.reputation) },
        { 
            label: "Persuaded By", 
            type: "chip", 
            value: npc.persuasion?.length
            ? npc.persuasion.map((persuasion) => getLabelFromValue(NPC_PERSUASION, persuasion))
            : [] 
        },
        { label: "Likes", type: "text", value: npc.likes ?? [] },
        { label: "Dislikes", type: "text", value: npc.dislikes ?? []},
    ]

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flex: 1, maxWidth: "1/4" }}>
            <Typography variant="h4" component="h2">Personality Traits</Typography>
            
            <Box>
                {fields.map((field) => {
                    if (field.type === "chip") {
                        return (
                            <Stack direction={{ xs: "column", md: "row" }} key={field.label} component="dl" sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                                <Typography component="dt" fontWeight="bold" minWidth={200}>
                                    {field.label}
                                </Typography>
                                {Array.isArray(field.value) && field.value.length > 0 ? (
                                    <Stack direction="row" spacing={1} component="span" useFlexGap sx={{ flexWrap: "wrap", mt: 0.5 }}>
                                        { field.value.map((value) => <Chip key={value} label={value} size="small" sx={{ my: 0.25 }} />) }
                                    </Stack>            
                                ) : (
                                    <Typography>N/A</Typography>
                                )}
                            </Stack>
                        );
                    } else {
                        // Only allow string | number | undefined here
                        const value: string | number | undefined =
                            typeof field.value === "string" || typeof field.value === "number"
                            ? field.value
                            : undefined;

                        return <InfoListItem key={field.label} label={field.label} value={value ?? "N/A"} />;
                    }
                })}
            </Box>
        </Paper>
    );
}