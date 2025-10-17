import InfoListItem from "@/components/Common/InfoListItem";
import { Box } from "@mui/material";

interface SiteDetailsDescriptionsProps{
    details: {
        label: string,
        value: string | undefined
    }[],
    descriptions: {
        label: string,
        value: string | undefined
    }[]
}

export default function SiteDetailsDescription({ details, descriptions}: SiteDetailsDescriptionsProps){
    return (
        <Box component="dl" sx={{ mt: 1, px: 3 }}>
            {details.map(detail => (
                <InfoListItem key={detail.label} label={detail.label} value={detail.value ?? "N/A"} />
            ))}
        
            {descriptions.map(description => (
                <InfoListItem key={description.label} label={description.label} value={description.value ?? "N/A"} />
            ))}
      </Box>
    )
}