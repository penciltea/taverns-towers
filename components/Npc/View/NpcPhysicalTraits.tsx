import { Box, Typography, Stack, Paper, Chip } from "@mui/material";
import { Npc } from "@/interfaces/npc.interface";
import InfoListItem from "@/components/Common/InfoListItem";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { NPC_BUILD, NPC_DISTINGUISHING_FEATURES, NPC_EYE_COLOR, NPC_HAIR_COLOR, NPC_HAIR_STYLE, NPC_HEIGHT, NPC_SKINTONE } from "@/constants/npc.options";
import { getDropdownLabel } from "@/lib/util/getDropdownLabel";


export default function NpcPhysicalTraits({ npc }: { npc: Npc }) {
    const fields = [
        { label: "Height", type: "text", value: getLabelFromValue(NPC_HEIGHT, npc.height) },
        { label: "Build", type: "text", value: getLabelFromValue(NPC_BUILD, npc.build) },
        { label: "Eye Color", type: "text", value: npc.eyeColor?.length ? npc.eyeColor.map((color) => getDropdownLabel(NPC_EYE_COLOR, color)).join(", ") : [] },
        { label: "Hair Color", type: "text", value: npc.hairColor?.length ? npc.hairColor.map((color) => getDropdownLabel(NPC_HAIR_COLOR, color)).join(", ") : [] },
        { label: "Hair Style", type: "chip", value: npc.hairStyle?.length ? npc.hairStyle.map((style) => getDropdownLabel(NPC_HAIR_STYLE, style)) : [] },
        { label: "Skin Tone", type: "text", value: npc.skinTone?.length ? npc.skinTone.map((skin) => getDropdownLabel(NPC_SKINTONE, skin)).join(", ") : [] },
        { label: "Distinguishing Features", type: "chip", value: npc.features?.length ? npc.features.map((feature) => getDropdownLabel(NPC_DISTINGUISHING_FEATURES, feature)) : [] },
    ]

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flex: 1, maxWidth: "1/4" }}>
            <Typography variant="h4" component="h2">Physical Traits</Typography>
            
            <Box>
                {fields.map((field) => {
                   if (field.type === "chip") {
                        return (
                            <Box key={field.label} component="dl" sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
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
                            </Box>
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