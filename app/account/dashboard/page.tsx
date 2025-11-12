'use client';


import { useState } from 'react';

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
import { isUserVerified } from '@/lib/util/isUserVerified';

export default function AccountDashboard(){
    const user = useAuthStore(state => state.user);
    const isLoggedIn = (user ? true : false);

    const [tab, setTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    
    return (
        <AuthGate fallbackText="You must be logged in to view your account." hasAccess={isLoggedIn}>
            <Box p={2}>
                <Grid container spacing={2}>
                    {/* Left Column */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ px: 2, mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>User Profile</Typography>
                                <DashboardProfile username={user?.username ?? "N/A"} email={ user?.email ?? "N/A" } avatar={ user?.avatar ?? ""} emailVerified={ isUserVerified(user ?? undefined) } />
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
                            <Grid size={{ xs: 12, md: 6 }}>
                                {/* Custom Data CTA */}
                                <Card sx={{ px: 2, mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">Custom Data</Typography>
                                        <Button variant="contained" color="secondary" sx={{ mt: 1 }} disabled>
                                            Add Custom Data
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                            <Grid size={{ xs: 12, md: 6 }}>
                                {/* Campaign Settings CTA */}
                                <Card sx={{ px: 2, mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">Campaign Settings</Typography>
                                        <Button variant="outlined" sx={{ mt: 1 }} disabled>
                                            Manage Editors / Co-GMs
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </AuthGate>
    )
}