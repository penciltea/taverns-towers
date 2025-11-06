'use client'

import { useSession } from "next-auth/react";
import { useSetActiveCampaign } from "@/hooks/campaign/useSetActiveCampaign";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CampaignForClient } from "@/interfaces/campaign.interface";
import CampaignActions from "./CampaignActions";
import CampaignDetails from "./CampaignDetails";
import FabButton from "@/components/Common/Button/fabButton";
import { useCampaignAccess } from "@/hooks/campaign/useCampaignAccess";


export default function ViewCampaign({ campaign }: { campaign: CampaignForClient }){
    const { data: session } = useSession();
    const user = session?.user ? { id: session.user.id } : null;

    const { activeCampaign, setActiveCampaign } = useSetActiveCampaign();
    const { isPlayerInCampaign } = useCampaignAccess();

    function handleSetActiveCampaign() {
        setActiveCampaign(campaign);
        console.log("active campaign: ", activeCampaign);
    }

    return (
        <>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h3" component="h1">{ campaign.name }</Typography>
                <CampaignActions campaign={campaign} />
            </Stack>
            <Grid container spacing={2}>
                {/* Left Column */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ px: 2, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>Details</Typography>
                            <CampaignDetails campaign={campaign} />
                        </CardContent>
                    </Card>

                    <Card sx={{ px: 2, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="h3" sx={{ mb: 2 }}>Rules</Typography>
                            <Typography variant="body2" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}>{ campaign.rules ?? "No rules have been set for this campaign."}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ px: 2, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="h4" sx={{ mb: 2 }}>Description</Typography>
                            <Typography variant="body1" component="p" gutterBottom sx={{ whiteSpace: 'pre-line' }}>{ campaign.description ?? "This campaign does not have a description yet."}</Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ px: 2, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="h4" sx={{ mb: 2 }}>Highlights</Typography>
                            HIGHLIGHTS
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            { activeCampaign?._id !== campaign._id && isPlayerInCampaign(campaign) && 
                <FabButton
                    label="Set as Active Campaign"
                    onClick={handleSetActiveCampaign}
                />
            }
            
        </>
    )
}