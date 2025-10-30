import { Box, Typography, Stack, Chip } from "@mui/material";
import Link from "@mui/material/Link";
import InfoListItem from "@/components/Common/InfoListItem";
import { Campaign } from "@/interfaces/campaign.interface";

export default function CampaignDetails({ campaign }: { campaign: Campaign }) {
    const fields = [
        { label: "Genre", type: "chip", value: campaign.genre ?? [] },
        { label: "Tone", type: "chip", value: campaign.tone ?? [] },
        { label: "Players", type: "chip", value: campaign.players.map((player) => player.name).filter(Boolean) },
        { label: "External Links", type: "link", value: campaign.links ?? [] },
    ]

    console.log(campaign.players);

    return (
        <>
            {fields.map((field) => {
                if (field.type === "chip") {
                    return (
                        <Box key={field.label} component="dl" sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                        <Typography component="dt" fontWeight="bold" minWidth={200}>{ field.label }</Typography>
                        {Array.isArray(field.value) && field.value.length > 0 ? (
                            <Stack direction="row" spacing={1} component="span" sx={{ flexWrap: "wrap", mt: 0.5 }}>
                                { field.value.map((value) => <Chip key={value} label={value} size="small" />) }
                            </Stack>            
                        ) : (
                            <Typography>N/A</Typography>
                        )}
                        </Box>
                    );
                } else if(field.type === "link") {
                    return (
                        <Box key={field.label} component="dl" sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                            <Typography component="dt" fontWeight="bold" minWidth={200}>{ field.label }</Typography>
                            {Array.isArray(field.value) && field.value.length > 0 ? (
                                <Stack direction="column" spacing={1} >  
                                    
                                    { field.value.map((value) => <Link key={ value } target="_blank" rel="noopener noreferrer" href={ value }>{ value }</Link> ) }
                                </Stack>
                            ) : (
                                <Typography>N/A</Typography>
                            )}
                        </Box>
                    ) 
                } else {
                    // Only allow string | number | undefined here
                    const value: string | number | undefined =
                    typeof field.value === "string" || typeof field.value === "number"
                        ? field.value
                        : undefined;

                    return <InfoListItem key={field.label} label={field.label} value={value ?? "N/A"} />;
                }
            })}
        </>
    )
}