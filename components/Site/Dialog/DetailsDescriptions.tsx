import InfoListItem from "@/components/Common/InfoListItem";
import { Box, Chip, Stack, Typography } from "@mui/material";

interface SiteDetailsDescriptionsProps{
    details: {
        label: string,
        type: string,
        value: string | string[] | undefined
    }[],
    descriptions: {
        label: string,
        value: string | undefined
    }[]
}

export default function SiteDetailsDescription({ details, descriptions}: SiteDetailsDescriptionsProps){
    return (
        <Box component="dl" sx={{ mt: 1, px: 3 }}>
            {details.map((detail) => {
                if (detail.type === "chip") {
                    return (
                    <Box key={detail.label} component="dl" sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                        <Typography component="dt" fontWeight="bold" minWidth={200}>
                            {detail.label}
                        </Typography>
                        {Array.isArray(detail.value) && detail.value.length > 0 ? (
                            <Stack direction="row" spacing={1} component="span" sx={{ flexWrap: "wrap", mt: 0.5 }}>
                                { detail.value.map((value) => <Chip key={value} label={value} size="small" />) }
                            </Stack>            
                        ) : (
                            <Typography>N/A</Typography>
                        )}
                    </Box>
                    );
                } else {
                    // Only allow string | number | undefined here
                    const value: string | number | undefined =
                    typeof detail.value === "string" || typeof detail.value === "number"
                        ? detail.value
                        : undefined;
    
                    return <InfoListItem key={detail.label} label={detail.label} value={value ?? "N/A"} />;
                }
            })}
        
            {descriptions.map(description => (
                <InfoListItem key={description.label} label={description.label} value={description.value ?? "N/A"} />
            ))}
      </Box>
    )
}