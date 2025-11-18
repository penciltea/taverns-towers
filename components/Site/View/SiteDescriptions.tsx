'use client';

import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";
import { useCampaignStore } from "@/store/campaignStore";
import { Paper, Box, Typography, Divider } from "@mui/material";
import { useSession } from 'next-auth/react';

interface SiteDescriptionsProps {
    site: {
        publicNotes?: string;
        gmNotes?: string;
    }
    userId: string;
}

export default function SiteDescriptions({ site, userId }: SiteDescriptionsProps) {
    const { data: session } = useSession();
    const user = session?.user ? { id: session.user.id } : null;
    const { selectedCampaign } = useCampaignStore();
    const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="p" sx={{ mb: 2 }}>Description</Typography>
            <Box sx={{my: 2}}>
              <Typography variant="h5" component="h4">Public Notes</Typography>
              <Divider sx={{mb: 2}} />
              <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-line' }}>{site.publicNotes ? site.publicNotes : "N/A" }</Typography>
            </Box>

            { (user?.id === userId) || (campaignPermissions !== null && campaignPermissions?.isOwner === true) &&  (
              <Box sx={{my: 2}}>
                <Typography variant="h5" component="h5">GM Notes</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-line' }}>{site.gmNotes ? site.gmNotes : "N/A" }</Typography>
              </Box>
            ) }
        </Paper>
    )
}