'use client'

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
import { useSession } from "next-auth/react";
import { useGetCampaignHighlights } from "@/hooks/campaign/campaign.query";
import GridContainer from "@/components/Grid/GridContainer";
import GridItem from "@/components/Grid/GridItem";
import { toTitleCase } from "@/lib/util/stringFormats";


export default function ViewCampaign({ campaign }: { campaign: CampaignForClient }){
    const { data: session } = useSession();
    const { activeCampaign, setActiveCampaign } = useSetActiveCampaign();
    const { isPlayerInCampaign } = useCampaignAccess();

    const user = session?.user ? { id: session.user.id } : null;    
    const { data: campaignHighlights, isLoading: loadingHighlights, isError: highlightsError } = useGetCampaignHighlights(campaign._id);


    function handleSetActiveCampaign() {
        setActiveCampaign(campaign);
    }
    
    function handleTitle(contentType: string){
        if(contentType === "npc"){
            return "NPC"
        }
        return toTitleCase(contentType)
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
                            { loadingHighlights && <Typography>Loading highlights...</Typography> }
                            { highlightsError && <Typography color="error">Something went wrong loading the campaign&apos;s highlights.</Typography> }
                            { !loadingHighlights && !highlightsError && (
                                <>
                                    { campaignHighlights && campaignHighlights.length > 0 ? (
                                        <GridContainer>
                                            { campaignHighlights.map((item) => (
                                                <Grid key={item._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                                    <GridItem
                                                        key={item._id}
                                                        link={`/${item.type}s/${item._id}`}
                                                        title={item.name}
                                                        subtitle={handleTitle(item.type) }
                                                    />
                                                </Grid>
                                            ))}
                                        </GridContainer>
                                        
                                    ) : (
                                        <Typography>No campaign highlights found.</Typography>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            { (activeCampaign?._id !== campaign._id && isPlayerInCampaign(campaign) || (user?.id && campaign.userId === user?.id)) && 
                <FabButton
                    label="Set as Active Campaign"
                    onClick={handleSetActiveCampaign}
                />
            }
            
        </>
    )
}