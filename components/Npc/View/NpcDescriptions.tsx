'use client';

import { useCampaignPermissionsQuery } from "@/hooks/campaign/campaign.query";
import { useCampaignStore } from "@/store/campaignStore";
import { Paper, Box, Typography, Divider } from "@mui/material";
import { useSession } from 'next-auth/react';

interface NpcDescriptionsProps {
    npc: {
        description?: string;
        publicNotes?: string;
        gmNotes?: string;
    }
    userId: string;
}

export default function NpcDescriptions({ npc, userId }: NpcDescriptionsProps) {
    const { data: session } = useSession();
    const user = session?.user ? { id: session.user.id } : null;
    const { selectedCampaign } = useCampaignStore();
    const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flex: 1, maxWidth: "1/3" }}>
            <Typography variant="h4" component="p" sx={{ mb: 2 }}>Description & Notes</Typography>
            <Box sx={{my: 2}}>
              <Typography variant="h5" component="h3">Description</Typography>
              <Divider sx={{mb: 2}} />
              <Typography variant="body1" component="p">{npc.description ? npc.description : "N/A"}</Typography>
            </Box>

            <Box sx={{my: 2}}>
              <Typography variant="h5" component="h4">Public Notes</Typography>
              <Divider sx={{mb: 2}} />
              <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-line' }}>{npc.publicNotes ? npc.publicNotes : "N/A" }</Typography>
            </Box>

            { ( (user?.id === userId) || (campaignPermissions !== null && campaignPermissions?.isOwner === true) ) &&  (
              <Box sx={{my: 2}}>
                <Typography variant="h5" component="h5">GM Notes</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-line' }}>{npc.gmNotes ? npc.gmNotes : "N/A" }</Typography>
              </Box>
            ) }
        </Paper>
    )
}