'use client'

import { useState } from 'react';
import { useCampaignStore } from '@/store/campaignStore';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import AuthGate from '@/components/Auth/AuthGuard';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs  from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

import DashboardActivity from '@/components/Dashboard/DashboardActivity';
import MembershipPanel from '@/components/Dashboard/Memberships';
import DashboardProfile from '@/components/Dashboard/DashboardProfile';
import DashboardFavorites from '@/components/Dashboard/DashboardFavorites';
import { userTier } from '@/constants/user.options';


export default function AccountDashboard(){
    const user = useAuthStore(state => state.user);
    const isLoggedIn = (user ? true : false);
    const isPremium = (user && user.tier !== userTier[0] ? true : false)

    const [tab, setTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const router = useRouter();
    const { selectedCampaign } = useCampaignStore();

    
    return (
        <AuthGate fallbackText="You must be logged in to view your account." hasAccess={isLoggedIn}>
            <Box p={2}>
                <Grid container spacing={2}>
                    {/* Left Column */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ px: 2, mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>User Profile</Typography>
                                <DashboardProfile username={user?.username ?? "N/A"} email={ user?.email ?? "N/A" } avatar={ user?.avatar ?? "" } />
                            </CardContent>
                        </Card>

                        <Card sx={{ px: 2, mb: 2 }}>
                            <CardContent>
                                <Tabs value={tab} onChange={handleTabChange}>
                                    <Tab label="Recent Activities" />
                                    <Tab label="Favorites" />
                                </Tabs>

                                {tab === 0 && (
                                    <Box mt={2}>
                                        <DashboardActivity />
                                    </Box>
                                )}
                                {tab === 1 && (
                                    <Box mt={2}>
                                        <DashboardFavorites />
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Membership Details */}
                        <Card sx={{ px: 2, mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h3" sx={{ mb: 2 }}>Membership Details</Typography>
                                <MembershipPanel user={user!} />
                            </CardContent>
                        </Card>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            
                            {/* Active Campaign Data & CTA */}
                            {selectedCampaign && (
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card sx={{ px: 2, mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Active Campaign</Typography>
                                            <Typography variant="body1" sx={{ marginBottom: 2 }}>{ selectedCampaign.name }</Typography>
                                            <Button 
                                                variant="outlined" 
                                                color="secondary" 
                                                sx={{ mt: 1 }} 
                                                onClick={() =>{
                                                    router.push(`/campaigns/${selectedCampaign._id}`);
                                                }}
                                            >
                                                view campaign details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                            
                            {isPremium && (
                                <Grid size={{ xs: 12, md: 6 }}>
                                    {/* Custom Data CTA */}
                                    <Card sx={{ px: 2, mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>Custom Data</Typography>
                                            <Typography sx={{ marginBottom: 2 }}>Manage your custom races, pantheons, and more.</Typography>
                                            <Button variant="outlined" sx={{ mt: 1 }} disabled>
                                                Manage custom data (coming soon!) 
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </AuthGate>
    )
}